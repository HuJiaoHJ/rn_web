'use strict';

exports.__esModule = true;

var _invariant = require('fbjs/lib/invariant');

var _invariant2 = _interopRequireDefault(_invariant);

var _requestIdleCallback = require('../../modules/requestIdleCallback');

var _requestIdleCallback2 = _interopRequireDefault(_requestIdleCallback);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Copyright (c) 2016-present, Nicolas Gallagher.
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

var InteractionManager = {
  Events: {
    interactionStart: 'interactionStart',
    interactionComplete: 'interactionComplete'
  },

  /**
   * Schedule a function to run after all interactions have completed.
   */
  runAfterInteractions: function runAfterInteractions(task) {
    var handle = void 0;

    var promise = new Promise(function (resolve) {
      handle = (0, _requestIdleCallback2.default)(function () {
        if (task) {
          resolve(task());
        }
      });
    });
    return {
      then: promise.then.bind(promise),
      done: promise.then.bind(promise),
      cancel: function cancel() {
        (0, _requestIdleCallback.cancelIdleCallback)(handle);
      }
    };
  },


  /**
   * Notify manager that an interaction has started.
   */
  createInteractionHandle: function createInteractionHandle() {
    return 1;
  },


  /**
   * Notify manager that an interaction has completed.
   */
  clearInteractionHandle: function clearInteractionHandle(handle) {
    (0, _invariant2.default)(!!handle, 'Must provide a handle to clear.');
  },


  addListener: function addListener() {}
};

exports.default = InteractionManager;
module.exports = exports['default'];