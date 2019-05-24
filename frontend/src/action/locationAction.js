import fetch from 'cross-fetch';

export const TOGGLE_LOCATION = 'toggle_location';
export const toggleLocation = (title) => ({
    type: TOGGLE_LOCATION,
    title
});

export const MOVE_LOCATION = 'move_location';
export const moveLocation = (oldIndex, newIndex) => ({
    type: MOVE_LOCATION,
    oldIndex,
    newIndex
});

export const UPDATE_CENTER = 'update_center';
export const updateCenter = (center) => ({
    type: UPDATE_CENTER,
    center
});

const locaitons = [
    {
        "location": {
            "lat": 34.07803579999999,
            "lng": -118.4740954
        },
        "name": "The Getty",
        "formatted_address": "1200 Getty Center Dr, Los Angeles, CA 90049",
        "types": [
            "museum",
            "point_of_interest",
            "establishment"
        ],
        "place_id": "ChIJbzYnQte8woARJaqqFVpKeNo",
        "photos": "https://www.googleapis.com/download/storage/v1/b/poi-image/o/ChIJbzYnQte8woARJaqqFVpKeNo?generation=1557845372533405\u0026alt=media",
        "rating": 4.8
    },
    {
        "location": {
            "lat": 34.1184341,
            "lng": -118.3003935
        },
        "name": "Griffith Observatory",
        "formatted_address": "2800 E Observatory Rd, Los Angeles, CA 90027",
        "types": [
            "museum",
            "point_of_interest",
            "establishment"
        ],
        "place_id": "ChIJywjU6WG_woAR3NrWwrEH_3M",
        "photos": "https://www.googleapis.com/download/storage/v1/b/poi-image/o/ChIJywjU6WG_woAR3NrWwrEH_3M?generation=1557845373927052\u0026alt=media",
        "rating": 4.7
    },
    {
        "location": {
            "lat": 34.13811680000001,
            "lng": -118.3533783
        },
        "name": "Universal Studios Hollywood",
        "formatted_address": "100 Universal City Plaza, Universal City, CA 91608",
        "types": [
            "amusement_park",
            "point_of_interest",
            "establishment"
        ],
        "place_id": "ChIJzzgyJU--woARcZqceSdQ3dM",
        "photos": "https://www.googleapis.com/download/storage/v1/b/poi-image/o/ChIJzzgyJU--woARcZqceSdQ3dM?generation=1557845375613050\u0026alt=media",
        "rating": 4.6
    },
    {
        "location": {
            "lat": 34.062348,
            "lng": -118.3611336
        },
        "name": "Petersen Automotive Museum",
        "formatted_address": "6060 Wilshire Blvd, Los Angeles, CA 90036",
        "types": [
            "museum",
            "point_of_interest",
            "establishment"
        ],
        "place_id": "ChIJaRbaXjy5woARERNJSyktTog",
        "photos": "https://www.googleapis.com/download/storage/v1/b/poi-image/o/ChIJaRbaXjy5woARERNJSyktTog?generation=1557845377127648\u0026alt=media",
        "rating": 4.7
    },
    {
        "location": {
            "lat": 33.7422615,
            "lng": -118.2772823
        },
        "name": "Battleship USS Iowa Museum",
        "formatted_address": "250 S Harbor Blvd, Los Angeles, CA 90731",
        "types": [
            "museum",
            "point_of_interest",
            "establishment"
        ],
        "place_id": "ChIJdZbSPDg23YAR6yR-akC2g4E",
        "photos": "https://www.googleapis.com/download/storage/v1/b/poi-image/o/ChIJdZbSPDg23YAR6yR-akC2g4E?generation=1557845378842840\u0026alt=media",
        "rating": 4.7
    },
    {
        "location": {
            "lat": 34.0543359,
            "lng": -118.250325
        },
        "name": "The Broad",
        "formatted_address": "221 S Grand Ave, Los Angeles, CA 90012",
        "types": [
            "art_gallery",
            "museum",
            "point_of_interest",
            "establishment"
        ],
        "place_id": "ChIJXaYsEk3GwoARvx7RKBUE8Zg",
        "photos": "https://www.googleapis.com/download/storage/v1/b/poi-image/o/ChIJXaYsEk3GwoARvx7RKBUE8Zg?generation=1557845380368273\u0026alt=media",
        "rating": 4.6
    },
    {
        "location": {
            "lat": 34.0430175,
            "lng": -118.2672541
        },
        "name": "STAPLES Center",
        "formatted_address": "1111 S Figueroa St, Los Angeles, CA 90015",
        "types": [
            "stadium",
            "point_of_interest",
            "establishment"
        ],
        "place_id": "ChIJkyrqXbjHwoAR1bJ76zx89B8",
        "photos": "https://www.googleapis.com/download/storage/v1/b/poi-image/o/ChIJkyrqXbjHwoAR1bJ76zx89B8?generation=1557845395105449\u0026alt=media",
        "rating": 4.7
    },
    {
        "location": {
            "lat": 34.0720919,
            "lng": -118.3578454
        },
        "name": "The Grove",
        "formatted_address": "189 The Grove Dr, Los Angeles, CA 90036",
        "types": [
            "shopping_mall",
            "point_of_interest",
            "establishment"
        ],
        "place_id": "ChIJwwPTwi-5woARbtuI_49vkMM",
        "photos": "https://www.googleapis.com/download/storage/v1/b/poi-image/o/ChIJwwPTwi-5woARbtuI_49vkMM?generation=1557845397436575\u0026alt=media",
        "rating": 4.6
    },
    {
        "location": {
            "lat": 34.13655440000001,
            "lng": -118.2942
        },
        "name": "Griffith Park",
        "formatted_address": "4730 Crystal Springs Dr, Los Angeles, CA 90027",
        "types": [
            "park",
            "point_of_interest",
            "establishment"
        ],
        "place_id": "ChIJ9590IY3AwoARquS6ie60MUc",
        "photos": "https://www.googleapis.com/download/storage/v1/b/poi-image/o/ChIJ9590IY3AwoARquS6ie60MUc?generation=1557845398863929\u0026alt=media",
        "rating": 4.7
    },
    {
        "location": {
            "lat": 34.0639323,
            "lng": -118.3592293
        },
        "name": "Los Angeles County Museum of Art",
        "formatted_address": "5905 Wilshire Blvd, Los Angeles, CA 90036",
        "types": [
            "art_gallery",
            "museum",
            "point_of_interest",
            "establishment"
        ],
        "place_id": "ChIJsXqcyjy5woARNz6sOh0ZmwA",
        "photos": "https://www.googleapis.com/download/storage/v1/b/poi-image/o/ChIJsXqcyjy5woARNz6sOh0ZmwA?generation=1557845400538732\u0026alt=media",
        "rating": 4.6
    },
    {
        "location": {
            "lat": 34.0553454,
            "lng": -118.249845
        },
        "name": "Walt Disney Concert Hall",
        "formatted_address": "111 S Grand Ave, Los Angeles, CA 90012",
        "types": [
            "point_of_interest",
            "establishment"
        ],
        "place_id": "ChIJ0xG7n03GwoARsDH_OyyMcrM",
        "photos": "https://www.googleapis.com/download/storage/v1/b/poi-image/o/ChIJ0xG7n03GwoARsDH_OyyMcrM?generation=1557845402334794\u0026alt=media",
        "rating": 4.7
    },
    {
        "location": {
            "lat": 34.0638079,
            "lng": -118.3554338
        },
        "name": "The La Brea Tar Pits and Museum",
        "formatted_address": "5801 Wilshire Blvd, Los Angeles, CA 90036",
        "types": [
            "museum",
            "point_of_interest",
            "establishment"
        ],
        "place_id": "ChIJ_yD1_SK5woARmWLyCit3znQ",
        "photos": "https://www.googleapis.com/download/storage/v1/b/poi-image/o/ChIJ_yD1_SK5woARmWLyCit3znQ?generation=1557845404060681\u0026alt=media",
        "rating": 4.5
    },
    {
        "location": {
            "lat": 34.1052437,
            "lng": -118.3489574
        },
        "name": "Runyon Canyon Park",
        "formatted_address": "2000 N Fuller Ave, Los Angeles, CA 90046",
        "types": [
            "park",
            "point_of_interest",
            "establishment"
        ],
        "place_id": "ChIJhX1uVuC-woARQNzq4-b1Prk",
        "photos": "https://www.googleapis.com/download/storage/v1/b/poi-image/o/ChIJhX1uVuC-woARQNzq4-b1Prk?generation=1557845405617893\u0026alt=media",
        "rating": 4.7
    },
    {
        "location": {
            "lat": 33.9835027,
            "lng": -118.4676805
        },
        "name": "Venice Canals",
        "formatted_address": "Venice, CA 90292",
        "types": [
            "point_of_interest",
            "establishment"
        ],
        "place_id": "ChIJiXJav6K6woARGPmX6Bsp55Y",
        "photos": "https://www.googleapis.com/download/storage/v1/b/poi-image/o/ChIJiXJav6K6woARGPmX6Bsp55Y?generation=1557845407113818\u0026alt=media",
        "rating": 4.6
    },
    {
        "location": {
            "lat": 34.0169567,
            "lng": -118.2887703
        },
        "name": "Natural History Museum of Los Angeles County (NHM)",
        "formatted_address": "900 W Exposition Blvd, Los Angeles, CA 90007",
        "types": [
            "museum",
            "point_of_interest",
            "establishment"
        ],
        "place_id": "ChIJXzARBf3HwoARJyT7uZSV-G4",
        "photos": "https://www.googleapis.com/download/storage/v1/b/poi-image/o/ChIJXzARBf3HwoARJyT7uZSV-G4?generation=1557845409021816\u0026alt=media",
        "rating": 4.7
    },
    {
        "location": {
            "lat": 34.056219,
            "lng": -118.2365021
        },
        "name": "Union Station",
        "formatted_address": "800 N Alameda St, Los Angeles, CA 90012",
        "types": [
            "transit_station",
            "train_station",
            "bus_station",
            "point_of_interest",
            "establishment"
        ],
        "place_id": "ChIJS7ytYEHGwoARaSWuQfUXclI",
        "photos": "https://www.googleapis.com/download/storage/v1/b/poi-image/o/ChIJS7ytYEHGwoARaSWuQfUXclI?generation=1557845410820299\u0026alt=media",
        "rating": 4.4
    },
    {
        "location": {
            "lat": 34.3073793,
            "lng": -118.4639652
        },
        "name": "Nethercutt Museum",
        "formatted_address": "15151 Bledsoe St, Sylmar, CA 91342",
        "types": [
            "museum",
            "point_of_interest",
            "establishment"
        ],
        "place_id": "ChIJlehVkOePwoARqzbpoXY0BSA",
        "photos": "https://www.googleapis.com/download/storage/v1/b/poi-image/o/ChIJlehVkOePwoARqzbpoXY0BSA?generation=1557845413092373\u0026alt=media",
        "rating": 4.9
    },
    {
        "location": {
            "lat": 34.1017225,
            "lng": -118.3415065
        },
        "name": "Madame Tussauds Hollywood",
        "formatted_address": "6933 Hollywood Blvd, Hollywood, CA 90028",
        "types": [
            "point_of_interest",
            "establishment"
        ],
        "place_id": "ChIJlaOcbiG_woARZMl0UJaNYAc",
        "photos": "https://www.googleapis.com/download/storage/v1/b/poi-image/o/ChIJlaOcbiG_woARZMl0UJaNYAc?generation=1557845415325660\u0026alt=media",
        "rating": 4.5
    },
    {
        "location": {
            "lat": 34.0059656,
            "lng": -118.1525136
        },
        "name": "Citadel Outlets",
        "formatted_address": "100 Citadel Dr, Commerce, CA 90040",
        "types": [
            "shopping_mall",
            "point_of_interest",
            "establishment"
        ],
        "place_id": "ChIJVVWVWVPOwoAR2DYSu7-_cks",
        "photos": "https://www.googleapis.com/download/storage/v1/b/poi-image/o/ChIJVVWVWVPOwoAR2DYSu7-_cks?generation=1557845416794335\u0026alt=media",
        "rating": 4.5
    },
    {
        "location": {
            "lat": 34.073851,
            "lng": -118.2399583
        },
        "name": "Dodger Stadium",
        "formatted_address": "1000 Vin Scully Ave, Los Angeles, CA 90012",
        "types": [
            "stadium",
            "point_of_interest",
            "establishment"
        ],
        "place_id": "ChIJdVYAVPnGwoAR3wmcg09VlJ4",
        "photos": "https://www.googleapis.com/download/storage/v1/b/poi-image/o/ChIJdVYAVPnGwoAR3wmcg09VlJ4?generation=1557845418398474\u0026alt=media",
        "rating": 4.7
    },
    {
        "location": {
            "lat": 34.1341151,
            "lng": -118.3215482
        },
        "name": "Hollywood Sign",
        "formatted_address": "Los Angeles, CA 90068",
        "types": [
            "point_of_interest",
            "establishment"
        ],
        "place_id": "ChIJfVpQRQq_woARQ5hwJsast6s",
        "photos": "https://www.googleapis.com/download/storage/v1/b/poi-image/o/ChIJfVpQRQq_woARQ5hwJsast6s?generation=1557845419773651\u0026alt=media",
        "rating": 4.5
    },
    {
        "location": {
            "lat": 33.938889,
            "lng": -118.504167
        },
        "name": "Santa Monica Bay",
        "formatted_address": "Santa Monica Bay, Los Angeles, CA",
        "types": [
            "natural_feature",
            "establishment"
        ],
        "place_id": "ChIJE9INgcGvwoARQ5ZcbJorwDI",
        "photos": "https://www.googleapis.com/download/storage/v1/b/poi-image/o/ChIJE9INgcGvwoARQ5ZcbJorwDI?generation=1557845421191223\u0026alt=media",
        "rating": 3.8
    },
    {
        "location": {
            "lat": 34.13620900000001,
            "lng": -118.3513893
        },
        "name": "Universal CityWalk",
        "formatted_address": "100 Universal City Plaza, Universal City, CA 91608",
        "types": [
            "shopping_mall",
            "point_of_interest",
            "establishment"
        ],
        "place_id": "ChIJdzBcVka-woARXKXAmSS8NW4",
        "photos": "https://www.googleapis.com/download/storage/v1/b/poi-image/o/ChIJdzBcVka-woARXKXAmSS8NW4?generation=1557845422559653\u0026alt=media",
        "rating": 4.6
    },
    {
        "location": {
            "lat": 34.068921,
            "lng": -118.4451811
        },
        "name": "University of California, Los Angeles",
        "formatted_address": "Los Angeles, CA 90095",
        "types": [
            "university",
            "point_of_interest",
            "establishment"
        ],
        "place_id": "ChIJZQ9c8IW8woARN0gTXFiTqSU",
        "photos": "https://www.googleapis.com/download/storage/v1/b/poi-image/o/ChIJZQ9c8IW8woARN0gTXFiTqSU?generation=1557845424507689\u0026alt=media",
        "rating": 4.5
    },
    {
        "location": {
            "lat": 34.127035,
            "lng": -118.325934
        },
        "name": "Lake Hollywood Park",
        "formatted_address": "3160 Canyon Lake Dr, Los Angeles, CA 90068",
        "types": [
            "park",
            "point_of_interest",
            "establishment"
        ],
        "place_id": "ChIJ8WEBogu_woARkm3kmcbEiLc",
        "photos": "https://www.googleapis.com/download/storage/v1/b/poi-image/o/ChIJ8WEBogu_woARkm3kmcbEiLc?generation=1557845426247177\u0026alt=media",
        "rating": 4.6
    },
    {
        "location": {
            "lat": 34.1020096,
            "lng": -118.3257889
        },
        "name": "Hollywood Pantages Theatre",
        "formatted_address": "6233 Hollywood Blvd, Los Angeles, CA 90028",
        "types": [
            "point_of_interest",
            "establishment"
        ],
        "place_id": "ChIJAye4Ajm_woARztbwsoUDFug",
        "photos": "https://www.googleapis.com/download/storage/v1/b/poi-image/o/ChIJAye4Ajm_woARztbwsoUDFug?generation=1557845428417196\u0026alt=media",
        "rating": 4.8
    },
    {
        "location": {
            "lat": 33.9899135,
            "lng": -118.4637973
        },
        "name": "Abbot Kinney Blvd",
        "formatted_address": "Abbot Kinney Blvd, Los Angeles, CA 90291",
        "types": [
            "route"
        ],
        "place_id": "ChIJHzuO0b-6woARgRnwq-V1jJ4",
        "photos": "https://www.googleapis.com/download/storage/v1/b/poi-image/o/ChIJHzuO0b-6woARgRnwq-V1jJ4?generation=1557845429832387\u0026alt=media"
    },
    {
        "location": {
            "lat": 34.0575983,
            "lng": -118.237913
        },
        "name": "Olvera St",
        "formatted_address": "Olvera St, Los Angeles, CA 90012",
        "types": [
            "route"
        ],
        "place_id": "ChIJWa5u50TGwoARxrEHn_jpCU0",
        "photos": "https://www.googleapis.com/download/storage/v1/b/poi-image/o/ChIJWa5u50TGwoARxrEHn_jpCU0?generation=1557845431138068\u0026alt=media"
    },
    {
        "location": {
            "lat": 34.0511007,
            "lng": -118.2543879
        },
        "name": "OUE Skyspace LA",
        "formatted_address": "633 W 5th St #840, Los Angeles, CA 90071",
        "types": [
            "point_of_interest",
            "establishment"
        ],
        "place_id": "ChIJS8kiFbPHwoAR2U3en8iDAzI",
        "photos": "https://www.googleapis.com/download/storage/v1/b/poi-image/o/ChIJS8kiFbPHwoAR2U3en8iDAzI?generation=1557845432584823\u0026alt=media",
        "rating": 4.4
    },
    {
        "location": {
            "lat": 34.050544,
            "lng": -118.247843
        },
        "name": "Bradbury Building",
        "formatted_address": "304 S Broadway, Los Angeles, CA 90013",
        "types": [
            "point_of_interest",
            "establishment"
        ],
        "place_id": "ChIJBYuC8kvGwoAROxBTjwqfWpU",
        "photos": "https://www.googleapis.com/download/storage/v1/b/poi-image/o/ChIJBYuC8kvGwoAROxBTjwqfWpU?generation=1557845434058782\u0026alt=media",
        "rating": 4.5
    },
    {
        "location": {
            "lat": 37.226642,
            "lng": -121.982213
        },
        "name": "Golden Triangle Cuisine",
        "formatted_address": "217 N Santa Cruz Ave Suite A, Los Gatos, CA 95030",
        "types": [
            "restaurant",
            "point_of_interest",
            "food",
            "establishment"
        ],
        "place_id": "ChIJJau-OvA1joARa--mUqCZAho",
        "photos": "https://www.googleapis.com/download/storage/v1/b/poi-image/o/ChIJJau-OvA1joARa--mUqCZAho?generation=1557845435581508\u0026alt=media",
        "rating": 4.6
    },
    {
        "location": {
            "lat": 34.0828038,
            "lng": -118.4273734
        },
        "name": "Frederick R Weisman Art Foundation",
        "formatted_address": "265 N Carolwood Dr, Los Angeles, CA 90077",
        "types": [
            "art_gallery",
            "point_of_interest",
            "establishment"
        ],
        "place_id": "ChIJpRYFBmi8woARvb77AyPa-ug",
        "photos": "https://www.googleapis.com/download/storage/v1/b/poi-image/o/ChIJpRYFBmi8woARvb77AyPa-ug?generation=1557845437172567\u0026alt=media",
        "rating": 4.9
    },
    {
        "location": {
            "lat": 34.0801746,
            "lng": -118.3511357
        },
        "name": "Fairfax",
        "formatted_address": "Fairfax, Los Angeles, CA",
        "types": [
            "neighborhood",
            "political"
        ],
        "place_id": "ChIJnSRZhCy5woAR3nFAvlZuRDA",
        "photos": "https://www.googleapis.com/download/storage/v1/b/poi-image/o/ChIJnSRZhCy5woAR3nFAvlZuRDA?generation=1557845438645323\u0026alt=media"
    },
    {
        "location": {
            "lat": 34.1018126,
            "lng": -118.3356413
        },
        "name": "ScreenBid",
        "formatted_address": "6675 Hollywood Blvd, Los Angeles, CA 90028",
        "types": [
            "point_of_interest",
            "establishment"
        ],
        "place_id": "ChIJhVM_84-5woARE5DdsM9XJBo",
        "photos": "https://www.googleapis.com/download/storage/v1/b/poi-image/o/ChIJhVM_84-5woARE5DdsM9XJBo?generation=1557845440190633\u0026alt=media",
        "rating": 5
    },
    {
        "location": {
            "lat": 34.1445338,
            "lng": -118.0513628
        },
        "name": "Los Angeles County Arboretum",
        "formatted_address": "301 N Baldwin Ave, Arcadia, CA 91007",
        "types": [
            "parking",
            "park",
            "point_of_interest",
            "establishment"
        ],
        "place_id": "ChIJOalD_5DbwoARcH4Yl2C8xjE",
        "photos": "https://www.googleapis.com/download/storage/v1/b/poi-image/o/ChIJOalD_5DbwoARcH4Yl2C8xjE?generation=1557845442119554\u0026alt=media",
        "rating": 4.7
    },
    {
        "location": {
            "lat": 34.073001,
            "lng": -118.3992423
        },
        "name": "Beverly Hills Public Library",
        "formatted_address": "444 N Rexford Dr, Beverly Hills, CA 90210",
        "types": [
            "library",
            "point_of_interest",
            "establishment"
        ],
        "place_id": "ChIJzVW61ga8woARcyvYoRq-MW8",
        "photos": "https://www.googleapis.com/download/storage/v1/b/poi-image/o/ChIJzVW61ga8woARcyvYoRq-MW8?generation=1557845444093785\u0026alt=media",
        "rating": 4.6
    },
    {
        "location": {
            "lat": 34.0903614,
            "lng": -118.3891226
        },
        "name": "The Sunset Strip",
        "formatted_address": "9040 Sunset Blvd, West Hollywood, CA 90069",
        "types": [
            "point_of_interest",
            "establishment"
        ],
        "place_id": "ChIJ43XjCKG-woARu964Gey0l6k",
        "photos": "https://www.googleapis.com/download/storage/v1/b/poi-image/o/ChIJ43XjCKG-woARu964Gey0l6k?generation=1557845445597834\u0026alt=media",
        "rating": 3.9
    },
    {
        "location": {
            "lat": 34.2013081,
            "lng": -118.1713944
        },
        "name": "Jet Propulsion Laboratory",
        "formatted_address": "4800 Oak Grove Dr, Pasadena, CA 91109",
        "types": [
            "point_of_interest",
            "establishment"
        ],
        "place_id": "ChIJm6bVH27CwoARlkQoGj43lCg",
        "photos": "https://www.googleapis.com/download/storage/v1/b/poi-image/o/ChIJm6bVH27CwoARlkQoGj43lCg?generation=1557845447014874\u0026alt=media",
        "rating": 4.7
    },
    {
        "location": {
            "lat": 34.1497997,
            "lng": -118.3269719
        },
        "name": "Forest Lawn",
        "formatted_address": "6300 Forest Lawn Dr, Los Angeles, CA 90068",
        "types": [
            "funeral_home",
            "park",
            "point_of_interest",
            "establishment"
        ],
        "place_id": "ChIJZ9ZE6cC_woARSvoAjIvQygc",
        "photos": "https://www.googleapis.com/download/storage/v1/b/poi-image/o/ChIJZ9ZE6cC_woARSvoAjIvQygc?generation=1557845448547350\u0026alt=media",
        "rating": 4.6
    },
    {
        "location": {
            "lat": 34.194609,
            "lng": -118.102501
        },
        "name": "Eaton Canyon Falls Trail",
        "formatted_address": "Eaton Canyon Falls Trail, California 91001",
        "types": [
            "route"
        ],
        "place_id": "ChIJcVonKDDdwoARJhQBo7pj4fk",
        "photos": "https://www.googleapis.com/download/storage/v1/b/poi-image/o/ChIJcVonKDDdwoARJhQBo7pj4fk?generation=1557845449712798\u0026alt=media"
    },
    {
        "location": {
            "lat": 34.1613284,
            "lng": -118.1676462
        },
        "name": "Rose Bowl Stadium",
        "formatted_address": "1001 Rose Bowl Dr, Pasadena, CA 91103",
        "types": [
            "stadium",
            "point_of_interest",
            "establishment"
        ],
        "place_id": "ChIJkRS5KKTDwoARL78qHMf9T0w",
        "photos": "https://www.googleapis.com/download/storage/v1/b/poi-image/o/ChIJkRS5KKTDwoARL78qHMf9T0w?generation=1557845451193686\u0026alt=media",
        "rating": 4.4
    },
    {
        "location": {
            "lat": 34.1447632,
            "lng": -118.2597124
        },
        "name": "Glendale Galleria",
        "formatted_address": "100 W Broadway, Glendale, CA 91210",
        "types": [
            "shopping_mall",
            "point_of_interest",
            "establishment"
        ],
        "place_id": "ChIJldB7Af_AwoAR9JS8bg2d5EY",
        "photos": "https://www.googleapis.com/download/storage/v1/b/poi-image/o/ChIJldB7Af_AwoAR9JS8bg2d5EY?generation=1557845452701917\u0026alt=media",
        "rating": 4.5
    },
    {
        "location": {
            "lat": 37.7357721,
            "lng": -121.4261892
        },
        "name": "Grand Theatre Center for the Arts",
        "formatted_address": "715 N Central Ave, Tracy, CA 95376",
        "types": [
            "art_gallery",
            "point_of_interest",
            "establishment"
        ],
        "place_id": "ChIJvQVOIiM9kIARXxWdp7a2w2o",
        "photos": "https://www.googleapis.com/download/storage/v1/b/poi-image/o/ChIJvQVOIiM9kIARXxWdp7a2w2o?generation=1557845454567237\u0026alt=media",
        "rating": 4.7
    },
    {
        "location": {
            "lat": 34.0951017,
            "lng": -118.3744552
        },
        "name": "Piazza Del Sol",
        "formatted_address": "8439 Sunset Blvd, West Hollywood, CA 90069",
        "types": [
            "lodging",
            "point_of_interest",
            "establishment"
        ],
        "place_id": "ChIJHX8obL6-woARCr1gSVRm9lE",
        "photos": "https://www.googleapis.com/download/storage/v1/b/poi-image/o/ChIJHX8obL6-woARCr1gSVRm9lE?generation=1557845455920101\u0026alt=media",
        "rating": 3
    },
    {
        "location": {
            "lat": 34.15191,
            "lng": -118.34575
        },
        "name": "Garry Marshall Theatre",
        "formatted_address": "4252 W Riverside Dr, Burbank, CA 91505",
        "types": [
            "point_of_interest",
            "establishment"
        ],
        "place_id": "ChIJvdTr0cy_woARdZbccV-_4YI",
        "photos": "https://www.googleapis.com/download/storage/v1/b/poi-image/o/ChIJvdTr0cy_woARdZbccV-_4YI?generation=1557845457962612\u0026alt=media",
        "rating": 4.8
    },
    {
        "location": {
            "lat": 34.0689605,
            "lng": -118.4110453
        },
        "name": "Spadena House",
        "formatted_address": "516 Walden Dr, Beverly Hills, CA 90210",
        "types": [
            "point_of_interest",
            "establishment"
        ],
        "place_id": "ChIJoZN9JQq8woARujnnG5GuBP4",
        "photos": "https://www.googleapis.com/download/storage/v1/b/poi-image/o/ChIJoZN9JQq8woARujnnG5GuBP4?generation=1557845459519914\u0026alt=media",
        "rating": 4.5
    },
    {
        "location": {
            "lat": 34.0710805,
            "lng": -118.4033085
        },
        "name": "The Paley Center for Media",
        "formatted_address": "465 N Beverly Dr, Beverly Hills, CA 90210",
        "types": [
            "museum",
            "point_of_interest",
            "establishment"
        ],
        "place_id": "ChIJ63RkoOO7woAROtjuLuSSaKY",
        "photos": "https://www.googleapis.com/download/storage/v1/b/poi-image/o/ChIJ63RkoOO7woAROtjuLuSSaKY?generation=1557845466163021\u0026alt=media",
        "rating": 4.6
    },
    {
        "location": {
            "lat": 34.1478945,
            "lng": -118.1438574
        },
        "name": "Pasadena City Hall",
        "formatted_address": "100 Garfield Ave, Pasadena, CA 91101",
        "types": [
            "city_hall",
            "local_government_office",
            "point_of_interest",
            "establishment"
        ],
        "place_id": "ChIJdx8P927DwoARjvYi0q5WAx8",
        "photos": "https://www.googleapis.com/download/storage/v1/b/poi-image/o/ChIJdx8P927DwoARjvYi0q5WAx8?generation=1557845467672545\u0026alt=media",
        "rating": 4.6
    },
    {
        "location": {
            "lat": 34.1290452,
            "lng": -118.1145242
        },
        "name": "The Huntington Library, Art Collections, and Botanical Gardens",
        "formatted_address": "1151 Oxford Rd, San Marino, CA 91108",
        "types": [
            "library",
            "art_gallery",
            "museum",
            "park",
            "point_of_interest",
            "establishment"
        ],
        "place_id": "ChIJc1xhAk3bwoARBBlfKQzXKLM",
        "photos": "https://www.googleapis.com/download/storage/v1/b/poi-image/o/ChIJc1xhAk3bwoARBBlfKQzXKLM?generation=1557845469179936\u0026alt=media",
        "rating": 4.7
    }
];

