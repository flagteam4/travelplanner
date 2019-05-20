import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import * as firebaseui from "firebaseui";
import * as PropTypes from "prop-types";
import {setLoginDialogStatus} from "../../action/authAction";
import {connect} from "react-redux";
import {firebaseApp} from "../../config/Fire";
import * as firebase from "firebase";

class SignInScreen extends React.Component {
    constructor(props) {
        super(props);
        this.uiConfig = {
            signInFlow: 'popup',
            callbacks: {
                signInSuccessWithAuthResult: (authResult, redirectUrl) => {
                    props.closeLoginDialog();
                    return false;
                }
            },
            credentialHelper: firebaseui.auth.CredentialHelper.NONE,
            signInOptions: [
                {
                    provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
                    requireDisplayName: true
                }
            ]
        }
    }

    render() {
        return (
            <div>
                <StyledFirebaseAuth uiConfig={this.uiConfig} firebaseAuth={firebaseApp.auth()}/>
            </div>
        );
    }
}

SignInScreen.propTypes = {
    closeLoginDialog: PropTypes.func
};

const mapDispatchToProps = dispatch => ({
    closeLoginDialog: () => dispatch(setLoginDialogStatus(false))
});

export default connect(null, mapDispatchToProps)(SignInScreen);
