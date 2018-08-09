function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Copyright (c) 2015-present, Nicolas Gallagher.
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

import applyLayout from '../../modules/applyLayout';
import applyNativeMethods from '../../modules/applyNativeMethods';
import { bool } from 'prop-types';
import { Component } from 'react';
import createElement from '../createElement';
import StyleSheet from '../StyleSheet';
import TextPropTypes from './TextPropTypes';

var Text = function (_Component) {
  _inherits(Text, _Component);

  function Text() {
    _classCallCheck(this, Text);

    return _possibleConstructorReturn(this, _Component.apply(this, arguments));
  }

  Text.prototype.getChildContext = function getChildContext() {
    return { isInAParentText: true };
  };

  Text.prototype.render = function render() {
    var _props = this.props,
        dir = _props.dir,
        numberOfLines = _props.numberOfLines,
        onPress = _props.onPress,
        selectable = _props.selectable,
        style = _props.style,
        adjustsFontSizeToFit = _props.adjustsFontSizeToFit,
        allowFontScaling = _props.allowFontScaling,
        ellipsizeMode = _props.ellipsizeMode,
        lineBreakMode = _props.lineBreakMode,
        minimumFontScale = _props.minimumFontScale,
        onLayout = _props.onLayout,
        onLongPress = _props.onLongPress,
        pressRetentionOffset = _props.pressRetentionOffset,
        selectionColor = _props.selectionColor,
        suppressHighlighting = _props.suppressHighlighting,
        textBreakStrategy = _props.textBreakStrategy,
        tvParallaxProperties = _props.tvParallaxProperties,
        otherProps = _objectWithoutProperties(_props, ['dir', 'numberOfLines', 'onPress', 'selectable', 'style', 'adjustsFontSizeToFit', 'allowFontScaling', 'ellipsizeMode', 'lineBreakMode', 'minimumFontScale', 'onLayout', 'onLongPress', 'pressRetentionOffset', 'selectionColor', 'suppressHighlighting', 'textBreakStrategy', 'tvParallaxProperties']);

    var isInAParentText = this.context.isInAParentText;


    if (onPress) {
      otherProps.accessible = true;
      otherProps.onClick = this._createPressHandler(onPress);
      otherProps.onKeyDown = this._createEnterHandler(onPress);
    }

    // allow browsers to automatically infer the language writing direction
    otherProps.dir = dir !== undefined ? dir : 'auto';
    otherProps.style = [styles.initial, this.context.isInAParentText === true && styles.isInAParentText, style, selectable === false && styles.notSelectable, numberOfLines === 1 && styles.singleLineStyle, onPress && styles.pressable];

    var component = isInAParentText ? 'span' : 'div';

    return createElement(component, otherProps);
  };

  Text.prototype._createEnterHandler = function _createEnterHandler(fn) {
    return function (e) {
      if (e.keyCode === 13) {
        fn && fn(e);
      }
    };
  };

  Text.prototype._createPressHandler = function _createPressHandler(fn) {
    return function (e) {
      e.stopPropagation();
      fn && fn(e);
    };
  };

  return Text;
}(Component);

Text.displayName = 'Text';
Text.childContextTypes = {
  isInAParentText: bool
};
Text.contextTypes = {
  isInAParentText: bool
};
Text.propTypes = process.env.NODE_ENV !== "production" ? TextPropTypes : {};


var styles = StyleSheet.create({
  initial: {
    borderWidth: 0,
    boxSizing: 'border-box',
    color: 'inherit',
    display: 'inline',
    fontFamily: 'System',
    fontSize: 14,
    fontStyle: 'inherit',
    fontVariant: ['inherit'],
    fontWeight: 'inherit',
    lineHeight: 'inherit',
    margin: 0,
    padding: 0,
    textDecorationLine: 'none',
    whiteSpace: 'pre-wrap',
    wordWrap: 'break-word'
  },
  isInAParentText: {
    // inherit parent font styles
    fontFamily: 'inherit',
    fontSize: 'inherit',
    whiteSpace: 'inherit'
  },
  notSelectable: {
    userSelect: 'none'
  },
  pressable: {
    cursor: 'pointer'
  },
  singleLineStyle: {
    maxWidth: '100%',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  }
});

export default applyLayout(applyNativeMethods(Text));