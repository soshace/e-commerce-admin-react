import AppDispatcher from './../AppDispatcher.js';
import MainPageConstants from './../constants/MainPageConstants.js';


export default {
    getCompanyTeams: (companyId) => {
        AppDispatcher.dispatch({
            actionType: MainPageConstants.GET_TEAMS,
            companyId: companyId
        });
    },
    updateTeam: (team) => {
        AppDispatcher.dispatch({
            actionType: MainPageConstants.UPDATE_TEAM,
            team: team
        });
    },
    removeMember: (companyId) => {
        AppDispatcher.dispatch({
            actionType: MainPageConstants.REMOVE_MEMBER
        });
    }
}