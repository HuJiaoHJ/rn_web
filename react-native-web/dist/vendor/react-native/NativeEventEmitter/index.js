/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule NativeEventEmitter
 * 
 */
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import EventEmitter from '../emitter/EventEmitter';
import Platform from '../../../exports/Platform';

import invariant from 'fbjs/lib/invariant';

/**
 * Abstract base class for implementing event-emitting modules. This implements
 * a subset of the standard EventEmitter node module API.
 */
var NativeEventEmitter = function (_EventEmitter) {
  _inherits(NativeEventEmitter, _EventEmitter);

  function NativeEventEmitter(nativeModule) {
    _classCallCheck(this, NativeEventEmitter);

    var _this = _possibleConstructorReturn(this, _EventEmitter.call(this));

    if (Platform.OS === 'ios') {
      invariant(nativeModule, 'Native module cannot be null.');
      _this._nativeModule = nativeModule;
    }
    return _this;
  }

  NativeEventEmitter.prototype.addListener = function addListener(eventType, listener, context) {
    if (this._nativeModule != null) {
      this._nativeModule.addListener(eventType);
    }
    return _EventEmitter.prototype.addListener.call(this, eventType, listener, context);
  };

  NativeEventEmitter.prototype.removeAllListeners = function removeAllListeners(eventType) {
    invariant(eventType, 'eventType argument is required.');
    var count = this.listeners(eventType).length;
    if (this._nativeModule != null) {
      this._nativeModule.removeListeners(count);
    }
    _EventEmitter.prototype.removeAllListeners.call(this, eventType);
  };

  NativeEventEmitter.prototype.removeSubscription = function removeSubscription(subscription) {
    if (this._nativeModule != null) {
      this._nativeModule.removeListeners(1);
    }
    _EventEmitter.prototype.removeSubscription.call(this, subscription);
  };

  return NativeEventEmitter;
}(EventEmitter);

export default NativeEventEmitter;