import React from "react";
import * as PropTypes from "prop-types";
import {CardContent, CardMedia, ListItem} from "@material-ui/core";
import {toggleLocation} from "../../action/locationAction";
import {connect} from "react-redux";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import StarRatings from "react-star-ratings";


const styles = theme => ({
    selected: {},
    card: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between'
    },
    cover: {
        maxWidth: 150,
        width: 150
    }
});

class LocationItem extends React.Component {
    render() {
        let {classes} = this.props;
        let {title, chosen, formatted_address, photos, rating} = this.props.location;
        return (
            <ListItem button
                      onClick={() => this.props.onClick(title)}
                      selected={chosen}
                      classes={{selected: classes.selected}}
            >
                <Card className={classes.card}>
                    <CardContent className={classes.content}>
                        <Typography
                            component='h5'
                            style={{
                                fontSize: '1.5em'
                            }}
                            variant='h5'>
                            {title}
                        </Typography>
                        <StarRatings
                            rating={rating}
                            starRatedColor='blue'
                            starDimension='15px'
                            starSpacing='2px'
                        />
                        <Typography variant='subtitle1' color={"textSecondary"}>
                            {formatted_address}
                        </Typography>
                    </CardContent>
                    <CardMedia
                        className={classes.cover}
                        image={photos}
                        title={title}
                    />
                </Card>
            </ListItem>
        )
    }
}

LocationItem.propTypes = {
    classes: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
    onClick: (title) => dispatch(toggleLocation(title))
});

export default connect(null, mapDispatchToProps)(
    withStyles(styles)(LocationItem)
);
