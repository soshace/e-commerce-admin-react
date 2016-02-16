import AppDispatcher from './../AppDispatcher.js';
import AppConstants from './../constants/AppConstants.js';


export default {
    getProductImages: () => {
        AppDispatcher.dispatch({
            actionType: AppConstants.GET_PRODUCT_IMAGES
        });
    },
    getImage: (imageId) => {
        AppDispatcher.dispatch({
            actionType: AppConstants.GET_IMAGE,
            imagesId: imageId
        });
    },
    addImage: (image) => {
        AppDispatcher.dispatch({
            actionType: AppConstants.ADD_IMAGE,
            image: image
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
            imagesId: imageId
        });
    }
}