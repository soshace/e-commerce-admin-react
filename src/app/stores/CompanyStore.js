import AppDispatcher from './../AppDispatcher.js';
import ProjectStore from './ProjectStore.js';
import CompanyConstants from './../constants/CompanyConstants.js';
import api from './../constants/APIRoutes.js';
import $ from 'jquery';
import _ from 'underscore';

var EventEmitter = require('events').EventEmitter;
var CHANGE_EVENT = 'change';


function getCompanies() {
    if (CompanyStore.companies) {
        CompanyStore.emitChange();
    } else {
        $.ajax({
            method: 'GET',
            url: api.COMPANIES,
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            xhrFields: {
                withCredentials: true
            },
            success: function (res) {
                CompanyStore.companies = res.companies;
                CompanyStore.emitChange();
            },
            error: function (err) {
                console.error(err);
            }
        });
    }
}

function createCompany(data) {
    $.ajax({
        method: 'POST',
        url: api.COMPANIES,
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        data: JSON.stringify(data),
        xhrFields: {
            withCredentials: true
        },
        success: function (res) {
            CompanyStore.companies.push(res.company);
            CompanyStore.lastCreatedCompany = res.company;
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
        url: `${api.COMPANIES}/${id}`,
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        data: JSON.stringify(data),
        xhrFields: {
            withCredentials: true
        },
        success: function (res) {
            var company = _.findWhere({id: res.company.id});
            Object.assign(company, res.company);
            CompanyStore.emitChange();
        },
        error: function (err) {
            console.error(err);
        }
    });
}


var CompanyStore = Object.assign({}, EventEmitter.prototype, {
    companies: null,
    lastCreatedCompany: null,

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
        case CompanyConstants.CREATE_COMPANY:
            createCompany(action.data);
            break;
        }
});

export default CompanyStore