export const LOAD_LOCATIONS = 'load_locations';
export const UPDATE_LOCATIONS = 'update_locations';
export const updateLocationsByGeo = (location) => (dispatch) => {
    dispatch({type: LOAD_LOCATIONS});
    fetch(`${process.env.REACT_APP_SERVER_ADDRESS}/geo?lat=${location.lat}&lng=${location.lng}`)
        .then(res => res.json())
        .then(data => {
            dispatch({
                type: UPDATE_LOCATIONS,
                locations: data
            });
        }).catch(err => {
        console.error(err);
        dispatch({
            type: UPDATE_LOCATIONS,
            locations: locaitons
        });
    })
};
export const updateLocationsByPlaces = (places) => (dispatch) => {
    dispatch({type: LOAD_LOCATIONS});
    let city = [];
    places.forEach(place => city.push({'placeid': place}));
    fetch(`${process.env.REACT_APP_SERVER_ADDRESS}/place`, {
        method: "POST",
        body: JSON.stringify({city}),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json())
        .then(data => {
            dispatch({
                type: UPDATE_LOCATIONS,
                locations: data
            });
        }).catch(err => console.error(err))
};

export const UPDATE_ROUTE = 'update_route';
export const getRoute = (locations) => (dispatch) => {
  fetch(`${process.env.REACT_APP_SERVER_ADDRESS}/route`, {
      method: 'POST',
      body: JSON.stringify(locations.map(location=>({
              name: location.title,
              location: {
                  lat: location.lat,
                  lng: location.lng
              },
              formatted_address: location.formatted_address,
              photos: location.photos,
              rating: location.rating,
              place_id: location.place_id
          }))),
      headers: {
          'Content-Type': 'application/json'
      }
  }).then(res=>res.json())
      .then(data=>{
          dispatch({
              type: UPDATE_ROUTE,
              locations: data
          })
      }).catch(err=>console.error(err))
};

export const SET_CUR_TAB = 'set_cur_tab';
export const setCurTab = val => ({
    type: SET_CUR_TAB,
    val
});
