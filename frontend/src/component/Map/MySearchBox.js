/* eslint-disable no-undef */
import React from "react";
import * as PropTypes from "prop-types";
import StandaloneSearchBox from "react-google-maps/lib/components/places/StandaloneSearchBox";
import {updateCenter, updateLocations} from "../../action/locationAction";
import {connect} from "react-redux";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from '@material-ui/icons/Search';

class MySearchBox extends React.Component {
    constructor(props) {
        super(props);
        this.searchbox = null;
    }

    onSearchBoxMounted = ref => {
        this.searchbox = ref;
    };

    onPlacesChanged = () => {
        const places = this.searchbox.getPlaces();
        if (places.length > 0) {
            const geometry = places[0].geometry;
            const newCenter = geometry.location.toJSON();
            this.props.updateCenter(newCenter);
            this.props.updateLocations();
        }
    };

    render() {
        return (
            <StandaloneSearchBox
                ref={this.onSearchBoxMounted}
                onPlacesChanged={this.onPlacesChanged}
            >
                <Paper elevation={1}>
                    <InputBase
                        style={{
                            width: '70%',
                            marginLeft: '10%'
                        }                    }
                        placeholder="Search Google Maps"
                    />
                    <IconButton>
                        <SearchIcon/>
                    </IconButton>
                </Paper>
            </StandaloneSearchBox>
        );
    }
}

MySearchBox.propTypes = {
    updateCenter: PropTypes.func,
    updateLocations: PropTypes.func
};

const mapDispatchToProps = (dispatch) => ({
    updateCenter: (center) => dispatch(updateCenter(center)),
    updateLocations: () => dispatch(updateLocations())
});

export default connect(null, mapDispatchToProps)(MySearchBox);
