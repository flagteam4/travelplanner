import React from "react";
import * as PropTypes from "prop-types";
import {SortableContainer, SortableElement} from "react-sortable-hoc";
import LocationItem from "./LocationItem";
import List from "@material-ui/core/List";
import {connect} from "react-redux";
import {moveLocation} from "../../action/locationAction";

const SortableItem = SortableElement(({location}) => <LocationItem location={location}/>);
SortableItem.propTypes = {
    location: PropTypes.object.isRequired
};

const ListContainer = SortableContainer(({children}) =>
    <List
        component='nav'
        style={{
            height: '90vh',
            overflow: 'auto'
        }}
    >
        {children}
    </List>
);

class ChosenLocationList extends React.Component {
    render() {
        let {locations, onSortEnd} = this.props;
        return (
            <ListContainer onSortEnd={onSortEnd}>
                {locations.map((location, index) =>
                    <SortableItem
                        key={`city-${index}`}
                        index={index}
                        location={location}
                    />
                )}
            </ListContainer>
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
