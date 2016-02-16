import AppDispatcher from './../AppDispatcher.js';
import AppConstants from './../constants/AppConstants.js';

export default {
    login: (email, password) => {
        AppDispatcher.dispatch({
            actionType: AppConstants.LOGIN_USER,
            data: {email, password}
        });
    },

    logout: () => {
        AppDispatcher.dispatch({
            actionType: AppConstants.LOGOUT_USER
        });
    },

    register: (email, password, name) => {
        AppDispatcher.dispatch({
            actionType: AppConstants.REGISTER_USER,
            data: {email, password, name}
        });
    },
    getUser: () => {
        AppDispatcher.dispatch({
            actionType: AppConstants.GET_USER
        });
    },
    updateUser: (user) => {
        AppDispatcher.dispatch({
            actionType: AppConstants.UPDATE_USER,
            user: user
        });
    },
}