import AppDispatcher from './../AppDispatcher.js';
import MainPageConstants from './../constants/MainPageConstants.js';
import api from './../constants/APIRoutes.js';
import _ from 'underscore';
import BaseStore from './BaseStore.js';

var EventEmitter = require('events').EventEmitter;
var CHANGE_EVENT = 'change';


function getCategory(id) {
    api.request({
        method: 'GET',
        url: `${api.CATEGORIES}/${id}`,
        success: function (res) {
            CategoryStore.selected = res.category;
            CategoryStore.emitChange();
        }
    });
}

function updateCategory(category) {
    api.request({
        method: 'PUT',
        url: `${api.CATEGORIES}/${category.id}`,
        data: category,
        success: function (res) {
            CategoryStore.selected = res.category;
            CategoryStore.emitChange();
        }
    });
}

function getCategories(update) {
    if (CategoryStore.categories && !update) {
        CategoryStore.emitChange();
    } else {
        api.request({
            method: 'GET',
            url: api.CATEGORIES,
            success: function (res) {
                CategoryStore.categories = res.categories;
                CategoryStore.emitChange();
            }
        });
    }
}

function getProjectCategories(update, projectId) {
    if (CategoryStore.selectedCategories && !update) {
        CategoryStore.emitChange();
    } else {
        api.request({
            method: 'GET',
            url: `${api.PROJECTS}/${projectId}/categories`,
            success: function (res) {
                CategoryStore.selectedCategories = res.categories;
                CategoryStore.emitChange();
            }
        });
    }
}

function createCategory(data) {
    api.request({
        method: 'POST',
        url: api.CATEGORIES,
        data: data,
        success: function (res) {
            CategoryStore.emitChange();
        }
    });
}


var CategoryStore = Object.assign({}, BaseStore, EventEmitter.prototype, {
    categories: null,
    selectedCategories: null,
    selected: null
});

AppDispatcher.register(function (action) {
    switch (action.actionType) {
        case MainPageConstants.GET_CATEGORIES:
            setTimeout(getCategories.bind(this, action.update), 0);
            break;
        case MainPageConstants.GET_PROJECT_CATEGORIES:
            setTimeout(getProjectCategories.bind(this, action.update, action.projectId), 0);
            break;
        case MainPageConstants.GET_CATEGORY:
            setTimeout(getCategory.bind(this, action.categoryId), 0);
            break;
        case MainPageConstants.UPDATE_CATEGORY:
            setTimeout(updateCategory.bind(this, action.category), 0);
            break;
        case MainPageConstants.CREATE_CATEGORY:
            setTimeout(createCategory.bind(this, action.data), 0);
            break;

    }
});

export default CategoryStore
