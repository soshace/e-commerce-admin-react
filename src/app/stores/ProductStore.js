import AppDispatcher from './../AppDispatcher.js';
import MainPageConstants from './../constants/MainPageConstants.js';
import api from './../constants/APIRoutes.js';
import BaseStore from './BaseStore.js';
import $ from 'jquery';
import _ from 'underscore';

var EventEmitter = require('events').EventEmitter;
var CHANGE_EVENT = 'change';

function getProduct(id) {
    $.ajax({
        method: 'GET',
        // TODO: if user changes url manually, there may be problems with products of another projects
        url: `${api.PRODUCTS}/${id}`,
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        xhrFields: {
            withCredentials: true
        },
        success: function (res) {
            ProductStore.selectedProduct = res.product;
            ProductStore.emitChange();
        },
        error: function (err) {
            console.error(err);
        }
    });
}

function updateProduct(product) {
    $.ajax({
        method: 'PUT',
        url: `${api.PRODUCTS}/${product.id}`,
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify(product),
        dataType: 'json',
        xhrFields: {
            withCredentials: true
        },
        success: function (res) {
            //ProductStore.selectedProduct = res.product;
            ProductStore.emitChange();
        },
        error: function (err) {
            console.error(err);
        }
    });
}

function updateProductCategory(checked, productId, categoryId) {
    var method = checked ? 'POST' : 'DELETE';
    $.ajax({
        method: method,
        url: `${api.CATEGORIES}/${categoryId}/products/${productId}`,
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        xhrFields: {
            withCredentials: true
        },
        success: function (res) {
            //ProductStore.selectedProduct = res.product;
            ProductStore.emitChange();
        },
        error: function (err) {
            console.error(err);
        }
    });
}

function getProducts(update) {
    if (ProductStore.products && !update) {
        ProductStore.emitChange();
    } else {
        $.ajax({
            method: 'GET',
            url: api.PRODUCTS,
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            xhrFields: {
                withCredentials: true
            },
            success: function (res) {
                ProductStore.products = res.products;
                ProductStore.emitChange();
            },
            error: function (err) {
                console.error(err);
            }
        });
    }
}

function getProjectProducts(update, projectId) {
    if (ProductStore.selectedProducts && !update) {
        ProductStore.emitChange();
    } else {
        $.ajax({
            method: 'GET',
            url: `${api.PROJECTS}/${projectId}/products`,
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            xhrFields: {
                withCredentials: true
            },
            success: function (res) {
                ProductStore.selectedProducts = res.products;
                ProductStore.emitChange();
            },
            error: function (err) {
                console.error(err);
            }
        });
    }
}

function createProduct(data) {
    $.ajax({
        method: 'POST',
        url: api.PRODUCTS,
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        data: JSON.stringify(data),
        xhrFields: {
            withCredentials: true
        },
        success: function (res) {
            ProductStore.emitChange();
        },
        error: function (err) {
            console.error(err);
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
