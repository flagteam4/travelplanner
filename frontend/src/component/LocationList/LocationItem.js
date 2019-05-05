import React from "react";
import * as PropTypes from "prop-types";
import {ListItem} from "@material-ui/core";
import {toggleLocation} from "../../action/locationAction";
import {connect} from "react-redux";

class LocationItem extends React.Component {
    render() {
        let {title} = this.props.location;
        return (
            <ListItem button onClick={()=>this.props.onClick(title)}>
                <p>{title}</p>
            </ListItem>
        )
    }
}

LocationItem.propTypes = {
    location: PropTypes.shape({
        title: PropTypes.string
    }).isRequired,
    onClick: PropTypes.func.isRequired
};

const mapDispatchToProps = (dispatch) => ({
    onClick: (title) => dispatch(toggleLocation(title))
});

export default connect(null, mapDispatchToProps)(LocationItem);
