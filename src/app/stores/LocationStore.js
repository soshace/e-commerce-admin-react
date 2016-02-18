import AppDispatcher from './../AppDispatcher.js';
import AppConstants from './../constants/AppConstants.js';
import api from './../constants/APIRoutes.js';
import _ from 'underscore';
import BaseStore from './BaseStore.js';

var EventEmitter = require('events').EventEmitter;


function getCountries() {
    api.request({
        method: 'GET',
        url: api.COUNTRIES,
        success: function (res) {
            LocationStore.countries = res.countries;
            LocationStore.emitChange();
        }
    });
}

function getLanguages() {
    api.request({
        method: 'GET',
        url: api.LANGUAGES,
        success: function (res) {
            LocationStore.languages = res.languages;
            LocationStore.emitChange();
        }
    });
}

function getCurrencies() {
    api.request({
        method: 'GET',
        url: api.CURRENCIES,
        success: function (res) {
            LocationStore.currencies = res.currencies;
            LocationStore.emitChange();
        }
    });
}


var LocationStore = Object.assign({}, BaseStore, EventEmitter.prototype, {
    countries: null,
    languages: null,
    currencies: null
});

AppDispatcher.register(function (action) {
    switch (action.actionType) {
        case AppConstants.GET_COUNTRIES:
            setTimeout(getCountries, 0);
            break;
        case AppConstants.GET_LANGUAGES:
            setTimeout(getLanguages, 0);
            break;
        case AppConstants.GET_CURRENCIES:
            setTimeout(getCurrencies, 0);
            break;

    }
});

export default LocationStore
