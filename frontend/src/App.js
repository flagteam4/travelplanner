import React from 'react';
import Grid from "@material-ui/core/Grid";
import {WrappedMap} from "./component/Map/WrappedMap";
import LocationList from "./component/LocationList/LocationList";
import ChosenLocationList from "./component/LocationList/ChosenLocationList";

function App() {
    return (
        <Grid container>
            <Grid item xs={8}>
                <WrappedMap/>
            </Grid>
            <Grid item xs={4}>
                <ChosenLocationList/>
                <LocationList/>
            </Grid>
        </Grid>
    );
}

export default App;
