'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _UnimplementedView = require('../../../modules/UnimplementedView');

var _UnimplementedView2 = _interopRequireDefault(_UnimplementedView);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _View = require('../../../exports/View');

var _View2 = _interopRequireDefault(_View);

var _VirtualizedList = require('../VirtualizedList');

var _VirtualizedList2 = _interopRequireDefault(_VirtualizedList);

var _invariant = require('fbjs/lib/invariant');

var _invariant2 = _interopRequireDefault(_invariant);

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

var defaultProps = Object.assign({}, _VirtualizedList2.default.defaultProps, {
  numColumns: 1
});

/**
 * A performant interface for rendering simple, flat lists, supporting the most handy features:
 *
 *  - Fully cross-platform.
 *  - Optional horizontal mode.
 *  - Configurable viewability callbacks.
 *  - Header support.
 *  - Footer support.
 *  - Separator support.
 *  - Pull to Refresh.
 *  - Scroll loading.
 *  - ScrollToIndex support.
 *
 * If you need section support, use [`<SectionList>`](docs/sectionlist.html).
 *
 * Minimal Example:
 *
 *     <FlatList
 *       data={[{key: 'a'}, {key: 'b'}]}
 *       renderItem={({item}) => <Text>{item.key}</Text>}
 *     />
 *
 * More complex, multi-select example demonstrating `PureComponent` usage for perf optimization and avoiding bugs.
 *
 * - By binding the `onPressItem` handler, the props will remain `===` and `PureComponent` will
 *   prevent wasteful re-renders unless the actual `id`, `selected`, or `title` props change, even
 *   if the components rendered in `MyListItem` did not have such optimizations.
 * - By passing `extraData={this.state}` to `FlatList` we make sure `FlatList` itself will re-render
 *   when the `state.selected` changes. Without setting this prop, `FlatList` would not know it
 *   needs to re-render any items because it is also a `PureComponent` and the prop comparison will
 *   not show any changes.
 * - `keyExtractor` tells the list to use the `id`s for the react keys instead of the default `key` property.
 *
 *
 *     class MyListItem extends React.PureComponent {
 *       _onPress = () => {
 *         this.props.onPressItem(this.props.id);
 *       };
 *
 *       render() {
 *         const textColor = this.props.selected ? "red" : "black";
 *         return (
 *           <TouchableOpacity onPress={this._onPress}>
 *             <View>
 *               <Text style={{ color: textColor }}>
 *                 {this.props.title}
 *               </Text>
 *             </View>
 *           </TouchableOpacity>
 *         );
 *       }
 *     }
 *
 *     class MultiSelectList extends React.PureComponent {
 *       state = {selected: (new Map(): Map<string, boolean>)};
 *
 *       _keyExtractor = (item, index) => item.id;
 *
 *       _onPressItem = (id: string) => {
 *         // updater functions are preferred for transactional updates
 *         this.setState((state) => {
 *           // copy the map rather than modifying state.
 *           const selected = new Map(state.selected);
 *           selected.set(id, !selected.get(id)); // toggle
 *           return {selected};
 *         });
 *       };
 *
 *       _renderItem = ({item}) => (
 *         <MyListItem
 *           id={item.id}
 *           onPressItem={this._onPressItem}
 *           selected={!!this.state.selected.get(item.id)}
 *           title={item.title}
 *         />
 *       );
 *
 *       render() {
 *         return (
 *           <FlatList
 *             data={this.props.data}
 *             extraData={this.state}
 *             keyExtractor={this._keyExtractor}
 *             renderItem={this._renderItem}
 *           />
 *         );
 *       }
 *     }
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
 *   offscreen. This means it's possible to scroll faster than the fill rate ands momentarily see
 *   blank content. This is a tradeoff that can be adjusted to suit the needs of each application,
 *   and we are working on improving it behind the scenes.
 * - By default, the list looks for a `key` prop on each item and uses that for the React key.
 *   Alternatively, you can provide a custom `keyExtractor` prop.
 *
 * Also inherits [ScrollView Props](docs/scrollview.html#props), unless it is nested in another FlatList of same orientation.
 */
