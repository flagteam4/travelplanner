import React from "react";
import {compose, withProps} from "recompose";
import {withScriptjs} from "react-google-maps";
import {Grid} from "@material-ui/core";
import ChosenLocationList from "../LocationList/ChosenLocationList";
import {WrappedMap} from "../Map/WrappedMap";
import MyDirectionRender from "../Map/MyDirectionRender";

const WrappedContainer = compose(
    withProps({
        googleMapURL: `https://maps.googleapis.com/maps/api/js?v=3.exp&key=${process.env.REACT_APP_GOOGLE_API_KEY}&libraries=geometry,drawing,places`,
        loadingElement: <div style={{height: `100%`}}/>,
    }),
    withScriptjs
)(props =>
    <Grid container>
        {props.children}
    </Grid>
);

class TripPlannerTab extends React.Component {
    render() {
        return (
            <WrappedContainer>
                <Grid item xs={4}>
                    <ChosenLocationList/>
                </Grid>
                <Grid item xs={8}>
                    <WrappedMap zoom={12}>
                        <MyDirectionRender/>
                    </WrappedMap>
                </Grid>
            </WrappedContainer>
        );
    }
}

export default TripPlannerTab;
