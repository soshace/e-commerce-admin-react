var EventEmitter = require('events').EventEmitter;
var CHANGE_EVENT = 'change';


var BaseStore = Object.assign({}, EventEmitter.prototype, {
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

export default BaseStore
