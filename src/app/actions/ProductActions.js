import AppDispatcher from './../AppDispatcher.js';
import MainPageConstants from './../constants/MainPageConstants.js';

export default {
    getProducts: (update) => {
        AppDispatcher.dispatch({
            actionType: MainPageConstants.GET_PRODUCTS,
            update: update
        });
    },
    getProjectProducts: (update, projectId) => {
        AppDispatcher.dispatch({
            actionType: MainPageConstants.GET_PROJECT_PRODUCTS,
            update: update,
            projectId: projectId
        });
    },
    createProduct: (product) => {
        AppDispatcher.dispatch({
            actionType: MainPageConstants.CREATE_PRODUCT,
            data: product
        });
    }
}