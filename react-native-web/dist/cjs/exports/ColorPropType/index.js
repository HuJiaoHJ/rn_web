'use strict';

exports.__esModule = true;

var _normalizeColor = require('../../modules/normalizeColor');

var _normalizeColor2 = _interopRequireDefault(_normalizeColor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var colorPropType = function colorPropType(isRequired, props, propName, componentName, location, propFullName) {
  var color = props[propName];
  if (color === undefined || color === null) {
    if (isRequired) {
      return new Error('Required ' + location + ' `' + (propFullName || propName) + '` was not specified in `' + componentName + '`.');
    }
    return;
  }

  if (typeof color === 'number') {
    // Developers should not use a number, but we are using the prop type
    // both for user provided colors and for transformed ones. This isn't ideal
    // and should be fixed but will do for now...
    return;
  }

  if ((0, _normalizeColor2.default)(color) === null) {
    return new Error('Invalid ' + location + ' `' + (propFullName || propName) + '` supplied to `' + componentName + '`: ' + color + '\n' + 'Valid color formats are\n  - \'#f0f\' (#rgb)\n  - \'#f0fc\' (#rgba)\n  - \'#ff00ff\' (#rrggbb)\n  - \'#ff00ff00\' (#rrggbbaa)\n  - \'rgb(255, 255, 255)\'\n  - \'rgba(255, 255, 255, 1.0)\'\n  - \'hsl(360, 100%, 100%)\'\n  - \'hsla(360, 100%, 100%, 1.0)\'\n  - \'transparent\'\n  - \'red\'\n  - 0xff00ff00 (0xrrggbbaa)\n');
  }
}; /**
    * Copyright (c) 2015-present, Facebook, Inc.
    *
    * This source code is licensed under the MIT license found in the
    * LICENSE file in the root directory of this source tree.
    *
    * @noflow
    */

var ColorPropType = void 0;

if (process.env.NODE_ENV !== 'production') {
  ColorPropType = colorPropType.bind(null, false /* isRequired */);
  ColorPropType.isRequired = colorPropType.bind(null, true /* isRequired */);
} else {
  ColorPropType = function ColorPropType() {};
}

exports.default = ColorPropType;
module.exports = exports['default'];