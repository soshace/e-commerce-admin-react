import $ from 'jquery';
import {LOGIN_URL, SIGNUP_URL} from './../constants/LoginConstants';
import LoginActions from '../actions/LoginActions';

class AuthService {
    login(username, password) {
        $.ajax({
            url: LOGIN_URL,
            method: 'POST',
            type: 'json',
            data: {username, password}
        })
        .done(function (response) {
            let jwt = response.id_token;
            LoginActions.loginUser(jwt);
        })
    }

    logout() {
        LoginActions.logoutUser();
    }

    singup(password, email) {
        $.ajax({
            url: SIGNUP_URL,
            method: 'POST',
            type: 'json',
            data: {password, email}
        })
        .done(function (response) {
            let jwt = response.id_token;
            LoginActions.loginUser(jwt);
        })
    }
}

export default new AuthService()