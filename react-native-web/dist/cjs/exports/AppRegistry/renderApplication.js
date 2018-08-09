'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /**
                                                                                                                                                                                                                                                                   * Copyright (c) 2015-present, Nicolas Gallagher.
                                                                                                                                                                                                                                                                   * Copyright (c) 2015-present, Facebook, Inc.
                                                                                                                                                                                                                                                                   *
                                                                                                                                                                                                                                                                   * This source code is licensed under the MIT license found in the
                                                                                                                                                                                                                                                                   * LICENSE file in the root directory of this source tree.
                                                                                                                                                                                                                                                                   *
                                                                                                                                                                                                                                                                   * 
                                                                                                                                                                                                                                                                   */

exports.default = renderApplication;
exports.getApplication = getApplication;

var _AppContainer = require('./AppContainer');

var _AppContainer2 = _interopRequireDefault(_AppContainer);

var _invariant = require('fbjs/lib/invariant');

var _invariant2 = _interopRequireDefault(_invariant);

var _hydrate = require('../../modules/hydrate');

var _hydrate2 = _interopRequireDefault(_hydrate);

var _render = require('../render');

var _render2 = _interopRequireDefault(_render);

var _styleResolver = require('../StyleSheet/styleResolver');

var _styleResolver2 = _interopRequireDefault(_styleResolver);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var renderFn = process.env.NODE_ENV !== 'production' ? _render2.default : _hydrate2.default;

function renderApplication(RootComponent, initialProps, rootTag, WrapperComponent, callback) {
  (0, _invariant2.default)(rootTag, 'Expect to have a valid rootTag, instead got ', rootTag);

  renderFn(_react2.default.createElement(
    _AppContainer2.default,
    { WrapperComponent: WrapperComponent, rootTag: rootTag },
    _react2.default.createElement(RootComponent, initialProps)
  ), rootTag, callback);
}

function getApplication(RootComponent, initialProps, WrapperComponent) {
  var element = _react2.default.createElement(
    _AppContainer2.default,
    { WrapperComponent: WrapperComponent, rootTag: {} },
    _react2.default.createElement(RootComponent, initialProps)
  );
  // Don't escape CSS text
  var getStyleElement = function getStyleElement(props) {
    var sheet = _styleResolver2.default.getStyleSheet();
    return _react2.default.createElement('style', _extends({}, props, { dangerouslySetInnerHTML: { __html: sheet.textContent }, id: sheet.id }));
  };
  return { element: element, getStyleElement: getStyleElement };
}