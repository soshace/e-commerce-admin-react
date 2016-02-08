import AppDispatcher from './../AppDispatcher.js';
import ProductConstants from './../constants/ProductConstants.js';

export default {
    getProducts: () => {
        AppDispatcher.dispatch({
            actionType: ProductConstants.GET_PRODUCTS
        });
    },
    createProduct: (product) => {
        AppDispatcher.dispatch({
            actionType: ProductConstants.CREATE_PRODUCT,
            data: product
        });
    }
}