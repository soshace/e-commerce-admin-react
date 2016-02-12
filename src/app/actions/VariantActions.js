import AppDispatcher from './../AppDispatcher.js';
import MainPageConstants from './../constants/MainPageConstants.js';


export default {
    getProductVariants: (productId) => {
        AppDispatcher.dispatch({
            actionType: MainPageConstants.GET_PRODUCT_VARIANTS,
            productId: productId
        });
    },
    updateAttribute: (variantAttr) => {
        AppDispatcher.dispatch({
            actionType: MainPageConstants.UPDATE_VARIANT_ATTRIBUTE,
            variantAttr: variantAttr
        });
    }
}