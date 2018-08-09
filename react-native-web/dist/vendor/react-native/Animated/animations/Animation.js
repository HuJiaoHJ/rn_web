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

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

import NativeAnimatedHelper from '../NativeAnimatedHelper';

// Important note: start() and stop() will only be called at most once.
// Once an animation has been stopped or finished its course, it will
// not be reused.
var Animation = function () {
  function Animation() {
    _classCallCheck(this, Animation);
  }

  Animation.prototype.start = function start(fromValue, onUpdate, onEnd, previousAnimation, animatedValue) {};

  Animation.prototype.stop = function stop() {
    if (this.__nativeId) {
      NativeAnimatedHelper.API.stopAnimation(this.__nativeId);
    }
  };

  Animation.prototype.__getNativeAnimationConfig = function __getNativeAnimationConfig() {
    // Subclasses that have corresponding animation implementation done in native
    // should override this method
    throw new Error('This animation type cannot be offloaded to native');
  };
  // Helper function for subclasses to make sure onEnd is only called once.


  Animation.prototype.__debouncedOnEnd = function __debouncedOnEnd(result) {
    var onEnd = this.__onEnd;
    this.__onEnd = null;
    onEnd && onEnd(result);
  };

  Animation.prototype.__startNativeAnimation = function __startNativeAnimation(animatedValue) {
    animatedValue.__makeNative();
    this.__nativeId = NativeAnimatedHelper.generateNewAnimationId();
    NativeAnimatedHelper.API.startAnimatingNode(this.__nativeId, animatedValue.__getNativeTag(), this.__getNativeAnimationConfig(), this.__debouncedOnEnd.bind(this));
  };

  return Animation;
}();

export default Animation;