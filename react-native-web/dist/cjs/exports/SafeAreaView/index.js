'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _StyleSheet = require('../StyleSheet');

var _StyleSheet2 = _interopRequireDefault(_StyleSheet);

var _View = require('../View');

var _View2 = _interopRequireDefault(_View);

var _ViewPropTypes = require('../ViewPropTypes');

var _ViewPropTypes2 = _interopRequireDefault(_ViewPropTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (c) 2015-present, Facebook, Inc.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * This source code is licensed under the MIT license found in the
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * LICENSE file in the root directory of this source tree.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var SafeAreaView = function (_React$Component) {
  _inherits(SafeAreaView, _React$Component);

  function SafeAreaView() {
    _classCallCheck(this, SafeAreaView);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  SafeAreaView.prototype.render = function render() {
    var _props = this.props,
        style = _props.style,
        rest = _objectWithoutProperties(_props, ['style']);

    return _react2.default.createElement(_View2.default, _extends({}, rest, { style: _StyleSheet2.default.compose(styles.root, style) }));
  };

  return SafeAreaView;
}(_react2.default.Component);

SafeAreaView.displayName = 'SafeAreaView';
SafeAreaView.propTypes = process.env.NODE_ENV !== "production" ? Object.assign({}, _ViewPropTypes2.default) : {};


var styles = _StyleSheet2.default.create({
  root: {
    paddingTop: 'env(safe-area-inset-top)',
    paddingRight: 'env(safe-area-inset-right)',
    paddingBottom: 'env(safe-area-inset-bottom)',
    paddingLeft: 'env(safe-area-inset-left)'
  }
});

exports.default = SafeAreaView;
module.exports = exports['default'];