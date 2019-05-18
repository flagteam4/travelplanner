import React from 'react';
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import SearchTab from "./component/Tabs/SearchTab";
import TripPlannerTab from "./component/Tabs/TripPlannerTab";
import * as geolocator from "geolocator";
import * as PropTypes from "prop-types";
import {updateCenter, updateLocationsByGeo} from "./action/locationAction";
import {connect} from "react-redux";


function TabContainer(props) {
    return (
        <Typography component="div" style={{padding: 8 * 3}}>
            {props.children}
        </Typography>
    );
}

class App extends React.Component {
    constructor(props) {
        super(props);
        //get user current geolocation
        geolocator.config({
            language: "en",
            google: {
                version: "3",
                key: process.env.REACT_APP_GOOGLE_API_KEY
            }
        });
        let options = {
            timeout: 1000,
            maximumWait: 2000,     // max wait time for desired accuracy
            maximumAge: 0,          // disable cache
            fallbackToIP: true,     // fallback to IP if Geolocation fails or rejected
        };
        geolocator.locate(options, function (err, location) {
            if (err) return console.log(err);
            //console.log(location);
            let geolocation = {
                lat: location.coords.latitude,
                lng: location.coords.longitude
            };
            props.updateCenter(geolocation);
            props.updateLocationsByGeo(geolocation);
        });
    }

    state = {
        value: 0,
    };

    handleChange = (event, value) => {
        this.setState({value});
    };

    render() {
        const {value} = this.state;

        return (
            <div>
                <AppBar position="static">
                    <Tabs value={value} onChange={this.handleChange}>
                        <Tab label="Search Tab"/>
                        <Tab label="Trip Planner Tab"/>
                        <Tab label="Saved Trip Tab"/>
                    </Tabs>
                </AppBar>
                {value === 0 && <TabContainer><SearchTab/></TabContainer>}
                {value === 1 && <TabContainer><TripPlannerTab/></TabContainer>}
                {value === 2 && <TabContainer>Item Three</TabContainer>}
            </div>
        );
    }
}

SearchTab.propTypes = {
    updateCenter: PropTypes.func,
    updateLocationsByGeo: PropTypes.func
};

const mapDispatchToProps = (dispatch)=>({
    updateLocationsByGeo: (location) => updateLocationsByGeo(location)(dispatch),
    updateCenter: (center)=>dispatch(updateCenter(center))
});

export default connect(null, mapDispatchToProps)(App);
