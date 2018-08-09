'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _UnimplementedView = require('../../../modules/UnimplementedView');

var _UnimplementedView2 = _interopRequireDefault(_UnimplementedView);

var _Platform = require('../../../exports/Platform');

var _Platform2 = _interopRequireDefault(_Platform);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ScrollView = require('../../../exports/ScrollView');

var _ScrollView2 = _interopRequireDefault(_ScrollView);

var _VirtualizedSectionList = require('../VirtualizedSectionList');

var _VirtualizedSectionList2 = _interopRequireDefault(_VirtualizedSectionList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (c) 2015-present, Facebook, Inc.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * This source code is licensed under the MIT license found in the
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * LICENSE file in the root directory of this source tree.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @noflow
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @format
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var defaultProps = Object.assign({}, _VirtualizedSectionList2.default.defaultProps, {
  stickySectionHeadersEnabled: _Platform2.default.OS === 'ios'
});

/**
 * A performant interface for rendering sectioned lists, supporting the most handy features:
 *
 *  - Fully cross-platform.
 *  - Configurable viewability callbacks.
 *  - List header support.
 *  - List footer support.
 *  - Item separator support.
 *  - Section header support.
 *  - Section separator support.
 *  - Heterogeneous data and item rendering support.
 *  - Pull to Refresh.
 *  - Scroll loading.
 *
 * If you don't need section support and want a simpler interface, use
 * [`<FlatList>`](/react-native/docs/flatlist.html).
 *
 * Simple Examples:
 *
 *     <SectionList
 *       renderItem={({item}) => <ListItem title={item} />}
 *       renderSectionHeader={({section}) => <Header title={section.title} />}
 *       sections={[ // homogeneous rendering between sections
 *         {data: [...], title: ...},
 *         {data: [...], title: ...},
 *         {data: [...], title: ...},
 *       ]}
 *     />
 *
 *     <SectionList
 *       sections={[ // heterogeneous rendering between sections
 *         {data: [...], renderItem: ...},
 *         {data: [...], renderItem: ...},
 *         {data: [...], renderItem: ...},
 *       ]}
 *     />
 *
 * This is a convenience wrapper around [`<VirtualizedList>`](docs/virtualizedlist.html),
 * and thus inherits its props (as well as those of `ScrollView`) that aren't explicitly listed
 * here, along with the following caveats:
 *
 * - Internal state is not preserved when content scrolls out of the render window. Make sure all
 *   your data is captured in the item data or external stores like Flux, Redux, or Relay.
 * - This is a `PureComponent` which means that it will not re-render if `props` remain shallow-
 *   equal. Make sure that everything your `renderItem` function depends on is passed as a prop
 *   (e.g. `extraData`) that is not `===` after updates, otherwise your UI may not update on
 *   changes. This includes the `data` prop and parent component state.
 * - In order to constrain memory and enable smooth scrolling, content is rendered asynchronously
 *   offscreen. This means it's possible to scroll faster than the fill rate and momentarily see
 *   blank content. This is a tradeoff that can be adjusted to suit the needs of each application,
 *   and we are working on improving it behind the scenes.
 * - By default, the list looks for a `key` prop on each item and uses that for the React key.
 *   Alternatively, you can provide a custom `keyExtractor` prop.
 *
 */
var SectionList = function (_React$PureComponent) {
  _inherits(SectionList, _React$PureComponent);

  function SectionList() {
    var _temp, _this, _ret;

    _classCallCheck(this, SectionList);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$PureComponent.call.apply(_React$PureComponent, [this].concat(args))), _this), _this._captureRef = function (ref) {
      /* $FlowFixMe(>=0.53.0 site=react_native_fb,react_native_oss) This comment
       * suppresses an error when upgrading Flow's support for React. To see the
       * error delete this comment and run Flow. */
      _this._wrapperListRef = ref;
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  /**
   * Scrolls to the item at the specified `sectionIndex` and `itemIndex` (within the section)
   * positioned in the viewable area such that `viewPosition` 0 places it at the top (and may be
   * covered by a sticky header), 1 at the bottom, and 0.5 centered in the middle. `viewOffset` is a
   * fixed number of pixels to offset the final target position, e.g. to compensate for sticky
   * headers.
   *
   * Note: cannot scroll to locations outside the render window without specifying the
   * `getItemLayout` prop.
   */
  SectionList.prototype.scrollToLocation = function scrollToLocation(params) {
    this._wrapperListRef.scrollToLocation(params);
  };

  /**
   * Tells the list an interaction has occurred, which should trigger viewability calculations, e.g.
   * if `waitForInteractions` is true and the user has not scrolled. This is typically called by
   * taps on items or by navigation actions.
   */


  SectionList.prototype.recordInteraction = function recordInteraction() {
    var listRef = this._wrapperListRef && this._wrapperListRef.getListRef();
    listRef && listRef.recordInteraction();
  };

  /**
   * Displays the scroll indicators momentarily.
   *
   * @platform ios
   */


  SectionList.prototype.flashScrollIndicators = function flashScrollIndicators() {
    var listRef = this._wrapperListRef && this._wrapperListRef.getListRef();
    listRef && listRef.flashScrollIndicators();
  };

  /**
   * Provides a handle to the underlying scroll responder.
   */


  SectionList.prototype.getScrollResponder = function getScrollResponder() {
    var listRef = this._wrapperListRef && this._wrapperListRef.getListRef();
    if (listRef) {
      return listRef.getScrollResponder();
    }
  };

  SectionList.prototype.getScrollableNode = function getScrollableNode() {
    var listRef = this._wrapperListRef && this._wrapperListRef.getListRef();
    if (listRef) {
      return listRef.getScrollableNode();
    }
  };

  SectionList.prototype.setNativeProps = function setNativeProps(props) {
    var listRef = this._wrapperListRef && this._wrapperListRef.getListRef();
    if (listRef) {
      listRef.setNativeProps(props);
    }
  };

  SectionList.prototype.render = function render() {
    var List = this.props.legacyImplementation ? _UnimplementedView2.default : _VirtualizedSectionList2.default;
    /* $FlowFixMe(>=0.66.0 site=react_native_fb) This comment suppresses an
     * error found when Flow v0.66 was deployed. To see the error delete this
     * comment and run Flow. */
    return _react2.default.createElement(List, _extends({}, this.props, { ref: this._captureRef }));
  };

  return SectionList;
}(_react2.default.PureComponent);

SectionList.defaultProps = defaultProps;
exports.default = SectionList;
module.exports = exports['default'];