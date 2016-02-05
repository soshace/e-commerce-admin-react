import AppDispatcher from './../AppDispatcher.js';
import ProductConstants from './../constants/ProductConstants.js';
import api from './../constants/APIRoutes.js';
import $ from 'jquery';
import _ from 'underscore';

var EventEmitter = require('events').EventEmitter;
var CHANGE_EVENT = 'change';


function getProducts() {
    ProductStore.products = [
        {
            'id': 1,
            'name': 'Product 1',
            'description': 'This is a description about product 1'
        },
        {
            'id': 2,
            'name': 'Product 2',
            'description': 'This is a description about product 2'
        },
        {
            'id': 3,
            'name': 'Product 3',
            'description': 'This is a description about product 3'
        },
        {
            'id': 4,
            'name': 'Product 4',
            'description': 'This is a description about product 4'
        },
        {
            'id': 5,
            'name': 'Product 5',
            'description': 'This is a description about product 5'
        },
        {
            'id': 6,
            'name': 'Product 6',
            'description': 'This is a description about product 6'
        },
        {
            'id': 7,
            'name': 'Product 7',
            'description': 'This is a description about product 7'
        },
        {
            'id': 8,
            'name': 'Product 8',
            'description': 'This is a description about product 8'
        },
        {
            'id': 9,
            'name': 'Product 9',
            'description': 'This is a description about product 9'
        }
    ];
    ProductStore.emitChange();
    //if (ProductStore.products) {
    //    ProductStore.emitChange();
    //} else {
    //    $.ajax({
    //        method: 'GET',
    //        url: api.COMPANIES,
    //        contentType: 'application/json; charset=utf-8',
    //        dataType: 'json',
    //        xhrFields: {
    //            withCredentials: true
    //        },
    //        success: function (res) {
    //            ProductStore.products = res.products;
    //            ProductStore.emitChange();
    //        },
    //        error: function (err) {
    //            console.error(err);
    //        }
    //    });
    //}
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

    }
});

export default ProductStore
