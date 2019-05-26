package main

import (
	"bufio"
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"image"
	"image/jpeg"
	"io"
	"io/ioutil"
	//"os"
	"container/heap"
	"log"
	"net/http"

	//"strings"
	"github.com/gorilla/mux"
	"googlemaps.github.io/maps"
	//"github.com/kr/pretty"
	"cloud.google.com/go/storage"
)

const (
	apiKey      = "AIzaSyAwO3GWYht0Z7jyQzqHbh-iejUAKjF1Ow4"
	BUCKET_NAME = "search-image"
)

type routeStop struct {
	index    int
	priority int
	value    int
}

var PlaceDetailsField = []maps.PlaceDetailsFieldMask{
	maps.PlaceDetailsFieldMaskFormattedAddress,
	maps.PlaceDetailsFieldMaskGeometry,
	maps.PlaceDetailsFieldMaskName,
	maps.PlaceDetailsFieldMaskPhotos,
	maps.PlaceDetailsFieldMaskRatings,
	maps.PlaceDetailsFieldMaskTypes,
	maps.PlaceDetailsFieldMaskPlaceID,
}

type placeList struct {
	Places []place `json:"city"`
}

type place struct {
	Placeid string `json:"placeid"`
}

type Point struct {
	Location         maps.LatLng `json:"location,omitempty"`
	Name             string      `json:"name,omitempty"`
	FormattedAddress string      `json:"formatted_address,omitempty"`
	Types            []string    `json:"types,omitempty"`
	PlaceID          string      `json:"place_id,omitempty"`
	Photo            string      `json:"photos,omitempty"`
	Rating           float32     `json:"rating,omitempty"`
}

type PriorityQueue []*routeStop

func (pq PriorityQueue) Len() int { return len(pq) }

func (pq PriorityQueue) Less(i, j int) bool {
	// We want Pop to give us the highest, not lowest, priority so we use greater than here.
	return pq[i].priority < pq[j].priority
}

func (pq PriorityQueue) Swap(i, j int) {
	pq[i], pq[j] = pq[j], pq[i]
	pq[i].index = i
	pq[j].index = j
}

func (pq *PriorityQueue) Push(x interface{}) {
	n := len(*pq)
	item := x.(*routeStop)
	item.index = n
	*pq = append(*pq, item)
}

func (pq *PriorityQueue) Pop() interface{} {
	old := *pq
	n := len(old)
	item := old[n-1]
	item.index = -1 // for safety
	*pq = old[0 : n-1]
	return item
}

func (pq *PriorityQueue) update(item *routeStop, value int, priority int) {
	item.value = value
	item.priority = priority
	heap.Fix(pq, item.index)
}

func main() {
	fmt.Println("started-service")
	createIndexIfNotExist()
	r := mux.NewRouter()
	r.Handle("/presave", http.HandlerFunc(handlerPresave)).Methods("POST", "OPTIONS")
	r.Handle("/place", http.HandlerFunc(handlerPlace)).Methods("POST", "OPTIONS")
	r.Handle("/geo", http.HandlerFunc(handlerGeo)).Methods("GET", "OPTIONS")
	r.Handle("/route", http.HandlerFunc(handlerBestRoute)).Methods("POST", "OPTIONS")
	r.Handle("/", http.FileServer(http.Dir("./build")))
	r.Handle("/static", http.StripPrefix("/static", http.FileServer(http.Dir("./build/static"))))
	http.Handle("/", r)
	log.Fatal(http.ListenAndServe(":8080", nil))
}

func popMin(visited *[]int, elements maps.DistanceMatrixElementsRow) *routeStop {

	var pq PriorityQueue
	j := 0
	for i, element := range elements.Elements {

		if (*visited)[i] != 1 {
			pq = append(pq, &routeStop{
				value:    i,
				priority: element.Distance.Meters,
				index:    j,
			})
			j++
		}
	}
	heap.Init(&pq)

	item := heap.Pop(&pq).(*routeStop)
	return item
}

func saveToGCS(r io.Reader, bucketName, objectName string) (*storage.ObjectAttrs, error) {
	ctx := context.Background()
	client, err := storage.NewClient(ctx)
	if err != nil {
		return nil, err
	}

	bucket := client.Bucket(bucketName)
	if _, err := bucket.Attrs(ctx); err != nil {
		return nil, err
	}

	object := bucket.Object(objectName)
	wc := object.NewWriter(ctx)
	if _, err = io.Copy(wc, r); err != nil {
		return nil, err
	}
	if err := wc.Close(); err != nil {
		return nil, err
	}

	if err = object.ACL().Set(ctx, storage.AllUsers, storage.RoleReader); err != nil {
		return nil, err
	}

	attrs, err := object.Attrs(ctx)
	if err != nil {
		return nil, err
	}

	fmt.Printf("Image is saved to GCS: %s\n", attrs.MediaLink)
	return attrs, nil
}

