/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule SwipeableFlatList
 * @noflow
 * @format
 */
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import PropTypes from 'prop-types';
import React from 'react';
import SwipeableRow from '../SwipeableRow';
import FlatList from '../FlatList';

/**
 * A container component that renders multiple SwipeableRow's in a FlatList
 * implementation. This is designed to be a drop-in replacement for the
 * standard React Native `FlatList`, so use it as if it were a FlatList, but
 * with extra props, i.e.
 *
 * <SwipeableListView renderRow={..} renderQuickActions={..} {..FlatList props} />
 *
 * SwipeableRow can be used independently of this component, but the main
 * benefit of using this component is
 *
 * - It ensures that at most 1 row is swiped open (auto closes others)
 * - It can bounce the 1st row of the list so users know it's swipeable
 * - Increase performance on iOS by locking list swiping when row swiping is occurring
 * - More to come
 */

var SwipeableFlatList = function (_React$Component) {
  _inherits(SwipeableFlatList, _React$Component);

  function SwipeableFlatList(props, context) {
    _classCallCheck(this, SwipeableFlatList);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props, context));

    _this._flatListRef = null;
    _this._shouldBounceFirstRowOnMount = false;

    _this._onScroll = function (e) {
      // Close any opens rows on ListView scroll
      if (_this.state.openRowKey) {
        _this.setState({
          openRowKey: null
        });
      }

      _this.props.onScroll && _this.props.onScroll(e);
    };

    _this._renderItem = function (info) {
      var slideoutView = _this.props.renderQuickActions(info);
      var key = _this.props.keyExtractor(info.item, info.index);

      // If renderQuickActions is unspecified or returns falsey, don't allow swipe
      if (!slideoutView) {
        return _this.props.renderItem(info);
      }

      var shouldBounceOnMount = false;
      if (_this._shouldBounceFirstRowOnMount) {
        _this._shouldBounceFirstRowOnMount = false;
        shouldBounceOnMount = true;
      }

      return React.createElement(
        SwipeableRow,
        {
          slideoutView: slideoutView,
          isOpen: key === _this.state.openRowKey,
          maxSwipeDistance: _this._getMaxSwipeDistance(info),
          onOpen: function onOpen() {
            return _this._onOpen(key);
          },
          onClose: function onClose() {
            return _this._onClose(key);
          },
          shouldBounceOnMount: shouldBounceOnMount,
          onSwipeEnd: _this._setListViewScrollable,
          onSwipeStart: _this._setListViewNotScrollable },
        _this.props.renderItem(info)
      );
    };

    _this._setListViewScrollable = function () {
      _this._setListViewScrollableTo(true);
    };

    _this._setListViewNotScrollable = function () {
      _this._setListViewScrollableTo(false);
    };

    _this.state = {
      openRowKey: null
    };

    _this._shouldBounceFirstRowOnMount = _this.props.bounceFirstRowOnMount;
    return _this;
  }

  SwipeableFlatList.prototype.render = function render() {
    var _this2 = this;

    return React.createElement(FlatList, _extends({}, this.props, {
      ref: function ref(_ref) {
        _this2._flatListRef = _ref;
      },
      onScroll: this._onScroll,
      renderItem: this._renderItem
    }));
  };

  // This enables rows having variable width slideoutView.
  SwipeableFlatList.prototype._getMaxSwipeDistance = function _getMaxSwipeDistance(info) {
    if (typeof this.props.maxSwipeDistance === 'function') {
      return this.props.maxSwipeDistance(info);
    }

    return this.props.maxSwipeDistance;
  };

  SwipeableFlatList.prototype._setListViewScrollableTo = function _setListViewScrollableTo(value) {
    if (this._flatListRef) {
      this._flatListRef.setNativeProps({
        scrollEnabled: value
      });
    }
  };

  SwipeableFlatList.prototype._onOpen = function _onOpen(key) {
    this.setState({
      openRowKey: key
    });
  };

  SwipeableFlatList.prototype._onClose = function _onClose(key) {
    this.setState({
      openRowKey: null
    });
  };

  return SwipeableFlatList;
}(React.Component);

SwipeableFlatList.defaultProps = Object.assign({}, FlatList.defaultProps, {
  bounceFirstRowOnMount: true,
  renderQuickActions: function renderQuickActions() {
    return null;
  }
});
SwipeableFlatList.propTypes = process.env.NODE_ENV !== "production" ? Object.assign({}, FlatList.propTypes, {

  /**
   * To alert the user that swiping is possible, the first row can bounce
   * on component mount.
   */
  bounceFirstRowOnMount: PropTypes.bool.isRequired,

  // Maximum distance to open to after a swipe
  maxSwipeDistance: PropTypes.oneOfType([PropTypes.number, PropTypes.func]).isRequired,

  // Callback method to render the view that will be unveiled on swipe
  renderQuickActions: PropTypes.func.isRequired
}) : {};


export default SwipeableFlatList;