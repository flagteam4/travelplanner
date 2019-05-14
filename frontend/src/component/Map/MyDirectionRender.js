/* eslint-disable no-undef */
import React from "react";
import {DirectionsRenderer} from "react-google-maps";
import PropTypes from "prop-types";
import {connect} from "react-redux";

class MyDirectionRender extends React.Component {
    constructor(props) {
        super(props);
        this.DirectionsService = new google.maps.DirectionsService();
        this.state = {
            directions: null
        }
        this.updateDirections(this.props.locations);
    }

    mapObjToGoogleLocation(obj) {
        return new google.maps.LatLng(obj.lat, obj.lng);
    }

    componentWillReceiveProps(nextProps, nextContext) {
        const {locations} = nextProps;
        this.updateDirections(locations);
    }

    updateDirections = (locations)=>{
        if (locations.length < 2) {
            this.setState({
                directions: null
            })
        } else {
            const origin = locations[0];
            const dest = locations[locations.length - 1];
            const waypoints = locations.slice(1, locations.length - 1);

            let routeQuerry = {
                origin: this.mapObjToGoogleLocation(origin),
                destination: this.mapObjToGoogleLocation(dest),
                travelMode: google.maps.TravelMode.DRIVING
            };
            if (waypoints)
                routeQuerry.waypoints = waypoints.map(location => ({
                    location: this.mapObjToGoogleLocation(location)
                }));

            this.DirectionsService.route(routeQuerry, (result, status) => {
                if (status === google.maps.DirectionsStatus.OK) {
                    this.setState({
                        directions: result,
                    });
                } else {
                    console.error(`error fetching directions ${result}`);
                }
            });
        }
    };

    render() {
        return (
            <div>
                {this.state.directions && <DirectionsRenderer directions={this.state.directions}/>}
            </div>
        )
    }
}

MyDirectionRender.propTypes = {
    locations: PropTypes.arrayOf(PropTypes.object)
};

const mapStateToProps = (state) => ({
    locations: state.locationReducer.chosenLocations
});

export default connect(mapStateToProps, null)(MyDirectionRender);
