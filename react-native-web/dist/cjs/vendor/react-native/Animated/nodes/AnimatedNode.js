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

var _NativeAnimatedHelper = require('../NativeAnimatedHelper');

var _NativeAnimatedHelper2 = _interopRequireDefault(_NativeAnimatedHelper);

var _invariant = require('fbjs/lib/invariant');

var _invariant2 = _interopRequireDefault(_invariant);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Note(vjeux): this would be better as an interface but flow doesn't
// support them yet
var AnimatedNode = function () {
  function AnimatedNode() {
    _classCallCheck(this, AnimatedNode);
  }

  AnimatedNode.prototype.__attach = function __attach() {};

  AnimatedNode.prototype.__detach = function __detach() {
    if (this.__isNative && this.__nativeTag != null) {
      _NativeAnimatedHelper2.default.API.dropAnimatedNode(this.__nativeTag);
      this.__nativeTag = undefined;
    }
  };

  AnimatedNode.prototype.__getValue = function __getValue() {};

  AnimatedNode.prototype.__getAnimatedValue = function __getAnimatedValue() {
    return this.__getValue();
  };

  AnimatedNode.prototype.__addChild = function __addChild(child) {};

  AnimatedNode.prototype.__removeChild = function __removeChild(child) {};

  AnimatedNode.prototype.__getChildren = function __getChildren() {
    return [];
  };

  /* Methods and props used by native Animated impl */


  AnimatedNode.prototype.__makeNative = function __makeNative() {
    if (!this.__isNative) {
      throw new Error('This node cannot be made a "native" animated node');
    }
  };

  AnimatedNode.prototype.__getNativeTag = function __getNativeTag() {
    _NativeAnimatedHelper2.default.assertNativeAnimatedModule();
    (0, _invariant2.default)(this.__isNative, 'Attempt to get native tag from node not marked as "native"');
    if (this.__nativeTag == null) {
      var nativeTag = _NativeAnimatedHelper2.default.generateNewNodeTag();
      _NativeAnimatedHelper2.default.API.createAnimatedNode(nativeTag, this.__getNativeConfig());
      this.__nativeTag = nativeTag;
    }
    return this.__nativeTag;
  };

  AnimatedNode.prototype.__getNativeConfig = function __getNativeConfig() {
    throw new Error('This JS animated node type cannot be used as native animated node');
  };

  AnimatedNode.prototype.toJSON = function toJSON() {
    return this.__getValue();
  };

  return AnimatedNode;
}();

exports.default = AnimatedNode;
module.exports = exports['default'];