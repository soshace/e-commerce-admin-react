import AppDispatcher from './../AppDispatcher.js';
import ProductConstants from './../constants/ProductConstants.js';
import api from './../constants/APIRoutes.js';
import $ from 'jquery';
import _ from 'underscore';

var EventEmitter = require('events').EventEmitter;
var CHANGE_EVENT = 'change';


function getProducts() {
    if (ProductStore.products) {
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


var ProductStore = Object.assign({}, EventEmitter.prototype, {
    products: null,

    emitChange() {
        this.emit(CHANGE_EVENT);
    },

    addChangeListener(callback) {
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    }
});

AppDispatcher.register(function (action) {
    switch (action.actionType) {
        case ProductConstants.GET_PRODUCTS:
            setTimeout(getProducts, 0);
            break;
        case ProductConstants.CREATE_PRODUCT:
            setTimeout(createProduct.bind(this, action.data), 0);
            break;

    }
});

export default ProductStore
