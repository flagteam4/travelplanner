import React from "react";
import * as PropTypes from 'prop-types'
import {connect} from "react-redux";
import {Button, Typography} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import {fireApp} from "../../config/Fire";
import {setLoginDialogStatus} from "../../action/authAction";

class LoginButton extends React.Component {
    logout = ()=>{
        fireApp.auth().signOut();
    };

    render() {
        let {user} = this.props;
        if (user === null)
            return (
                <Grid container alignItems='center' justify='flex-end'>
                    <Grid item xs={2}>
                        <Button color='inherit' onClick={this.props.openLoginDialog}>Login</Button>
                    </Grid>
                </Grid>
            );
        else return (
            <Grid container direction='row' alignItems='center' justify={"flex-end"}>
                <Grid item xs={6}>
                    <Typography inline={true} color='inherit'>
                        Welcome: {user.email}
                    </Typography>
                </Grid>
                <Grid item xs={2}>
                    <Button color='inherit' onClick={this.logout}>Logout</Button>
                </Grid>
            </Grid>
        )
    }
}

LoginButton.propTypes = {
    user: PropTypes.object,
    openLoginDialog: PropTypes.func
};

const mapStateTopProps = state => ({
    user: state.authReducer.user
});

const mapDispatchToProps = dispatch=>({
    openLoginDialog: ()=>dispatch(setLoginDialogStatus(true))
});

export default connect(mapStateTopProps, mapDispatchToProps)(LoginButton);
