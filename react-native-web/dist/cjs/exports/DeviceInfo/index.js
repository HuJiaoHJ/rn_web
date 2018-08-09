'use strict';

exports.__esModule = true;

var _ExecutionEnvironment = require('fbjs/lib/ExecutionEnvironment');

var _Dimensions = require('../Dimensions');

var _Dimensions2 = _interopRequireDefault(_Dimensions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Copyright (c) 2015-present, Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

var DeviceInfo = {
  Dimensions: {
    get windowPhysicalPixels() {
      var _Dimensions$get = _Dimensions2.default.get('window'),
          width = _Dimensions$get.width,
          height = _Dimensions$get.height,
          fontScale = _Dimensions$get.fontScale,
          scale = _Dimensions$get.scale;

      return {
        width: width * scale,
        height: height * scale,
        scale: scale,
        fontScale: fontScale
      };
    },
    get screenPhysicalPixels() {
      var _Dimensions$get2 = _Dimensions2.default.get('screen'),
          width = _Dimensions$get2.width,
          height = _Dimensions$get2.height,
          fontScale = _Dimensions$get2.fontScale,
          scale = _Dimensions$get2.scale;

      return {
        width: width * scale,
        height: height * scale,
        scale: scale,
        fontScale: fontScale
      };
    }
  },

  get locale() {
    if (_ExecutionEnvironment.canUseDOM) {
      if (window.navigator.languages) {
        return window.navigator.languages[0];
      } else {
        return window.navigator.language;
      }
    }
  },

  get totalMemory() {
    return _ExecutionEnvironment.canUseDOM ? window.navigator.deviceMemory : undefined;
  },

  get userAgent() {
    return _ExecutionEnvironment.canUseDOM ? window.navigator.userAgent : '';
  }
};

exports.default = DeviceInfo;
module.exports = exports['default'];