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
        this.readTripPlan(this.props.user.uid);
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
            <div>
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
                            <Stepper orientation='vertical'>
                                {plan.locations.map((location, index) =>
                                    <Step key={index}>
                                        <StepLabel>{location.title}</StepLabel>
                                    </Step>
                                )}
                            </Stepper>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                )}
            </div>
        )
    }
}

SavedTripTab.propTypes = {
    user: PropTypes.object,
    classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    user: state.authReducer.user
});

export default connect(mapStateToProps, null)(
    withStyles(styles)(SavedTripTab)
)

