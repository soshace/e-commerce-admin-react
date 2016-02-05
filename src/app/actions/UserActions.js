import AppDispatcher from './../AppDispatcher.js';
import UserConstants from './../constants/UserConstants.js';

export default {
    login: (email, password) => {
        AppDispatcher.dispatch({
            actionType: UserConstants.LOGIN_USER,
            data: {email, password}
        });
    },

    logout: () => {
        AppDispatcher.dispatch({
            actionType: UserConstants.LOGOUT_USER
        });
    },

    register: (email, password, name) => {
        AppDispatcher.dispatch({
            actionType: UserConstants.REGISTER_USER,
            data: {email, password, name}
        });
    },
    getUser: () => {
        AppDispatcher.dispatch({
            actionType: UserConstants.GET_USER
        });
    },
    updateUser: (user) => {
        AppDispatcher.dispatch({
            actionType: UserConstants.UPDATE_USER,
            user: user
        });
    },
}