import AppDispatcher from './../AppDispatcher.js';
import AuthConstants from './../constants/AuthConstants.js';

export default {
    login: (email, password) => {
        AppDispatcher.dispatch({
            actionType: AuthConstants.LOGIN_USER,
            data: {email, password}
        });
    },

    logout: () => {
        AppDispatcher.dispatch({
            actionType: AuthConstants.LOGOUT_USER
        });
    },

    register: (email, password, name) => {
        AppDispatcher.dispatch({
            actionType: AuthConstants.REGISTER_USER,
            data: {email, password, name}
        });
    }
}