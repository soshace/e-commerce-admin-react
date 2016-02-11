import MainPageConstants from './../constants/MainPageConstants.js';
import AppDispatcher from './../AppDispatcher.js';
import api from './../constants/APIRoutes.js';
import BaseStore from './BaseStore.js';
import $ from 'jquery';
import _ from 'underscore';

var EventEmitter = require('events').EventEmitter;


function getProjectProductTypes(projectId) {
    $.ajax({
        method: 'GET',
        url: `${api.PROJECTS}/${projectId}/product_types`,
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        xhrFields: {
            withCredentials: true
        },
        success: function (res) {
            ProductTypeStore.selectedProductTypes = res.productTypes;
            ProductTypeStore.emitChange();
        },
        error: function (err) {
            console.error(err);
        }
    });
}

function getProductType(id, withAttrs) {
    $.ajax({
        method: 'GET',
        url: `${api.PRODUCT_TYPES}/${id}`,
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        xhrFields: {
            withCredentials: true
        },
        success: function (res) {
            ProductTypeStore.selectedProductType = res.productType;
            if (withAttrs) {
                getProductTypeAttributes();
            } else {
                ProductTypeStore.emitChange();
            }
        },
        error: function (err) {
            console.error(err);
        }
    });
}

function getProductTypeAttributes(productTypeId) {
    var id = productTypeId || ProductTypeStore.selectedProductType.id;
    $.ajax({
        method: 'GET',
        url: `${api.PRODUCT_TYPES}/${id}/product_attributes`,
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        xhrFields: {
            withCredentials: true
        },
        success: function (res) {
            ProductTypeStore.selectedProductType.attributes = res.productAttributes;
            ProductTypeStore.emitChange();
        },
        error: function (err) {
            console.error(err);
        }
    });
}

function createProductType(productType) {
    $.ajax({
        method: 'POST',
        url: api.PRODUCT_TYPES,
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        data: JSON.stringify(productType),
        xhrFields: {
            withCredentials: true
        },
        success: function (res) {
            var productType = res.productType;
            ProductTypeStore.selectedProductTypes.push(productType);
            ProductTypeStore.selectedProductType = productType;
            ProductTypeStore.emitChange();
        },
        error: function (err) {
            console.error(err);
        }
    });
}

function updateProductType(productType) {
    $.ajax({
        method: 'PUT',
        url: `${api.PRODUCT_TYPES}/${productType.id}`,
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        data: JSON.stringify(productType),
        xhrFields: {
            withCredentials: true
        },
        success: function (res) {
            var selectedProductTypes = _.reject(ProductTypeStore.selectedProductTypes, {id: productType.id});
            selectedProductTypes.push(productType);
            ProductTypeStore.selectedProductTypes = selectedProductTypes;
            ProductTypeStore.selectedProductType = productType;
            ProductTypeStore.emitChange();
        },
        error: function (err) {
            console.error(err);
        }
    });
}

function addAttribute(newAttribute) {
    $.ajax({
        method: 'POST',
        url: `${api.PRODUCT_ATTRIBUTES}`,
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        data: JSON.stringify(newAttribute),
        xhrFields: {
            withCredentials: true
        },
        success: function (res) {
            ProductTypeStore.selectedProductType.attributes.unshift(res.productAttribute);
            ProductTypeStore.emitChange();
        },
        error: function (err) {
            console.error(err);
        }
    });
}

function removeAttribute(id) {
    $.ajax({
        method: 'DELETE',
        url: `${api.PRODUCT_ATTRIBUTES}/${id}`,
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        xhrFields: {
            withCredentials: true
        },
        success: function (res) {
            var attrs = _.reject(ProductTypeStore.selectedProductType.attributes, {id: id});
            ProductTypeStore.selectedProductType.attributes = attrs;
            ProductTypeStore.emitChange();
        },
        error: function (err) {
            console.error(err);
        }
    });
}

var ProductTypeStore = Object.assign({}, BaseStore, EventEmitter.prototype, {
    selectedProductType: {},
    selectedProductTypes: [],
    getTypeById: (id) => {
        return _.findWhere(ProductTypeStore.selectedProductTypes, {id: id});
    }
});

AppDispatcher.register(function (action) {
    switch (action.actionType) {
        case MainPageConstants.GET_PROJECT_PRODUCT_TYPES:
            getProjectProductTypes(action.projectId);
            break;
        case MainPageConstants.GET_PRODUCT_TYPE:
            getProductType(action.productTypeId, action.withAttrs);
            break;
        case MainPageConstants.GET_PRODUCT_TYPE_ATTRS:
            getProductTypeAttributes(action.productTypeId);
            break;
        case MainPageConstants.CREATE_PRODUCT_TYPE:
            createProductType(action.productType);
            break;
        case MainPageConstants.UPDATE_PRODUCT_TYPE:
            updateProductType(action.productType);
            break;
        case MainPageConstants.ADD_ATTRIBUTE:
            addAttribute(action.newAttribute);
            break;
        case MainPageConstants.REMOVE_ATTRIBUTE:
            removeAttribute(action.attrId);
            break;
    }
});

export default ProductTypeStore
