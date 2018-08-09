function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

import View from '../../exports/View';
import React, { Component } from 'react';

/**
 * Common implementation for a simple stubbed view.
 */
/* eslint-disable react/prop-types */

var UnimplementedView = function (_Component) {
  _inherits(UnimplementedView, _Component);

  function UnimplementedView() {
    _classCallCheck(this, UnimplementedView);

    return _possibleConstructorReturn(this, _Component.apply(this, arguments));
  }

  UnimplementedView.prototype.setNativeProps = function setNativeProps() {
    // Do nothing.
    // This method is required in order to use this view as a Touchable* child.
    // See ensureComponentIsNative.js for more info
  };

  UnimplementedView.prototype.render = function render() {
    return React.createElement(
      View,
      { style: [unimplementedViewStyles, this.props.style] },
      this.props.children
    );
  };

  return UnimplementedView;
}(Component);

var unimplementedViewStyles = process.env.NODE_ENV !== 'production' ? {
  alignSelf: 'flex-start',
  borderColor: 'red',
  borderWidth: 1
} : {};

export default UnimplementedView;