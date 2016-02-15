import AppDispatcher from './../AppDispatcher.js';
import MainPageConstants from './../constants/MainPageConstants.js';


export default {
    getCompanyTeams: (companyId) => {
        AppDispatcher.dispatch({
            actionType: MainPageConstants.GET_TEAMS,
            companyId: companyId
        });
    }
}