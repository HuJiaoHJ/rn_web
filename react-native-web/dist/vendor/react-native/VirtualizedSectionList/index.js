var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @noflow
 * @format
 */

import React from 'react';
import View from '../../../exports/View';
import VirtualizedList from '../VirtualizedList';
import invariant from 'fbjs/lib/invariant';

/**
 * Right now this just flattens everything into one list and uses VirtualizedList under the
 * hood. The only operation that might not scale well is concatting the data arrays of all the
 * sections when new props are received, which should be plenty fast for up to ~10,000 items.
 */
var VirtualizedSectionList = function (_React$PureComponent) {
  _inherits(VirtualizedSectionList, _React$PureComponent);

  VirtualizedSectionList.prototype.scrollToLocation = function scrollToLocation(params) {
    var index = params.itemIndex + 1;
    for (var ii = 0; ii < params.sectionIndex; ii++) {
      index += this.props.sections[ii].data.length + 2;
    }
    var toIndexParams = Object.assign({}, params, {
      index: index
    });
    this._listRef.scrollToIndex(toIndexParams);
  };

  VirtualizedSectionList.prototype.getListRef = function getListRef() {
    return this._listRef;
  };

  VirtualizedSectionList.prototype._subExtractor = function _subExtractor(index) {
    var itemIndex = index;
    var defaultKeyExtractor = this.props.keyExtractor;
    for (var ii = 0; ii < this.props.sections.length; ii++) {
      var _section = this.props.sections[ii];
      var _key = _section.key || String(ii);
      itemIndex -= 1; // The section adds an item for the header
      if (itemIndex >= _section.data.length + 1) {
        itemIndex -= _section.data.length + 1; // The section adds an item for the footer.
      } else if (itemIndex === -1) {
        return {
          section: _section,
          key: _key + ':header',
          index: null,
          header: true,
          trailingSection: this.props.sections[ii + 1]
        };
      } else if (itemIndex === _section.data.length) {
        return {
          section: _section,
          key: _key + ':footer',
          index: null,
          header: false,
          trailingSection: this.props.sections[ii + 1]
        };
      } else {
        var _keyExtractor = _section.keyExtractor || defaultKeyExtractor;
        return {
          section: _section,
          key: _key + ':' + _keyExtractor(_section.data[itemIndex], itemIndex),
          index: itemIndex,
          leadingItem: _section.data[itemIndex - 1],
          leadingSection: this.props.sections[ii - 1],
          trailingItem: _section.data[itemIndex + 1],
          trailingSection: this.props.sections[ii + 1]
        };
      }
    }
  };

  VirtualizedSectionList.prototype._getSeparatorComponent = function _getSeparatorComponent(index, info) {
    info = info || this._subExtractor(index);
    if (!info) {
      return null;
    }
    var ItemSeparatorComponent = info.section.ItemSeparatorComponent || this.props.ItemSeparatorComponent;
    var SectionSeparatorComponent = this.props.SectionSeparatorComponent;

    var isLastItemInList = index === this.state.childProps.getItemCount() - 1;
    var isLastItemInSection = info.index === info.section.data.length - 1;
    if (SectionSeparatorComponent && isLastItemInSection) {
      return SectionSeparatorComponent;
    }
    if (ItemSeparatorComponent && !isLastItemInSection && !isLastItemInList) {
      return ItemSeparatorComponent;
    }
    return null;
  };

  VirtualizedSectionList.prototype._computeState = function _computeState(props) {
    var offset = props.ListHeaderComponent ? 1 : 0;
    var stickyHeaderIndices = [];
    var itemCount = props.sections.reduce(function (v, section) {
      stickyHeaderIndices.push(v + offset);
      return v + section.data.length + 2; // Add two for the section header and footer.
    }, 0);

    return {
      childProps: Object.assign({}, props, {
        renderItem: this._renderItem,
        ItemSeparatorComponent: undefined, // Rendered with renderItem
        data: props.sections,
        getItemCount: function getItemCount() {
          return itemCount;
        },
        getItem: getItem,
        keyExtractor: this._keyExtractor,
        onViewableItemsChanged: props.onViewableItemsChanged ? this._onViewableItemsChanged : undefined,
        stickyHeaderIndices: props.stickySectionHeadersEnabled ? stickyHeaderIndices : undefined
      })
    };
  };

  function VirtualizedSectionList(props, context) {
    _classCallCheck(this, VirtualizedSectionList);

    var _this = _possibleConstructorReturn(this, _React$PureComponent.call(this, props, context));

    _this._keyExtractor = function (item, index) {
      var info = _this._subExtractor(index);
      return info && info.key || String(index);
    };

    _this._convertViewable = function (viewable) {
      invariant(viewable.index != null, 'Received a broken ViewToken');
      var info = _this._subExtractor(viewable.index);
      if (!info) {
        return null;
      }
      var keyExtractor = info.section.keyExtractor || _this.props.keyExtractor;
      return Object.assign({}, viewable, {
        index: info.index,
        /* $FlowFixMe(>=0.63.0 site=react_native_fb) This comment suppresses an
         * error found when Flow v0.63 was deployed. To see the error delete this
         * comment and run Flow. */
        key: keyExtractor(viewable.item, info.index),
        section: info.section
      });
    };

    _this._onViewableItemsChanged = function (_ref) {
      var viewableItems = _ref.viewableItems,
          changed = _ref.changed;

      if (_this.props.onViewableItemsChanged) {
        _this.props.onViewableItemsChanged({
          viewableItems: viewableItems.map(_this._convertViewable, _this).filter(Boolean),
          changed: changed.map(_this._convertViewable, _this).filter(Boolean)
        });
      }
    };

    _this._renderItem = function (_ref2) {
      var item = _ref2.item,
          index = _ref2.index;

      var info = _this._subExtractor(index);
      if (!info) {
        return null;
      }
      var infoIndex = info.index;
      if (infoIndex == null) {
        var _section2 = info.section;

        if (info.header === true) {
          var _renderSectionHeader = _this.props.renderSectionHeader;

          return _renderSectionHeader ? _renderSectionHeader({ section: _section2 }) : null;
        } else {
          var _renderSectionFooter = _this.props.renderSectionFooter;

          return _renderSectionFooter ? _renderSectionFooter({ section: _section2 }) : null;
        }
      } else {
        var _renderItem = info.section.renderItem || _this.props.renderItem;
        var _SeparatorComponent = _this._getSeparatorComponent(index, info);
        invariant(_renderItem, 'no renderItem!');
        return React.createElement(ItemWithSeparator, {
          SeparatorComponent: _SeparatorComponent,
          LeadingSeparatorComponent: infoIndex === 0 ? _this.props.SectionSeparatorComponent : undefined,
          cellKey: info.key,
          index: infoIndex,
          item: item,
          leadingItem: info.leadingItem,
          leadingSection: info.leadingSection,
          onUpdateSeparator: _this._onUpdateSeparator,
          prevCellKey: (_this._subExtractor(index - 1) || {}).key,
          ref: function ref(_ref3) {
            _this._cellRefs[info.key] = _ref3;
          },
          renderItem: _renderItem,
          section: info.section,
          trailingItem: info.trailingItem,
          trailingSection: info.trailingSection
        });
      }
    };

    _this._onUpdateSeparator = function (key, newProps) {
      var ref = _this._cellRefs[key];
      ref && ref.updateSeparatorProps(newProps);
    };

    _this._cellRefs = {};

    _this._captureRef = function (ref) {
      /* $FlowFixMe(>=0.53.0 site=react_native_fb,react_native_oss) This comment
       * suppresses an error when upgrading Flow's support for React. To see the
       * error delete this comment and run Flow. */
      _this._listRef = ref;
    };

    _this.state = _this._computeState(props);
    return _this;
  }

  VirtualizedSectionList.prototype.UNSAFE_componentWillReceiveProps = function UNSAFE_componentWillReceiveProps(nextProps) {
    this.setState(this._computeState(nextProps));
  };

  VirtualizedSectionList.prototype.render = function render() {
    return React.createElement(VirtualizedList, _extends({}, this.state.childProps, { ref: this._captureRef }));
  };

  return VirtualizedSectionList;
}(React.PureComponent);

