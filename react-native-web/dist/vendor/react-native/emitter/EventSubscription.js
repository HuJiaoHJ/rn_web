/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule EventSubscription
 * 
 */
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * EventSubscription represents a subscription to a particular event. It can
 * remove its own subscription.
 */
var EventSubscription = function () {

  /**
   * @param {EventSubscriptionVendor} subscriber the subscriber that controls
   *   this subscription.
   */
  function EventSubscription(subscriber) {
    _classCallCheck(this, EventSubscription);

    this.subscriber = subscriber;
  }

  /**
   * Removes this subscription from the subscriber that controls it.
   */


  EventSubscription.prototype.remove = function remove() {
    this.subscriber.removeSubscription(this);
  };

  return EventSubscription;
}();

export default EventSubscription;