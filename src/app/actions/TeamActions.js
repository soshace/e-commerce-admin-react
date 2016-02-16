import AppDispatcher from './../AppDispatcher.js';
import MainPageConstants from './../constants/MainPageConstants.js';


export default {
    getCompanyTeams: (companyId) => {
        AppDispatcher.dispatch({
            actionType: MainPageConstants.GET_TEAMS,
            companyId: companyId
        });
    },
    createTeam: (team) => {
        AppDispatcher.dispatch({
            actionType: MainPageConstants.CREATE_TEAM,
            team: team
        });
    },
    updateTeam: (team) => {
        AppDispatcher.dispatch({
            actionType: MainPageConstants.UPDATE_TEAM,
            team: team
        });
    },
    removeTeam: (teamId) => {
        AppDispatcher.dispatch({
            actionType: MainPageConstants.REMOVE_TEAM,
            teamId: teamId
        });
    },
    updatePermission: (permission) => {
        AppDispatcher.dispatch({
            actionType: MainPageConstants.UPDATE_PERMISSION,
            permission: permission
        });
    },
    sendInvite: (invite) => {
        AppDispatcher.dispatch({
            actionType: MainPageConstants.SEND_INVITE,
            invite: invite
        });
    },
    removeMember: (companyId) => {
        AppDispatcher.dispatch({
            actionType: MainPageConstants.REMOVE_MEMBER
        });
    }
}