'use strict';

exports.__esModule = true;


var _vibrate = function _vibrate(pattern) {
  if ('vibrate' in window.navigator) {
    window.navigator.vibrate(pattern);
  }
}; /**
    * Copyright (c) 2016-present, Nicolas Gallagher.
    * Copyright (c) 2015-present, Facebook, Inc.
    *
    * This source code is licensed under the MIT license found in the
    * LICENSE file in the root directory of this source tree.
    *
    * 
    */

var Vibration = {
  cancel: function cancel() {
    _vibrate(0);
  },
  vibrate: function vibrate() {
    var pattern = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 400;

    _vibrate(pattern);
  }
};

exports.default = Vibration;
module.exports = exports['default'];