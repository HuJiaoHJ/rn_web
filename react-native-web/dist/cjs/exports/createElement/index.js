'use strict';

exports.__esModule = true;

var _AccessibilityUtil = require('../../modules/AccessibilityUtil');

var _AccessibilityUtil2 = _interopRequireDefault(_AccessibilityUtil);

var _createDOMProps = require('../../modules/createDOMProps');

var _createDOMProps2 = _interopRequireDefault(_createDOMProps);

var _normalizeNativeEvent = require('../../modules/normalizeNativeEvent');

var _normalizeNativeEvent2 = _interopRequireDefault(_normalizeNativeEvent);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _ResponderEventPlugin = require('../../modules/ResponderEventPlugin');

var _ResponderEventPlugin2 = _interopRequireDefault(_ResponderEventPlugin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Copyright (c) 2015-present, Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @noflow
 */

var EventPluginHub = _reactDom2.default.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.EventPluginHub;


EventPluginHub.injection.injectEventPluginsByName({
  ResponderEventPlugin: _ResponderEventPlugin2.default
});

var isModifiedEvent = function isModifiedEvent(event) {
  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
};

/**
 * Ensure event handlers receive an event of the expected shape. The 'button'
 * role – for accessibility reasons and functional equivalence to the native
 * button element – must also support synthetic keyboard activation of onclick,
 * and remove event handlers when disabled.
 */
var eventHandlerNames = {
  onBlur: true,
  onClick: true,
  onClickCapture: true,
  onContextMenu: true,
  onFocus: true,
  onResponderRelease: true,
  onTouchCancel: true,
  onTouchCancelCapture: true,
  onTouchEnd: true,
  onTouchEndCapture: true,
  onTouchMove: true,
  onTouchMoveCapture: true,
  onTouchStart: true,
  onTouchStartCapture: true
};
var adjustProps = function adjustProps(domProps) {
  var onClick = domProps.onClick,
      onResponderRelease = domProps.onResponderRelease,
      role = domProps.role;


  var isButtonRole = role === 'button';
  var isDisabled = _AccessibilityUtil2.default.isDisabled(domProps);
  var isLinkRole = role === 'link';

  Object.keys(domProps).forEach(function (propName) {
    var prop = domProps[propName];
    var isEventHandler = typeof prop === 'function' && eventHandlerNames[propName];
    if (isEventHandler) {
      if (isButtonRole && isDisabled) {
        domProps[propName] = undefined;
      } else {
        // TODO: move this out of the render path
        domProps[propName] = function (e) {
          e.nativeEvent = (0, _normalizeNativeEvent2.default)(e.nativeEvent);
          return prop(e);
        };
      }
    }
  });

  // Cancel click events if the responder system is being used on a link
  // element. Click events are not an expected part of the React Native API,
  // and browsers dispatch click events that cannot otherwise be cancelled from
  // preceding mouse events in the responder system.
  if (isLinkRole && onResponderRelease) {
    domProps.onClick = function (e) {
      if (!e.isDefaultPrevented() && !isModifiedEvent(e.nativeEvent) && !domProps.target) {
        e.preventDefault();
      }
    };
  }

  // Button role should trigger 'onClick' if SPACE or ENTER keys are pressed.
  if (isButtonRole && !isDisabled) {
    domProps.onKeyPress = function (e) {
      if (!e.isDefaultPrevented() && (e.which === 13 || e.which === 32)) {
        e.preventDefault();
        if (onClick) {
          onClick(e);
        }
      }
    };
  }
};

var createElement = function createElement(component, props) {
  for (var _len = arguments.length, children = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    children[_key - 2] = arguments[_key];
  }

  // use equivalent platform elements where possible
  var accessibilityComponent = void 0;
  if (component && component.constructor === String) {
    accessibilityComponent = _AccessibilityUtil2.default.propsToAccessibilityComponent(props);
  }
  var Component = accessibilityComponent || component;
  var domProps = (0, _createDOMProps2.default)(Component, props);
  adjustProps(domProps);
  return _react2.default.createElement.apply(_react2.default, [Component, domProps].concat(children));
};

exports.default = createElement;
module.exports = exports['default'];