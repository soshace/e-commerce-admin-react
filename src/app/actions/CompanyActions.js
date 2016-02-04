import AppDispatcher from './../AppDispatcher.js';
import CompanyConstants from './../constants/CompanyConstants.js';

export default {
    getCompanies: () => {
        AppDispatcher.dispatch({
            actionType: CompanyConstants.GET_COMPANIES
        });
    },
    createCompany: (data) => {
        AppDispatcher.dispatch({
            actionType: CompanyConstants.CREATE_COMPANY,
            data: data
        })
    },
    updateCompany: (id, data) => {
        AppDispatcher.dispatch({
            actionType: CompanyConstants.UPDATE_COMPANY,
            data: data,
            id: id
        })
    }
}