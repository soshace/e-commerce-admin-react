import AppDispatcher from './../AppDispatcher.js';
import MainPageConstants from './../constants/MainPageConstants.js';


export default {
    getProjectProductTypes: (projectId) => {
        AppDispatcher.dispatch({
            actionType: MainPageConstants.GET_PROJECT_PRODUCT_TYPES,
            projectId: projectId
        });
    },
    createProductType: (productType) => {
        AppDispatcher.dispatch({
            actionType: MainPageConstants.CREATE_PRODUCT_TYPE,
            productType: productType
        });
    }
}