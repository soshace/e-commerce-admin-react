import ProjectConstants from './../constants/ProjectConstants.js';
import AppDispatcher from './../AppDispatcher.js';
import api from './../constants/APIRoutes.js';
import $ from 'jquery';
import _ from 'underscore';

var EventEmitter = require('events').EventEmitter;
var CHANGE_EVENT = 'change';

function getProjects() {
    if (ProjectStore.companies) {
        ProjectStore.emitChange();
    } else {
        $.ajax({
            method: 'GET',
            url: api.PROJECTS,
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            xhrFields: {
                withCredentials: true
            },
            success: function (res) {
                ProjectStore.projects = res.projects;
                ProjectStore.emitChange();
            },
            error: function (err) {
                console.error(err);
            }
        });
    }
}

function createProject(data) {
    $.ajax({
        method: 'POST',
        url: api.PROJECTS,
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        data: JSON.stringify(data),
        xhrFields: {
            withCredentials: true
        },
        success: function (res) {
            ProjectStore.projects.push(res.project);
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
        url: `${api.PROJECTS}/${id}`,
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        data: JSON.stringify(data),
        xhrFields: {
            withCredentials: true
        },
        success: function (res) {
            var project = _.findWhere({id: res.project.id});
            Object.assign(project, res.project);
            ProjectStore.emitChange();
        },
        error: function (err) {
            console.error(err);
        }
    });
}

var ProjectStore = Object.assign({}, EventEmitter.prototype, {
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
        case ProjectConstants.GET_PROJECTS:
            getProjects();
            break;
        case ProjectConstants.ADD_PROJECT:
            createProject(action.data);
            break;
        case ProjectConstants.UPDATE_PROJECT:
            updateProject(action.data.id, action.data.data);
            break;
        }
});

export default ProjectStore
