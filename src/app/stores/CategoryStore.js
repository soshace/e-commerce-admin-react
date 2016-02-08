import AppDispatcher from './../AppDispatcher.js';
import MainPageConstants from './../constants/MainPageConstants.js';
import api from './../constants/APIRoutes.js';
import $ from 'jquery';
import _ from 'underscore';

var EventEmitter = require('events').EventEmitter;
var CHANGE_EVENT = 'change';


function getCategories() {
    if (CategoryStore.categories) {
        CategoryStore.emitChange();
    } else {
        $.ajax({
            method: 'GET',
            url: api.CATEGORIES,
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            xhrFields: {
                withCredentials: true
            },
            success: function (res) {
                CategoryStore.categories = res.categories;
                CategoryStore.emitChange();
            },
            error: function (err) {
                console.error(err);
            }
        });
    }
}

function createCategory(data) {
    $.ajax({
        method: 'POST',
        url: api.CATEGORIES,
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        data: JSON.stringify(data),
        xhrFields: {
            withCredentials: true
        },
        success: function (res) {
            CategoryStore.emitChange();
        },
        error: function (err) {
            console.error(err);
        }
    });
}


var CategoryStore = Object.assign({}, EventEmitter.prototype, {
    categories: null,

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
        case MainPageConstants.GET_CATEGORIES:
            setTimeout(getCategories, 0);
            break;
        case MainPageConstants.CREATE_CATEGORY:
            setTimeout(createCategory.bind(this, action.data), 0);
            break;

    }
});

export default CategoryStore
