import React from "react";
import * as PropTypes from "prop-types";
import {connect} from "react-redux";
import {db, deleteTripPlan} from "../../tripPlanStorage";
import {Button, ExpansionPanel, ExpansionPanelSummary, Grid, StepLabel, Typography} from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import DeleteIcon from '@material-ui/icons/Delete';
import withStyles from "@material-ui/core/styles/withStyles";
import {WrappedMap} from "../Map/WrappedMap";
import MyDirectionRender from "../Map/MyDirectionRender";
import {compose, withProps} from "recompose";
import {withScriptjs} from "react-google-maps";
import {setLoginDialogStatus} from "../../action/authAction";

const WrappedContainer = compose(
    withProps({
        googleMapURL: `https://maps.googleapis.com/maps/api/js?v=3.exp&key=${process.env.REACT_APP_GOOGLE_API_KEY}&libraries=geometry,drawing,places`,
        loadingElement: <div style={{height: `100%`}}/>,
    }),
    withScriptjs
)(props =>
    <div>
        {props.children}
    </div>
);

const styles = theme => ({
    rightIcon: {
        marginRight: theme.spacing.unit
    },
    button: {
        paddingRight: theme.spacing.unit,
        margin: theme.spacing.unit
    }
});

class SavedTripTab extends React.Component {
    state = {
        plans: []
    };

    componentWillMount() {
        if (!this.props.user)
            this.props.openLoginDialog();
        else
        this.readTripPlan(this.props.user.uid);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.user !== prevProps.user && this.props.user)
            this.readTripPlan(this.props.user.uid)
    }

    readTripPlan = (userName) => {
        db.collection(userName).get().then(querySnapshot => {
            let plans = [];
            querySnapshot.forEach(doc => {
                let plan = {};
                plan.name = doc.id;
                plan.locations = doc.data().locations;
                plans.push(plan);
            });
            this.setState({plans})
        });
    };

    render() {
        const {classes} = this.props;
        return (
            <WrappedContainer>
                {this.state.plans.map((plan, index) =>
                    <ExpansionPanel key={index}>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                            <Grid container alignItems='center'>
                                <Grid item>
                                    <Typography>{plan.name}</Typography>
                                </Grid>
                                <Grid item>
                                    <Button variant='contained' color='secondary' className={classes.button}
                                            onClick={() => {
                                                deleteTripPlan(this.props.user.uid, plan.name);
                                                this.readTripPlan(this.props.user.uid);
                                            }}>
                                        Delete
                                        <DeleteIcon className={classes.rightIcon}/>
                                    </Button>
                                </Grid>
                            </Grid>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <Grid container alignItems='center'>
                                <Grid item xs={3}>
                                    <Stepper orientation='vertical'>
                                        {plan.locations.map((location, index) =>
                                            <Step key={index}>
                                                <StepLabel>{location.title}</StepLabel>
                                            </Step>
                                        )}
                                    </Stepper>
                                </Grid>
                                <Grid item xs={9} style={{height: '100%'}}>
                                    <WrappedMap zoom={4}>
                                        <MyDirectionRender locations={plan.locations}/>
                                    </WrappedMap>
                                </Grid>
                            </Grid>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                )}
            </WrappedContainer>
        )
    }
}

SavedTripTab.propTypes = {
    user: PropTypes.object,
    openLoginDialog: PropTypes.func,
    classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    user: state.authReducer.user
});

const mapDispatchToProps = (dispatch) => ({
    openLoginDialog: () => dispatch(setLoginDialogStatus(true))
});

export default connect(mapStateToProps, mapDispatchToProps)(
    withStyles(styles)(SavedTripTab)
)

