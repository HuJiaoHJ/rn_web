'use strict';

exports.__esModule = true;

var _StyleSheetValidation = require('./StyleSheetValidation');

var _StyleSheetValidation2 = _interopRequireDefault(_StyleSheetValidation);

var _ReactNativePropRegistry = require('../../modules/ReactNativePropRegistry');

var _ReactNativePropRegistry2 = _interopRequireDefault(_ReactNativePropRegistry);

var _flattenStyle = require('./flattenStyle');

var _flattenStyle2 = _interopRequireDefault(_flattenStyle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var absoluteFillObject = {
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0
}; /**
    * Copyright (c) 2016-present, Nicolas Gallagher.
    *
    * This source code is licensed under the MIT license found in the
    * LICENSE file in the root directory of this source tree.
    *
    * @noflow
    */

var absoluteFill = _ReactNativePropRegistry2.default.register(absoluteFillObject);

var StyleSheet = {
  absoluteFill: absoluteFill,
  absoluteFillObject: absoluteFillObject,
  compose: function compose(style1, style2) {
    if (style1 && style2) {
      return [style1, style2];
    } else {
      return style1 || style2;
    }
  },
  create: function create(styles) {
    var result = {};
    Object.keys(styles).forEach(function (key) {
      if (process.env.NODE_ENV !== 'production') {
        _StyleSheetValidation2.default.validateStyle(key, styles);
      }
      var id = styles[key] && _ReactNativePropRegistry2.default.register(styles[key]);
      result[key] = id;
    });
    return result;
  },

  flatten: _flattenStyle2.default,
  hairlineWidth: 1
};

exports.default = StyleSheet;
module.exports = exports['default'];