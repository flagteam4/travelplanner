import {MOVE_LOCATION, TOGGLE_LOCATION} from "../action/locationAction";
import arrayMove from 'array-move';

export const locationReducer = (state = {
    locations: [
        {title: 'Los Angeles', status: false, lat: 34.0522, lng: -118.2437},
        {title: 'Santa Monica', status: false, lat: 34.0093515, lng: -118.49746820000001},
        {title: 'Hollywood', status: false, lat: 34.0928, lng: -118.3287}
    ],
    chosenLocations: []
}, action) => {
    switch (action.type) {
        case TOGGLE_LOCATION:
            const locations = state.locations.map(location => {
                if (location.title === action.title)
                    return {...location, status: !location.status};
                else return location;
            });
            return {
                ...state,
                locations,
                chosenLocations: locations.filter(location => location.status)
            };
        case MOVE_LOCATION:
            return {
                ...state,
                chosenLocations: arrayMove(state.chosenLocations, action.oldIndex, action.newIndex)
            };
        default:
            return state;
    }
};
