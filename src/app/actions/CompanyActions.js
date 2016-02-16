import AppDispatcher from './../AppDispatcher.js';
import AppConstants from './../constants/AppConstants.js';

export default {
    getCompanies: () => {
        AppDispatcher.dispatch({
            actionType: AppConstants.GET_COMPANIES
        });
    },
    createCompany: (data) => {
        AppDispatcher.dispatch({
            actionType: AppConstants.CREATE_COMPANY,
            data: data
        })
    },
    updateCompany: (id, data) => {
        AppDispatcher.dispatch({
            actionType: AppConstants.UPDATE_COMPANY,
            data: data,
            id: id
        })
    }
}