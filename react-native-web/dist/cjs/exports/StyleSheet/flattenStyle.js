'use strict';

exports.__esModule = true;

var _ReactNativePropRegistry = require('../../modules/ReactNativePropRegistry');

var _ReactNativePropRegistry2 = _interopRequireDefault(_ReactNativePropRegistry);

var _invariant = require('fbjs/lib/invariant');

var _invariant2 = _interopRequireDefault(_invariant);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Copyright (c) 2015-present, Nicolas Gallagher.
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

function getStyle(style) {
  if (typeof style === 'number') {
    return _ReactNativePropRegistry2.default.getByID(style);
  }
  return style;
}

function flattenStyle(style) {
  if (!style) {
    return undefined;
  }

  if (process.env.NODE_ENV !== 'production') {
    (0, _invariant2.default)(style !== true, 'style may be false but not true');
  }

  if (!Array.isArray(style)) {
    // $FlowFixMe
    return getStyle(style);
  }

  var result = {};
  for (var i = 0, styleLength = style.length; i < styleLength; ++i) {
    var computedStyle = flattenStyle(style[i]);
    if (computedStyle) {
      for (var key in computedStyle) {
        var value = computedStyle[key];
        result[key] = value;
      }
    }
  }
  return result;
}

exports.default = flattenStyle;
module.exports = exports['default'];