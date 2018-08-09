function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Copyright (c) 2015-present, Nicolas Gallagher.
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * 
 */

import applyLayout from '../../modules/applyLayout';
import applyNativeMethods from '../../modules/applyNativeMethods';
import { bool } from 'prop-types';
import createElement from '../createElement';
import filterSupportedProps from './filterSupportedProps';
import invariant from 'fbjs/lib/invariant';
import StyleSheet from '../StyleSheet';
import ViewPropTypes from './ViewPropTypes';
import React, { Component } from 'react';

var calculateHitSlopStyle = function calculateHitSlopStyle(hitSlop) {
  var hitStyle = {};
  for (var prop in hitSlop) {
    if (hitSlop.hasOwnProperty(prop)) {
      var value = hitSlop[prop];
      hitStyle[prop] = value > 0 ? -1 * value : 0;
    }
  }
  return hitStyle;
};

var View = function (_Component) {
  _inherits(View, _Component);

  function View() {
    _classCallCheck(this, View);

    return _possibleConstructorReturn(this, _Component.apply(this, arguments));
  }

  View.prototype.render = function render() {
    var hitSlop = this.props.hitSlop;
    var supportedProps = filterSupportedProps(this.props);

    if (process.env.NODE_ENV !== 'production') {
      React.Children.toArray(this.props.children).forEach(function (item) {
        invariant(typeof item !== 'string', 'Unexpected text node: ' + item + '. A text node cannot be a child of a <View>.');
      });
    }

    var isInAParentText = this.context.isInAParentText;


    supportedProps.style = StyleSheet.compose(styles.initial, StyleSheet.compose(isInAParentText && styles.inline, this.props.style));

    if (hitSlop) {
      var hitSlopStyle = calculateHitSlopStyle(hitSlop);
      var hitSlopChild = createElement('span', { style: [styles.hitSlop, hitSlopStyle] });
      supportedProps.children = React.Children.toArray([hitSlopChild, supportedProps.children]);
    }

    return createElement('div', supportedProps);
  };

  return View;
}(Component);

View.displayName = 'View';
View.contextTypes = {
  isInAParentText: bool
};
View.propTypes = process.env.NODE_ENV !== "production" ? ViewPropTypes : {};


var styles = StyleSheet.create({
  // https://github.com/facebook/css-layout#default-values
  initial: {
    alignItems: 'stretch',
    borderWidth: 0,
    borderStyle: 'solid',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    margin: 0,
    padding: 0,
    position: 'relative',
    zIndex: 0,
    // fix flexbox bugs
    minHeight: 0,
    minWidth: 0
  },
  inline: {
    display: 'inline-flex'
  },
  // this zIndex-ordering positions the hitSlop above the View but behind
  // its children
  hitSlop: Object.assign({}, StyleSheet.absoluteFillObject, {
    zIndex: -1
  })
});

export default applyLayout(applyNativeMethods(View));