import AppDispatcher from './../AppDispatcher.js';
import MainPageConstants from './../constants/MainPageConstants.js';
import api from './../constants/APIRoutes.js';
import BaseStore from './BaseStore.js';
import $ from 'jquery';
import _ from 'underscore';

var EventEmitter = require('events').EventEmitter;
var CHANGE_EVENT = 'change';


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
    selectedProducts: null
});

AppDispatcher.register(function (action) {
    switch (action.actionType) {
        case MainPageConstants.GET_PRODUCTS:
            setTimeout(getProducts.bind(this, action.update), 0);
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