var FlatList = function (_React$PureComponent) {
  _inherits(FlatList, _React$PureComponent);

  /**
   * Scrolls to the end of the content. May be janky without `getItemLayout` prop.
   */
  FlatList.prototype.scrollToEnd = function scrollToEnd(params) {
    if (this._listRef) {
      this._listRef.scrollToEnd(params);
    }
  };

  /**
   * Scrolls to the item at the specified index such that it is positioned in the viewable area
   * such that `viewPosition` 0 places it at the top, 1 at the bottom, and 0.5 centered in the
   * middle. `viewOffset` is a fixed number of pixels to offset the final target position.
   *
   * Note: cannot scroll to locations outside the render window without specifying the
   * `getItemLayout` prop.
   */


  FlatList.prototype.scrollToIndex = function scrollToIndex(params) {
    if (this._listRef) {
      this._listRef.scrollToIndex(params);
    }
  };

  /**
   * Requires linear scan through data - use `scrollToIndex` instead if possible.
   *
   * Note: cannot scroll to locations outside the render window without specifying the
   * `getItemLayout` prop.
   */


  FlatList.prototype.scrollToItem = function scrollToItem(params) {
    if (this._listRef) {
      this._listRef.scrollToItem(params);
    }
  };

  /**
   * Scroll to a specific content pixel offset in the list.
   *
   * Check out [scrollToOffset](docs/virtualizedlist.html#scrolltooffset) of VirtualizedList
   */


  FlatList.prototype.scrollToOffset = function scrollToOffset(params) {
    if (this._listRef) {
      this._listRef.scrollToOffset(params);
    }
  };

  /**
   * Tells the list an interaction has occurred, which should trigger viewability calculations, e.g.
   * if `waitForInteractions` is true and the user has not scrolled. This is typically called by
   * taps on items or by navigation actions.
   */


  FlatList.prototype.recordInteraction = function recordInteraction() {
    if (this._listRef) {
      this._listRef.recordInteraction();
    }
  };

  /**
   * Displays the scroll indicators momentarily.
   *
   * @platform ios
   */


  FlatList.prototype.flashScrollIndicators = function flashScrollIndicators() {
    if (this._listRef) {
      this._listRef.flashScrollIndicators();
    }
  };

  /**
   * Provides a handle to the underlying scroll responder.
   */


  FlatList.prototype.getScrollResponder = function getScrollResponder() {
    if (this._listRef) {
      return this._listRef.getScrollResponder();
    }
  };

  FlatList.prototype.getScrollableNode = function getScrollableNode() {
    if (this._listRef) {
      return this._listRef.getScrollableNode();
    }
  };

  FlatList.prototype.setNativeProps = function setNativeProps(props) {
    if (this._listRef) {
      this._listRef.setNativeProps(props);
    }
  };

  FlatList.prototype.UNSAFE_componentWillMount = function UNSAFE_componentWillMount() {
    this._checkProps(this.props);
  };

  FlatList.prototype.UNSAFE_componentWillReceiveProps = function UNSAFE_componentWillReceiveProps(nextProps) {
    (0, _invariant2.default)(nextProps.numColumns === this.props.numColumns, 'Changing numColumns on the fly is not supported. Change the key prop on FlatList when ' + 'changing the number of columns to force a fresh render of the component.');
    (0, _invariant2.default)(nextProps.onViewableItemsChanged === this.props.onViewableItemsChanged, 'Changing onViewableItemsChanged on the fly is not supported');
    (0, _invariant2.default)(nextProps.viewabilityConfig === this.props.viewabilityConfig, 'Changing viewabilityConfig on the fly is not supported');
    (0, _invariant2.default)(nextProps.viewabilityConfigCallbackPairs === this.props.viewabilityConfigCallbackPairs, 'Changing viewabilityConfigCallbackPairs on the fly is not supported');

    this._checkProps(nextProps);
  };

  function FlatList(props) {
    _classCallCheck(this, FlatList);

    var _this = _possibleConstructorReturn(this, _React$PureComponent.call(this, props));

    _this._hasWarnedLegacy = false;
    _this._virtualizedListPairs = [];

    _this._captureRef = function (ref) {
      _this._listRef = ref;
    };

    _this._getItem = function (data, index) {
      var numColumns = _this.props.numColumns;

      if (numColumns > 1) {
        var ret = [];
        for (var kk = 0; kk < numColumns; kk++) {
          var _item = data[index * numColumns + kk];
          _item && ret.push(_item);
        }
        return ret;
      } else {
        return data[index];
      }
    };

    _this._getItemCount = function (data) {
      return data ? Math.ceil(data.length / _this.props.numColumns) : 0;
    };

    _this._keyExtractor = function (items, index) {
      var _this$props = _this.props,
          keyExtractor = _this$props.keyExtractor,
          numColumns = _this$props.numColumns;

      if (numColumns > 1) {
        (0, _invariant2.default)(Array.isArray(items), 'FlatList: Encountered internal consistency error, expected each item to consist of an ' + 'array with 1-%s columns; instead, received a single item.', numColumns);
        return items.map(function (it, kk) {
          return keyExtractor(it, index * numColumns + kk);
        }).join(':');
      } else {
        /* $FlowFixMe(>=0.63.0 site=react_native_fb) This comment suppresses an
         * error found when Flow v0.63 was deployed. To see the error delete this
         * comment and run Flow. */
        return keyExtractor(items, index);
      }
    };

    _this._renderItem = function (info) {
      var _this$props2 = _this.props,
          renderItem = _this$props2.renderItem,
          numColumns = _this$props2.numColumns,
          columnWrapperStyle = _this$props2.columnWrapperStyle;

      if (numColumns > 1) {
        var _item2 = info.item,
            _index = info.index;

        (0, _invariant2.default)(Array.isArray(_item2), 'Expected array of items with numColumns > 1');
        return _react2.default.createElement(
          _View2.default,
          { style: [{ flexDirection: 'row' }, columnWrapperStyle] },
          _item2.map(function (it, kk) {
            var element = renderItem({
              item: it,
              index: _index * numColumns + kk,
              separators: info.separators
            });
            return element && _react2.default.cloneElement(element, { key: kk });
          })
        );
      } else {
        return renderItem(info);
      }
    };

    if (_this.props.viewabilityConfigCallbackPairs) {
      _this._virtualizedListPairs = _this.props.viewabilityConfigCallbackPairs.map(function (pair) {
        return {
          viewabilityConfig: pair.viewabilityConfig,
          onViewableItemsChanged: _this._createOnViewableItemsChanged(pair.onViewableItemsChanged)
        };
      });
    } else if (_this.props.onViewableItemsChanged) {
      /* $FlowFixMe(>=0.63.0 site=react_native_fb) This comment suppresses an
       * error found when Flow v0.63 was deployed. To see the error delete this
       * comment and run Flow. */
      _this._virtualizedListPairs.push({
        viewabilityConfig: _this.props.viewabilityConfig,
        onViewableItemsChanged: _this._createOnViewableItemsChanged(_this.props.onViewableItemsChanged)
      });
    }
    return _this;
  }

  FlatList.prototype._checkProps = function _checkProps(props) {
    var getItem = props.getItem,
        getItemCount = props.getItemCount,
        horizontal = props.horizontal,
        legacyImplementation = props.legacyImplementation,
        numColumns = props.numColumns,
        columnWrapperStyle = props.columnWrapperStyle,
        onViewableItemsChanged = props.onViewableItemsChanged,
        viewabilityConfigCallbackPairs = props.viewabilityConfigCallbackPairs;

    (0, _invariant2.default)(!getItem && !getItemCount, 'FlatList does not support custom data formats.');
    if (numColumns > 1) {
      (0, _invariant2.default)(!horizontal, 'numColumns does not support horizontal.');
    } else {
      (0, _invariant2.default)(!columnWrapperStyle, 'columnWrapperStyle not supported for single column lists');
    }
    if (legacyImplementation) {
      (0, _invariant2.default)(numColumns === 1, 'Legacy list does not support multiple columns.');
      // Warning: may not have full feature parity and is meant more for debugging and performance
      // comparison.
      if (!this._hasWarnedLegacy) {
        console.warn('FlatList: Using legacyImplementation - some features not supported and performance ' + 'may suffer');
        this._hasWarnedLegacy = true;
      }
    }
    (0, _invariant2.default)(!(onViewableItemsChanged && viewabilityConfigCallbackPairs), 'FlatList does not support setting both onViewableItemsChanged and ' + 'viewabilityConfigCallbackPairs.');
  };

  FlatList.prototype._pushMultiColumnViewable = function _pushMultiColumnViewable(arr, v) {
    var _props = this.props,
        numColumns = _props.numColumns,
        keyExtractor = _props.keyExtractor;

    v.item.forEach(function (item, ii) {
      (0, _invariant2.default)(v.index != null, 'Missing index!');
      var index = v.index * numColumns + ii;
      arr.push(Object.assign({}, v, { item: item, key: keyExtractor(item, index), index: index }));
    });
  };

  FlatList.prototype._createOnViewableItemsChanged = function _createOnViewableItemsChanged(onViewableItemsChanged) {
    var _this2 = this;

    return function (info) {
      var numColumns = _this2.props.numColumns;

      if (onViewableItemsChanged) {
        if (numColumns > 1) {
          var _changed = [];
          var _viewableItems = [];
          info.viewableItems.forEach(function (v) {
            return _this2._pushMultiColumnViewable(_viewableItems, v);
          });
          info.changed.forEach(function (v) {
            return _this2._pushMultiColumnViewable(_changed, v);
          });
          onViewableItemsChanged({ viewableItems: _viewableItems, changed: _changed });
        } else {
          onViewableItemsChanged(info);
        }
      }
    };
  };

  FlatList.prototype.render = function render() {
    if (this.props.legacyImplementation) {
      return (
        /* $FlowFixMe(>=0.66.0 site=react_native_fb) This comment suppresses an
         * error found when Flow v0.66 was deployed. To see the error delete
         * this comment and run Flow. */
        _react2.default.createElement(_UnimplementedView2.default, _extends({}, this.props, {
          /* $FlowFixMe(>=0.66.0 site=react_native_fb) This comment suppresses
           * an error found when Flow v0.66 was deployed. To see the error
           * delete this comment and run Flow. */
          items: this.props.data,
          ref: this._captureRef
        }))
      );
    } else {
      return _react2.default.createElement(_VirtualizedList2.default, _extends({}, this.props, {
        renderItem: this._renderItem,
        getItem: this._getItem,
        getItemCount: this._getItemCount,
        keyExtractor: this._keyExtractor,
        ref: this._captureRef,
        viewabilityConfigCallbackPairs: this._virtualizedListPairs
      }));
    }
  };

  return FlatList;
}(_react2.default.PureComponent);

FlatList.defaultProps = defaultProps;
exports.default = FlatList;
module.exports = exports['default'];