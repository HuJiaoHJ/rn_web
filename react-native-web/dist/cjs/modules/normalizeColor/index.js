'use strict';

exports.__esModule = true;

var _isWebColor = require('../isWebColor');

var _isWebColor2 = _interopRequireDefault(_isWebColor);

var _processColor = require('../../exports/processColor');

var _processColor2 = _interopRequireDefault(_processColor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Copyright (c) 2016-present, Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

var normalizeColor = function normalizeColor(color) {
  var opacity = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

  if (color == null) return;

  if (typeof color === 'string' && (0, _isWebColor2.default)(color)) {
    return color;
  }

  var colorInt = (0, _processColor2.default)(color);
  if (colorInt != null) {
    var r = colorInt >> 16 & 255;
    var g = colorInt >> 8 & 255;
    var b = colorInt & 255;
    var a = (colorInt >> 24 & 255) / 255;
    var alpha = (a * opacity).toFixed(2);
    return 'rgba(' + r + ',' + g + ',' + b + ',' + alpha + ')';
  }
};

exports.default = normalizeColor;
module.exports = exports['default'];