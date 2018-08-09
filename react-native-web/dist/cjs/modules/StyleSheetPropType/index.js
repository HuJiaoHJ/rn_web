'use strict';

exports.__esModule = true;

var _createStrictShapeTypeChecker = require('../createStrictShapeTypeChecker');

var _createStrictShapeTypeChecker2 = _interopRequireDefault(_createStrictShapeTypeChecker);

var _StyleSheet = require('../../exports/StyleSheet');

var _StyleSheet2 = _interopRequireDefault(_StyleSheet);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

function StyleSheetPropType(shape) {
  var shapePropType = (0, _createStrictShapeTypeChecker2.default)(shape);
  return function (props, propName, componentName, location) {
    var newProps = props;
    if (props[propName]) {
      // Just make a dummy prop object with only the flattened style
      newProps = {};
      var flatStyle = _StyleSheet2.default.flatten(props[propName]);
      // Remove custom properties from check
      var nextStyle = Object.keys(flatStyle).reduce(function (acc, curr) {
        if (curr.indexOf('--') !== 0) {
          acc[curr] = flatStyle[curr];
        }
        return acc;
      }, {});
      newProps[propName] = nextStyle;
    }

    for (var _len = arguments.length, rest = Array(_len > 4 ? _len - 4 : 0), _key = 4; _key < _len; _key++) {
      rest[_key - 4] = arguments[_key];
    }

    return shapePropType.apply(undefined, [newProps, propName, componentName, location].concat(rest));
  };
}

exports.default = StyleSheetPropType;
module.exports = exports['default'];