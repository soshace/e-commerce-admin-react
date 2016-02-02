import ProjectConstants from './../constants/ProjectConstants.js';
import AppDispatcher from './../AppDispatcher.js';
import $ from 'jquery';

var EventEmitter = require('events').EventEmitter;
var CHANGE_EVENT = 'change';


function getProfile() {
    $.ajax({
        method: 'GET',
        url: ProjectConstants.PROFILE_URL,
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        xhrFields: {
            withCredentials: true
        },
        success: function (data) {
            ProjectStore.profile = data.profile;
            ProjectStore.emitChange();
        },
        error: function (err) {
            console.error(err);
        }
    });
}

function getProjects() {
    $.ajax({
        method: 'GET',
        url: ProjectConstants.PROJECTS_URL,
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        xhrFields: {
            withCredentials: true
        },
        success: function (data) {
            ProjectStore.projects = data.projects;
            ProjectStore.emitChange();
        },
        error: function (err) {
            console.error(err);
        }
    });

}

function addProject() {
    $.ajax({
        method: 'POST',
        url: ProjectConstants.PROJECTS_URL,
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        xhrFields: {
            withCredentials: true
        },
        success: function (data) {
            ProjectStore.projects = data.projects;
            ProjectStore.emitChange();
        },
        error: function (err) {
            console.error(err);
        }
    });
}

var ProjectStore = Object.assign({}, EventEmitter.prototype, {
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
        case ProjectConstants.GET_PROFILE:
            getProfile();
            break;
        case ProjectConstants.GET_PROJECTS:
            getProjects();
            break;
        }
});

export default ProjectStore
