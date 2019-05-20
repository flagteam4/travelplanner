import {MOVE_LOCATION, SET_CUR_TAB, TOGGLE_LOCATION, UPDATE_CENTER, UPDATE_LOCATIONS} from "../action/locationAction";
import arrayMove from 'array-move';

export const locationReducer = (state = {
    center: {lat: 0, lng: 0},
    locations: [],
    chosenLocations: [],
    curTab: 0
}, action) => {
    switch (action.type) {
        case TOGGLE_LOCATION:
            const locations = state.locations.map(location => {
                if (location.title === action.title)
                    return {...location, chosen: !location.chosen};
                else return location;
            });
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
        case UPDATE_LOCATIONS:
            return {
                ...state,
                locations: removeDup(action.locations).map(location=>({
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
