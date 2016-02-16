import AppDispatcher from './../AppDispatcher.js';
import AppConstants from './../constants/AppConstants.js';
import ResponseCodes from './../constants/ResponseCodes.js';
import api from './../constants/APIRoutes.js';
import BaseStore from './BaseStore.js';
import _ from 'underscore';

var EventEmitter = require('events').EventEmitter;


function getProductImages() {
    api.request({
        method: 'GET',
        url: api.IMAGES,
        success: function (res) {
            ImageStore.images = res.images;
            ImageStore.emitChange();
        }
    });
}

function getImage(id) {
    api.request({
        method: 'GET',
        url: `${api.IMAGES}/${id}`,
        success: function (res) {
            ImageStore.selectedImage = res.image;
            ImageStore.emitChange();
        }
    });
}

function addImage(image) {
    api.request({
        method: 'POST',
        url: api.IMAGES,
        data: image,
        success: function (res) {
            ImageStore.selectedImage = res.image;
            ImageStore.images.push(res.image);
            ImageStore.emitChange();
        }
    });
}

function updateImage(image) {
    api.request({
        method: 'PUT',
        url: `${api.IMAGES}/${image.id}`,
        data: image,
        success: function (res) {
            var images = ImageStore.images,
                img = _.findWhere(images, {id: res.image.id});
            Object.assign(img, res.image);
            ImageStore.emitChange();
        }
    });
}

function removeImage(id) {
    api.request({
        method: 'DELETE',
        url: `${api.IMAGES}/${id}`,
        success: function (res) {
            ImageStore.images = _.reject(ImageStore.images, {id: res.image.id});
            ImageStore.emitChange();
        }
    });
}

var ImageStore = Object.assign({}, BaseStore, EventEmitter.prototype, {
    images: null,
    selectedImage: null
});


AppDispatcher.register(function (action) {
    switch (action.actionType) {
        case AppConstants.GET_PRODUCT_IMAGES:
            setTimeout(getProductImages, 0);
            break;
        case AppConstants.GET_IMAGE:
            setTimeout(getImage.bind(this, action.imageId), 0);
            break;
        case AppConstants.ADD_IMAGE:
            setTimeout(addImage.bind(this, action.image), 0);
            break;
        case AppConstants.UPDATE_IMAGE:
            setTimeout(updateImage.bind(this, action.image), 0);
            break;
        case AppConstants.REMOVE_IMAGE:
            setTimeout(removeImage.bind(this, action.imageId), 0);
            break;

    }
});

export default ImageStore
