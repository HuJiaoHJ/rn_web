var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Copyright (c) 2016-present, Nicolas Gallagher.
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

import applyNativeMethods from '../../modules/applyNativeMethods';
import StyleSheet from '../StyleSheet';
import View from '../View';
import ViewPropTypes from '../ViewPropTypes';
import { bool, number, oneOf, oneOfType, string } from 'prop-types';
import React, { Component } from 'react';

var createSvgCircle = function createSvgCircle(style) {
  return React.createElement('circle', { cx: '16', cy: '16', fill: 'none', r: '14', strokeWidth: '4', style: style });
};

var ActivityIndicator = function (_Component) {
  _inherits(ActivityIndicator, _Component);

  function ActivityIndicator() {
    _classCallCheck(this, ActivityIndicator);

    return _possibleConstructorReturn(this, _Component.apply(this, arguments));
  }

  ActivityIndicator.prototype.render = function render() {
    var _props = this.props,
        animating = _props.animating,
        color = _props.color,
        hidesWhenStopped = _props.hidesWhenStopped,
        size = _props.size,
        style = _props.style,
        other = _objectWithoutProperties(_props, ['animating', 'color', 'hidesWhenStopped', 'size', 'style']);

    var svg = React.createElement(
      'svg',
      { height: '100%', viewBox: '0 0 32 32', width: '100%' },
      createSvgCircle({
        stroke: color,
        opacity: 0.2
      }),
      createSvgCircle({
        stroke: color,
        strokeDasharray: 80,
        strokeDashoffset: 60
      })
    );

    return React.createElement(
      View,
      _extends({}, other, {
        accessibilityRole: 'progressbar',
        'aria-valuemax': '1',
        'aria-valuemin': '0',
        style: [styles.container, style]
      }),
      React.createElement(View, {
        children: svg,
        style: [typeof size === 'number' ? { height: size, width: size } : indicatorSizes[size], styles.animation, !animating && styles.animationPause, !animating && hidesWhenStopped && styles.hidesWhenStopped]
      })
    );
  };

  return ActivityIndicator;
}(Component);

ActivityIndicator.displayName = 'ActivityIndicator';
ActivityIndicator.defaultProps = {
  animating: true,
  color: '#1976D2',
  hidesWhenStopped: true,
  size: 'small'
};
ActivityIndicator.propTypes = process.env.NODE_ENV !== "production" ? Object.assign({}, ViewPropTypes, {
  animating: bool,
  color: string,
  hidesWhenStopped: bool,
  size: oneOfType([oneOf(['small', 'large']), number])
}) : {};


var styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  hidesWhenStopped: {
    visibility: 'hidden'
  },
  animation: {
    animationDuration: '0.75s',
    animationName: [{
      '0%': { transform: [{ rotate: '0deg' }] },
      '100%': { transform: [{ rotate: '360deg' }] }
    }],
    animationTimingFunction: 'linear',
    animationIterationCount: 'infinite'
  },
  animationPause: {
    animationPlayState: 'paused'
  }
});

var indicatorSizes = StyleSheet.create({
  small: {
    width: 20,
    height: 20
  },
  large: {
    width: 36,
    height: 36
  }
});

export default applyNativeMethods(ActivityIndicator);