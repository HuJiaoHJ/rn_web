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

var _AnimatedEvent = require('../AnimatedEvent');

var _AnimatedNode2 = require('./AnimatedNode');

var _AnimatedNode3 = _interopRequireDefault(_AnimatedNode2);

var _AnimatedStyle = require('./AnimatedStyle');

var _AnimatedStyle2 = _interopRequireDefault(_AnimatedStyle);

var _NativeAnimatedHelper = require('../NativeAnimatedHelper');

var _NativeAnimatedHelper2 = _interopRequireDefault(_NativeAnimatedHelper);

var _findNodeHandle = require('../../../../exports/findNodeHandle');

var _findNodeHandle2 = _interopRequireDefault(_findNodeHandle);

var _invariant = require('fbjs/lib/invariant');

var _invariant2 = _interopRequireDefault(_invariant);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AnimatedProps = function (_AnimatedNode) {
  _inherits(AnimatedProps, _AnimatedNode);

  function AnimatedProps(props, callback) {
    _classCallCheck(this, AnimatedProps);

    var _this = _possibleConstructorReturn(this, _AnimatedNode.call(this));

    if (props.style) {
      props = Object.assign({}, props, {
        style: new _AnimatedStyle2.default(props.style)
      });
    }
    _this._props = props;
    _this._callback = callback;
    _this.__attach();
    return _this;
  }

  AnimatedProps.prototype.__getValue = function __getValue() {
    var props = {};
    for (var key in this._props) {
      var value = this._props[key];
      if (value instanceof _AnimatedNode3.default) {
        if (!value.__isNative || value instanceof _AnimatedStyle2.default) {
          // We cannot use value of natively driven nodes this way as the value we have access from
          // JS may not be up to date.
          props[key] = value.__getValue();
        }
      } else if (value instanceof _AnimatedEvent.AnimatedEvent) {
        props[key] = value.__getHandler();
      } else {
        props[key] = value;
      }
    }
    return props;
  };

  AnimatedProps.prototype.__getAnimatedValue = function __getAnimatedValue() {
    var props = {};
    for (var key in this._props) {
      var value = this._props[key];
      if (value instanceof _AnimatedNode3.default) {
        props[key] = value.__getAnimatedValue();
      }
    }
    return props;
  };

  AnimatedProps.prototype.__attach = function __attach() {
    for (var key in this._props) {
      var value = this._props[key];
      if (value instanceof _AnimatedNode3.default) {
        value.__addChild(this);
      }
    }
  };

  AnimatedProps.prototype.__detach = function __detach() {
    if (this.__isNative && this._animatedView) {
      this.__disconnectAnimatedView();
    }
    for (var key in this._props) {
      var value = this._props[key];
      if (value instanceof _AnimatedNode3.default) {
        value.__removeChild(this);
      }
    }
    _AnimatedNode.prototype.__detach.call(this);
  };

  AnimatedProps.prototype.update = function update() {
    this._callback();
  };

  AnimatedProps.prototype.__makeNative = function __makeNative() {
    if (!this.__isNative) {
      this.__isNative = true;
      for (var key in this._props) {
        var value = this._props[key];
        if (value instanceof _AnimatedNode3.default) {
          value.__makeNative();
        }
      }
      if (this._animatedView) {
        this.__connectAnimatedView();
      }
    }
  };

  AnimatedProps.prototype.setNativeView = function setNativeView(animatedView) {
    if (this._animatedView === animatedView) {
      return;
    }
    this._animatedView = animatedView;
    if (this.__isNative) {
      this.__connectAnimatedView();
    }
  };

  AnimatedProps.prototype.__connectAnimatedView = function __connectAnimatedView() {
    (0, _invariant2.default)(this.__isNative, 'Expected node to be marked as "native"');
    var nativeViewTag = (0, _findNodeHandle2.default)(this._animatedView);
    (0, _invariant2.default)(nativeViewTag != null, 'Unable to locate attached view in the native tree');
    _NativeAnimatedHelper2.default.API.connectAnimatedNodeToView(this.__getNativeTag(), nativeViewTag);
  };

  AnimatedProps.prototype.__disconnectAnimatedView = function __disconnectAnimatedView() {
    (0, _invariant2.default)(this.__isNative, 'Expected node to be marked as "native"');
    var nativeViewTag = (0, _findNodeHandle2.default)(this._animatedView);
    (0, _invariant2.default)(nativeViewTag != null, 'Unable to locate attached view in the native tree');
    _NativeAnimatedHelper2.default.API.disconnectAnimatedNodeFromView(this.__getNativeTag(), nativeViewTag);
  };

  AnimatedProps.prototype.__getNativeConfig = function __getNativeConfig() {
    var propsConfig = {};
    for (var propKey in this._props) {
      var value = this._props[propKey];
      if (value instanceof _AnimatedNode3.default) {
        propsConfig[propKey] = value.__getNativeTag();
      }
    }
    return {
      type: 'props',
      props: propsConfig
    };
  };

  return AnimatedProps;
}(_AnimatedNode3.default);

exports.default = AnimatedProps;
module.exports = exports['default'];