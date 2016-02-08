import AppDispatcher from './../AppDispatcher.js';
import MainPageConstants from './../constants/MainPageConstants.js';

export default {
    getCategories: (update) => {
        AppDispatcher.dispatch({
            actionType: MainPageConstants.GET_CATEGORIES,
            update: update
        });
    },
    createCategory: (category) => {
        AppDispatcher.dispatch({
            actionType: MainPageConstants.CREATE_CATEGORY,
            data: category
        });
    }
}