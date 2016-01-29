import DashboardConstants from './../constants/DashboardConstants.js';
import AppDispatcher from './../AppDispatcher.js';
import $ from 'jquery';

var EventEmitter = require('events').EventEmitter;
var CHANGE_EVENT = 'change';


function getProfile() {
    $.ajax({
        method: 'GET',
        url: DashboardConstants.PROFILE_URL,
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        xhrFields: {
            withCredentials: true
        },
        success: function (data) {
            DashboardStore.profile = data.profile;
            DashboardStore.emitChange();
        },
        error: function (err) {
            console.error(err);
        }
    });
}

function getProjects() {
    //$.ajax({
    //    method: 'GET',
    //    url: DashboardConstants.PROJECTS_URL,
    //    contentType: 'application/json; charset=utf-8',
    //    dataType: 'json',
    //    xhrFields: {
    //        withCredentials: true
    //    },
    //    success: function (data) {
    //        DashboardStore.projects = data.projects;
    //        DashboardStore.emitChange();
    //    },
    //    error: function (err) {
    //        console.error(err);
    //    }
    //});
    DashboardStore.projects = [];
    DashboardStore.emitChange();
}

var DashboardStore = Object.assign({}, EventEmitter.prototype, {
    profile: {},

    // TODO: make a request to a server, if no projects exists, show Registration-Step2 - Create Project Form
    projects: null,

    emitChange() {
        this.emit(CHANGE_EVENT);
    },

    addChangeListener(callback) {
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    }

});

AppDispatcher.register(function (action) {
    switch (action.actionType) {
        case DashboardConstants.GET_PROFILE:
            getProfile();
            break;
        case DashboardConstants.GET_PROJECTS:
            getProjects();
            break;
        }
});

export default DashboardStore
