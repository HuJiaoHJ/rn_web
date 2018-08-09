'use strict';

exports.__esModule = true;

var _createStrictShapeTypeChecker = require('../../modules/createStrictShapeTypeChecker');

var _createStrictShapeTypeChecker2 = _interopRequireDefault(_createStrictShapeTypeChecker);

var _propTypes = require('prop-types');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

var EdgeInsetsPropType = (0, _createStrictShapeTypeChecker2.default)({
  top: _propTypes.number,
  left: _propTypes.number,
  bottom: _propTypes.number,
  right: _propTypes.number
});

exports.default = EdgeInsetsPropType;
module.exports = exports['default'];