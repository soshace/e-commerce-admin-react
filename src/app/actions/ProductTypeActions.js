import AppDispatcher from './../AppDispatcher.js';
import AppConstants from './../constants/AppConstants.js';


export default {
    getProjectProductTypes: (projectId) => {
        AppDispatcher.dispatch({
            actionType: AppConstants.GET_PROJECT_PRODUCT_TYPES,
            projectId: projectId
        });
    },
    getProductType: (productTypeId, withAttrs) => {
        AppDispatcher.dispatch({
            actionType: AppConstants.GET_PRODUCT_TYPE,
            productTypeId: productTypeId,
            withAttrs: withAttrs
        });
    },
    getProductTypeAttributes: (productTypeId) => {
        AppDispatcher.dispatch({
            actionType: AppConstants.GET_PRODUCT_TYPE_ATTRS,
            productTypeId: productTypeId
        });
    },
    createProductType: (productType) => {
        AppDispatcher.dispatch({
            actionType: AppConstants.CREATE_PRODUCT_TYPE,
            productType: productType
        });
    },
    updateProductType: (productType) => {
        AppDispatcher.dispatch({
            actionType: AppConstants.UPDATE_PRODUCT_TYPE,
            productType: productType
        });
    },
    addAttribute: (newAttribute) => {
        AppDispatcher.dispatch({
            actionType: AppConstants.ADD_ATTRIBUTE,
            newAttribute: newAttribute
        });
    },
    removeAttribute: (id) => {
        AppDispatcher.dispatch({
            actionType: AppConstants.REMOVE_ATTRIBUTE,
            attrId: id
        });
    }
}