export const CHANGE_USER = 'change_user';
export const changeUser = (user) => ({
    type: CHANGE_USER,
    user
});

export const SET_LOGIN_DIALOG_STATUS = 'set_login_dialog_status';
export const setLoginDialogStatus = status => ({
    type: SET_LOGIN_DIALOG_STATUS,
    status
});
