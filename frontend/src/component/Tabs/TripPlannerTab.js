import React from "react";
import {compose, withProps} from "recompose";
import {withScriptjs} from "react-google-maps";
import {Button, Dialog, DialogActions, DialogContent, Grid} from "@material-ui/core";
import ChosenLocationList from "../LocationList/ChosenLocationList";
import {WrappedMap} from "../Map/WrappedMap";
import MyDirectionRender from "../Map/MyDirectionRender";
import * as PropTypes from "prop-types";
import {connect} from "react-redux";
import {saveTripPlan} from "../../tripPlanStorage";
import TextField from "@material-ui/core/es/TextField/TextField";
import {setCurTab} from "../../action/locationAction";

const WrappedContainer = compose(
    withProps({
        googleMapURL: `https://maps.googleapis.com/maps/api/js?v=3.exp&key=${process.env.REACT_APP_GOOGLE_API_KEY}&libraries=geometry,drawing,places`,
        loadingElement: <div style={{height: `100%`}}/>,
    }),
    withScriptjs
)(props =>
    <Grid container spacing={8}>
        {props.children}
    </Grid>
);

class TripPlannerTab extends React.Component {
    state = {
        open: false,
        name: ''
    };

    handleClickOpen = () => {
        this.setState({open: true, name: ''});
    };

    handleClose = () => {
        this.setState({open: false});
    };

    handleClickConfirm = () => {
        this.setState({open: false});
        saveTripPlan(this.props.user.uid, this.state.name, this.props.locations);
        this.props.setCurTab(2);
    };

    handleChange = event => {
        this.setState({name: event.target.value})
    };


    render() {
        return (
            <WrappedContainer>
                <Grid item xs={4}>
                    <Button color='secondary'
                            fullWidth variant='contained'
                            onClick={this.handleClickOpen}
                    >
                        click here to Save Trip Plan
                    </Button>
                    <Button fullWidth variant='contained'
                            onClick={() => this.props.setCurTab(0)}
                            style={{
                                color: "white",
                                backgroundColor: "#1e90ff",
                                marginTop: '5px'
                            }}
                    >
                        change mind, click here to go back!
                    </Button>
                    <ChosenLocationList/>
                </Grid>
                <Grid item xs={8}>
                    <WrappedMap zoom={12}>
                        <MyDirectionRender locations={this.props.locations}/>
                    </WrappedMap>
                </Grid>
                {this.props.user ?
                    <Dialog open={this.state.open} onClose={this.handleClose}>
                        <DialogContent>
                            <TextField
                                autoFocus
                                id='name'
                                fullWidth
                                label='Name of Trip Plan'
                                onChange={this.handleChange}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleClose} color="primary">
                                Cancel
                            </Button>
                            <Button onClick={this.handleClickConfirm} color="primary">
                                Confirm
                            </Button>
                        </DialogActions>
                    </Dialog>:
                    <Dialog open={this.state.open} onClose={this.handleClose}>
                        <DialogContent>
                            You need to login before saving!
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleClose} color='primary'>
                                Confirm
                            </Button>
                        </DialogActions>
                    </Dialog>
                }
            </WrappedContainer>
        );
    }
}

TripPlannerTab.propTypes = {
    user: PropTypes.object,
    locations: PropTypes.arrayOf(PropTypes.object),
    setCurTab: PropTypes.func
};

const mapStateToProps = state => ({
    user: state.authReducer.user,
    locations: state.locationReducer.chosenLocations
});

const mapDispatchToProps = dispatch => ({
    setCurTab: (val) => dispatch(setCurTab(val))
});

export default connect(mapStateToProps, mapDispatchToProps)(TripPlannerTab);
