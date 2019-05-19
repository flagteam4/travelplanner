import React from "react";
import {Dialog} from "@material-ui/core";
import * as PropTypes from "prop-types";
import {setLoginDialogStatus} from "../../action/authAction";
import {connect} from "react-redux";
import SignInScreen from "./SignInScreen";

class LoginDialog extends React.Component {
    render() {
        return (
            <Dialog onClose={this.props.closeLoginDialog} open={this.props.status}>
                <SignInScreen/>
            </Dialog>
        )
    }
}

LoginDialog.propTypes = {
    closeLoginDialog: PropTypes.func,
    status: PropTypes.bool
};

const mapDispatchToProps = (dispatch) => ({
    closeLoginDialog: () => dispatch(setLoginDialogStatus(false))
});

const mapStateToProps = state => ({
    status: state.authReducer.loginDialogStatus
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginDialog);
