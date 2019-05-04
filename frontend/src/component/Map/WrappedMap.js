import {compose, withProps} from "recompose";
import {GoogleMap, withGoogleMap, withScriptjs} from "react-google-maps";
import React from "react";

export const WrappedMap = compose(
    withProps({
        googleMapURL: `https://maps.googleapis.com/maps/api/js?v=3.exp&key=${process.env.REACT_APP_GOOGLE_API_KEY}&libraries=geometry,drawing,places`,
        loadingElement: <div style={{height: `100%`}}/>,
        containerElement: <div style={{height: `100%`}}/>,
        mapElement: <div style={{height: `100%`}}/>,
    }),
    withScriptjs,
    withGoogleMap
)(() =>
    <GoogleMap
        defaultZoom={8}
        defaultCenter={{lat: 34.0522, lng: -118.2437}}
    >
    </GoogleMap>
);
