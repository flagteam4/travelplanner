import React from 'react';
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import SearchTab from "./component/Tabs/SearchTab";
import TripPlannerTab from "./component/Tabs/TripPlannerTab";
import * as geolocator from "geolocator";
import * as PropTypes from "prop-types";
import {setCurTab, updateCenter, updateLocationsByGeo} from "./action/locationAction";
import {connect} from "react-redux";
import {changeUser} from "./action/authAction";
import LoginButton from "./component/Auth/LoginButton";
import {Grid} from "@material-ui/core";
import LoginDialog from "./component/Auth/LoginDialog";
import {firebaseApp} from "./config/Fire";
import SavedTripTab from "./component/Tabs/SavedTripTab";
import banner from './asset/images/Trip Planner.png';


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
        this.authListener();
    }

    handleChange = (event, value) => {
        this.props.setCurTab(value);
    };


    authListener = () => {
        firebaseApp.auth().onAuthStateChanged((user) => {
            //console.log(user);
            if (user) {
                this.props.changeUser(user);
            } else {
                this.props.changeUser(null);
            }
        });
    };

    render() {
        const {curTab} = this.props;

        return (
            <div>
                <img alt='trip planner title' src={banner} style={{
                    width: '100%',
                    height: '200px'
                }}/>
                <AppBar position="static" style={{marginTop: '-4px'}}>
                    <Grid container alignItems='center' justify='space-between'>
                        <Grid item xs={8}>
                            <Tabs value={curTab} onChange={this.handleChange}>
                                <Tab label="Search Tab"/>
                                <Tab label="Trip Planner Tab"/>
                                <Tab label="Saved Trip Tab"/>
                            </Tabs>
                        </Grid>
                        <Grid item xs={4}>
                            <LoginButton/>
                        </Grid>
                    </Grid>
                </AppBar>
                {curTab === 0 && <TabContainer><SearchTab/></TabContainer>}
                {curTab === 1 && <TabContainer><TripPlannerTab/></TabContainer>}
                {curTab === 2 && <TabContainer><SavedTripTab/></TabContainer>}
                <LoginDialog/>
            </div>
        );
    }
}

SearchTab.propTypes = {
    updateCenter: PropTypes.func,
    updateLocationsByGeo: PropTypes.func,
    user: PropTypes.object,
    changeUser: PropTypes.func,
    curTab: PropTypes.number,
    setCurTab: PropTypes.func
};

const mapStateToProps = (state) => ({
    user: state.authReducer.user,
    curTab: state.locationReducer.curTab
});

const mapDispatchToProps = (dispatch) => ({
    updateLocationsByGeo: (location) => updateLocationsByGeo(location)(dispatch),
    updateCenter: (center) => dispatch(updateCenter(center)),
    changeUser: (user) => dispatch(changeUser(user)),
    setCurTab: (val) => dispatch(setCurTab(val))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
