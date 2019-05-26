import {CHANGE_USER, SET_LOGIN_DIALOG_STATUS} from "../action/authAction";

export const authReducer = (state = {
    user: null,
    loginDialogStatus: false
}, action) => {
    switch (action.type) {
        case CHANGE_USER:
            return {
                ...state,
                user: action.user
            };
        case SET_LOGIN_DIALOG_STATUS:
            return {
                ...state,
                loginDialogStatus: action.status
            };
        default:
            return state;
    }
};
