import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {Marker} from "react-google-maps";

class Markers extends React.Component {
   render() {
       return(
          <div>
              {this.props.locations.map(location=>
                <Marker
                    key={location.title}
                    position={{lat: location.lat, lng:location.lng}}/>
              )}
          </div>
       );
   }
}

Markers.propTypes = {
    locations: PropTypes.array
};

const mapPropsToState = (state) => ({
    locations: state.locationReducer.locations.filter(location=>location.chosen)
});

export default connect(mapPropsToState, null)(Markers);

