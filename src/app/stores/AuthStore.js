import AuthConstants from './../constants/AuthConstants.js';
import AppDispatcher from './../AppDispatcher.js';
import $ from 'jquery';

var EventEmitter = require('events').EventEmitter;
var CHANGE_EVENT = 'change';


var AuthStore = Object.assign({}, EventEmitter, {
    emitChange() {
        this.emit(CHANGE_EVENT);
    },

    addChangeListener(callback) {
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    },

    register(data) {
        var self = this;
        $.ajax({
            url: AuthConstants.REGISTER_URL,
            type: 'POST',
            data: JSON.stringify(data),
            contentType: 'application/json',
            success: (d) => {debugger; self.emitChange()}
        });
    },

    /**
     * Save tokens in local storage and automatically add token within request
     * @param params
     */
    saveTokens(params) {
        const {access_token, refresh_token} = params;

        localStorage.setItem('access_token', access_token);
        localStorage.setItem('refresh_token', refresh_token);
        this.setState({accessToken: access_token, refreshToken: refresh_token, error: null});

    },

    /**
     * Return API endpoint with given grant type (default password)
     * @param grantType
     * @returns {string}
     */
    getAuthEndpoint(grantType='password') {
        return AuthConstants.BASE_URL + '/oauth/v2/token?client_id=' + 'someee_id' + '&client_secret=' + 'some_secret' + '&grant_type=' + grantType;
    }

});

AppDispatcher.register(function (action) {
    switch (action.actionType) {
        case AuthConstants.REGISTER_USER:
            AuthStore.register(action.data);
            break;
    }
});

export default AuthStore