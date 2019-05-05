import React from "react";
import PropTypes from "prop-types";
import List from "@material-ui/core/List";
import {ListItem, ListItemText} from "@material-ui/core";
import Collapse from "@material-ui/core/Collapse";
import LocationItem from "./LocationItem";
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import {connect} from "react-redux";

class LocationList extends React.Component {
    state = {
        open: true
    };

    toggleList = () => {
        this.setState(state => ({open: !state.open}))
    };

    render() {
        return (
            <List component='nav'>
                <ListItem button onClick={this.toggleList}>
                    <ListItemText inset primary='Locations'/>
                    {this.state.open ? <ExpandLess/> : <ExpandMore/>}
                </ListItem>
                <Collapse in={this.state.open} timeout='auto' unmountOnExit>
                    <List component='div' disablePadding>
                        {this.props.locations.map(location =>
                            <LocationItem location={location} key={location.title}/>
                        )}
                    </List>
                </Collapse>
            </List>
        )
    }
}

LocationList.propTypes = {
    locations: PropTypes.arrayOf(PropTypes.object)
};

const mapStateToProps = (state) => ({
    locations: state.locationReducer.locations
});

export default connect(mapStateToProps, null)(LocationList);
