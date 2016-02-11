import AppDispatcher from './../AppDispatcher.js';
import MainPageConstants from './../constants/MainPageConstants.js';


export default {
    getProductVariants: (productId) => {
        AppDispatcher.dispatch({
            actionType: MainPageConstants.GET_PRODUCT_VARIANTS,
            productId: productId
        });
    }
}