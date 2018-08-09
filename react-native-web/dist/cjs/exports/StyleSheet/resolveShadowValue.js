'use strict';

exports.__esModule = true;

var _normalizeColor = require('../../modules/normalizeColor');

var _normalizeColor2 = _interopRequireDefault(_normalizeColor);

var _normalizeValue = require('./normalizeValue');

var _normalizeValue2 = _interopRequireDefault(_normalizeValue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Copyright (c) 2018-present, Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

var defaultOffset = { height: 0, width: 0 };

var resolveShadowValue = function resolveShadowValue(style) {
  var shadowColor = style.shadowColor,
      shadowOffset = style.shadowOffset,
      shadowOpacity = style.shadowOpacity,
      shadowRadius = style.shadowRadius;

  var _ref = shadowOffset || defaultOffset,
      height = _ref.height,
      width = _ref.width;

  var offsetX = (0, _normalizeValue2.default)(null, width);
  var offsetY = (0, _normalizeValue2.default)(null, height);
  var blurRadius = (0, _normalizeValue2.default)(null, shadowRadius || 0);
  var color = (0, _normalizeColor2.default)(shadowColor || 'black', shadowOpacity);
  if (color) {
    return offsetX + ' ' + offsetY + ' ' + blurRadius + ' ' + color;
  }
};

exports.default = resolveShadowValue;
module.exports = exports['default'];