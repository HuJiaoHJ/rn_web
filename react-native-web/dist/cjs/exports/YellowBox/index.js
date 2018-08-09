'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _UnimplementedView = require('../../modules/UnimplementedView');

var _UnimplementedView2 = _interopRequireDefault(_UnimplementedView);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (c) 2016-present, Nicolas Gallagher.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * This source code is licensed under the MIT license found in the
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * LICENSE file in the root directory of this source tree.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var YellowBox = function (_React$Component) {
  _inherits(YellowBox, _React$Component);

  function YellowBox() {
    _classCallCheck(this, YellowBox);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  YellowBox.ignoreWarnings = function ignoreWarnings() {};

  YellowBox.prototype.render = function render() {
    return _react2.default.createElement(_UnimplementedView2.default, this.props);
  };

  return YellowBox;
}(_react2.default.Component);

exports.default = YellowBox;
module.exports = exports['default'];