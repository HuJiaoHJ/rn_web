'use strict';

exports.__esModule = true;

var _normalizeCssColor = require('normalize-css-color');

var _normalizeCssColor2 = _interopRequireDefault(_normalizeCssColor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var processColor = function processColor(color) {
  if (color === undefined || color === null) {
    return color;
  }

  // convert number and hex
  var int32Color = (0, _normalizeCssColor2.default)(color);
  if (int32Color === undefined || int32Color === null) {
    return undefined;
  }

  int32Color = (int32Color << 24 | int32Color >>> 8) >>> 0;

  return int32Color;
}; /**
    * Copyright (c) 2016-present, Nicolas Gallagher.
    * Copyright (c) 2015-present, Facebook, Inc.
    *
    * This source code is licensed under the MIT license found in the
    * LICENSE file in the root directory of this source tree.
    *
    * 
    */

exports.default = processColor;
module.exports = exports['default'];