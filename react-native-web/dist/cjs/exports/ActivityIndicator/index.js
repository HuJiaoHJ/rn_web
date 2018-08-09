'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _applyNativeMethods = require('../../modules/applyNativeMethods');

var _applyNativeMethods2 = _interopRequireDefault(_applyNativeMethods);

var _StyleSheet = require('../StyleSheet');

var _StyleSheet2 = _interopRequireDefault(_StyleSheet);

var _View = require('../View');

var _View2 = _interopRequireDefault(_View);

var _ViewPropTypes = require('../ViewPropTypes');

var _ViewPropTypes2 = _interopRequireDefault(_ViewPropTypes);

var _propTypes = require('prop-types');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

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

var createSvgCircle = function createSvgCircle(style) {
  return _react2.default.createElement('circle', { cx: '16', cy: '16', fill: 'none', r: '14', strokeWidth: '4', style: style });
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

    var svg = _react2.default.createElement(
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

    return _react2.default.createElement(
      _View2.default,
      _extends({}, other, {
        accessibilityRole: 'progressbar',
        'aria-valuemax': '1',
        'aria-valuemin': '0',
        style: [styles.container, style]
      }),
      _react2.default.createElement(_View2.default, {
        children: svg,
        style: [typeof size === 'number' ? { height: size, width: size } : indicatorSizes[size], styles.animation, !animating && styles.animationPause, !animating && hidesWhenStopped && styles.hidesWhenStopped]
      })
    );
  };

  return ActivityIndicator;
}(_react.Component);

ActivityIndicator.displayName = 'ActivityIndicator';
ActivityIndicator.defaultProps = {
  animating: true,
  color: '#1976D2',
  hidesWhenStopped: true,
  size: 'small'
};
ActivityIndicator.propTypes = process.env.NODE_ENV !== "production" ? Object.assign({}, _ViewPropTypes2.default, {
  animating: _propTypes.bool,
  color: _propTypes.string,
  hidesWhenStopped: _propTypes.bool,
  size: (0, _propTypes.oneOfType)([(0, _propTypes.oneOf)(['small', 'large']), _propTypes.number])
}) : {};


var styles = _StyleSheet2.default.create({
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

var indicatorSizes = _StyleSheet2.default.create({
  small: {
    width: 20,
    height: 20
  },
  large: {
    width: 36,
    height: 36
  }
});

exports.default = (0, _applyNativeMethods2.default)(ActivityIndicator);
module.exports = exports['default'];