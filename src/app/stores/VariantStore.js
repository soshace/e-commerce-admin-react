import MainPageConstants from './../constants/MainPageConstants.js';
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
        },
        error: function (err) {
            console.error(err);
        }
    });
}

var VariantStore = Object.assign({}, BaseStore, EventEmitter.prototype, {
    variant: null,
    selectedVariants: []
});

AppDispatcher.register(function (action) {
    switch (action.actionType) {
        case MainPageConstants.GET_PRODUCT_VARIANTS:
            getProductVariants(action.productId);
            break;
    }
});

export default VariantStore
