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

    // Attributes
    updateAttribute: (variantAttr) => {
        AppDispatcher.dispatch({
            actionType: AppConstants.UPDATE_VARIANT_ATTRIBUTE,
            variantAttr: variantAttr
        });
    },

    // Images
    addImage: (image) => {
        AppDispatcher.dispatch({
            actionType: AppConstants.ADD_IMAGE,
            image: image
        });
    },
    uploadImage: (image, variant) => {
        AppDispatcher.dispatch({
            actionType: AppConstants.UPLOAD_IMAGE,
            image: image,
            variant: variant
        });
    },
    updateImage: (image) => {
        AppDispatcher.dispatch({
            actionType: AppConstants.UPDATE_IMAGE,
            image: image
        });
    },
    removeImage: (imageId) => {
        AppDispatcher.dispatch({
            actionType: AppConstants.REMOVE_IMAGE,
            imageId: imageId
        });
    },

    // Prices
    addPrice: (price) => {
        AppDispatcher.dispatch({
            actionType: AppConstants.ADD_PRICE,
            price: price
        });
    },

    updatePrice: (price) => {
        AppDispatcher.dispatch({
            actionType: AppConstants.UPDATE_PRICE,
            price: price
        });
    },
    removePrice: (priceId) => {
        AppDispatcher.dispatch({
            actionType: AppConstants.REMOVE_PRICE,
            priceId: priceId
        });
    }

}