import {compose, withProps} from "recompose";
import {GoogleMap, withGoogleMap} from "react-google-maps";
import React from "react";
import * as PropTypes from "prop-types";
import {connect} from "react-redux";

const mapStateToProps = (state) => ({
    center: state.locationReducer.center
});

export const WrappedMap = compose(
    withProps({
        containerElement: <div style={{height: `100%`}}/>,
        mapElement: <div style={{height: `100%`}}/>,
    }),
    withGoogleMap,
    connect(mapStateToProps, null)
)(props =>
    <GoogleMap
        defaultZoom={props.zoom}
        center={props.center}
    >
        {props.children}
    </GoogleMap>
);

WrappedMap.propTypes = {
    zoom: PropTypes.number.isRequired,
    center: PropTypes.object,
};

