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
import ColorPropType from '../ColorPropType';
import createReactClass from 'create-react-class';
import ensureComponentIsNative from '../../modules/ensureComponentIsNative';
import ensurePositiveDelayProps from '../Touchable/ensurePositiveDelayProps';
import React from 'react';
import StyleSheet from '../StyleSheet';
import TimerMixin from 'react-timer-mixin';
import Touchable from '../Touchable';
import TouchableWithoutFeedback from '../TouchableWithoutFeedback';
import View from '../View';
import ViewPropTypes from '../ViewPropTypes';
import { func, number } from 'prop-types';

var DEFAULT_PROPS = {
  activeOpacity: 0.85,
  underlayColor: 'black'
};

var PRESS_RETENTION_OFFSET = { top: 20, left: 20, right: 20, bottom: 30 };

/**
 * A wrapper for making views respond properly to touches.
 * On press down, the opacity of the wrapped view is decreased, which allows
 * the underlay color to show through, darkening or tinting the view.
 *
 * The underlay comes from wrapping the child in a new View, which can affect
 * layout, and sometimes cause unwanted visual artifacts if not used correctly,
 * for example if the backgroundColor of the wrapped view isn't explicitly set
 * to an opaque color.
 *
 * TouchableHighlight must have one child (not zero or more than one).
 * If you wish to have several child components, wrap them in a View.
 *
 * Example:
 *
 * ```
 * renderButton: function() {
 *   return (
 *     <TouchableHighlight onPress={this._onPressButton}>
 *       <Image
 *         style={styles.button}
 *         source={require('./myButton.png')}
 *       />
 *     </TouchableHighlight>
 *   );
 * },
 * ```
 */

