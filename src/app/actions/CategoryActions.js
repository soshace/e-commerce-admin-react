import AppDispatcher from './../AppDispatcher.js';
import MainPageConstants from './../constants/MainPageConstants.js';

export default {
    getCategories: (update) => {
        AppDispatcher.dispatch({
            actionType: MainPageConstants.GET_CATEGORIES,
            update: update
        });
    },
    getProjectCategories: (update, projectId) => {
        AppDispatcher.dispatch({
            actionType: MainPageConstants.GET_PROJECT_CATEGORIES,
            update: update,
            projectId: projectId
        });
    },
    getProductCategories: (update, projectId) => {
        AppDispatcher.dispatch({
            actionType: MainPageConstants.GET_PRODUCT_CATEGORIES,
            update: update,
            projectId: projectId
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