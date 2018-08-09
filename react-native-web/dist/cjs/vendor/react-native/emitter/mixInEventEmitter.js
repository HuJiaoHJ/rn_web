/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule mixInEventEmitter
 * 
 */
'use strict';

exports.__esModule = true;

var _EventEmitter = require('./EventEmitter');

var _EventEmitter2 = _interopRequireDefault(_EventEmitter);

var _EventEmitterWithHolding = require('./EventEmitterWithHolding');

var _EventEmitterWithHolding2 = _interopRequireDefault(_EventEmitterWithHolding);

var _EventHolder = require('./EventHolder');

var _EventHolder2 = _interopRequireDefault(_EventHolder);

var _EventValidator = require('./EventValidator');

var _EventValidator2 = _interopRequireDefault(_EventValidator);

var _invariant = require('fbjs/lib/invariant');

var _invariant2 = _interopRequireDefault(_invariant);

var _keyOf = require('fbjs/lib/keyOf');

var _keyOf2 = _interopRequireDefault(_keyOf);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var __DEV__ = process.env.NODE_ENV !== 'production';
/* $FlowFixMe(>=0.54.0 site=react_native_oss) This comment suppresses an error
 * found when Flow v0.54 was deployed. To see the error delete this comment and
 * run Flow. */

var TYPES_KEY = (0, _keyOf2.default)({ __types: true });

/**
 * API to setup an object or constructor to be able to emit data events.
 *
 * @example
 * function Dog() { ...dog stuff... }
 * mixInEventEmitter(Dog, {bark: true});
 *
 * var puppy = new Dog();
 * puppy.addListener('bark', function (volume) {
 *   console.log('Puppy', this, 'barked at volume:', volume);
 * });
 * puppy.emit('bark', 'quiet');
 * // Puppy <puppy> barked at volume: quiet
 *
 *
 * // A "singleton" object may also be commissioned:
 *
 * var Singleton = {};
 * mixInEventEmitter(Singleton, {lonely: true});
 * Singleton.emit('lonely', true);
 */
function mixInEventEmitter(cls, types) {
  (0, _invariant2.default)(types, 'Must supply set of valid event types');

  // If this is a constructor, write to the prototype, otherwise write to the
  // singleton object.
  var target = cls.prototype || cls;

  (0, _invariant2.default)(!target.__eventEmitter, 'An active emitter is already mixed in');

  var ctor = cls.constructor;
  if (ctor) {
    (0, _invariant2.default)(ctor === Object || ctor === Function, 'Mix EventEmitter into a class, not an instance');
  }

  // Keep track of the provided types, union the types if they already exist,
  // which allows for prototype subclasses to provide more types.
  if (target.hasOwnProperty(TYPES_KEY)) {
    Object.assign(target.__types, types);
  } else if (target.__types) {
    target.__types = Object.assign({}, target.__types, types);
  } else {
    target.__types = types;
  }
  Object.assign(target, EventEmitterMixin);
}

var EventEmitterMixin = {
  emit: function emit(eventType, a, b, c, d, e, _) {
    return this.__getEventEmitter().emit(eventType, a, b, c, d, e, _);
  },

  emitAndHold: function emitAndHold(eventType, a, b, c, d, e, _) {
    return this.__getEventEmitter().emitAndHold(eventType, a, b, c, d, e, _);
  },

  addListener: function addListener(eventType, listener, context) {
    return this.__getEventEmitter().addListener(eventType, listener, context);
  },

  once: function once(eventType, listener, context) {
    return this.__getEventEmitter().once(eventType, listener, context);
  },

  addRetroactiveListener: function addRetroactiveListener(eventType, listener, context) {
    return this.__getEventEmitter().addRetroactiveListener(eventType, listener, context);
  },

  addListenerMap: function addListenerMap(listenerMap, context) {
    return this.__getEventEmitter().addListenerMap(listenerMap, context);
  },

  addRetroactiveListenerMap: function addRetroactiveListenerMap(listenerMap, context) {
    return this.__getEventEmitter().addListenerMap(listenerMap, context);
  },

  removeAllListeners: function removeAllListeners() {
    this.__getEventEmitter().removeAllListeners();
  },

  removeCurrentListener: function removeCurrentListener() {
    this.__getEventEmitter().removeCurrentListener();
  },

  releaseHeldEventType: function releaseHeldEventType(eventType) {
    this.__getEventEmitter().releaseHeldEventType(eventType);
  },

  __getEventEmitter: function __getEventEmitter() {
    if (!this.__eventEmitter) {
      var emitter = new _EventEmitter2.default();
      if (__DEV__) {
        emitter = _EventValidator2.default.addValidation(emitter, this.__types);
      }

      var holder = new _EventHolder2.default();
      this.__eventEmitter = new _EventEmitterWithHolding2.default(emitter, holder);
    }
    return this.__eventEmitter;
  }
};

exports.default = mixInEventEmitter;
module.exports = exports['default'];