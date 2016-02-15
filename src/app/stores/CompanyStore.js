import AppDispatcher from './../AppDispatcher.js';
import ProjectStore from './ProjectStore.js';
import CompanyConstants from './../constants/CompanyConstants.js';
import api from './../constants/APIRoutes.js';
import BaseStore from './BaseStore.js';
import _ from 'underscore';

var EventEmitter = require('events').EventEmitter;
var CHANGE_EVENT = 'change';

var projectsRequestPending = false;


function getCompanies() {
    if (projectsRequestPending) return;
    if (CompanyStore.companies) {
        CompanyStore.emitChange();
    } else {
        projectsRequestPending = true;
        api.request({
            method: 'GET',
            url: api.COMPANIES,
            success: function (res) {
                projectsRequestPending = false;
                CompanyStore.companies = res.companies;
                CompanyStore.emitChange();
            },
            error: function (err) {
                projectsRequestPending = false;
                console.error(err);
            }
        });
    }
}

function createCompany(data) {
    api.request({
        method: 'POST',
        url: api.COMPANIES,
        data: data,
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
    api.request({
        method: 'PUT',
        url: `${api.COMPANIES}/${id}`,
        data: data,
        success: function (res) {
            var company = _.findWhere(CompanyStore.companies, {id: res.company.id});
            Object.assign(company, res.company);
            CompanyStore.emitChange();
        },
        error: function (err) {
            console.error(err);
        }
    });
}


var CompanyStore = Object.assign({}, BaseStore, EventEmitter.prototype, {
    companies: null,
    lastCreatedCompany: null,
    getCompanyById(id) {
        return _.findWhere(this.companies, {id: id});
    }
});

AppDispatcher.register(function (action) {
    switch (action.actionType) {
        case CompanyConstants.GET_COMPANIES:
            setTimeout(getCompanies, 0);
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
