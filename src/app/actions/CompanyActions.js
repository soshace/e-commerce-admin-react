import AppDispatcher from './../AppDispatcher.js';
import CompanyConstants from './../constants/CompanyConstants.js';

export default {
    getCompanies: () => {
        AppDispatcher.dispatch({
            actionType: CompanyConstants.GET_COMPANIES
        });
    },
    updateCompany: (id, data) => {
        AppDispatcher.dispatch({
            actionType: CompanyConstants.UPDATE_COMPANY,
            data: data,
            id: id
        })
    }
}