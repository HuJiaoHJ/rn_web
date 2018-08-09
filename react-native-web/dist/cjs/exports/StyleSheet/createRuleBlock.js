'use strict';

exports.__esModule = true;

var _hyphenateStyleName = require('hyphenate-style-name');

var _hyphenateStyleName2 = _interopRequireDefault(_hyphenateStyleName);

var _mapKeyValue = require('../../modules/mapKeyValue');

var _mapKeyValue2 = _interopRequireDefault(_mapKeyValue);

var _normalizeValue = require('./normalizeValue');

var _normalizeValue2 = _interopRequireDefault(_normalizeValue);

var _prefixStyles = require('../../modules/prefixStyles');

var _prefixStyles2 = _interopRequireDefault(_prefixStyles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Copyright (c) 2016-present, Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @noflow
 */

var createDeclarationString = function createDeclarationString(prop, val) {
  var name = (0, _hyphenateStyleName2.default)(prop);
  var value = (0, _normalizeValue2.default)(prop, val);
  if (Array.isArray(val)) {
    return val.map(function (v) {
      return name + ':' + v;
    }).join(';');
  }
  return name + ':' + value;
};

/**
 * Generates valid CSS rule body from a JS object
 *
 * createRuleBlock({ width: 20, color: 'blue' });
 * // => 'color:blue;width:20px'
 */
var createRuleBlock = function createRuleBlock(style) {
  return (0, _mapKeyValue2.default)((0, _prefixStyles2.default)(style), createDeclarationString).sort().join(';');
};

exports.default = createRuleBlock;
module.exports = exports['default'];