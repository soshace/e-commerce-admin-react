import AppDispatcher from './../AppDispatcher.js';
import AppConstants from './../constants/AppConstants.js';


export default {
    getCompanyTeams: (companyId) => {
        AppDispatcher.dispatch({
            actionType: AppConstants.GET_TEAMS,
            companyId: companyId
        });
    },
    createTeam: (team) => {
        AppDispatcher.dispatch({
            actionType: AppConstants.CREATE_TEAM,
            team: team
        });
    },
    updateTeam: (team) => {
        AppDispatcher.dispatch({
            actionType: AppConstants.UPDATE_TEAM,
            team: team
        });
    },
    removeTeam: (teamId) => {
        AppDispatcher.dispatch({
            actionType: AppConstants.REMOVE_TEAM,
            teamId: teamId
        });
    },
    updatePermission: (permission) => {
        AppDispatcher.dispatch({
            actionType: AppConstants.UPDATE_PERMISSION,
            permission: permission
        });
    },
    sendInvite: (invite) => {
        AppDispatcher.dispatch({
            actionType: AppConstants.SEND_INVITE,
            invite: invite
        });
    },
    removeMember: (memberId, teamId) => {
        AppDispatcher.dispatch({
            actionType: AppConstants.REMOVE_MEMBER,
            teamId: teamId,
            memberId: memberId
        });
    }
}