import React from "react";
import {Grid} from "@material-ui/core";
import LocationList from "../LocationList/LocationList";
import {WrappedMap} from "../Map/WrappedMap";
import Markers from "../Map/Markers";
import {compose, withProps} from "recompose";
import {withScriptjs} from "react-google-maps";
import MySearchBox from "../Map/MySearchBox";

const WrappedContainer = compose(
    withProps({
        googleMapURL: `https://maps.googleapis.com/maps/api/js?v=3.exp&key=${process.env.REACT_APP_GOOGLE_API_KEY}&libraries=geometry,drawing,places`,
        loadingElement: <div style={{height: `100%`}}/>,
    }),
    withScriptjs
)(props =>
    <Grid container spacing={8}>
        {props.children}
    </Grid>
);

class SearchTab extends React.Component {
    render() {
        return (
            <WrappedContainer>
                <Grid item xs={4}>
                    <MySearchBox/>
                    <LocationList/>
                </Grid>
                <Grid item xs={8}>
                    <WrappedMap zoom={12}>
                        <Markers/>
                    </WrappedMap>
                </Grid>
            </WrappedContainer>
        );
    }
}

export default SearchTab;
