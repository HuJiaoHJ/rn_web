function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Copyright (c) 2016-present, Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

import ColorPropType from '../ColorPropType';
import StyleSheet from '../StyleSheet';
import TouchableOpacity from '../TouchableOpacity';
import Text from '../Text';
import { bool, func, string } from 'prop-types';
import React, { Component } from 'react';

var Button = function (_Component) {
  _inherits(Button, _Component);

  function Button() {
    _classCallCheck(this, Button);

    return _possibleConstructorReturn(this, _Component.apply(this, arguments));
  }

  Button.prototype.render = function render() {
    var _props = this.props,
        accessibilityLabel = _props.accessibilityLabel,
        color = _props.color,
        disabled = _props.disabled,
        onPress = _props.onPress,
        testID = _props.testID,
        title = _props.title;


    return React.createElement(
      TouchableOpacity,
      {
        accessibilityLabel: accessibilityLabel,
        accessibilityRole: 'button',
        disabled: disabled,
        onPress: onPress,
        style: [styles.button, color && { backgroundColor: color }, disabled && styles.buttonDisabled],
        testID: testID
      },
      React.createElement(
        Text,
        { style: [styles.text, disabled && styles.textDisabled] },
        title
      )
    );
  };

  return Button;
}(Component);

Button.propTypes = process.env.NODE_ENV !== "production" ? {
  accessibilityLabel: string,
  color: ColorPropType,
  disabled: bool,
  onPress: func.isRequired,
  testID: string,
  title: string.isRequired
} : {};


var styles = StyleSheet.create({
  button: {
    backgroundColor: '#2196F3',
    borderRadius: 2
  },
  text: {
    color: '#fff',
    fontWeight: '500',
    padding: 8,
    textAlign: 'center',
    textTransform: 'uppercase'
  },
  buttonDisabled: {
    backgroundColor: '#dfdfdf'
  },
  textDisabled: {
    color: '#a1a1a1'
  }
});

export default Button;