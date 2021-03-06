import React from "react";
import * as PropTypes from "prop-types";
import List from "@material-ui/core/List";
import LocationItem from "./LocationItem";
import {connect} from "react-redux";
import {CircularProgress, withStyles} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";

const locationItemStyle = {
    selected: {
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        color: 'white',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    },
};
const StyledLocationItem = withStyles(locationItemStyle)(LocationItem);

class LocationList extends React.Component {
    render() {
        let count = 0;
        return (
            <List component='div' disablePadding style={{maxHeight: '100%', overflow: 'auto', height: '90vh'}}>
                {this.props.isLoadingLocations ?
                    <Grid container justify='center' alignItems='center' style={{marginTop: '10px'}}>
                        <Grid item>
                            <CircularProgress/>
                        </Grid>
                    </Grid>
                    :
                    this.props.locations.map(location =>
                        <StyledLocationItem location={location} key={count++}/>
                    )}
            </List>
        )
    }
}

LocationList.propTypes = {
    locations: PropTypes.arrayOf(PropTypes.object),
    isLoadingLocations: PropTypes.bool
};

const mapStateToProps = (state) => ({
    locations: state.locationReducer.locations,
    isLoadingLocations: state.locationReducer.isLoadingLocations
});

export default connect(mapStateToProps, null)(
    LocationList);
