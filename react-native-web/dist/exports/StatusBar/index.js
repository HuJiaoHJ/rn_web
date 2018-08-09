function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Copyright (c) 2016-present, Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

import { Component } from 'react';

var StatusBar = function (_Component) {
  _inherits(StatusBar, _Component);

  function StatusBar() {
    _classCallCheck(this, StatusBar);

    return _possibleConstructorReturn(this, _Component.apply(this, arguments));
  }

  StatusBar.setBackgroundColor = function setBackgroundColor() {};

  StatusBar.setBarStyle = function setBarStyle() {};

  StatusBar.setHidden = function setHidden() {};

  StatusBar.setNetworkActivityIndicatorVisible = function setNetworkActivityIndicatorVisible() {};

  StatusBar.setTranslucent = function setTranslucent() {};

  StatusBar.prototype.render = function render() {
    return null;
  };

  return StatusBar;
}(Component);

export default StatusBar;