import _JSON$stringify from 'babel-runtime/core-js/json/stringify';
import _regeneratorRuntime from 'babel-runtime/regenerator';
import _asyncToGenerator from 'babel-runtime/helpers/asyncToGenerator';
import _Promise from 'babel-runtime/core-js/promise';

var _this = this;

import Vue from 'vue';
import { router } from '../router/index.js';
import { LS } from './ls';

export var _isLogin = function _isLogin() {
    var url = HOST_HDPUSER + '/user/isLogin';
    var loginCode = LS.get('loginCode');
    return Vue.resource(url).get({ loginCode: loginCode }).then(function (response) {
        if (response.status == 200 && response.body.code == '200') {
            LS.set('timeStamp_01', new Date().getTime());
            LS.set('loginCode', response.body.respBody.loginCode);
            return new _Promise(function (resolve, reject) {
                resolve({ loginStatus: true, loginCode: response.body.respBody.loginCode });
            });
        } else {
            return new _Promise(function (resolve, reject) {
                resolve({ loginStatus: false });
            });
        }
    }).catch(function (response) {
        return new _Promise(function (resolve, reject) {
            reject({ loginStatus: false });
        });
    });
};

export var _getLoginCode = function () {
    var _ref = _asyncToGenerator(_regeneratorRuntime.mark(function _callee() {
        var timeStamp_01, loginCode, _ref2, loginStatus, _loginCode, loginBackUrl;

        return _regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        timeStamp_01 = LS.get('timeStamp_01');
                        loginCode = LS.get('loginCode');

                        if (!(timeStamp_01 !== '' && (new Date().getTime() - parseInt(timeStamp_01)) / 1000 < 300)) {
                            _context.next = 8;
                            break;
                        }

                        Vue.http.options.headers = {
                            'loginCode': loginCode
                        };
                        LS.set('timeStamp_01', new Date().getTime());
                        return _context.abrupt('return', new _Promise(function (resolve, reject) {
                            resolve({ loginCode: loginCode });
                        }));

                    case 8:
                        _context.next = 10;
                        return _isLogin();

                    case 10:
                        _ref2 = _context.sent;
                        loginStatus = _ref2.loginStatus;

                        if (!loginStatus) {
                            _context.next = 17;
                            break;
                        }

                        _loginCode = LS.get('loginCode');
                        return _context.abrupt('return', new _Promise(function (resolve, reject) {
                            resolve({ loginCode: _loginCode });
                        }));

                    case 17:
                        loginBackUrl = window.location.href;

                        router.push({ path: '/login', query: { loginBackUrl: loginBackUrl } });

                    case 19:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, _this);
    }));

    return function _getLoginCode() {
        return _ref.apply(this, arguments);
    };
}();

export var api_get_no = function api_get_no(option) {
    var url = option.url,
        _option$data = option.data,
        data = _option$data === undefined ? {} : _option$data,
        _option$done = option.done,
        done = _option$done === undefined ? function () {} : _option$done,
        _option$fail = option.fail,
        fail = _option$fail === undefined ? function () {} : _option$fail;

    return Vue.resource(url).get(data).then(function (response) {
        if (response.status == 200) {
            done(response.body);
            return response.body;
        }
    }).catch(function (response) {});
};
export var api_get = function api_get(option) {
    var url = option.url,
        _option$data2 = option.data,
        data = _option$data2 === undefined ? {} : _option$data2,
        _option$done2 = option.done,
        done = _option$done2 === undefined ? function () {} : _option$done2,
        _option$fail2 = option.fail,
        fail = _option$fail2 === undefined ? function () {} : _option$fail2;

    return _getLoginCode().then(function (res) {
        return Vue.resource(url).get(data).then(function (response) {
            if (response.status == 200) {
                done(response.body);
                return response.body;
            }
        }).catch(function (response) {});
    });
};

export var api_post = function api_post(option) {
    var url = option.url,
        _option$data3 = option.data,
        data = _option$data3 === undefined ? {} : _option$data3,
        _option$type = option.type,
        type = _option$type === undefined ? 'json' : _option$type,
        _option$done3 = option.done,
        done = _option$done3 === undefined ? function () {} : _option$done3,
        _option$fail3 = option.fail,
        fail = _option$fail3 === undefined ? function () {} : _option$fail3;

    data = type === 'json' ? _JSON$stringify(data) : data;

    return _getLoginCode().then(function (res) {
        var loginCode = LS.get('loginCode');
        Vue.http.options.headers = {
            'loginCode': loginCode
        };

        Vue.http.options.headers['content-Type'] = type === 'json' ? 'application/json;charset=UTF-8' : 'application/x-www-form-urlencoded;charset=utf-8';
        Vue.http.options.emulateJSON = true;
        return Vue.resource(url).save(data).then(function (response) {
            if (response.status == 200) {
                done(response.body);
                return response.body;
            }
        }).catch(function (response) {
            fail(response);
        });
    });
};
export var api_post_no = function api_post_no(option) {
    var url = option.url,
        _option$data4 = option.data,
        data = _option$data4 === undefined ? {} : _option$data4,
        _option$type2 = option.type,
        type = _option$type2 === undefined ? 'json' : _option$type2,
        _option$done4 = option.done,
        done = _option$done4 === undefined ? function () {} : _option$done4,
        _option$fail4 = option.fail,
        fail = _option$fail4 === undefined ? function () {} : _option$fail4;

    data = type === 'json' ? _JSON$stringify(data) : data;
    Vue.http.options.headers = {};

    Vue.http.options.headers['content-Type'] = type === 'json' ? 'application/json;charset=UTF-8' : 'application/x-www-form-urlencoded;charset=utf-8';
    Vue.http.options.emulateJSON = true;
    return Vue.resource(url).save(data).then(function (response) {
        if (response.status == 200) {
            done(response.body);
            return response.body;
        }
    }).catch(function (response) {
        fail(response);
    });
};