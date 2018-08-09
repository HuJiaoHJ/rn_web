'use strict';

exports.__esModule = true;

var _StyleSheet = require('../StyleSheet');

var _StyleSheet2 = _interopRequireDefault(_StyleSheet);

var _View = require('../View');

var _View2 = _interopRequireDefault(_View);

var _propTypes = require('prop-types');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (c) 2016-present, Nicolas Gallagher.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (c) 2015-present, Facebook, Inc.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * This source code is licensed under the MIT license found in the
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * LICENSE file in the root directory of this source tree.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var AppContainer = function (_Component) {
  _inherits(AppContainer, _Component);

  function AppContainer() {
    var _temp, _this, _ret;

    _classCallCheck(this, AppContainer);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.state = { mainKey: 1 }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  AppContainer.prototype.getChildContext = function getChildContext() {
    return {
      rootTag: this.props.rootTag
    };
  };

  AppContainer.prototype.render = function render() {
    var _props = this.props,
        children = _props.children,
        WrapperComponent = _props.WrapperComponent;

    var innerView = _react2.default.createElement(_View2.default, {
      children: children,
      key: this.state.mainKey,
      pointerEvents: 'box-none',
      style: styles.appContainer
    });

    if (WrapperComponent) {
      innerView = _react2.default.createElement(
        WrapperComponent,
        null,
        innerView
      );
    }

    return _react2.default.createElement(
      _View2.default,
      { pointerEvents: 'box-none', style: styles.appContainer },
      innerView
    );
  };

  return AppContainer;
}(_react.Component);

AppContainer.childContextTypes = {
  rootTag: _propTypes.any
};
exports.default = AppContainer;
AppContainer.propTypes = process.env.NODE_ENV !== "production" ? {
  WrapperComponent: _propTypes.any,
  children: _propTypes.node,
  rootTag: _propTypes.any.isRequired
} : {};


var styles = _StyleSheet2.default.create({
  appContainer: {
    flex: 1
  }
});
module.exports = exports['default'];