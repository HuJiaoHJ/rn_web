var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

/**
 * Copyright (c) 2016-present, Nicolas Gallagher.
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @noflow
 */

import createReactClass from 'create-react-class';
import dismissKeyboard from '../../modules/dismissKeyboard';
import findNodeHandle from '../findNodeHandle';
import invariant from 'fbjs/lib/invariant';
import ScrollResponder from '../../modules/ScrollResponder';
import ScrollViewBase from './ScrollViewBase';
import StyleSheet from '../StyleSheet';
import View from '../View';
import ViewPropTypes from '../ViewPropTypes';
import React from 'react';
import { arrayOf, bool, element, func, number, oneOf } from 'prop-types';

var emptyObject = {};

/* eslint-disable react/prefer-es6-class, react/prop-types */
var ScrollView = createReactClass({
  displayName: 'ScrollView',

  propTypes: Object.assign({}, ViewPropTypes, {
    contentContainerStyle: ViewPropTypes.style,
    horizontal: bool,
    keyboardDismissMode: oneOf(['none', 'interactive', 'on-drag']),
    onContentSizeChange: func,
    onScroll: func,
    pagingEnabled: bool,
    refreshControl: element,
    scrollEnabled: bool,
    scrollEventThrottle: number,
    stickyHeaderIndices: arrayOf(number),
    style: ViewPropTypes.style
  }),

  mixins: [ScrollResponder.Mixin],

  getInitialState: function getInitialState() {
    return this.scrollResponderMixinGetInitialState();
  },
  flashScrollIndicators: function flashScrollIndicators() {
    this.scrollResponderFlashScrollIndicators();
  },
  setNativeProps: function setNativeProps(props) {
    if (this._scrollViewRef) {
      this._scrollViewRef.setNativeProps(props);
    }
  },


  /**
   * Returns a reference to the underlying scroll responder, which supports
   * operations like `scrollTo`. All ScrollView-like components should
   * implement this method so that they can be composed while providing access
   * to the underlying scroll responder's methods.
   */
  getScrollResponder: function getScrollResponder() {
    return this;
  },
  getScrollableNode: function getScrollableNode() {
    return findNodeHandle(this._scrollViewRef);
  },
  getInnerViewNode: function getInnerViewNode() {
    return findNodeHandle(this._innerViewRef);
  },


  /**
   * Scrolls to a given x, y offset, either immediately or with a smooth animation.
   * Syntax:
   *
   * scrollTo(options: {x: number = 0; y: number = 0; animated: boolean = true})
   *
   * Note: The weird argument signature is due to the fact that, for historical reasons,
   * the function also accepts separate arguments as as alternative to the options object.
   * This is deprecated due to ambiguity (y before x), and SHOULD NOT BE USED.
   */
  scrollTo: function scrollTo(y, x, animated) {
    if (typeof y === 'number') {
      console.warn('`scrollTo(y, x, animated)` is deprecated. Use `scrollTo({x: 5, y: 5, animated: true})` instead.');
    } else {
      var _ref = y || emptyObject;

      x = _ref.x;
      y = _ref.y;
      animated = _ref.animated;
    }

    this.getScrollResponder().scrollResponderScrollTo({
      x: x || 0,
      y: y || 0,
      animated: animated !== false
    });
  },


  /**
   * If this is a vertical ScrollView scrolls to the bottom.
   * If this is a horizontal ScrollView scrolls to the right.
   *
   * Use `scrollToEnd({ animated: true })` for smooth animated scrolling,
   * `scrollToEnd({ animated: false })` for immediate scrolling.
   * If no options are passed, `animated` defaults to true.
   */
  scrollToEnd: function scrollToEnd(options) {
    // Default to true
    var animated = (options && options.animated) !== false;
    var horizontal = this.props.horizontal;

    var scrollResponder = this.getScrollResponder();
    var scrollResponderNode = scrollResponder.scrollResponderGetScrollableNode();
    var x = horizontal ? scrollResponderNode.scrollWidth : 0;
    var y = horizontal ? 0 : scrollResponderNode.scrollHeight;
    scrollResponder.scrollResponderScrollTo({ x: x, y: y, animated: animated });
  },


  /**
   * Deprecated, do not use.
   */
  scrollWithoutAnimationTo: function scrollWithoutAnimationTo() {
    var y = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var x = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

    console.warn('`scrollWithoutAnimationTo` is deprecated. Use `scrollTo` instead');
    this.scrollTo({ x: x, y: y, animated: false });
  },
  render: function render() {
    var _props = this.props,
        contentContainerStyle = _props.contentContainerStyle,
        horizontal = _props.horizontal,
        onContentSizeChange = _props.onContentSizeChange,
        refreshControl = _props.refreshControl,
        stickyHeaderIndices = _props.stickyHeaderIndices,
        keyboardDismissMode = _props.keyboardDismissMode,
        onScroll = _props.onScroll,
        pagingEnabled = _props.pagingEnabled,
        other = _objectWithoutProperties(_props, ['contentContainerStyle', 'horizontal', 'onContentSizeChange', 'refreshControl', 'stickyHeaderIndices', 'keyboardDismissMode', 'onScroll', 'pagingEnabled']);

    if (process.env.NODE_ENV !== 'production' && this.props.style) {
      var style = StyleSheet.flatten(this.props.style);
      var childLayoutProps = ['alignItems', 'justifyContent'].filter(function (prop) {
        return style && style[prop] !== undefined;
      });
      invariant(childLayoutProps.length === 0, 'ScrollView child layout (' + JSON.stringify(childLayoutProps) + ') ' + 'must be applied through the contentContainerStyle prop.');
    }

    var contentSizeChangeProps = {};
    if (onContentSizeChange) {
      contentSizeChangeProps = {
        onLayout: this._handleContentOnLayout
      };
    }

    var children = !horizontal && Array.isArray(stickyHeaderIndices) ? React.Children.map(this.props.children, function (child, i) {
      if (stickyHeaderIndices.indexOf(i) > -1) {
        return React.cloneElement(child, { style: [child.props.style, styles.stickyHeader] });
      } else {
        return child;
      }
    }) : this.props.children;

    var contentContainer = React.createElement(View, _extends({}, contentSizeChangeProps, {
      children: children,
      collapsable: false,
      ref: this._setInnerViewRef,
      style: [horizontal && styles.contentContainerHorizontal, contentContainerStyle]
    }));

    var baseStyle = horizontal ? styles.baseHorizontal : styles.baseVertical;

    var props = Object.assign({}, other, {
      style: [baseStyle, this.props.style],
      onTouchStart: this.scrollResponderHandleTouchStart,
      onTouchMove: this.scrollResponderHandleTouchMove,
      onTouchEnd: this.scrollResponderHandleTouchEnd,
      onScrollBeginDrag: this.scrollResponderHandleScrollBeginDrag,
      onScrollEndDrag: this.scrollResponderHandleScrollEndDrag,
      onMomentumScrollBegin: this.scrollResponderHandleMomentumScrollBegin,
      onMomentumScrollEnd: this.scrollResponderHandleMomentumScrollEnd,
      onStartShouldSetResponder: this.scrollResponderHandleStartShouldSetResponder,
      onStartShouldSetResponderCapture: this.scrollResponderHandleStartShouldSetResponderCapture,
      onScrollShouldSetResponder: this.scrollResponderHandleScrollShouldSetResponder,
      onScroll: this._handleScroll,
      onResponderGrant: this.scrollResponderHandleResponderGrant,
      onResponderTerminationRequest: this.scrollResponderHandleTerminationRequest,
      onResponderTerminate: this.scrollResponderHandleTerminate,
      onResponderRelease: this.scrollResponderHandleResponderRelease,
      onResponderReject: this.scrollResponderHandleResponderReject
    });

    var ScrollViewClass = ScrollViewBase;

    invariant(ScrollViewClass !== undefined, 'ScrollViewClass must not be undefined');

    if (refreshControl) {
      return React.cloneElement(refreshControl, { style: props.style }, React.createElement(
        ScrollViewClass,
        _extends({}, props, { ref: this._setScrollViewRef, style: baseStyle }),
        contentContainer
      ));
    }

    return React.createElement(
      ScrollViewClass,
      _extends({}, props, { ref: this._setScrollViewRef, style: props.style }),
      contentContainer
    );
  },
  _handleContentOnLayout: function _handleContentOnLayout(e) {
    var _e$nativeEvent$layout = e.nativeEvent.layout,
        width = _e$nativeEvent$layout.width,
        height = _e$nativeEvent$layout.height;

    this.props.onContentSizeChange(width, height);
  },
  _handleScroll: function _handleScroll(e) {
    if (process.env.NODE_ENV !== 'production') {
      if (this.props.onScroll && !this.props.scrollEventThrottle) {
        console.log('You specified `onScroll` on a <ScrollView> but not ' + '`scrollEventThrottle`. You will only receive one event. ' + 'Using `16` you get all the events but be aware that it may ' + "cause frame drops, use a bigger number if you don't need as " + 'much precision.');
      }
    }

    if (this.props.keyboardDismissMode === 'on-drag') {
      dismissKeyboard();
    }

    this.scrollResponderHandleScroll(e);
  },
  _setInnerViewRef: function _setInnerViewRef(component) {
    this._innerViewRef = component;
  },
  _setScrollViewRef: function _setScrollViewRef(component) {
    this._scrollViewRef = component;
  }
});

var commonStyle = {
  flexGrow: 1,
  flexShrink: 1,
  // Enable hardware compositing in modern browsers.
  // Creates a new layer with its own backing surface that can significantly
  // improve scroll performance.
  transform: [{ translateZ: 0 }],
  // iOS native scrolling
  WebkitOverflowScrolling: 'touch'
};

var styles = StyleSheet.create({
  baseVertical: Object.assign({}, commonStyle, {
    flexDirection: 'column',
    overflowX: 'hidden',
    overflowY: 'auto',
    touchAction: 'pan-y'
  }),
  baseHorizontal: Object.assign({}, commonStyle, {
    flexDirection: 'row',
    overflowX: 'auto',
    overflowY: 'hidden',
    touchAction: 'pan-x'
  }),
  contentContainerHorizontal: {
    flexDirection: 'row'
  },
  stickyHeader: {
    position: 'sticky',
    top: 0,
    zIndex: 10
  }
});

export default ScrollView;