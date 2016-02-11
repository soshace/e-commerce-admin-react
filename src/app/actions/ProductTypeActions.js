import AppDispatcher from './../AppDispatcher.js';
import MainPageConstants from './../constants/MainPageConstants.js';


export default {
    getProjectProductTypes: (projectId) => {
        AppDispatcher.dispatch({
            actionType: MainPageConstants.GET_PROJECT_PRODUCT_TYPES,
            projectId: projectId
        });
    },
    getProductType: (productTypeId, withAttrs) => {
        AppDispatcher.dispatch({
            actionType: MainPageConstants.GET_PRODUCT_TYPE,
            productTypeId: productTypeId,
            withAttrs: withAttrs
        });
    },
    createProductType: (productType) => {
        AppDispatcher.dispatch({
            actionType: MainPageConstants.CREATE_PRODUCT_TYPE,
            productType: productType
        });
    },
    updateProductType: (productType) => {
        AppDispatcher.dispatch({
            actionType: MainPageConstants.UPDATE_PRODUCT_TYPE,
            productType: productType
        });
    },
    addAttribute: (newAttribute) => {
        AppDispatcher.dispatch({
            actionType: MainPageConstants.ADD_ATTRIBUTE,
            newAttribute: newAttribute
        });
    },
    removeAttribute: (id) => {
        AppDispatcher.dispatch({
            actionType: MainPageConstants.REMOVE_ATTRIBUTE,
            attrId: id
        });
    }
}