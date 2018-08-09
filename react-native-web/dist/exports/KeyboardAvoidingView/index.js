var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Copyright (c) 2017-present, Nicolas Gallagher.
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

import View from '../View';
import { number, oneOf } from 'prop-types';
import React, { Component } from 'react';
import ViewPropTypes from '../ViewPropTypes';

var KeyboardAvoidingView = function (_Component) {
  _inherits(KeyboardAvoidingView, _Component);

  function KeyboardAvoidingView() {
    var _temp, _this, _ret;

    _classCallCheck(this, KeyboardAvoidingView);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.frame = null, _this.onLayout = function (event) {
      _this.frame = event.nativeEvent.layout;
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  KeyboardAvoidingView.prototype.relativeKeyboardHeight = function relativeKeyboardHeight(keyboardFrame) {
    var frame = this.frame;
    if (!frame || !keyboardFrame) {
      return 0;
    }
    var keyboardY = keyboardFrame.screenY - this.props.keyboardVerticalOffset;
    return Math.max(frame.y + frame.height - keyboardY, 0);
  };

  KeyboardAvoidingView.prototype.onKeyboardChange = function onKeyboardChange(event) {};

  KeyboardAvoidingView.prototype.render = function render() {
    var _props = this.props,
        behavior = _props.behavior,
        contentContainerStyle = _props.contentContainerStyle,
        keyboardVerticalOffset = _props.keyboardVerticalOffset,
        rest = _objectWithoutProperties(_props, ['behavior', 'contentContainerStyle', 'keyboardVerticalOffset']);

    return React.createElement(View, _extends({ onLayout: this.onLayout }, rest));
  };

  return KeyboardAvoidingView;
}(Component);

KeyboardAvoidingView.defaultProps = {
  keyboardVerticalOffset: 0
};
KeyboardAvoidingView.propTypes = process.env.NODE_ENV !== "production" ? Object.assign({}, ViewPropTypes, {
  behavior: oneOf(['height', 'padding', 'position']),
  contentContainerStyle: ViewPropTypes.style,
  keyboardVerticalOffset: number.isRequired
}) : {};


export default KeyboardAvoidingView;