import UserConstants from './../constants/UserConstants.js';
import AppDispatcher from './../AppDispatcher.js';
import ProjectStore from './ProjectStore.js';
import $ from 'jquery';

var EventEmitter = require('events').EventEmitter;
var LOGIN_SUCCESS = 'login_success';
var LOGIN_ERROR = 'login_error';


var UserStore = Object.assign({}, EventEmitter.prototype, {
    user: {
        validationErrors: []
    },

    emitChange(msg) {
        this.emit(msg);
    },

    addListener(successCb, errorCb) {
        this.on(LOGIN_SUCCESS, successCb);
        this.on(LOGIN_ERROR, errorCb);
    },

    removeListener(successCb, errorCb) {
        this.removeListener(LOGIN_SUCCESS, successCb);
        this.removeListener(LOGIN_ERROR, errorCb);
    },

    register(data) {
        var self = this;
        this.authRequest({
            url: UserConstants.REGISTER_URL,
            data: data,
            type: 'POST',
            success: self._onRegisterSuccess.bind(self, data),
            error: self._onRegisterFail.bind(self)
        });
    },

    login(data) {
        var self = this;
        this.authRequest({
            url: UserConstants.LOGIN_URL,
            data: data,
            type: 'POST',
            success: self._onLogin.bind(self)
        });
    },

    logout(cb) {
        localStorage.clear();
        this.authRequest({
            url: UserConstants.LOGOUT_URL,
            type: 'GET',
            success: cb,
            error: cb
        });
        localStorage.setItem('loggedIn', false);
        ProjectStore.clearProfile();
    },

    _onRegisterSuccess(data) {
        this.login(data);
    },

    _onRegisterFail(res) {
        var invalidAttrs = res.responseJSON.invalidAttributes;
        if (invalidAttrs && invalidAttrs.email) {
            this.user.validationErrors.push('email');
        }
        this.emitChange(LOGIN_ERROR);
    },

    _onLogin(res) {
        if (res.code === UserConstants.LOGIN_SUCCESS_CODE) {
            localStorage.setItem('loggedIn', true);
            ProjectStore.setProfile(res.user);
            this.emitChange(LOGIN_SUCCESS);
        } else if (res.code === UserConstants.LOGIN_FAIL_CODE) {
            this.emitChange(LOGIN_ERROR);
        }
    },

    loggedIn() {
        return localStorage.getItem('loggedIn');
    },

    authRequest(props) {
        this.user.validationErrors = [];
        $.ajax({
            url: props.url,
            type: props.type,
            contentType: 'application/json',
            xhrFields: {
                withCredentials: true
            },
            data: JSON.stringify(props.data),
            success: props.success,
            error: props.error
        });
    }

});

AppDispatcher.register(function (action) {
    switch (action.actionType) {
        case UserConstants.REGISTER_USER:
            UserStore.logout(function () {
                UserStore.register(action.data);
            });
            break;
        case UserConstants.LOGIN_USER:
            UserStore.logout(function () {
                UserStore.login(action.data);
            });
            break;
        case UserConstants.LOGOUT_USER:
            UserStore.logout();
            break;
    }
});

export default UserStore