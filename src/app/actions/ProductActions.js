import AppDispatcher from './../AppDispatcher.js';
import ProductConstants from './../constants/ProductConstants.js';

export default {
    getProducts: () => {
        AppDispatcher.dispatch({
            actionType: ProductConstants.GET_PRODUCTS
        });
    }
}