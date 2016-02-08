import AppDispatcher from './../AppDispatcher.js';
import MainPageConstants from './../constants/MainPageConstants.js';

export default {
    getCategories: (update) => {
        AppDispatcher.dispatch({
            actionType: MainPageConstants.GET_CATEGORIES,
            update: update
        });
    },
    getCategory: (id) => {
        AppDispatcher.dispatch({
            actionType: MainPageConstants.GET_CATEGORY,
            categoryId: id
        });
    },
    updateCategory: (category) => {
        AppDispatcher.dispatch({
            actionType: MainPageConstants.UPDATE_CATEGORY,
            category: category
        });
    },
    createCategory: (category) => {
        AppDispatcher.dispatch({
            actionType: MainPageConstants.CREATE_CATEGORY,
            data: category
        });
    }
}