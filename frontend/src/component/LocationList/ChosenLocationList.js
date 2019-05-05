import React from "react";
import * as PropTypes from "prop-types";
import {SortableContainer, SortableElement} from "react-sortable-hoc";
import LocationItem from "./LocationItem";
import List from "@material-ui/core/List";
import {connect} from "react-redux";
import {moveLocation} from "../../action/locationAction";
import {ListItem, ListItemText} from "@material-ui/core";
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from "@material-ui/core/Collapse";

const SortableItem = SortableElement(({location}) => <LocationItem location={location}/>);
SortableItem.propTypes = {
    location: PropTypes.object.isRequired
};

const ListContainer = SortableContainer(({children}) =>
    <List component='nav'>
        {children}
    </List>
);

class ChosenLocationList extends React.Component {
    state = {
        open: true
    };

    toggleList = () => {
        this.setState(state => ({open: !state.open}))
    };

    render() {
        let {locations, onSortEnd} = this.props;
        return (
            <List component='nav'>
                <ListItem button onClick={this.toggleList}>
                    <ListItemText inset primary='Chosen Locations'/>
                    {this.state.open ? <ExpandLess/> : <ExpandMore/>}
                </ListItem>
                <Collapse in={this.state.open} timeout='auto' unmountOnExit>
                    <ListContainer onSortEnd={onSortEnd}>
                        {locations.map((location, index) =>
                            <SortableItem
                                key={`city-${index}`}
                                index={index}
                                location={location}
                            />
                        )}
                    </ListContainer>
                </Collapse>
            </List>
        )
    }
}

ChosenLocationList.propTypes = {
    locations: PropTypes.arrayOf(PropTypes.object),
    onSortEnd: PropTypes.func
};

const mapDispatchToProps = (dispatch) => ({
    onSortEnd: ({oldIndex, newIndex}) => dispatch(moveLocation(oldIndex, newIndex))
});

const mapStateToProps = (state) => ({
    locations: state.locationReducer.chosenLocations
});

export default connect(mapStateToProps, mapDispatchToProps)(
    ChosenLocationList
);
