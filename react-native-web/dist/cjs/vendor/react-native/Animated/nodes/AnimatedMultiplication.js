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

var _AnimatedInterpolation = require('./AnimatedInterpolation');

var _AnimatedInterpolation2 = _interopRequireDefault(_AnimatedInterpolation);

var _AnimatedNode = require('./AnimatedNode');

var _AnimatedNode2 = _interopRequireDefault(_AnimatedNode);

var _AnimatedValue = require('./AnimatedValue');

var _AnimatedValue2 = _interopRequireDefault(_AnimatedValue);

var _AnimatedWithChildren2 = require('./AnimatedWithChildren');

var _AnimatedWithChildren3 = _interopRequireDefault(_AnimatedWithChildren2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AnimatedMultiplication = function (_AnimatedWithChildren) {
  _inherits(AnimatedMultiplication, _AnimatedWithChildren);

  function AnimatedMultiplication(a, b) {
    _classCallCheck(this, AnimatedMultiplication);

    var _this = _possibleConstructorReturn(this, _AnimatedWithChildren.call(this));

    _this._a = typeof a === 'number' ? new _AnimatedValue2.default(a) : a;
    _this._b = typeof b === 'number' ? new _AnimatedValue2.default(b) : b;
    return _this;
  }

  AnimatedMultiplication.prototype.__makeNative = function __makeNative() {
    this._a.__makeNative();
    this._b.__makeNative();
    _AnimatedWithChildren.prototype.__makeNative.call(this);
  };

  AnimatedMultiplication.prototype.__getValue = function __getValue() {
    return this._a.__getValue() * this._b.__getValue();
  };

  AnimatedMultiplication.prototype.interpolate = function interpolate(config) {
    return new _AnimatedInterpolation2.default(this, config);
  };

  AnimatedMultiplication.prototype.__attach = function __attach() {
    this._a.__addChild(this);
    this._b.__addChild(this);
  };

  AnimatedMultiplication.prototype.__detach = function __detach() {
    this._a.__removeChild(this);
    this._b.__removeChild(this);
    _AnimatedWithChildren.prototype.__detach.call(this);
  };

  AnimatedMultiplication.prototype.__getNativeConfig = function __getNativeConfig() {
    return {
      type: 'multiplication',
      input: [this._a.__getNativeTag(), this._b.__getNativeTag()]
    };
  };

  return AnimatedMultiplication;
}(_AnimatedWithChildren3.default);

exports.default = AnimatedMultiplication;
module.exports = exports['default'];