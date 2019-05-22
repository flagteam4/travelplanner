import React from "react";
import * as PropTypes from "prop-types";
import {SortableContainer, SortableElement} from "react-sortable-hoc";
import LocationItem from "./LocationItem";
import List from "@material-ui/core/List";
import {connect} from "react-redux";
import {moveLocation} from "../../action/locationAction";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";

const ALPHABET = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];


const SortableItem = SortableElement(
    ({location, index}) =>
        <Grid container alignItems='center'>
            <Grid item xs={1}>
                <Avatar style={{backgroundColor: 'red'}}>{ALPHABET[index]}</Avatar>
            </Grid>
            <Grid item xs={11}>
                <LocationItem location={location}/>
            </Grid>
        </Grid>
);
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
