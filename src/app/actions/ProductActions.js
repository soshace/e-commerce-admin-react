import AppDispatcher from './../AppDispatcher.js';
import AppConstants from './../constants/AppConstants.js';

export default {
    getProducts: (update) => {
        AppDispatcher.dispatch({
            actionType: AppConstants.GET_PRODUCTS,
            update: update
        });
    },
    getProduct: (id) => {
        AppDispatcher.dispatch({
            actionType: AppConstants.GET_PRODUCT,
            productId: id
        });
    },
    updateProduct: (product) => {
        AppDispatcher.dispatch({
            actionType: AppConstants.UPDATE_PRODUCT,
            product: product
        });
    },
    updateProductCategory: (checked, productId, categoryId) => {
        AppDispatcher.dispatch({
            actionType: AppConstants.UPDATE_PRODUCT_CATEGORY,
            checked: checked,
            productId: productId,
            categoryId: categoryId
        });
    },
    getProjectProducts: (update, projectId) => {
        AppDispatcher.dispatch({
            actionType: AppConstants.GET_PROJECT_PRODUCTS,
            update: update,
            projectId: projectId
        });
    },
    createProduct: (product) => {
        AppDispatcher.dispatch({
            actionType: AppConstants.CREATE_PRODUCT,
            data: product
        });
    }
}