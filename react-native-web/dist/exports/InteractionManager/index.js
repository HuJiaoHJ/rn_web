/**
 * Copyright (c) 2016-present, Nicolas Gallagher.
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

import invariant from 'fbjs/lib/invariant';
import requestIdleCallback, { cancelIdleCallback } from '../../modules/requestIdleCallback';

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
      handle = requestIdleCallback(function () {
        if (task) {
          resolve(task());
        }
      });
    });
    return {
      then: promise.then.bind(promise),
      done: promise.then.bind(promise),
      cancel: function cancel() {
        cancelIdleCallback(handle);
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
    invariant(!!handle, 'Must provide a handle to clear.');
  },


  addListener: function addListener() {}
};

export default InteractionManager;