func handlerBestRoute(w http.ResponseWriter, r *http.Request) {
	// Parse from body of request to get a json object.
	fmt.Println("Received one post request")
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type,Authorization")
	if r.Method == "OPTIONS" {
		return
	}

	data, err := ioutil.ReadAll(r.Body)
	defer r.Body.Close()
	if err != nil {
		http.Error(w, err.Error(), 500)
		return
	}
	var Points []Point

	json.Unmarshal(data, &Points)
	var geoPoints []string
	for _, point := range Points {
		temp := fmt.Sprintf("%f", point.Location.Lat)
		temp += ("," + fmt.Sprintf("%f", point.Location.Lng))
		geoPoints = append(geoPoints, temp)
	}
	c, _ := maps.NewClient(maps.WithAPIKey(apiKey))
	req := &maps.DistanceMatrixRequest{
		Origins:      geoPoints,
		Destinations: geoPoints,
	}

	resp, err := c.DistanceMatrix(context.Background(), req)
	if err != nil {
		fmt.Printf("Failed to get DistanceMatrix %v.\n", err)
		return
	}
	//pretty.Println(resp)
	var orderedPOI []Point
	var curPoint int = 0
	visited := make([]int, len(geoPoints))

	for i := 0; i < len(geoPoints)-1; i++ {
		visited[curPoint] = 1
		orderedPOI = append(orderedPOI, Points[curPoint])
		elements := resp.Rows[curPoint]
		item := popMin(&visited, elements)
		curPoint = (*item).value
	}
	//pretty.Println(orderedPOI)
	orderedPOI = append(orderedPOI, Points[curPoint])
	js, err := json.Marshal(orderedPOI)
	if err != nil {
		http.Error(w, "Failed to parse posts into JSON format", http.StatusInternalServerError)
		fmt.Printf("Failed to parse posts into JSON format %v.\n", err)
		return
	}

	w.Write(js)
	return
}

func photoSearch(photos []maps.Photo, PlaceID string) (*storage.ObjectAttrs, error) {
	var imageData io.Reader
	c, _ := maps.NewClient(maps.WithAPIKey(apiKey))
	var attrs *storage.ObjectAttrs
	if len(photos) > 0 {
		r_photo := &maps.PlacePhotoRequest{
			PhotoReference: photos[0].PhotoReference,
			MaxHeight:      400,
			MaxWidth:       400,
		}

		result, err := c.PlacePhoto(context.Background(), r_photo)
		if err != nil {
			fmt.Printf("Failed to get place photo %v.\n", err)
			return nil, err
		}
		defer result.Data.Close()
		imageData = result.Data
	} else {
		var opt jpeg.Options
		opt.Quality = 80
		img := image.Rect(0, 0, 100, 100)
		var b bytes.Buffer
		foo := bufio.NewWriter(&b)
		jpeg.Encode(foo, img, &opt)
		imageData = bufio.NewReader(&b)
	}
	attrs, err := saveToGCS(imageData, BUCKET_NAME, PlaceID)
	if err != nil {
		fmt.Printf("Failed to save to GCS %v.\n", err)
		return nil, err
	}
	return attrs, nil
}

func handlerPlace(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type,Authorization")
	if r.Method == "OPTIONS" {
		return
	}
	data, err := ioutil.ReadAll(r.Body)
	defer r.Body.Close()
	if err != nil {
		http.Error(w, err.Error(), 500)
		return
	}
	var list placeList
	json.Unmarshal(data, &list)

	var POIS []Point
	c, _ := maps.NewClient(maps.WithAPIKey(apiKey))
	for _, place := range list.Places {
		r := &maps.PlaceDetailsRequest{
			PlaceID: place.Placeid,
			Fields:  PlaceDetailsField,
		}
		item, err := c.PlaceDetails(context.Background(), r)
		if err != nil {
			fmt.Printf("Failed to get placeDetil %v.\n", err)
			return
		}

		attrs, err := photoSearch(item.Photos, item.PlaceID)
		if err != nil {
			fmt.Printf("Failed to photo search %v.\n", err)
			return
		}

		p := Point{
			Location:         item.Geometry.Location,
			Name:             item.Name,
			Rating:           item.Rating,
			Types:            item.Types,
			PlaceID:          item.PlaceID,
			Photo:            attrs.MediaLink,
			FormattedAddress: item.FormattedAddress,
		}
		POIS = append(POIS, p)
	}
	//pretty.Println(POIS)

	js, err := json.Marshal(POIS)
	if err != nil {
		http.Error(w, "Failed to parse posts into JSON format", http.StatusInternalServerError)
		fmt.Printf("Failed to parse posts into JSON format %v.\n", err)
		return
	}

	w.Write(js)
}
