import {
    LOAD_LOCATIONS,
    MOVE_LOCATION,
    SET_CUR_TAB,
    TOGGLE_LOCATION,
    UPDATE_CENTER,
    UPDATE_LOCATIONS, UPDATE_ROUTE
} from "../action/locationAction";
import arrayMove from 'array-move';

export const locationReducer = (state = {
    center: {lat: 0, lng: 0},
    locations: [],
    chosenLocations: [],
    curTab: 0,
    isLoadingLocations: false
}, action) => {
    switch (action.type) {
        case TOGGLE_LOCATION:
            const indexOfChosen = state.locations.findIndex(location => location.title === action.title);
            let locations = state.locations.map(location=>
                (location.title === action.title)?{...location, chosen: !location.chosen}:location
            );
            if (!locations[indexOfChosen].chosen) {
                // toggle off
                const indexFirstNone = state.locations.findIndex(location => !location.chosen);
                locations = arrayMove(locations, indexOfChosen, indexFirstNone);
            } else {
                // toggle on
                locations = arrayMove(locations, indexOfChosen, 0);
            }
            return {
                ...state,
                locations,
                chosenLocations: locations.filter(location => location.chosen)
            };
        case MOVE_LOCATION:
            return {
                ...state,
                chosenLocations: arrayMove(state.chosenLocations, action.oldIndex, action.newIndex)
            };
        case UPDATE_CENTER:
            return {
                ...state,
                center: action.center
            };
        case LOAD_LOCATIONS:
            return {
                ...state,
                isLoadingLocations: true
            };
        case UPDATE_LOCATIONS:
            return {
                ...state,
                locations: removeDup(action.locations).map(location => ({
                    title: location.name,
                    chosen: false,
                    lat: location.location.lat,
                    lng: location.location.lng,
                    formatted_address: location.formatted_address,
                    photos: decodeURIComponent(location.photos),
                    rating: location.rating,
                    place_id: location.place_id
                })),
                isLoadingLocations: false
            };
        case UPDATE_ROUTE:
            return {
                ...state,
                chosenLocations: action.locations.map(location => ({
                    title: location.name,
                    chosen: false,
                    lat: location.location.lat,
                    lng: location.location.lng,
                    formatted_address: location.formatted_address,
                    photos: decodeURIComponent(location.photos),
                    rating: location.rating,
                    place_id: location.place_id
                }))
            };
        case SET_CUR_TAB:
            return {
                ...state,
                curTab: action.val
            };
        default:
            return state;
    }
};

function removeDup(locations) {
    let set = new Set();
    return locations.filter(location => {
        if (set.has(location.place_id))
            return false;
        else {
            set.add(location.place_id);
            return true;
        }
    })
}
