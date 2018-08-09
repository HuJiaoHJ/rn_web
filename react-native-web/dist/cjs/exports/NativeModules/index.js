'use strict';

exports.__esModule = true;

var _UIManager = require('../UIManager');

var _UIManager2 = _interopRequireDefault(_UIManager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// NativeModules shim
var NativeModules = {
  UIManager: _UIManager2.default
}; /**
    * Copyright (c) 2016-present, Nicolas Gallagher.
    *
    * This source code is licensed under the MIT license found in the
    * LICENSE file in the root directory of this source tree.
    *
    * @noflow
    */

exports.default = NativeModules;
module.exports = exports['default'];