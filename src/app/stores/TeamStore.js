import AppDispatcher from './../AppDispatcher.js';
import MainPageConstants from './../constants/MainPageConstants.js';
import api from './../constants/APIRoutes.js';
import BaseStore from './BaseStore.js';
import _ from 'underscore';

var EventEmitter = require('events').EventEmitter;


function getTeams(companyId) {
    api.request({
        method: 'GET',
        url: `${api.COMPANIES}/${companyId}/teams`,
        success: function (res) {
            TeamStore.teams = res.teams;
            TeamStore.emitChange();
        }
    });
}

function updateTeam(team) {
    api.request({
        method: 'PUT',
        data: team,
        url: `${api.TEAMS}/${team.id}`,
        success: function (res) {
            var resTeam = res.team;
            team = _.findWhere(TeamStore.teams, {id: team.id});
            team = Object.assign(resTeam, team);
            TeamStore.emitChange();
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
        case MainPageConstants.UPDATE_TEAM:
            setTimeout(updateTeam.bind(this, action.team), 0);
            break;
        case MainPageConstants.REMOVE_MEMBER:
            setTimeout(removeMember.bind(this), 0);
            break;

    }
});

export default TeamStore
