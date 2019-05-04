import React from 'react';
import Grid from "@material-ui/core/Grid";
import {WrappedMap} from "./component/Map/WrappedMap";

function App() {
    return (
        <Grid container>
            <Grid item xs={8}>
                <WrappedMap/>
            </Grid>
            <Grid item xs={4}>

            </Grid>
        </Grid>
    );
}

export default App;
