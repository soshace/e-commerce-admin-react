import AppDispatcher from './../AppDispatcher.js';
import MainPageConstants from './../constants/MainPageConstants.js';


export default {
    getProductVariants: (productId) => {
        AppDispatcher.dispatch({
            actionType: MainPageConstants.GET_PRODUCT_VARIANTS,
            productId: productId
        });
    },
    createVariant: (variant) => {
        AppDispatcher.dispatch({
            actionType: MainPageConstants.CREATE_VARIANT,
            variant: variant
        });
    },
    removeVariant: (variantId) => {
        AppDispatcher.dispatch({
            actionType: MainPageConstants.REMOVE_VARIANT,
            variant: variantId
        });
    },
    updateAttribute: (variantAttr) => {
        AppDispatcher.dispatch({
            actionType: MainPageConstants.UPDATE_VARIANT_ATTRIBUTE,
            variantAttr: variantAttr
        });
    }
}