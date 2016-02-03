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
            localStorage.setItem('profile_id', data.profile.id);
            ProjectStore.emitChange();
        },
        error: function (err) {
            console.error(err);
        }
    });
}

function getProfileId() {
    var id;
    if (ProjectStore.profile && ProjectStore.profile.id) {
        id = ProjectStore.profile.id;
    } else {
        id = localStorage.getItem('profile_id');
    }
    return id
}

function getProjects() {
    $.ajax({
        method: 'GET',
        url: ProjectConstants.PROJECTS_URL.replace(':user_id', getProfileId()),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        xhrFields: {
            withCredentials: true
        },
        success: function (data) {
            ProjectStore.projects = data;
            ProjectStore.emitChange();
        },
        error: function (err) {
            console.error(err);
        }
    });
}

function addProject(data) {
    $.ajax({
        method: 'POST',
        url: ProjectConstants.PROJECTS_URL.replace(':user_id', getProfileId()),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        data: JSON.stringify(data),
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

function updateProject(id, data) {
    $.ajax({
        method: 'PUT',
        url: ProjectConstants.PROJECT_UPDATE_URL.replace(':project_id', id),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        data: JSON.stringify(data),
        xhrFields: {
            withCredentials: true
        },
        success: function (data) {
            getProjects();
        },
        error: function (err) {
            console.error(err);
        }
    });
}

var ProjectStore = Object.assign({}, EventEmitter.prototype, {
    profile: null,
    projects: null,

    emitChange() {
        this.emit(CHANGE_EVENT);
    },

    addChangeListener(callback) {
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    },

    setProfile(newProfile) {
        this.profile = newProfile;
    },

    clearProfile() {
        this.profile = null;
    },

    getProfileId() {
        return getProfileId();
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
        case ProjectConstants.ADD_PROJECT:
            addProject(action.data);
            break;
        case ProjectConstants.UPDATE_PROJECT:
            updateProject(action.data.id, action.data.data);
            break;
        }
});

export default ProjectStore
