import AppDispatcher from './../AppDispatcher.js';
import AuthConstants from './../constants/AuthConstants.js';

export default {
    login: (email, password) => {
        //localStorage.setItem('jwt', jwt);
        //
        //AppDispatcher.dispatch({
        //    actionType: LOGIN_USER,
        //    jwt: jwt
        //});
    },

    register: (email, password, name) => {
        AppDispatcher.dispatch({
            actionType: AuthConstants.REGISTER_USER,
            data: {email, password, name}
        });
    }
}