/* eslint-disable react/prefer-es6-class */
var TouchableHighlight = createReactClass({
  displayName: 'TouchableHighlight',
  propTypes: Object.assign({}, TouchableWithoutFeedback.propTypes, {
    /**
     * Determines what the opacity of the wrapped view should be when touch is
     * active.
     */
    activeOpacity: number,
    /**
     * Called immediately after the underlay is hidden
     */
    onHideUnderlay: func,
    /**
     * Called immediately after the underlay is shown
     */
    onShowUnderlay: func,
    style: ViewPropTypes.style,
    /**
     * The color of the underlay that will show through when the touch is
     * active.
     */
    underlayColor: ColorPropType
  }),

  mixins: [TimerMixin, Touchable.Mixin],

  getDefaultProps: function getDefaultProps() {
    return DEFAULT_PROPS;
  },

  // Performance optimization to avoid constantly re-generating these objects.
  _computeSyntheticState: function _computeSyntheticState(props) {
    return {
      activeProps: {
        style: {
          opacity: props.activeOpacity
        }
      },
      activeUnderlayProps: {
        style: {
          backgroundColor: props.underlayColor
        }
      },
      underlayStyle: [INACTIVE_UNDERLAY_PROPS.style, props.style]
    };
  },

  getInitialState: function getInitialState() {
    this._isMounted = false;
    return Object.assign({}, this.touchableGetInitialState(), this._computeSyntheticState(this.props));
  },

  componentDidMount: function componentDidMount() {
    this._isMounted = true;
    ensurePositiveDelayProps(this.props);
    ensureComponentIsNative(this._childRef);
  },

  componentWillUnmount: function componentWillUnmount() {
    this._isMounted = false;
  },

  componentDidUpdate: function componentDidUpdate() {
    ensureComponentIsNative(this._childRef);
  },

  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    ensurePositiveDelayProps(nextProps);
    if (nextProps.activeOpacity !== this.props.activeOpacity || nextProps.underlayColor !== this.props.underlayColor || nextProps.style !== this.props.style) {
      this.setState(this._computeSyntheticState(nextProps));
    }
  },

  /**
   * `Touchable.Mixin` self callbacks. The mixin will invoke these if they are
   * defined on your component.
   */
  touchableHandleActivePressIn: function touchableHandleActivePressIn(e) {
    this.clearTimeout(this._hideTimeout);
    this._hideTimeout = null;
    this._showUnderlay();
    this.props.onPressIn && this.props.onPressIn(e);
  },

  touchableHandleActivePressOut: function touchableHandleActivePressOut(e) {
    if (!this._hideTimeout) {
      this._hideUnderlay();
    }
    this.props.onPressOut && this.props.onPressOut(e);
  },

  touchableHandlePress: function touchableHandlePress(e) {
    this.clearTimeout(this._hideTimeout);
    this._showUnderlay();
    this._hideTimeout = this.setTimeout(this._hideUnderlay, this.props.delayPressOut || 100);
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
    return this.props.delayPressIn;
  },

  touchableGetLongPressDelayMS: function touchableGetLongPressDelayMS() {
    return this.props.delayLongPress;
  },

  touchableGetPressOutDelayMS: function touchableGetPressOutDelayMS() {
    return this.props.delayPressOut;
  },

  _showUnderlay: function _showUnderlay() {
    if (!this._isMounted || !this._hasPressHandler()) {
      return;
    }

    this._underlayRef.setNativeProps(this.state.activeUnderlayProps);
    this._childRef.setNativeProps(this.state.activeProps);
    this.props.onShowUnderlay && this.props.onShowUnderlay();
  },

  _hideUnderlay: function _hideUnderlay() {
    this.clearTimeout(this._hideTimeout);
    this._hideTimeout = null;
    if (this._hasPressHandler() && this._underlayRef) {
      this._childRef.setNativeProps(INACTIVE_CHILD_PROPS);
      this._underlayRef.setNativeProps(Object.assign({}, INACTIVE_UNDERLAY_PROPS, {
        style: this.state.underlayStyle
      }));
      this.props.onHideUnderlay && this.props.onHideUnderlay();
    }
  },

  _hasPressHandler: function _hasPressHandler() {
    return !!(this.props.onPress || this.props.onPressIn || this.props.onPressOut || this.props.onLongPress);
  },

  _setChildRef: function _setChildRef(node) {
    this._childRef = node;
  },
  _setUnderlayRef: function _setUnderlayRef(node) {
    this._underlayRef = node;
  },


  render: function render() {
    var _props = this.props,
        activeOpacity = _props.activeOpacity,
        onHideUnderlay = _props.onHideUnderlay,
        onShowUnderlay = _props.onShowUnderlay,
        underlayColor = _props.underlayColor,
        delayLongPress = _props.delayLongPress,
        delayPressIn = _props.delayPressIn,
        delayPressOut = _props.delayPressOut,
        onLongPress = _props.onLongPress,
        onPress = _props.onPress,
        onPressIn = _props.onPressIn,
        onPressOut = _props.onPressOut,
        pressRetentionOffset = _props.pressRetentionOffset,
        other = _objectWithoutProperties(_props, ['activeOpacity', 'onHideUnderlay', 'onShowUnderlay', 'underlayColor', 'delayLongPress', 'delayPressIn', 'delayPressOut', 'onLongPress', 'onPress', 'onPressIn', 'onPressOut', 'pressRetentionOffset']);

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
        ref: this._setUnderlayRef,
        style: [styles.root, !this.props.disabled && styles.actionable, this.state.underlayStyle]
      }),
      React.cloneElement(React.Children.only(this.props.children), {
        ref: this._setChildRef
      }),
      Touchable.renderDebugView({ color: 'green', hitSlop: this.props.hitSlop })
    );
  }
});

var INACTIVE_CHILD_PROPS = {
  style: StyleSheet.create({ x: { opacity: 1.0 } }).x
};
var INACTIVE_UNDERLAY_PROPS = {
  style: StyleSheet.create({ x: { backgroundColor: 'transparent' } }).x
};

var styles = StyleSheet.create({
  root: {
    userSelect: 'none'
  },
  actionable: {
    cursor: 'pointer',
    touchAction: 'manipulation'
  }
});

export default applyNativeMethods(TouchableHighlight);