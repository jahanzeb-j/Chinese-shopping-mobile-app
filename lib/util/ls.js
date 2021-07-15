import _JSON$stringify from 'babel-runtime/core-js/json/stringify';

export var LS = {
    set: function set(key, value) {
        if (value !== null && value !== undefined && typeof value !== 'string') {
            value = _JSON$stringify(value);
        }
        localStorage.setItem(key, value);
    },
    get: function get(key) {
        var data = localStorage.getItem(key);
        if (data !== null) {
            return data;
        } else {
            return '';
        }
    }
};

export var SS = {
    set: function set(key, value) {
        if (value !== null && value !== undefined && typeof value !== 'string') {
            value = _JSON$stringify(value);
        }
        sessionStorage.setItem(key, value);
    },
    get: function get(key) {
        var data = sessionStorage.getItem(key);
        if (data !== null) {
            return data;
        } else {
            return '';
        }
    }
};