var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

/**
 * Copyright (c) 2016-present, Nicolas Gallagher.
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @noflow
 */

import applyNativeMethods from '../../modules/applyNativeMethods';
import createReactClass from 'create-react-class';
import ensurePositiveDelayProps from '../Touchable/ensurePositiveDelayProps';
import { number } from 'prop-types';
import React from 'react';
import StyleSheet from '../StyleSheet';
import Touchable from '../Touchable';
import TouchableWithoutFeedback from '../TouchableWithoutFeedback';
import View from '../View';

var flattenStyle = StyleSheet.flatten;

var PRESS_RETENTION_OFFSET = { top: 20, left: 20, right: 20, bottom: 30 };

/**
 * A wrapper for making views respond properly to touches.
 * On press down, the opacity of the wrapped view is decreased, dimming it.
 *
 * Opacity is controlled by wrapping the children in a View, which is
 * added to the view hiearchy. Be aware that this can affect layout.
 *
 * Example:
 *
 * ```
 * renderButton: function() {
 *   return (
 *     <TouchableOpacity onPress={this._onPressButton}>
 *       <Image
 *         style={styles.button}
 *         source={require('./myButton.png')}
 *       />
 *     </TouchableOpacity>
 *   );
 * },
 * ```
 */

/* eslint-disable react/prefer-es6-class */
var TouchableOpacity = createReactClass({
  displayName: 'TouchableOpacity',
  mixins: [Touchable.Mixin],

  propTypes: Object.assign({}, TouchableWithoutFeedback.propTypes, {
    /**
     * Determines what the opacity of the wrapped view should be when touch is
     * active.
     */
    activeOpacity: number,
    focusedOpacity: number
  }),

  getDefaultProps: function getDefaultProps() {
    return {
      activeOpacity: 0.2,
      focusedOpacity: 0.7
    };
  },

  getInitialState: function getInitialState() {
    return this.touchableGetInitialState();
  },

  componentDidMount: function componentDidMount() {
    ensurePositiveDelayProps(this.props);
  },

  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    ensurePositiveDelayProps(nextProps);
  },

  /**
   * Animate the touchable to a new opacity.
   */
  setOpacityTo: function setOpacityTo(value, duration) {
    this.setNativeProps({
      style: {
        opacity: value,
        transitionDuration: duration ? duration / 1000 + 's' : '0s'
      }
    });
  },

  /**
   * `Touchable.Mixin` self callbacks. The mixin will invoke these if they are
   * defined on your component.
   */
  touchableHandleActivePressIn: function touchableHandleActivePressIn(e) {
    if (e.dispatchConfig.registrationName === 'onResponderGrant') {
      this._opacityActive(0);
    } else {
      this._opacityActive(150);
    }
    this.props.onPressIn && this.props.onPressIn(e);
  },

  touchableHandleActivePressOut: function touchableHandleActivePressOut(e) {
    this._opacityInactive(250);
    this.props.onPressOut && this.props.onPressOut(e);
  },

  touchableHandlePress: function touchableHandlePress(e) {
    this.props.onPress && this.props.onPress(e);
  },

  touchableHandleLongPress: function touchableHandleLongPress(e) {
    this.props.onLongPress && this.props.onLongPress(e);
  },

  touchableGetPressRectOffset: function touchableGetPressRectOffset() {
    return this.props.pressRetentionOffset || PRESS_RETENTION_OFFSET;
  },

  touchableGetHitSlop: function touchableGetHitSlop() {
    return this.props.hitSlop;
  },

  touchableGetHighlightDelayMS: function touchableGetHighlightDelayMS() {
    return this.props.delayPressIn || 0;
  },

  touchableGetLongPressDelayMS: function touchableGetLongPressDelayMS() {
    return this.props.delayLongPress === 0 ? 0 : this.props.delayLongPress || 500;
  },

  touchableGetPressOutDelayMS: function touchableGetPressOutDelayMS() {
    return this.props.delayPressOut;
  },

  _opacityActive: function _opacityActive(duration) {
    this.setOpacityTo(this.props.activeOpacity, duration);
  },

  _opacityInactive: function _opacityInactive(duration) {
    this.setOpacityTo(this._getChildStyleOpacityWithDefault(), duration);
  },

  _opacityFocused: function _opacityFocused() {
    this.setOpacityTo(this.props.focusedOpacity);
  },

  _getChildStyleOpacityWithDefault: function _getChildStyleOpacityWithDefault() {
    var childStyle = flattenStyle(this.props.style) || {};
    return childStyle.opacity === undefined ? 1 : childStyle.opacity;
  },

  render: function render() {
    var _props = this.props,
        activeOpacity = _props.activeOpacity,
        focusedOpacity = _props.focusedOpacity,
        delayLongPress = _props.delayLongPress,
        delayPressIn = _props.delayPressIn,
        delayPressOut = _props.delayPressOut,
        onLongPress = _props.onLongPress,
        onPress = _props.onPress,
        onPressIn = _props.onPressIn,
        onPressOut = _props.onPressOut,
        pressRetentionOffset = _props.pressRetentionOffset,
        other = _objectWithoutProperties(_props, ['activeOpacity', 'focusedOpacity', 'delayLongPress', 'delayPressIn', 'delayPressOut', 'onLongPress', 'onPress', 'onPressIn', 'onPressOut', 'pressRetentionOffset']);

    return React.createElement(
      View,
      _extends({}, other, {
        accessible: this.props.accessible !== false,
        onKeyDown: this.touchableHandleKeyEvent,
        onKeyUp: this.touchableHandleKeyEvent,
        onResponderGrant: this.touchableHandleResponderGrant,
        onResponderMove: this.touchableHandleResponderMove,
        onResponderRelease: this.touchableHandleResponderRelease,
        onResponderTerminate: this.touchableHandleResponderTerminate,
        onResponderTerminationRequest: this.touchableHandleResponderTerminationRequest,
        onStartShouldSetResponder: this.touchableHandleStartShouldSetResponder,
        style: [styles.root, !this.props.disabled && styles.actionable, this.props.style]
      }),
      this.props.children,
      Touchable.renderDebugView({ color: 'blue', hitSlop: this.props.hitSlop })
    );
  }
});

var styles = StyleSheet.create({
  root: {
    transitionProperty: 'opacity',
    transitionDuration: '0.15s',
    userSelect: 'none'
  },
  actionable: {
    cursor: 'pointer',
    touchAction: 'manipulation'
  }
});

export default applyNativeMethods(TouchableOpacity);