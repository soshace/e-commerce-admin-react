import AppDispatcher from './../AppDispatcher.js';
import MainPageConstants from './../constants/MainPageConstants.js';
import api from './../constants/APIRoutes.js';
import BaseStore from './BaseStore.js';
import _ from 'underscore';

var EventEmitter = require('events').EventEmitter;
var CHANGE_EVENT = 'change';

function getProduct(id) {
    api.request({
        method: 'GET',
        url: `${api.PRODUCTS}/${id}`,
        success: function (res) {
            ProductStore.selectedProduct = res.product;
            ProductStore.emitChange();
        }
    });
}

function updateProduct(product) {
    api.request({
        method: 'PUT',
        url: `${api.PRODUCTS}/${product.id}`,
        data: product,
        success: function (res) {
            //ProductStore.selectedProduct = res.product;
            ProductStore.emitChange();
        }
    });
}

function updateProductCategory(checked, productId, categoryId) {
    var method = checked ? 'POST' : 'DELETE';
    api.request({
        method: method,
        url: `${api.CATEGORIES}/${categoryId}/products/${productId}`,
        success: function (res) {
            //ProductStore.selectedProduct = res.product;
            ProductStore.emitChange();
        }
    });
}

function getProducts(update) {
    if (ProductStore.products && !update) {
        ProductStore.emitChange();
    } else {
        api.request({
            method: 'GET',
            url: api.PRODUCTS,
            success: function (res) {
                ProductStore.products = res.products;
                ProductStore.emitChange();
            }
        });
    }
}

function getProjectProducts(update, projectId) {
    if (ProductStore.selectedProducts && !update) {
        ProductStore.emitChange();
    } else {
        api.request({
            method: 'GET',
            url: `${api.PROJECTS}/${projectId}/products`,
            success: function (res) {
                ProductStore.selectedProducts = res.products;
                ProductStore.emitChange();
            }
        });
    }
}

function createProduct(data) {
    api.request({
        method: 'POST',
        url: api.PRODUCTS,
        data: data,
        success: function (res) {
            ProductStore.emitChange();
        }
    });
}


var ProductStore = Object.assign({}, BaseStore, EventEmitter.prototype, {
    products: null,
    selectedProduct: null,
    selectedProducts: null
});

AppDispatcher.register(function (action) {
    switch (action.actionType) {
        case MainPageConstants.GET_PRODUCTS:
            setTimeout(getProducts.bind(this, action.update), 0);
            break;
        case MainPageConstants.GET_PRODUCT:
            setTimeout(getProduct.bind(this, action.productId), 0);
            break;
        case MainPageConstants.UPDATE_PRODUCT:
            setTimeout(updateProduct.bind(this, action.product), 0);
            break;
        case MainPageConstants.UPDATE_PRODUCT_CATEGORY:
            setTimeout(updateProductCategory.bind(this, action.checked, action.productId, action.categoryId), 0);
            break;
        case MainPageConstants.GET_PROJECT_PRODUCTS:
            setTimeout(getProjectProducts.bind(this, action.update, action.projectId), 0);
            break;
        case MainPageConstants.CREATE_PRODUCT:
            setTimeout(createProduct.bind(this, action.data), 0);
            break;

    }
});

export default ProductStore
