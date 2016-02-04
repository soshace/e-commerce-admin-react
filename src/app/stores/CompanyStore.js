import AppDispatcher from './../AppDispatcher.js';
import ProjectStore from './ProjectStore.js';
import CompanyConstants from './../constants/CompanyConstants.js';
import $ from 'jquery';
import _ from 'underscore';

var EventEmitter = require('events').EventEmitter;
var CHANGE_EVENT = 'change';


function getCompanies() {
    $.ajax({
        method: 'GET',
        url: CompanyConstants.COMPANIES_URL.replace(':user_id', ProjectStore.getProfileId()),
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

function updateCompany(id, data) {
    $.ajax({
        method: 'PUT',
        url: CompanyConstants.COMPANY_URL.replace(':company_id', id),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        data: JSON.stringify(data),
        xhrFields: {
            withCredentials: true
        },
        success: function () {
            getCompanies();
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
    },

    getCompanyById(id) {
        return _.findWhere(this.companies, {id: id});
    }

});

AppDispatcher.register(function (action) {
    switch (action.actionType) {
        case CompanyConstants.GET_COMPANIES:
            getCompanies();
            break;
        case CompanyConstants.UPDATE_COMPANY:
            updateCompany(action.id, action.data);
            break;
    }
});

export default CompanyStore
