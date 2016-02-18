import AppDispatcher from './../AppDispatcher.js';
import AppConstants from './../constants/AppConstants.js';

export default {
    getLanguages: () => {
        AppDispatcher.dispatch({
            actionType: AppConstants.GET_LANGUAGES
        });
    },
    getCurrencies: () => {
        AppDispatcher.dispatch({
            actionType: AppConstants.GET_CURRENCIES
        });
    },
    getCountries: () => {
        AppDispatcher.dispatch({
            actionType: AppConstants.GET_COUNTRIES
        });
    }
}