import AppConstants from './../constants/AppConstants.js';
import AppDispatcher from './../AppDispatcher.js';
import ProjectStore from './ProjectStore.js';
import api from './../constants/APIRoutes.js';

var EventEmitter = require('events').EventEmitter;
var LOGIN_SUCCESS = 'login_success';
var LOGIN_ERROR = 'login_error';
var USER_CHANGE = 'user_change';


function register(data) {
    api.request({
        method: 'POST',
        data: data,
        url: api.USERS,
        success: onLogin,
        error: onRegisterFail
    });
}

function login(data) {
    api.request({
        method: 'POST',
        data: data,
        url: api.LOGIN,
        success: onLogin,
        error: onLogin
    });
}

function logout() {
    api.request({
        method: 'POST',
        url: api.LOGOUT
    });
    UserStore.user = {};
}

function getUser() {
    if (UserStore.user.id) {
        UserStore.emitChange(USER_CHANGE);
    } else {
        api.request({
            method: 'GET',
            url: api.PROFILE,
            success: function (res) {
                UserStore.user = res.profile;
                UserStore.emitChange(USER_CHANGE);
            },
            error: function (err) {
                UserStore.user = {};
                UserStore.emitChange(USER_CHANGE);
            }
        });
    }
}

function updateUser(data) {
    api.request({
        method: 'PUT',
        url: `${api.USERS}/${data.id}`,
        data: data,
        success: (res) => {
            UserStore.user = res.user;
            UserStore.emitChange(USER_CHANGE);
        }
    });
}

function onRegisterFail(res) {
    var invalidAttrs = res.responseJSON.message.invalidAttributes;
    if (invalidAttrs && invalidAttrs.email) {
        UserStore.user.validationErrors = [];
        UserStore.user.validationErrors.push('email');
    }
    UserStore.emitChange(LOGIN_ERROR);
}

function onLogin(res) {
    if (res.code === AppConstants.LOGIN_SUCCESS_CODE) {
        localStorage.setItem('loggedIn', true);
        UserStore.user = Object.assign(UserStore.user || {}, res.user);
        UserStore.emitChange(LOGIN_SUCCESS);
    } else {
        UserStore.emitChange(LOGIN_ERROR);
    }
}

var UserStore = Object.assign({}, EventEmitter.prototype, {
    user: {},

    emitChange(msg) {
        this.emit(msg);
    },

    addChangeListener(successCb, errorCb) {
        if (errorCb) {
            this.on(LOGIN_SUCCESS, successCb);
            this.on(LOGIN_ERROR, errorCb);
        } else {
            this.on(USER_CHANGE, successCb);
        }
    },

    removeChangeListener(successCb, errorCb) {
        if (errorCb) {
            this.removeListener(LOGIN_SUCCESS, successCb);
            this.removeListener(LOGIN_ERROR, errorCb);
        } else {
            this.removeListener(USER_CHANGE, successCb);
        }
    }
});

AppDispatcher.register(function (action) {
    switch (action.actionType) {
        case AppConstants.REGISTER_USER:
            register(action.data);
            break;
        case AppConstants.LOGIN_USER:
            login(action.data);
            break;
        case AppConstants.LOGOUT_USER:
            logout();
            break;
        case AppConstants.GET_USER:
            getUser();
            break;
        case AppConstants.UPDATE_USER:
            updateUser(action.user);
            break;
    }
});

export default UserStore