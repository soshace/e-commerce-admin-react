import ProjectConstants from './../constants/ProjectConstants.js';
import AppDispatcher from './../AppDispatcher.js';
import ProjectStore from './ProjectStore.js';
import CompanyConstants from './../constants/CompanyConstants.js';
import $ from 'jquery';

var EventEmitter = require('events').EventEmitter;
var CHANGE_EVENT = 'change';


function getCompanies() {
    $.ajax({
        method: 'GET',
        url: CompanyConstants.COMPANIES_URL,
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        xhrFields: {
            withCredentials: true
        },
        success: function (data) {
            CompanyStore.companies = data;
            CompanyStore.emitChange();
        },
        error: function (err) {
            console.error(err);
        }
    });

}


var CompanyStore = Object.assign({}, EventEmitter.prototype, {
    companies: null,

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
        case CompanyConstants.GET_COMPANIES:
            getCompanies();
            break;
    }
});

export default CompanyStore
