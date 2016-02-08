import AppDispatcher from './../AppDispatcher.js';
import MainPageConstants from './../constants/MainPageConstants.js';

export default {
    getCategories: () => {
        AppDispatcher.dispatch({
            actionType: MainPageConstants.GET_CATEGORIES
        });
    },
    createCategory: (category) => {
        AppDispatcher.dispatch({
            actionType: MainPageConstants.CREATE_CATEGORY,
            data: category
        });
    }
}