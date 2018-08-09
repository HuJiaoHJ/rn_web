/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule EmitterSubscription
 * 
 */
'use strict';

exports.__esModule = true;

var _EventSubscription2 = require('./EventSubscription');

var _EventSubscription3 = _interopRequireDefault(_EventSubscription2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * EmitterSubscription represents a subscription with listener and context data.
 */
var EmitterSubscription = function (_EventSubscription) {
  _inherits(EmitterSubscription, _EventSubscription);

  /**
   * @param {EventEmitter} emitter - The event emitter that registered this
   *   subscription
   * @param {EventSubscriptionVendor} subscriber - The subscriber that controls
   *   this subscription
   * @param {function} listener - Function to invoke when the specified event is
   *   emitted
   * @param {*} context - Optional context object to use when invoking the
   *   listener
   */
  function EmitterSubscription(emitter, subscriber, listener, context) {
    _classCallCheck(this, EmitterSubscription);

    var _this = _possibleConstructorReturn(this, _EventSubscription.call(this, subscriber));

    _this.emitter = emitter;
    _this.listener = listener;
    _this.context = context;
    return _this;
  }

  /**
   * Removes this subscription from the emitter that registered it.
   * Note: we're overriding the `remove()` method of EventSubscription here
   * but deliberately not calling `super.remove()` as the responsibility
   * for removing the subscription lies with the EventEmitter.
   */


  EmitterSubscription.prototype.remove = function remove() {
    this.emitter.removeSubscription(this);
  };

  return EmitterSubscription;
}(_EventSubscription3.default);

exports.default = EmitterSubscription;
module.exports = exports['default'];