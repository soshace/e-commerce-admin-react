import ProjectConstants from './../constants/ProjectConstants.js';
import AppDispatcher from './../AppDispatcher.js';
import api from './../constants/APIRoutes.js';
import BaseStore from './BaseStore.js';
import $ from 'jquery';
import _ from 'underscore';

var EventEmitter = require('events').EventEmitter;
var CHANGE_EVENT = 'change';

var projectsRequestPending = false;

function getProjects() {
    if (projectsRequestPending) return;
    if (ProjectStore.projects) {
        ProjectStore.emitChange();
    } else {
        projectsRequestPending = true;
        $.ajax({
            method: 'GET',
            url: api.PROJECTS,
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            xhrFields: {
                withCredentials: true
            },
            success: function (res) {
                projectsRequestPending = false;
                ProjectStore.projects = res.projects;
                ProjectStore.emitChange();
            },
            error: function (err) {
                projectsRequestPending = false;
                console.error(err);
            }
        });
    }
}

function getCompanyProjects(companyId) {
    if (ProjectStore.companyProjects[companyId]) {
        ProjectStore.emitChange(CHANGE_EVENT);
    } else {
        $.ajax({
            method: 'GET',
            url: `${api.COMPANIES}/${companyId}/projects`,
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            xhrFields: {
                withCredentials: true
            },
            success: function (res) {
                ProjectStore.companyProjects[companyId] = res.projects;
                ProjectStore.emitChange(CHANGE_EVENT);
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
            var project = res.project;
            ProjectStore.projects.push(project);
            ProjectStore.companyProjects[project.company] = ProjectStore.companyProjects[project.company] || [];
            ProjectStore.companyProjects[project.company].push(project);

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
            var project = res.project,
                userProject = _.findWhere(ProjectStore.projects, {id: project.id}),
                companyProject = _.findWhere(ProjectStore.companyProjects[project.company.id], {id: project.id});
            Object.assign(userProject, project);
            Object.assign(companyProject, project);
            ProjectStore.emitChange();
        },
        error: function (err) {
            console.error(err);
        }
    });
}

var ProjectStore = Object.assign({}, BaseStore, EventEmitter.prototype, {
    projects: null,
    companyProjects: {},

    getProjectByKey(key) {
        var project = _.findWhere(this.projects, {slug: key});
        return project;
    }
});

AppDispatcher.register(function (action) {
    switch (action.actionType) {
        case ProjectConstants.GET_PROJECTS:
            setTimeout(getProjects, 0);
            break;
        case ProjectConstants.GET_COMPANY_PROJECTS:
            getCompanyProjects(action.id);
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
