'use strict';

exports.__esModule = true;

var _invariant = require('fbjs/lib/invariant');

var _invariant2 = _interopRequireDefault(_invariant);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ensurePositiveDelayProps = function ensurePositiveDelayProps(props) {
  (0, _invariant2.default)(!(props.delayPressIn < 0 || props.delayPressOut < 0 || props.delayLongPress < 0), 'Touchable components cannot have negative delay properties');
}; /**
    * Copyright (c) 2015-present, Facebook, Inc.
    *
    * This source code is licensed under the MIT license found in the
    * LICENSE file in the root directory of this source tree.
    *
    * 
    */

exports.default = ensurePositiveDelayProps;
module.exports = exports['default'];