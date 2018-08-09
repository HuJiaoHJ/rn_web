/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

import invariant from 'fbjs/lib/invariant';

function createStrictShapeTypeChecker(shapeTypes) {
  function checkType(isRequired, props, propName, componentName, location) {
    if (!props[propName]) {
      if (isRequired) {
        invariant(false, 'Required object `' + propName + '` was not specified in `' + componentName + '`.');
      }
      return;
    }
    var propValue = props[propName];
    var propType = typeof propValue;
    var locationName = location || '(unknown)';
    if (propType !== 'object') {
      invariant(false, 'Invalid ' + locationName + ' `' + propName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
    }
    // We need to check all keys in case some are required but missing from
    // props.
    var allKeys = Object.assign({}, props[propName], shapeTypes);

    for (var _len = arguments.length, rest = Array(_len > 5 ? _len - 5 : 0), _key = 5; _key < _len; _key++) {
      rest[_key - 5] = arguments[_key];
    }

    for (var _key2 in allKeys) {
      var checker = shapeTypes[_key2];
      if (!checker) {
        invariant(false, 'Invalid props.' + propName + ' key `' + _key2 + '` supplied to `' + componentName + '`.' + '\nBad object: ' + JSON.stringify(props[propName], null, '  ') + '\nValid keys: ' + JSON.stringify(Object.keys(shapeTypes), null, '  '));
      }
      var error = checker.apply(undefined, [propValue, _key2, componentName, location].concat(rest));
      if (error) {
        invariant(false, error.message + '\nBad object: ' + JSON.stringify(props[propName], null, '  '));
      }
    }
  }
  function chainedCheckType(props, propName, componentName, location) {
    for (var _len2 = arguments.length, rest = Array(_len2 > 4 ? _len2 - 4 : 0), _key3 = 4; _key3 < _len2; _key3++) {
      rest[_key3 - 4] = arguments[_key3];
    }

    return checkType.apply(undefined, [false, props, propName, componentName, location].concat(rest));
  }
  chainedCheckType.isRequired = checkType.bind(null, true);
  return chainedCheckType;
}

export default createStrictShapeTypeChecker;