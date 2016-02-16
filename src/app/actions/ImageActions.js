import AppDispatcher from './../AppDispatcher.js';
import MainPageConstants from './../constants/MainPageConstants.js';


export default {
    getProductImages: () => {
        AppDispatcher.dispatch({
            actionType: MainPageConstants.GET_PRODUCT_IMAGES
        });
    },
    getImage: (imageId) => {
        AppDispatcher.dispatch({
            actionType: MainPageConstants.GET_IMAGE,
            imagesId: imageId
        });
    },
    addImage: (image) => {
        AppDispatcher.dispatch({
            actionType: MainPageConstants.ADD_IMAGE,
            image: image
        });
    },
    updateImage: (image) => {
        AppDispatcher.dispatch({
            actionType: MainPageConstants.UPDATE_IMAGE,
            image: image
        });
    },
    removeImage: (imageId) => {
        AppDispatcher.dispatch({
            actionType: MainPageConstants.REMOVE_IMAGE,
            imagesId: imageId
        });
    }
}