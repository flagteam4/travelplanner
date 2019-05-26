package main

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"reflect"
	"strconv"
	//"strings"
	"io/ioutil"

	"github.com/olivere/elastic"
	"googlemaps.github.io/maps"
)

const (
	POI_INDEX  = "poi"
	POI_TYPE   = "poi"
	ES_URL     = "http://35.239.88.90:9200"
	USER_INDEX = "user"
	USER_TYPE  = "user"
	DISTANCE   = "100km"
	MAXSIZE    = 50
)

type Location struct {
	Lat float64 `json:"lat"`
	Lon float64 `json:"lon"`
}

type POI struct {
	Location         Location `json:"location,omitempty"`
	Name             string   `json:"name,omitempty"`
	FormattedAddress string   `json:"formatted_address,omitempty"`
	Types            []string `json:"types,omitempty"`
	PlaceID          string   `json:"place_id,omitempty"`
	Photo            string   `json:"photos,omitempty"`
	Rating           float32  `json:"rating,omitempty"`
}

type Location_2 struct {
	Lat float64 `json:"lat"`
	Lon float64 `json:"lng" json:"lon"`
}

type POI_2 struct {
	Location         Location_2 `json:"location,omitempty"`
	Name             string     `json:"name,omitempty"`
	FormattedAddress string     `json:"formatted_address,omitempty"`
	Types            []string   `json:"types,omitempty"`
	PlaceID          string     `json:"place_id,omitempty"`
	Photo            string     `json:"photos,omitempty"`
	Rating           float32    `json:"rating,omitempty"`
}

func createIndexIfNotExist() {
	client, err := elastic.NewClient(elastic.SetURL(ES_URL), elastic.SetSniff(false))
	if err != nil {
		fmt.Println("Failed to get client")
		panic(err)
	}

	exists, err := client.IndexExists(POI_INDEX).Do(context.Background())
	if err != nil {
		fmt.Println("Failed to find POI index")
		panic(err)
	}

	// removal of mapping types in ES 7.0
	if !exists {
		fmt.Println("No geo_point mapping")
		mapping := `{
			"mappings": {
				"properties": {
					"location": {
						"type": "geo_point"
					}
				}
			}
		}`
		_, err = client.CreateIndex(POI_INDEX).Body(mapping).Do(context.Background())
		if err != nil {
			panic(err)
		}
	}

	fmt.Println("Finished geo_point mapping")
	exists, err = client.IndexExists(USER_INDEX).Do(context.Background())
	if err != nil {
		panic(err)
	}

	if !exists {
		_, err = client.CreateIndex(USER_INDEX).Do(context.Background())
		if err != nil {
			panic(err)
		}
	}
}

func handlerPresave(w http.ResponseWriter, r *http.Request) {
	// Parse from body of request to get a json object.
	fmt.Println("Received one post request")

	w.Header().Set("Content-Type", "application/json")

	data, err := ioutil.ReadAll(r.Body)
	defer r.Body.Close()
	if err != nil {
		http.Error(w, err.Error(), 500)
		return
	}
	var Points []Point

	json.Unmarshal(data, &Points)
	var Pois []POI
	for _, point := range Points {
		Pois = append(Pois, poiConv(point))
	}

	//pretty.Println(Pois)
	for i, poi := range Pois {
		id := poi.PlaceID
		err := savePoiToES(&poi, id)
		if err != nil {
			http.Error(w, "Failed to save POIs to ElasticSearch", http.StatusInternalServerError)
			fmt.Printf("Failed to save %d POI to ElasticSearch %v.\n", i, err)
			return
		}
	}
	fmt.Printf("Saved total %d POIs to ElasticSearch.\n", len(Pois))
	return
}

// 1.1 POI table write
// Save a POI to ES

func handlerGeo(w http.ResponseWriter, r *http.Request) {
	fmt.Println("Received one request for search")
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type,Authorization")
	if r.Method == "OPTIONS" {
		return
	}

	lat, _ := strconv.ParseFloat(r.URL.Query().Get("lat"), 64)
	lon, _ := strconv.ParseFloat(r.URL.Query().Get("lng"), 64)
	// range is optional
	ran := DISTANCE

	query := elastic.NewGeoDistanceQuery("location")
	query = query.Distance(ran).Lat(lat).Lon(lon)

	posts, err := readFromES(query)
	if err != nil {
		http.Error(w, "Failed to read post from ElasticSearch", http.StatusInternalServerError)
		fmt.Printf("Failed to read post from ElasticSearch %v.\n", err)
		return
	}

	js, err := json.Marshal(posts)
	if err != nil {
		http.Error(w, "Failed to parse posts into JSON format", http.StatusInternalServerError)
		fmt.Printf("Failed to parse posts into JSON format %v.\n", err)
		return
	}

	w.Write(js)

}

func savePoiToES(poi *POI, id string) error {
	client, err := elastic.NewClient(elastic.SetURL(ES_URL), elastic.SetSniff(false))
	if err != nil {
		return err
	}

	_, err = client.Index().
		Index(POI_INDEX).
		//Type(POI_TYPE).
		Id(id).
		BodyJson(poi).
		Refresh("wait_for").
		Do(context.Background())
	if err != nil {
		return err
	}

	//fmt.Printf("POI is saved to index: %s\n", poi.Name)
	fmt.Printf("POI: %s is saved to index: poi.\n", id)
	return nil
}

func readFromES(query elastic.Query) ([]Point, error) {
	client, err := elastic.NewClient(elastic.SetURL(ES_URL), elastic.SetSniff(false))
	if err != nil {
		return nil, err
	}

	searchResult, err := client.Search().
		Index(POI_INDEX).
		Query(query).
		Pretty(true).
		Size(MAXSIZE).
		Do(context.Background())
	if err != nil {
		return nil, err
	}

	fmt.Printf("Query took %d milliseconds\n", searchResult.TookInMillis)

	var ptyp POI
	var poiList []Point
	for _, item := range searchResult.Each(reflect.TypeOf(ptyp)) {
		if p, ok := item.(POI); ok {
			poiList = append(poiList, pointConv(p))
		}
	}

	return poiList, nil
}

func poiConv(point Point) POI {
	var poi = POI{
		PlaceID:          point.PlaceID,
		Name:             point.Name,
		FormattedAddress: point.FormattedAddress,
		Location: Location{
			Lat: point.Location.Lat,
			Lon: point.Location.Lng, // naming conversion
		},
		Rating: point.Rating,
		Types:  point.Types,
		Photo:  point.Photo,
	}

	return poi
}

func pointConv(poi POI) Point {
	var point = Point{
		PlaceID:          poi.PlaceID,
		Name:             poi.Name,
		FormattedAddress: poi.FormattedAddress,
		Location: maps.LatLng{
			Lat: poi.Location.Lat,
			Lng: poi.Location.Lon, // naming conversion
		},
		Rating: poi.Rating,
		Types:  poi.Types,
		Photo:  poi.Photo,
	}

	return point
}
