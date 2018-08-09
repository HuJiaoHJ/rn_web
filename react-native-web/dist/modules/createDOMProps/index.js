function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

/**
 * Copyright (c) 2015-present, Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @noflow
 */

import AccessibilityUtil from '../AccessibilityUtil';
import StyleSheet from '../../exports/StyleSheet';
import styleResolver from '../../exports/StyleSheet/styleResolver';

var emptyObject = {};

var resetStyles = StyleSheet.create({
  ariaButton: {
    cursor: 'pointer'
  },
  button: {
    appearance: 'none',
    backgroundColor: 'transparent',
    color: 'inherit',
    fontFamily: 'inherit',
    fontSize: 'inherit',
    fontStyle: 'inherit',
    fontVariant: ['inherit'],
    fontWeight: 'inherit',
    lineHeight: 'inherit',
    textAlign: 'inherit'
  },
  heading: {
    fontFamily: 'inherit',
    fontSize: 'inherit',
    fontStyle: 'inherit',
    fontVariant: ['inherit'],
    fontWeight: 'inherit',
    lineHeight: 'inherit'
  },
  link: {
    backgroundColor: 'transparent',
    color: 'inherit',
    textDecorationLine: 'none'
  },
  list: {
    listStyle: 'none'
  }
});

var pointerEventsStyles = StyleSheet.create({
  auto: {
    pointerEvents: 'auto'
  },
  'box-none': {
    pointerEvents: 'box-none'
  },
  'box-only': {
    pointerEvents: 'box-only'
  },
  none: {
    pointerEvents: 'none'
  }
});

var defaultStyleResolver = function defaultStyleResolver(style) {
  return styleResolver.resolve(style);
};

var createDOMProps = function createDOMProps(component, props, styleResolver) {
  if (!styleResolver) {
    styleResolver = defaultStyleResolver;
  }

  if (!props) {
    props = emptyObject;
  }

  var _props = props,
      accessibilityLabel = _props.accessibilityLabel,
      accessibilityLiveRegion = _props.accessibilityLiveRegion,
      importantForAccessibility = _props.importantForAccessibility,
      placeholderTextColor = _props.placeholderTextColor,
      pointerEvents = _props.pointerEvents,
      providedStyle = _props.style,
      testID = _props.testID,
      accessible = _props.accessible,
      accessibilityComponentType = _props.accessibilityComponentType,
      accessibilityRole = _props.accessibilityRole,
      accessibilityTraits = _props.accessibilityTraits,
      domProps = _objectWithoutProperties(_props, ['accessibilityLabel', 'accessibilityLiveRegion', 'importantForAccessibility', 'placeholderTextColor', 'pointerEvents', 'style', 'testID', 'accessible', 'accessibilityComponentType', 'accessibilityRole', 'accessibilityTraits']);

  var disabled = AccessibilityUtil.isDisabled(props);
  var role = AccessibilityUtil.propsToAriaRole(props);

  // GENERAL ACCESSIBILITY
  if (importantForAccessibility === 'no-hide-descendants') {
    domProps['aria-hidden'] = true;
  }
  if (accessibilityLabel && accessibilityLabel.constructor === String) {
    domProps['aria-label'] = accessibilityLabel;
  }
  if (accessibilityLiveRegion && accessibilityLiveRegion.constructor === String) {
    domProps['aria-live'] = accessibilityLiveRegion === 'none' ? 'off' : accessibilityLiveRegion;
  }
  if (role && role.constructor === String && role !== 'label') {
    domProps.role = role;
  }

  // DISABLED
  if (disabled) {
    domProps['aria-disabled'] = disabled;
    domProps.disabled = disabled;
  }

  // FOCUS
  // Assume that 'link' is focusable by default (uses <a>).
  // Assume that 'button' is not (uses <div role='button'>) but must be treated as such.
  var focusable = !disabled && importantForAccessibility !== 'no' && importantForAccessibility !== 'no-hide-descendants';
  if (role === 'link' || component === 'input' || component === 'select' || component === 'textarea') {
    if (accessible === false || !focusable) {
      domProps.tabIndex = '-1';
    } else {
      domProps['data-focusable'] = true;
    }
  } else if (role === 'button' || role === 'textbox') {
    if (accessible !== false && focusable) {
      domProps['data-focusable'] = true;
      domProps.tabIndex = '0';
    }
  } else {
    if (accessible === true && focusable) {
      domProps['data-focusable'] = true;
      domProps.tabIndex = '0';
    }
  }

  // STYLE
  // Resolve React Native styles to optimized browser equivalent
  var reactNativeStyle = [component === 'a' && resetStyles.link, component === 'button' && resetStyles.button, role === 'heading' && resetStyles.heading, component === 'ul' && resetStyles.list, role === 'button' && !disabled && resetStyles.ariaButton, pointerEvents && pointerEventsStyles[pointerEvents], providedStyle, placeholderTextColor && { placeholderTextColor: placeholderTextColor }];

  var _styleResolver = styleResolver(reactNativeStyle),
      className = _styleResolver.className,
      style = _styleResolver.style;

  if (className && className.constructor === String) {
    domProps.className = props.className ? props.className + ' ' + className : className;
  }
  if (style) {
    domProps.style = style;
  }

  // OTHER
  // Link security and automation test ids
  if (component === 'a' && domProps.target === '_blank') {
    domProps.rel = (domProps.rel || '') + ' noopener noreferrer';
  }
  if (testID && testID.constructor === String) {
    domProps['data-testid'] = testID;
  }

  return domProps;
};

export default createDOMProps;