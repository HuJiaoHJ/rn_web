var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Copyright (c) 2017-present, Nicolas Gallagher.
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

import applyNativeMethods from '../../modules/applyNativeMethods';
import ColorPropType from '../ColorPropType';
import createElement from '../createElement';
import StyleSheet from '../StyleSheet';
import UIManager from '../UIManager';
import View from '../View';
import ViewPropTypes from '../ViewPropTypes';
import React, { Component } from 'react';
import { bool, func } from 'prop-types';

var CheckBox = function (_Component) {
  _inherits(CheckBox, _Component);

  function CheckBox() {
    var _temp, _this, _ret;

    _classCallCheck(this, CheckBox);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this._handleChange = function (event) {
      var _this$props = _this.props,
          onChange = _this$props.onChange,
          onValueChange = _this$props.onValueChange;

      var value = event.nativeEvent.target.checked;
      event.nativeEvent.value = value;
      onChange && onChange(event);
      onValueChange && onValueChange(value);
    }, _this._setCheckboxRef = function (element) {
      _this._checkboxElement = element;
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  CheckBox.prototype.blur = function blur() {
    UIManager.blur(this._checkboxElement);
  };

  CheckBox.prototype.focus = function focus() {
    UIManager.focus(this._checkboxElement);
  };

  CheckBox.prototype.render = function render() {
    var _props = this.props,
        color = _props.color,
        disabled = _props.disabled,
        onChange = _props.onChange,
        onValueChange = _props.onValueChange,
        style = _props.style,
        value = _props.value,
        other = _objectWithoutProperties(_props, ['color', 'disabled', 'onChange', 'onValueChange', 'style', 'value']);

    var fakeControl = React.createElement(View, {
      style: [styles.fakeControl, value && styles.fakeControlChecked,
      // custom color
      value && color && { backgroundColor: color, borderColor: color }, disabled && styles.fakeControlDisabled, value && disabled && styles.fakeControlCheckedAndDisabled]
    });

    var nativeControl = createElement('input', {
      checked: value,
      disabled: disabled,
      onChange: this._handleChange,
      ref: this._setCheckboxRef,
      style: [styles.nativeControl, styles.cursorInherit],
      type: 'checkbox'
    });

    return React.createElement(
      View,
      _extends({}, other, { style: [styles.root, style, disabled && styles.cursorDefault] }),
      fakeControl,
      nativeControl
    );
  };

  return CheckBox;
}(Component);

CheckBox.displayName = 'CheckBox';
CheckBox.defaultProps = {
  disabled: false,
  value: false
};
CheckBox.propTypes = process.env.NODE_ENV !== "production" ? Object.assign({}, ViewPropTypes, {
  color: ColorPropType,
  disabled: bool,
  onChange: func,
  onValueChange: func,
  value: bool
}) : {};


var styles = StyleSheet.create({
  root: {
    cursor: 'pointer',
    height: 16,
    userSelect: 'none',
    width: 16
  },
  cursorDefault: {
    cursor: 'default'
  },
  cursorInherit: {
    cursor: 'inherit'
  },
  fakeControl: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderColor: '#657786',
    borderRadius: 2,
    borderStyle: 'solid',
    borderWidth: 2,
    height: '100%',
    justifyContent: 'center',
    width: '100%'
  },
  fakeControlChecked: {
    backgroundColor: '#009688',
    backgroundImage: 'url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjxzdmcKICAgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIgogICB4bWxuczpjYz0iaHR0cDovL2NyZWF0aXZlY29tbW9ucy5vcmcvbnMjIgogICB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiCiAgIHhtbG5zOnN2Zz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciCiAgIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIKICAgdmVyc2lvbj0iMS4xIgogICB2aWV3Qm94PSIwIDAgMSAxIgogICBwcmVzZXJ2ZUFzcGVjdFJhdGlvPSJ4TWluWU1pbiBtZWV0Ij4KICA8cGF0aAogICAgIGQ9Ik0gMC4wNDAzODA1OSwwLjYyNjc3NjcgMC4xNDY0NDY2MSwwLjUyMDcxMDY4IDAuNDI5Mjg5MzIsMC44MDM1NTMzOSAwLjMyMzIyMzMsMC45MDk2MTk0MSB6IE0gMC4yMTcxNTcyOSwwLjgwMzU1MzM5IDAuODUzNTUzMzksMC4xNjcxNTcyOSAwLjk1OTYxOTQxLDAuMjczMjIzMyAwLjMyMzIyMzMsMC45MDk2MTk0MSB6IgogICAgIGlkPSJyZWN0Mzc4MCIKICAgICBzdHlsZT0iZmlsbDojZmZmZmZmO2ZpbGwtb3BhY2l0eToxO3N0cm9rZTpub25lIiAvPgo8L3N2Zz4K")',
    backgroundRepeat: 'no-repeat',
    borderColor: '#009688'
  },
  fakeControlDisabled: {
    borderColor: '#CCD6DD'
  },
  fakeControlCheckedAndDisabled: {
    backgroundColor: '#AAB8C2',
    borderColor: '#AAB8C2'
  },
  nativeControl: Object.assign({}, StyleSheet.absoluteFillObject, {
    height: '100%',
    margin: 0,
    opacity: 0,
    padding: 0,
    width: '100%'
  })
});

export default applyNativeMethods(CheckBox);