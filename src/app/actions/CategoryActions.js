import AppDispatcher from './../AppDispatcher.js';
import AppConstants from './../constants/AppConstants.js';

export default {
    getCategories: (update) => {
        AppDispatcher.dispatch({
            actionType: AppConstants.GET_CATEGORIES,
            update: update
        });
    },
    getProjectCategories: (update, projectId) => {
        AppDispatcher.dispatch({
            actionType: AppConstants.GET_PROJECT_CATEGORIES,
            update: update,
            projectId: projectId
        });
    },
    getProductCategories: (update, projectId) => {
        AppDispatcher.dispatch({
            actionType: AppConstants.GET_PRODUCT_CATEGORIES,
            update: update,
            projectId: projectId
        });
    },
    getCategory: (id) => {
        AppDispatcher.dispatch({
            actionType: AppConstants.GET_CATEGORY,
            categoryId: id
        });
    },
    updateCategory: (category) => {
        AppDispatcher.dispatch({
            actionType: AppConstants.UPDATE_CATEGORY,
            category: category
        });
    },
    createCategory: (category) => {
        AppDispatcher.dispatch({
            actionType: AppConstants.CREATE_CATEGORY,
            data: category
        });
    }
}