VirtualizedSectionList.defaultProps = Object.assign({}, VirtualizedList.defaultProps, {
  data: []
});

var ItemWithSeparator = function (_React$Component) {
  _inherits(ItemWithSeparator, _React$Component);

  function ItemWithSeparator() {
    var _temp, _this2, _ret;

    _classCallCheck(this, ItemWithSeparator);

    for (var _len = arguments.length, args = Array(_len), _key2 = 0; _key2 < _len; _key2++) {
      args[_key2] = arguments[_key2];
    }

    return _ret = (_temp = (_this2 = _possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this2), _this2.state = {
      separatorProps: {
        highlighted: false,
        leadingItem: _this2.props.item,
        leadingSection: _this2.props.leadingSection,
        section: _this2.props.section,
        trailingItem: _this2.props.trailingItem,
        trailingSection: _this2.props.trailingSection
      },
      leadingSeparatorProps: {
        highlighted: false,
        leadingItem: _this2.props.leadingItem,
        leadingSection: _this2.props.leadingSection,
        section: _this2.props.section,
        trailingItem: _this2.props.item,
        trailingSection: _this2.props.trailingSection
      }
    }, _this2._separators = {
      highlight: function highlight() {
        ['leading', 'trailing'].forEach(function (s) {
          return _this2._separators.updateProps(s, { highlighted: true });
        });
      },
      unhighlight: function unhighlight() {
        ['leading', 'trailing'].forEach(function (s) {
          return _this2._separators.updateProps(s, { highlighted: false });
        });
      },
      updateProps: function updateProps(select, newProps) {
        var _this2$props = _this2.props,
            LeadingSeparatorComponent = _this2$props.LeadingSeparatorComponent,
            cellKey = _this2$props.cellKey,
            prevCellKey = _this2$props.prevCellKey;

        if (select === 'leading' && LeadingSeparatorComponent) {
          _this2.setState(function (state) {
            return {
              leadingSeparatorProps: Object.assign({}, state.leadingSeparatorProps, newProps)
            };
          });
        } else {
          _this2.props.onUpdateSeparator(select === 'leading' && prevCellKey || cellKey, newProps);
        }
      }
    }, _temp), _possibleConstructorReturn(_this2, _ret);
  }

  ItemWithSeparator.prototype.UNSAFE_componentWillReceiveProps = function UNSAFE_componentWillReceiveProps(props) {
    var _this3 = this;

    this.setState(function (state) {
      return {
        separatorProps: Object.assign({}, _this3.state.separatorProps, {
          leadingItem: props.item,
          leadingSection: props.leadingSection,
          section: props.section,
          trailingItem: props.trailingItem,
          trailingSection: props.trailingSection
        }),
        leadingSeparatorProps: Object.assign({}, _this3.state.leadingSeparatorProps, {
          leadingItem: props.leadingItem,
          leadingSection: props.leadingSection,
          section: props.section,
          trailingItem: props.item,
          trailingSection: props.trailingSection
        })
      };
    });
  };

  ItemWithSeparator.prototype.updateSeparatorProps = function updateSeparatorProps(newProps) {
    this.setState(function (state) {
      return {
        separatorProps: Object.assign({}, state.separatorProps, newProps)
      };
    });
  };

  ItemWithSeparator.prototype.render = function render() {
    var _props = this.props,
        LeadingSeparatorComponent = _props.LeadingSeparatorComponent,
        SeparatorComponent = _props.SeparatorComponent,
        item = _props.item,
        index = _props.index,
        section = _props.section;

    var element = this.props.renderItem({
      item: item,
      index: index,
      section: section,
      separators: this._separators
    });
    var leadingSeparator = LeadingSeparatorComponent && React.createElement(LeadingSeparatorComponent, this.state.leadingSeparatorProps);
    var separator = SeparatorComponent && React.createElement(SeparatorComponent, this.state.separatorProps);
    return leadingSeparator || separator ? React.createElement(
      View,
      null,
      leadingSeparator,
      element,
      separator
    ) : element;
  };

  return ItemWithSeparator;
}(React.Component);

function getItem(sections, index) {
  if (!sections) {
    return null;
  }
  var itemIdx = index - 1;
  for (var ii = 0; ii < sections.length; ii++) {
    if (itemIdx === -1 || itemIdx === sections[ii].data.length) {
      // We intend for there to be overflow by one on both ends of the list.
      // This will be for headers and footers. When returning a header or footer
      // item the section itself is the item.
      return sections[ii];
    } else if (itemIdx < sections[ii].data.length) {
      // If we are in the bounds of the list's data then return the item.
      return sections[ii].data[itemIdx];
    } else {
      itemIdx -= sections[ii].data.length + 2; // Add two for the header and footer
    }
  }
  return null;
}

export default VirtualizedSectionList;