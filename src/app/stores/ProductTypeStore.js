import MainPageConstants from './../constants/MainPageConstants.js';
import AppDispatcher from './../AppDispatcher.js';
import api from './../constants/APIRoutes.js';
import BaseStore from './BaseStore.js';
import $ from 'jquery';
import _ from 'underscore';

var EventEmitter = require('events').EventEmitter;


function getProjectProductTypes(projectId) {
    $.ajax({
        method: 'GET',
        url: `${api.PROJECTS}/${projectId}/product_types`,
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        xhrFields: {
            withCredentials: true
        },
        success: function (res) {
            ProductTypeStore.selectedProductTypes = res.productTypes;
            ProductTypeStore.emitChange();
        },
        error: function (err) {
            console.error(err);
        }
    });
}

//function createProject(data) {
//    $.ajax({
//        method: 'POST',
//        url: api.PROJECTS,
//        contentType: 'application/json; charset=utf-8',
//        dataType: 'json',
//        data: JSON.stringify(data),
//        xhrFields: {
//            withCredentials: true
//        },
//        success: function (res) {
//            var project = res.project;
//            ProjectStore.projects.push(project);
//            ProjectStore.companyProjects[project.company] = ProjectStore.companyProjects[project.company] || [];
//            ProjectStore.companyProjects[project.company].push(project);
//
//            ProjectStore.emitChange();
//        },
//        error: function (err) {
//            console.error(err);
//        }
//    });
//}
//
//function updateProject(id, data) {
//    $.ajax({
//        method: 'PUT',
//        url: `${api.PROJECTS}/${id}`,
//        contentType: 'application/json; charset=utf-8',
//        dataType: 'json',
//        data: JSON.stringify(data),
//        xhrFields: {
//            withCredentials: true
//        },
//        success: function (res) {
//            var project = res.project,
//                userProject = _.findWhere(ProjectStore.projects, {id: project.id}),
//                companyProject = _.findWhere(ProjectStore.companyProjects[project.company.id], {id: project.id});
//            Object.assign(userProject, project);
//            Object.assign(companyProject, project);
//            ProjectStore.emitChange();
//        },
//        error: function (err) {
//            console.error(err);
//        }
//    });
//}

var ProductTypeStore = Object.assign({}, BaseStore, EventEmitter.prototype, {
    selectedProductTypes: null
});

AppDispatcher.register(function (action) {
    switch (action.actionType) {
        case MainPageConstants.GET_PROJECT_PRODUCT_TYPES:
            getProjectProductTypes(action.projectId);
            break;
    }
});

export default ProductTypeStore
