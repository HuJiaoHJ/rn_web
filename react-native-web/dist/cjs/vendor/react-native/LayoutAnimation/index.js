'use strict';

exports.__esModule = true;

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _UIManager = require('../../../exports/UIManager');

var _UIManager2 = _interopRequireDefault(_UIManager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @noflow
 * @format
 */

var __DEV__ = process.env.NODE !== 'production';
var checkPropTypes = _propTypes2.default.checkPropTypes;


var Types = {
  spring: 'spring',
  linear: 'linear',
  easeInEaseOut: 'easeInEaseOut',
  easeIn: 'easeIn',
  easeOut: 'easeOut',
  keyboard: 'keyboard'
};

var Properties = {
  opacity: 'opacity',
  scaleX: 'scaleX',
  scaleY: 'scaleY',
  scaleXY: 'scaleXY'
};

var animType = _propTypes2.default.shape({
  duration: _propTypes2.default.number,
  delay: _propTypes2.default.number,
  springDamping: _propTypes2.default.number,
  initialVelocity: _propTypes2.default.number,
  type: _propTypes2.default.oneOf(Object.keys(Types)).isRequired,
  property: _propTypes2.default.oneOf(
  // Only applies to create/delete
  Object.keys(Properties))
});

var configType = _propTypes2.default.shape({
  duration: _propTypes2.default.number.isRequired,
  create: animType,
  update: animType,
  delete: animType
});

function checkConfig(config, location, name) {
  checkPropTypes({ config: configType }, { config: config }, location, name);
}

function configureNext(config, onAnimationDidEnd) {
  if (__DEV__) {
    checkConfig(config, 'config', 'LayoutAnimation.configureNext');
  }
  _UIManager2.default.configureNextLayoutAnimation(config, onAnimationDidEnd || function () {}, function () {
    /* unused */
  });
}

function create(duration, type, creationProp) {
  return {
    duration: duration,
    create: {
      type: type,
      property: creationProp
    },
    update: {
      type: type
    },
    delete: {
      type: type,
      property: creationProp
    }
  };
}

var Presets = {
  easeInEaseOut: create(300, Types.easeInEaseOut, Properties.opacity),
  linear: create(500, Types.linear, Properties.opacity),
  spring: {
    duration: 700,
    create: {
      type: Types.linear,
      property: Properties.opacity
    },
    update: {
      type: Types.spring,
      springDamping: 0.4
    },
    delete: {
      type: Types.linear,
      property: Properties.opacity
    }
  }
};

/**
 * Automatically animates views to their new positions when the
 * next layout happens.
 *
 * A common way to use this API is to call it before calling `setState`.
 *
 * Note that in order to get this to work on **Android** you need to set the following flags via `UIManager`:
 *
 *     UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
 */
var LayoutAnimation = {
  /**
   * Schedules an animation to happen on the next layout.
   *
   * @param config Specifies animation properties:
   *
   *   - `duration` in milliseconds
   *   - `create`, config for animating in new views (see `Anim` type)
   *   - `update`, config for animating views that have been updated
   * (see `Anim` type)
   *
   * @param onAnimationDidEnd Called when the animation finished.
   * Only supported on iOS.
   * @param onError Called on error. Only supported on iOS.
   */
  configureNext: configureNext,
  /**
   * Helper for creating a config for `configureNext`.
   */
  create: create,
  Types: Types,
  Properties: Properties,
  checkConfig: checkConfig,
  Presets: Presets,
  easeInEaseOut: configureNext.bind(null, Presets.easeInEaseOut),
  linear: configureNext.bind(null, Presets.linear),
  spring: configureNext.bind(null, Presets.spring)
};

exports.default = LayoutAnimation;
module.exports = exports['default'];