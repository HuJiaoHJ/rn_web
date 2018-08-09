'use strict';

exports.__esModule = true;

var _ExecutionEnvironment = require('fbjs/lib/ExecutionEnvironment');

var _invariant = require('fbjs/lib/invariant');

var _invariant2 = _interopRequireDefault(_invariant);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Copyright (c) 2016-present, Nicolas Gallagher.
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

var initialURL = _ExecutionEnvironment.canUseDOM ? window.location.href : '';

var Linking = {
  addEventListener: function addEventListener() {},
  removeEventListener: function removeEventListener() {},
  canOpenURL: function canOpenURL() {
    return Promise.resolve(true);
  },
  getInitialURL: function getInitialURL() {
    return Promise.resolve(initialURL);
  },
  openURL: function openURL(url) {
    try {
      open(url);
      return Promise.resolve();
    } catch (e) {
      return Promise.reject(e);
    }
  },
  _validateURL: function _validateURL(url) {
    (0, _invariant2.default)(typeof url === 'string', 'Invalid URL: should be a string. Was: ' + url);
    (0, _invariant2.default)(url, 'Invalid URL: cannot be empty');
  }
};

var open = function open(url) {
  if (_ExecutionEnvironment.canUseDOM) {
    window.location = new URL(url, window.location).toString();
  }
};

exports.default = Linking;
module.exports = exports['default'];