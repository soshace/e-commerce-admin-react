import AppDispatcher from './../AppDispatcher.js';
import {LOGIN_USER, LOGOUT_USER} from './../constants/LoginConstants.js';

export default {
    loginUser: (jwt) => {
        localStorage.setItem('jwt', jwt);

        AppDispatcher.dispatch({
            actionType: LOGIN_USER,
            jwt: jwt
        });
    }
}