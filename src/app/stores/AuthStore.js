import AuthConstants from './../constants/AuthConstants.js';
import AppDispatcher from './../AppDispatcher.js';
import $ from 'jquery';

var EventEmitter = require('events').EventEmitter;
var CHANGE_EVENT = 'login';


var AuthStore = Object.assign({}, EventEmitter.prototype, {
    user: {},

    emitChange() {
        this.emit(CHANGE_EVENT);
    },

    addLoginListener(callback) {
        this.on(CHANGE_EVENT, callback);
    },

    removeLoginListener(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    },

    register(data) {
        var self = this;
        this.authRequest({
            url: AuthConstants.REGISTER_URL,
            data: data,
            type: 'POST',
            success: self._successLogin.bind(self)
        });
    },

    login(data) {
        var self = this;
        this.authRequest({
            url: AuthConstants.LOGIN_URL,
            data: data,
            type: 'POST',
            success: self._successLogin.bind(self)
        });
    },

    logout(cb) {
        this.authRequest({
            url: AuthConstants.LOGOUT_URL,
            type: 'GET',
            success: cb,
            error: cb
        });
        localStorage.setItem('loggedIn', false);
    },

    _successLogin(res, status, xhr) {
        if (res.code === AuthConstants.LOGIN_SUCCESS_CODE || res.email) {
            localStorage.setItem('loggedIn', true);
            this.user.email = res.email;
            this.user.name = res.name;
            this.user.id = res.id;
            this.emitChange();
        }
    },

    loggedIn() {
        return localStorage.getItem('loggedIn');
    },

    authRequest(props) {
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
        case AuthConstants.REGISTER_USER:
            AuthStore.logout(function () {
                AuthStore.register(action.data);
            });
            break;
        case AuthConstants.LOGIN_USER:
            AuthStore.logout(function () {
                AuthStore.login(action.data);
            });
            break;
        case AuthConstants.LOGOUT_USER:
            AuthStore.logout();
            break;
    }
});

export default AuthStore