/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule SwipeableListView
 * @noflow
 */
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _ListView = require('../ListView');

var _ListView2 = _interopRequireDefault(_ListView);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _SwipeableListViewDataSource = require('./SwipeableListViewDataSource');

var _SwipeableListViewDataSource2 = _interopRequireDefault(_SwipeableListViewDataSource);

var _SwipeableRow = require('../SwipeableRow');

var _SwipeableRow2 = _interopRequireDefault(_SwipeableRow);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * A container component that renders multiple SwipeableRow's in a ListView
 * implementation. This is designed to be a drop-in replacement for the
 * standard React Native `ListView`, so use it as if it were a ListView, but
 * with extra props, i.e.
 *
 * let ds = SwipeableListView.getNewDataSource();
 * ds.cloneWithRowsAndSections(dataBlob, ?sectionIDs, ?rowIDs);
 * // ..
 * <SwipeableListView renderRow={..} renderQuickActions={..} {..ListView props} />
 *
 * SwipeableRow can be used independently of this component, but the main
 * benefit of using this component is
 *
 * - It ensures that at most 1 row is swiped open (auto closes others)
 * - It can bounce the 1st row of the list so users know it's swipeable
 * - More to come
 */
var SwipeableListView = function (_React$Component) {
  _inherits(SwipeableListView, _React$Component);

  SwipeableListView.getNewDataSource = function getNewDataSource() {
    return new _SwipeableListViewDataSource2.default({
      getRowData: function getRowData(data, sectionID, rowID) {
        return data[sectionID][rowID];
      },
      getSectionHeaderData: function getSectionHeaderData(data, sectionID) {
        return data[sectionID];
      },
      rowHasChanged: function rowHasChanged(row1, row2) {
        return row1 !== row2;
      },
      sectionHeaderHasChanged: function sectionHeaderHasChanged(s1, s2) {
        return s1 !== s2;
      }
    });
  };

  function SwipeableListView(props, context) {
    _classCallCheck(this, SwipeableListView);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props, context));

    _this._listViewRef = null;
    _this._shouldBounceFirstRowOnMount = false;

    _this._onScroll = function (e) {
      // Close any opens rows on ListView scroll
      if (_this.props.dataSource.getOpenRowID()) {
        _this.setState({
          dataSource: _this.state.dataSource.setOpenRowID(null)
        });
      }
      _this.props.onScroll && _this.props.onScroll(e);
    };

    _this._renderRow = function (rowData, sectionID, rowID) {
      var slideoutView = _this.props.renderQuickActions(rowData, sectionID, rowID);

      // If renderQuickActions is unspecified or returns falsey, don't allow swipe
      if (!slideoutView) {
        return _this.props.renderRow(rowData, sectionID, rowID);
      }

      var shouldBounceOnMount = false;
      if (_this._shouldBounceFirstRowOnMount) {
        _this._shouldBounceFirstRowOnMount = false;
        shouldBounceOnMount = rowID === _this.props.dataSource.getFirstRowID();
      }

      return _react2.default.createElement(
        _SwipeableRow2.default,
        {
          slideoutView: slideoutView,
          isOpen: rowData.id === _this.props.dataSource.getOpenRowID(),
          maxSwipeDistance: _this._getMaxSwipeDistance(rowData, sectionID, rowID),
          key: rowID,
          onOpen: function onOpen() {
            return _this._onOpen(rowData.id);
          },
          onClose: function onClose() {
            return _this._onClose(rowData.id);
          },
          onSwipeEnd: function onSwipeEnd() {
            return _this._setListViewScrollable(true);
          },
          onSwipeStart: function onSwipeStart() {
            return _this._setListViewScrollable(false);
          },
          shouldBounceOnMount: shouldBounceOnMount },
        _this.props.renderRow(rowData, sectionID, rowID)
      );
    };

    _this._shouldBounceFirstRowOnMount = _this.props.bounceFirstRowOnMount;
    _this.state = {
      dataSource: _this.props.dataSource
    };
    return _this;
  }

  SwipeableListView.prototype.UNSAFE_componentWillReceiveProps = function UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.state.dataSource.getDataSource() !== nextProps.dataSource.getDataSource()) {
      this.setState({
        dataSource: nextProps.dataSource
      });
    }
  };

  SwipeableListView.prototype.render = function render() {
    var _this2 = this;

    return _react2.default.createElement(_ListView2.default, _extends({}, this.props, {
      ref: function ref(_ref) {
        _this2._listViewRef = _ref;
      },
      dataSource: this.state.dataSource.getDataSource(),
      onScroll: this._onScroll,
      renderRow: this._renderRow
    }));
  };

  /**
   * This is a work-around to lock vertical `ListView` scrolling on iOS and
   * mimic Android behaviour. Locking vertical scrolling when horizontal
   * scrolling is active allows us to significantly improve framerates
   * (from high 20s to almost consistently 60 fps)
   */
  SwipeableListView.prototype._setListViewScrollable = function _setListViewScrollable(value) {
    if (this._listViewRef && typeof this._listViewRef.setNativeProps === 'function') {
      this._listViewRef.setNativeProps({
        scrollEnabled: value
      });
    }
  };

  // Passing through ListView's getScrollResponder() function


  SwipeableListView.prototype.getScrollResponder = function getScrollResponder() {
    if (this._listViewRef && typeof this._listViewRef.getScrollResponder === 'function') {
      return this._listViewRef.getScrollResponder();
    }
  };

  // This enables rows having variable width slideoutView.


  SwipeableListView.prototype._getMaxSwipeDistance = function _getMaxSwipeDistance(rowData, sectionID, rowID) {
    if (typeof this.props.maxSwipeDistance === 'function') {
      return this.props.maxSwipeDistance(rowData, sectionID, rowID);
    }

    return this.props.maxSwipeDistance;
  };

  SwipeableListView.prototype._onOpen = function _onOpen(rowID) {
    this.setState({
      dataSource: this.state.dataSource.setOpenRowID(rowID)
    });
  };

  SwipeableListView.prototype._onClose = function _onClose(rowID) {
    this.setState({
      dataSource: this.state.dataSource.setOpenRowID(null)
    });
  };

  return SwipeableListView;
}(_react2.default.Component);

SwipeableListView.defaultProps = {
  bounceFirstRowOnMount: false,
  renderQuickActions: function renderQuickActions() {
    return null;
  }
};
SwipeableListView.propTypes = process.env.NODE_ENV !== "production" ? {
  /**
   * To alert the user that swiping is possible, the first row can bounce
   * on component mount.
   */
  bounceFirstRowOnMount: _propTypes2.default.bool.isRequired,
  /**
   * Use `SwipeableListView.getNewDataSource()` to get a data source to use,
   * then use it just like you would a normal ListView data source
   */
  dataSource: _propTypes2.default.instanceOf(_SwipeableListViewDataSource2.default).isRequired,
  // Maximum distance to open to after a swipe
  maxSwipeDistance: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.func]).isRequired,
  // Callback method to render the swipeable view
  renderRow: _propTypes2.default.func.isRequired,
  // Callback method to render the view that will be unveiled on swipe
  renderQuickActions: _propTypes2.default.func.isRequired
} : {};
exports.default = SwipeableListView;
module.exports = exports['default'];