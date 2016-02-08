import AppDispatcher from './../AppDispatcher.js';
import MainPageConstants from './../constants/MainPageConstants.js';

export default {
    getProducts: () => {
        AppDispatcher.dispatch({
            actionType: MainPageConstants.GET_PRODUCTS
        });
    },
    createProduct: (product) => {
        AppDispatcher.dispatch({
            actionType: MainPageConstants.CREATE_PRODUCT,
            data: product
        });
    }
}