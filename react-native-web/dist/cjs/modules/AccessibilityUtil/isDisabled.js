'use strict';

exports.__esModule = true;
/**
 * Copyright (c) 2017-present, Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

var isDisabled = function isDisabled(props) {
  return props.disabled || props['aria-disabled'];
};

exports.default = isDisabled;
module.exports = exports['default'];