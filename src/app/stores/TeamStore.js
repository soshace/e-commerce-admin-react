import AppDispatcher from './../AppDispatcher.js';
import MainPageConstants from './../constants/MainPageConstants.js';
import ResponseCodes from './../constants/ResponseCodes.js';
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

function createTeam(team) {
    api.request({
        method: 'POST',
        data: team,
        url: api.TEAMS,
        success: function (res) {
            getTeams(res.team.company);
        }
    });
}

function removeTeam(teamId) {
    api.request({
        method: 'DELETE',
        url: `${api.TEAMS}/${teamId}`,
        success: function (res) {
            TeamStore.teams = _.reject(TeamStore.teams, {id: teamId});
            TeamStore.emitChange();
        }
    });
}

function updatePermission(permission) {
    api.request({
        method: 'PUT',
        data: permission,
        url: `${api.PERMISSIONS}/${permission.id}`,
        success: function (res) {
            var resPerm = res.permission,
                team = _.findWhere(TeamStore.teams, {id: resPerm.team}),
                permission = _.findWhere(team.permissions, {id: resPerm.id});
            Object.assign(permission, resPerm);
            TeamStore.emitChange();
        }
    });
}

function sendInvite(invite) {
    TeamStore.inviteResCode = null;
    api.request({
        method: 'POST',
        data: invite,
        url: api.INVITATIONS,
        success: function (res) {
            var team;
            if (res.code === ResponseCodes.USER_ADDED_TO_TEAM) {
                team = _.findWhere(TeamStore.teams, {id: res.team.id});
                Object.assign(team, res.team);
            }
            TeamStore.inviteResCode = res.code;
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
    teams: null,
    inviteResCode: null
});

AppDispatcher.register(function (action) {
    switch (action.actionType) {
        case MainPageConstants.GET_TEAMS:
            setTimeout(getTeams.bind(this, action.companyId), 0);
            break;
        case MainPageConstants.CREATE_TEAM:
            setTimeout(createTeam.bind(this, action.team), 0);
            break;
        case MainPageConstants.UPDATE_TEAM:
            setTimeout(updateTeam.bind(this, action.team), 0);
            break;
        case MainPageConstants.REMOVE_TEAM:
            setTimeout(removeTeam.bind(this, action.teamId), 0);
            break;
        case MainPageConstants.UPDATE_PERMISSION:
            setTimeout(updatePermission.bind(this, action.permission), 0);
            break;
        case MainPageConstants.SEND_INVITE:
            setTimeout(sendInvite.bind(this, action.invite), 0);
            break;
        case MainPageConstants.REMOVE_MEMBER:
            setTimeout(removeMember.bind(this), 0);
            break;

    }
});

export default TeamStore
