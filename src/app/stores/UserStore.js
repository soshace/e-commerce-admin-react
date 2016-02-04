import UserConstants from './../constants/UserConstants.js';
import AppDispatcher from './../AppDispatcher.js';
import ProjectStore from './ProjectStore.js';
import api from './../constants/APIRoutes.js';
import $ from 'jquery';

var EventEmitter = require('events').EventEmitter;
var LOGIN_SUCCESS = 'login_success';
var LOGIN_ERROR = 'login_error';


function register(data) {
    authRequest({
        url: api.USER,
        data: data,
        type: 'POST',
        success: onLogin.bind(self),
        error: onRegisterFail.bind(self)
    });
}

function login(data) {
    authRequest({
        url: api.LOGIN,
        data: data,
        type: 'POST',
        success: onLogin.bind(self)
    });
}

function logout(cb) {
    authRequest({
        url: api.LOGOUT,
        type: 'GET',
        success: cb,
        error: cb
    });
    UserStore.user = {};
}

function getUser() {
    if (UserStore.user.id) {
        UserStore.emitChange();
    } else {
        $.ajax({
            method: 'GET',
            url: api.PROFILE,
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            xhrFields: {
                withCredentials: true
            },
            success: function (res) {
                UserStore.user = res.profile;
                UserStore.emitChange();
            },
            error: function (err) {
                console.error(err);
            }
        });
    }
}

function onRegisterFail(res) {
    var invalidAttrs = res.responseJSON.invalidAttributes;
    if (invalidAttrs && invalidAttrs.email) {
        UserStore.user.validationErrors = UserStore.user.validationErrors || [];
        UserStore.user.validationErrors.push('email');
    }
    UserStore.emitChange(LOGIN_ERROR);
}

function onLogin(res) {
    if (res.code === UserConstants.LOGIN_SUCCESS_CODE) {
        localStorage.setItem('loggedIn', true);
        Object.assign(UserStore.user, res.user);
        UserStore.emitChange(LOGIN_SUCCESS);
    } else if (res.code === UserConstants.LOGIN_FAIL_CODE) {
        UserStore.emitChange(LOGIN_ERROR);
    }
}

function authRequest(props) {
    UserStore.user.validationErrors = [];
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

var UserStore = Object.assign({}, EventEmitter.prototype, {
    user: {},

    emitChange(msg) {
        this.emit(msg);
    },

    addChangeListener(successCb, errorCb) {
        this.on(LOGIN_SUCCESS, successCb);
        this.on(LOGIN_ERROR, errorCb);
    },

    removeChangeListener(successCb, errorCb) {
        this.removeListener(LOGIN_SUCCESS, successCb);
        this.removeListener(LOGIN_ERROR, errorCb);
    },

    loggedIn() {
        return true;
    }
});

AppDispatcher.register(function (action) {
    switch (action.actionType) {
        case UserConstants.REGISTER_USER:
            logout(function () {
                register(action.data);
            });
            break;
        case UserConstants.LOGIN_USER:
            logout(function () {
                login(action.data);
            });
            break;
        case UserConstants.LOGOUT_USER:
            logout();
            break;
        case UserConstants.GET_USER:
            getUser();
            break;
    }
});

export default UserStore