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

var _AnimatedNode2 = require('./AnimatedNode');

var _AnimatedNode3 = _interopRequireDefault(_AnimatedNode2);

var _NativeAnimatedHelper = require('../NativeAnimatedHelper');

var _NativeAnimatedHelper2 = _interopRequireDefault(_NativeAnimatedHelper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AnimatedWithChildren = function (_AnimatedNode) {
  _inherits(AnimatedWithChildren, _AnimatedNode);

  function AnimatedWithChildren() {
    _classCallCheck(this, AnimatedWithChildren);

    var _this = _possibleConstructorReturn(this, _AnimatedNode.call(this));

    _this._children = [];
    return _this;
  }

  AnimatedWithChildren.prototype.__makeNative = function __makeNative() {
    if (!this.__isNative) {
      this.__isNative = true;
      for (var _iterator = this._children, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
        var _ref;

        if (_isArray) {
          if (_i >= _iterator.length) break;
          _ref = _iterator[_i++];
        } else {
          _i = _iterator.next();
          if (_i.done) break;
          _ref = _i.value;
        }

        var child = _ref;

        child.__makeNative();
        _NativeAnimatedHelper2.default.API.connectAnimatedNodes(this.__getNativeTag(), child.__getNativeTag());
      }
    }
  };

  AnimatedWithChildren.prototype.__addChild = function __addChild(child) {
    if (this._children.length === 0) {
      this.__attach();
    }
    this._children.push(child);
    if (this.__isNative) {
      // Only accept "native" animated nodes as children
      child.__makeNative();
      _NativeAnimatedHelper2.default.API.connectAnimatedNodes(this.__getNativeTag(), child.__getNativeTag());
    }
  };

  AnimatedWithChildren.prototype.__removeChild = function __removeChild(child) {
    var index = this._children.indexOf(child);
    if (index === -1) {
      console.warn("Trying to remove a child that doesn't exist");
      return;
    }
    if (this.__isNative && child.__isNative) {
      _NativeAnimatedHelper2.default.API.disconnectAnimatedNodes(this.__getNativeTag(), child.__getNativeTag());
    }
    this._children.splice(index, 1);
    if (this._children.length === 0) {
      this.__detach();
    }
  };

  AnimatedWithChildren.prototype.__getChildren = function __getChildren() {
    return this._children;
  };

  return AnimatedWithChildren;
}(_AnimatedNode3.default);

exports.default = AnimatedWithChildren;
module.exports = exports['default'];