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

import applyNativeMethods from '../../modules/applyNativeMethods';
import { Component } from 'react';
import createElement from '../createElement';
import PickerItem from './PickerItem';
import PickerItemPropType from './PickerItemPropType';
import PickerStylePropTypes from './PickerStylePropTypes';
import StyleSheetPropType from '../../modules/StyleSheetPropType';
import StyleSheet from '../StyleSheet';
import TextPropTypes from '../Text/TextPropTypes';
import { arrayOf, bool, func, number, oneOfType, string } from 'prop-types';

var pickerStyleType = StyleSheetPropType(PickerStylePropTypes);

var Picker = function (_Component) {
  _inherits(Picker, _Component);

  function Picker() {
    var _temp, _this, _ret;

    _classCallCheck(this, Picker);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this._handleChange = function (e) {
      var onValueChange = _this.props.onValueChange;
      var _e$target = e.target,
          selectedIndex = _e$target.selectedIndex,
          value = _e$target.value;

      if (onValueChange) {
        onValueChange(value, selectedIndex);
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  Picker.prototype.render = function render() {
    var _props = this.props,
        children = _props.children,
        enabled = _props.enabled,
        selectedValue = _props.selectedValue,
        style = _props.style,
        testID = _props.testID,
        itemStyle = _props.itemStyle,
        mode = _props.mode,
        prompt = _props.prompt;


    return createElement('select', {
      children: children,
      disabled: enabled === false ? true : undefined,
      onChange: this._handleChange,
      style: [styles.initial, style],
      testID: testID,
      value: selectedValue
    });
  };

  return Picker;
}(Component);

Picker.Item = PickerItem;
Picker.propTypes = process.env.NODE_ENV !== "production" ? {
  children: oneOfType([PickerItemPropType, arrayOf(PickerItemPropType)]),
  enabled: bool,
  onValueChange: func,
  selectedValue: oneOfType([number, string]),
  style: pickerStyleType,
  testID: string
} : {};


var styles = StyleSheet.create({
  initial: {
    fontFamily: 'System',
    fontSize: 'inherit',
    margin: 0
  }
});

export default applyNativeMethods(Picker);