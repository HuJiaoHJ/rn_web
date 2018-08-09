var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

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

import applyNativeMethods from '../../modules/applyNativeMethods';
import ColorPropType from '../ColorPropType';
import StyleSheet from '../StyleSheet';
import View from '../View';
import ViewPropTypes from '../ViewPropTypes';
import React, { Component } from 'react';
import { bool, number } from 'prop-types';

var ProgressBar = function (_Component) {
  _inherits(ProgressBar, _Component);

  function ProgressBar() {
    var _temp, _this, _ret;

    _classCallCheck(this, ProgressBar);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this._setProgressRef = function (element) {
      _this._progressElement = element;
    }, _this._updateProgressWidth = function () {
      var _this$props = _this.props,
          indeterminate = _this$props.indeterminate,
          progress = _this$props.progress;

      var percentageProgress = indeterminate ? 50 : progress * 100;
      var width = indeterminate ? '25%' : percentageProgress + '%';
      if (_this._progressElement) {
        _this._progressElement.setNativeProps({
          style: { width: width }
        });
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  ProgressBar.prototype.componentDidMount = function componentDidMount() {
    this._updateProgressWidth();
  };

  ProgressBar.prototype.componentDidUpdate = function componentDidUpdate() {
    this._updateProgressWidth();
  };

  ProgressBar.prototype.render = function render() {
    var _props = this.props,
        color = _props.color,
        indeterminate = _props.indeterminate,
        progress = _props.progress,
        trackColor = _props.trackColor,
        style = _props.style,
        other = _objectWithoutProperties(_props, ['color', 'indeterminate', 'progress', 'trackColor', 'style']);

    var percentageProgress = progress * 100;

    return React.createElement(
      View,
      _extends({}, other, {
        accessibilityRole: 'progressbar',
        'aria-valuemax': '100',
        'aria-valuemin': '0',
        'aria-valuenow': indeterminate ? null : percentageProgress,
        style: [styles.track, style, { backgroundColor: trackColor }]
      }),
      React.createElement(View, {
        ref: this._setProgressRef,
        style: [styles.progress, indeterminate && styles.animation, { backgroundColor: color }]
      })
    );
  };

  return ProgressBar;
}(Component);

ProgressBar.displayName = 'ProgressBar';
ProgressBar.defaultProps = {
  color: '#1976D2',
  indeterminate: false,
  progress: 0,
  trackColor: 'transparent'
};
ProgressBar.propTypes = process.env.NODE_ENV !== "production" ? Object.assign({}, ViewPropTypes, {
  color: ColorPropType,
  indeterminate: bool,
  progress: number,
  trackColor: ColorPropType
}) : {};


var styles = StyleSheet.create({
  track: {
    height: 5,
    overflow: 'hidden',
    userSelect: 'none',
    zIndex: 0
  },
  progress: {
    height: '100%',
    zIndex: -1
  },
  animation: {
    animationDuration: '1s',
    animationName: [{
      '0%': { transform: [{ translateX: '-100%' }] },
      '100%': { transform: [{ translateX: '400%' }] }
    }],
    animationTimingFunction: 'linear',
    animationIterationCount: 'infinite'
  }
});

export default applyNativeMethods(ProgressBar);