/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 * @format
 */
'use strict';

exports.__esModule = true;

var _AnimatedValue = require('./AnimatedValue');

var _AnimatedValue2 = _interopRequireDefault(_AnimatedValue);

var _AnimatedNode2 = require('./AnimatedNode');

var _AnimatedNode3 = _interopRequireDefault(_AnimatedNode2);

var _NativeAnimatedHelper = require('../NativeAnimatedHelper');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AnimatedTracking = function (_AnimatedNode) {
  _inherits(AnimatedTracking, _AnimatedNode);

  function AnimatedTracking(value, parent, animationClass, animationConfig, callback) {
    _classCallCheck(this, AnimatedTracking);

    var _this = _possibleConstructorReturn(this, _AnimatedNode.call(this));

    _this._value = value;
    _this._parent = parent;
    _this._animationClass = animationClass;
    _this._animationConfig = animationConfig;
    _this._useNativeDriver = (0, _NativeAnimatedHelper.shouldUseNativeDriver)(animationConfig);
    _this._callback = callback;
    _this.__attach();
    return _this;
  }

  AnimatedTracking.prototype.__makeNative = function __makeNative() {
    this.__isNative = true;
    this._parent.__makeNative();
    _AnimatedNode.prototype.__makeNative.call(this);
    this._value.__makeNative();
  };

  AnimatedTracking.prototype.__getValue = function __getValue() {
    return this._parent.__getValue();
  };

  AnimatedTracking.prototype.__attach = function __attach() {
    this._parent.__addChild(this);
    if (this._useNativeDriver) {
      // when the tracking starts we need to convert this node to a "native node"
      // so that the parent node will be made "native" too. This is necessary as
      // if we don't do this `update` method will get called. At that point it
      // may be too late as it would mean the JS driver has already started
      // updating node values
      this.__makeNative();
    }
  };

  AnimatedTracking.prototype.__detach = function __detach() {
    this._parent.__removeChild(this);
    _AnimatedNode.prototype.__detach.call(this);
  };

  AnimatedTracking.prototype.update = function update() {
    this._value.animate(new this._animationClass(Object.assign({}, this._animationConfig, {
      toValue: this._animationConfig.toValue.__getValue()
    })), this._callback);
  };

  AnimatedTracking.prototype.__getNativeConfig = function __getNativeConfig() {
    var animation = new this._animationClass(Object.assign({}, this._animationConfig, {
      // remove toValue from the config as it's a ref to Animated.Value
      toValue: undefined
    }));
    var animationConfig = animation.__getNativeAnimationConfig();
    return {
      type: 'tracking',
      animationId: (0, _NativeAnimatedHelper.generateNewAnimationId)(),
      animationConfig: animationConfig,
      toValue: this._parent.__getNativeTag(),
      value: this._value.__getNativeTag()
    };
  };

  return AnimatedTracking;
}(_AnimatedNode3.default);

exports.default = AnimatedTracking;
module.exports = exports['default'];