import AppDispatcher from './../AppDispatcher.js';
import AppConstants from './../constants/AppConstants.js';

export default {
    getProducts: (update) => {
        AppDispatcher.dispatch({
            actionType: AppConstants.GET_PRODUCTS,
            update: update
        });
    },
    getCategoryProducts: (categoryId) => {
        AppDispatcher.dispatch({
            actionType: AppConstants.GET_CATEGORY_PRODUCTS,
            categoryId: categoryId
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
    getProjectProducts: (projectId, options) => {
        AppDispatcher.dispatch({
            actionType: AppConstants.GET_PROJECT_PRODUCTS,
            projectId: projectId,
            options: options
        });
    },
    createProduct: (product) => {
        AppDispatcher.dispatch({
            actionType: AppConstants.CREATE_PRODUCT,
            data: product
        });
    }
}