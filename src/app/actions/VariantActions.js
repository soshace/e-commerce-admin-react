import AppDispatcher from './../AppDispatcher.js';
import AppConstants from './../constants/AppConstants.js';


export default {
    getProductVariants: (productId) => {
        AppDispatcher.dispatch({
            actionType: AppConstants.GET_PRODUCT_VARIANTS,
            productId: productId
        });
    },
    createVariant: (variant) => {
        AppDispatcher.dispatch({
            actionType: AppConstants.CREATE_VARIANT,
            variant: variant
        });
    },
    updateVariant: (variant) => {
        AppDispatcher.dispatch({
            actionType: AppConstants.UPDATE_VARIANT,
            variant: variant
        });
    },
    removeVariant: (variantId) => {
        AppDispatcher.dispatch({
            actionType: AppConstants.REMOVE_VARIANT,
            variantId: variantId
        });
    },
    updateAttribute: (variantAttr) => {
        AppDispatcher.dispatch({
            actionType: AppConstants.UPDATE_VARIANT_ATTRIBUTE,
            variantAttr: variantAttr
        });
    }
}