import AppDispatcher from './../AppDispatcher.js';
import DashboardConstants from './../constants/DashboardConstants.js';

export default {
    getProfile: () => {
        AppDispatcher.dispatch({
            actionType: DashboardConstants.GET_PROFILE
        });
    }
}