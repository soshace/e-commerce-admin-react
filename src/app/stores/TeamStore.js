import AppDispatcher from './../AppDispatcher.js';
import MainPageConstants from './../constants/MainPageConstants.js';
import api from './../constants/APIRoutes.js';
import BaseStore from './BaseStore.js';

var EventEmitter = require('events').EventEmitter;


function getTeams(companyId) {
    api.request({
        method: 'GET',
        url: `${api.COMPANIES}/${companyId}/teams`,
        success: function (res) {
            TeamStore.teams = res.teams;
            TeamStore.emitChange();
        },
        error: function (err) {
            console.error(err);
        }
    });
}

function removeMember() {
    //api.request({
    //    method: 'GET',
    //    url: `${api.COMPANIES}/${companyId}/teams`,
    //    success: function (res) {
    //        TeamStore.teams = res.teams;
    //        TeamStore.emitChange();
    //    },
    //    error: function (err) {
    //        console.error(err);
    //    }
    //});
}


var TeamStore = Object.assign({}, BaseStore, EventEmitter.prototype, {
    teams: null
});

AppDispatcher.register(function (action) {
    switch (action.actionType) {
        case MainPageConstants.GET_TEAMS:
            setTimeout(getTeams.bind(this, action.companyId), 0);
            break;
        case MainPageConstants.REMOVE_MEMBER:
            setTimeout(removeMember.bind(this), 0);
            break;

    }
});

export default TeamStore
