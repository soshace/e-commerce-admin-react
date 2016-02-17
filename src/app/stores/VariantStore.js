import AppConstants from './../constants/AppConstants.js';
import AppDispatcher from './../AppDispatcher.js';
import api from './../constants/APIRoutes.js';
import BaseStore from './BaseStore.js';
import _ from 'underscore';

var EventEmitter = require('events').EventEmitter;


function getProductVariants(productId) {
    api.request({
        method: 'GET',
        url: `${api.PRODUCTS}/${productId}/variants`,
        success: function (res) {
            VariantStore.selectedVariants = res.variants;
            VariantStore.emitChange();
        }
    });
}

function createVariant(variant) {
    api.request({
        method: 'POST',
        url: api.VARIANTS,
        data: variant,
        success: function (res) {
            //VariantStore.selectedVariants.push(res.variant);
            //VariantStore.emitChange();
            getProductVariants(variant.product);
        }
    });
}

function updateVariant(variant) {
    api.request({
        method: 'PUT',
        url: `${api.VARIANTS}/${variant.id}`,
        data: variant,
        success: function (res) {
            var selectedVariants = VariantStore.selectedVariants,
                variant = _.findWhere(selectedVariants, {id: res.variant.id});
            Object.assign(variant, res.variant);
            VariantStore.emitChange();
        }
    });
}

function removeVariant(variantId) {
    api.request({
        method: 'DELETE',
        url: `${api.VARIANTS}/${variantId}`,
        success: function (res) {
            VariantStore.selectedVariants = _.reject(VariantStore.selectedVariants, {id: variantId});
            VariantStore.emitChange();
        }
    });
}

function updateAttribute(variantAttr) {
    api.request({
        method: 'PUT',
        url: `${api.VARIANT_ATTRIBUTES}/${variantAttr.id}`,
        data: variantAttr,
        success: function (res) {
            var attr = res.attribute,
                variant = _.findWhere(VariantStore.selectedVariants, {id: attr.variant}),
                variantAttr = _.findWhere(variant.attributes, {id: attr.id});
            variantAttr.value = attr.value;
            VariantStore.emitChange();
        }
    });
}


function addImage(image) {
    api.request({
        method: 'POST',
        url: api.IMAGES,
        data: image,
        success: function (res) {
            var variant = _.findWhere(VariantStore.selectedVariants, {id: res.image.variant});
            variant.images.push(res.image);
            VariantStore.emitChange();
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

var VariantStore = Object.assign({}, BaseStore, EventEmitter.prototype, {
    variant: null,
    selectedVariants: []
});

AppDispatcher.register(function (action) {
    switch (action.actionType) {
        case AppConstants.GET_PRODUCT_VARIANTS:
            getProductVariants(action.productId);
            break;
        case AppConstants.CREATE_VARIANT:
            createVariant(action.variant);
            break;
        case AppConstants.UPDATE_VARIANT:
            updateVariant(action.variant);
            break;
        case AppConstants.REMOVE_VARIANT:
            removeVariant(action.variantId);
            break;
        case AppConstants.UPDATE_VARIANT_ATTRIBUTE:
            updateAttribute(action.variantAttr);
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

export default VariantStore
