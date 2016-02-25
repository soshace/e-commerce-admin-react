import AppConstants from './../constants/AppConstants.js';
import AppDispatcher from './../AppDispatcher.js';
import api from './../constants/APIRoutes.js';
import BaseStore from './BaseStore.js';
import _ from 'underscore';

var EventEmitter = require('events').EventEmitter;
var CHANGE_EVENT = 'change';

var projectsRequestPending = false;

function getProjects() {
    if (projectsRequestPending) return;
    //if (ProjectStore.projects) {
    //    ProjectStore.emitChange();
    //} else {
        projectsRequestPending = true;
        api.request({
            url: api.PROJECTS,
            method: 'GET',
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
    //}
}

function getCompanyProjects(companyId) {
    //if (ProjectStore.companyProjects[companyId]) {
    //    ProjectStore.emitChange(CHANGE_EVENT);
    //} else {
        api.request({
            method: 'GET',
            url: `${api.COMPANIES}/${companyId}/projects`,
            success: function (res) {
                ProjectStore.companyProjects[companyId] = res.projects;
                ProjectStore.emitChange(CHANGE_EVENT);
            }
        });
    //}
}

function createProject(data) {
    api.request({
        method: 'POST',
        data: data,
        url: api.PROJECTS,
        success: function (res) {
            var project = res.project;
            ProjectStore.projects.push(project);
            ProjectStore.companyProjects[project.company] = ProjectStore.companyProjects[project.company] || [];
            ProjectStore.companyProjects[project.company].push(project);

            ProjectStore.emitChange();
        }
    });
}

function deleteProject(project) {
    api.request({
        method: 'DELETE',
        url: `${api.PROJECTS}/${project.id}`,
        success: function (res) {
            var project = res.project[0],
                companyProjects = ProjectStore.companyProjects[project.company];
            companyProjects = companyProjects || [];
            companyProjects = _.reject(companyProjects, {id: project.id});
            ProjectStore.projects = _.reject(ProjectStore.projects, {id: project.id});

            ProjectStore.emitChange();
        }
    });
}

function updateProject(id, data) {
    api.request({
        method: 'PUT',
        data: data,
        url: `${api.PROJECTS}/${id}`,
        success: function (res) {
            var project = res.project,
                userProject = _.findWhere(ProjectStore.projects, {id: project.id}),
                companyProject = _.findWhere(ProjectStore.companyProjects[project.company], {id: project.id});
            Object.assign(userProject || {}, project);
            Object.assign(companyProject || {}, project);
            ProjectStore.emitChange();
        }
    });
}

var ProjectStore = Object.assign({}, BaseStore, EventEmitter.prototype, {
    projects: null,
    companyProjects: {},

    getProjectByKey(key) {
        return _.findWhere(this.projects, {slug: key});
    },

    getProjectById(id) {
        return _.findWhere(this.projects, {id: id});
    }
});

AppDispatcher.register(function (action) {
    switch (action.actionType) {
        case AppConstants.GET_PROJECTS:
            setTimeout(getProjects, 0);
            break;
        case AppConstants.GET_COMPANY_PROJECTS:
            getCompanyProjects(action.id);
            break;
        case AppConstants.ADD_PROJECT:
            createProject(action.data);
            break;
        case AppConstants.DELETE_PROJECT:
            deleteProject(action.project);
            break;
        case AppConstants.UPDATE_PROJECT:
            updateProject(action.data.id, action.data.data);
            break;
    }
});

export default ProjectStore
