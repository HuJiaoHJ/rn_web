'use strict';

exports.__esModule = true;

var _isDisabled = require('./isDisabled');

var _isDisabled2 = _interopRequireDefault(_isDisabled);

var _propsToAccessibilityComponent = require('./propsToAccessibilityComponent');

var _propsToAccessibilityComponent2 = _interopRequireDefault(_propsToAccessibilityComponent);

var _propsToAriaRole = require('./propsToAriaRole');

var _propsToAriaRole2 = _interopRequireDefault(_propsToAriaRole);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AccessibilityUtil = {
  isDisabled: _isDisabled2.default,
  propsToAccessibilityComponent: _propsToAccessibilityComponent2.default,
  propsToAriaRole: _propsToAriaRole2.default
}; /**
    * Copyright (c) 2017-present, Nicolas Gallagher.
    *
    * This source code is licensed under the MIT license found in the
    * LICENSE file in the root directory of this source tree.
    *
    * 
    */

exports.default = AccessibilityUtil;
module.exports = exports['default'];