'use strict';

exports.__esModule = true;

var _normalizeColor = require('../../modules/normalizeColor');

var _normalizeColor2 = _interopRequireDefault(_normalizeColor);

var _normalizeValue = require('./normalizeValue');

var _normalizeValue2 = _interopRequireDefault(_normalizeValue);

var _resolveShadowValue = require('./resolveShadowValue');

var _resolveShadowValue2 = _interopRequireDefault(_resolveShadowValue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * The browser implements the CSS cascade, where the order of properties is a
 * factor in determining which styles to paint. React Native is different. It
 * gives giving precedence to the more specific style property. For example,
 * the value of `paddingTop` takes precedence over that of `padding`.
 *
 * This module creates mutally exclusive style declarations by expanding all of
 * React Native's supported shortform properties (e.g. `padding`) to their
 * longfrom equivalents.
 */

var emptyObject = {}; /**
                       * Copyright (c) 2016-present, Nicolas Gallagher.
                       *
                       * This source code is licensed under the MIT license found in the
                       * LICENSE file in the root directory of this source tree.
                       *
                       * @noflow
                       */

var styleShortFormProperties = {
  borderColor: ['borderTopColor', 'borderRightColor', 'borderBottomColor', 'borderLeftColor'],
  borderRadius: ['borderTopLeftRadius', 'borderTopRightRadius', 'borderBottomRightRadius', 'borderBottomLeftRadius'],
  borderStyle: ['borderTopStyle', 'borderRightStyle', 'borderBottomStyle', 'borderLeftStyle'],
  borderWidth: ['borderTopWidth', 'borderRightWidth', 'borderBottomWidth', 'borderLeftWidth'],
  margin: ['marginTop', 'marginRight', 'marginBottom', 'marginLeft'],
  marginHorizontal: ['marginRight', 'marginLeft'],
  marginVertical: ['marginTop', 'marginBottom'],
  overflow: ['overflowX', 'overflowY'],
  overscrollBehavior: ['overscrollBehaviorX', 'overscrollBehaviorY'],
  padding: ['paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft'],
  paddingHorizontal: ['paddingRight', 'paddingLeft'],
  paddingVertical: ['paddingTop', 'paddingBottom'],
  writingDirection: ['direction']
};

var colorProps = {
  backgroundColor: true,
  borderColor: true,
  borderTopColor: true,
  borderRightColor: true,
  borderBottomColor: true,
  borderLeftColor: true,
  color: true
};

var borderWidthProps = {
  borderWidth: true,
  borderTopWidth: true,
  borderRightWidth: true,
  borderBottomWidth: true,
  borderLeftWidth: true
};

var monospaceFontStack = 'monospace, monospace';
var systemFontStack = 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Ubuntu, "Helvetica Neue", sans-serif';

var alphaSortProps = function alphaSortProps(propsArray) {
  return propsArray.sort(function (a, b) {
    if (a < b) {
      return -1;
    }
    if (a > b) {
      return 1;
    }
    return 0;
  });
};

var defaultOffset = { height: 0, width: 0 };

/**
 * Shadow
 */

var resolveShadow = function resolveShadow(resolvedStyle, style) {
  var boxShadow = style.boxShadow;

  var shadow = (0, _resolveShadowValue2.default)(style);
  resolvedStyle.boxShadow = boxShadow ? boxShadow + ', ' + shadow : shadow;
};

/**
 * Text Decoration
 */

var resolveTextDecoration = function resolveTextDecoration(resolvedStyle, style) {
  var textDecorationColor = style.textDecorationColor,
      textDecorationLine = style.textDecorationLine,
      textDecorationStyle = style.textDecorationStyle;

  var color = (0, _normalizeColor2.default)(textDecorationColor) || '';
  var lineStyle = textDecorationStyle || '';
  if (textDecorationLine) {
    resolvedStyle.textDecoration = (textDecorationLine + ' ' + lineStyle + ' ' + color).trim();
  }
};

/**
 * Text Shadow
 */

var resolveTextShadow = function resolveTextShadow(resolvedStyle, style) {
  var textShadowColor = style.textShadowColor,
      textShadowOffset = style.textShadowOffset,
      textShadowRadius = style.textShadowRadius;

  var _ref = textShadowOffset || defaultOffset,
      height = _ref.height,
      width = _ref.width;

  var offsetX = (0, _normalizeValue2.default)(null, width);
  var offsetY = (0, _normalizeValue2.default)(null, height);
  var blurRadius = (0, _normalizeValue2.default)(null, textShadowRadius || 0);
  var color = (0, _normalizeColor2.default)(textShadowColor);

  if (color && (height !== 0 || width !== 0)) {
    resolvedStyle.textShadow = offsetX + ' ' + offsetY + ' ' + blurRadius + ' ' + color;
  }
};

/**
 * Transform
 */

// { scale: 2 } => 'scale(2)'
// { translateX: 20 } => 'translateX(20px)'
var mapTransform = function mapTransform(transform) {
  var type = Object.keys(transform)[0];
  var value = (0, _normalizeValue2.default)(type, transform[type]);
  return type + '(' + value + ')';
};

// [1,2,3,4,5,6] => 'matrix3d(1,2,3,4,5,6)'
var convertTransformMatrix = function convertTransformMatrix(transformMatrix) {
  var matrix = transformMatrix.join(',');
  return 'matrix3d(' + matrix + ')';
};

var resolveTransform = function resolveTransform(resolvedStyle, style) {
  var transform = style.transform;
  if (Array.isArray(style.transform)) {
    transform = style.transform.map(mapTransform).join(' ');
  } else if (style.transformMatrix) {
    transform = convertTransformMatrix(style.transformMatrix);
  }
  resolvedStyle.transform = transform;
};

/**
 * Reducer
 */

var createReducer = function createReducer(style, styleProps) {
  var hasResolvedShadow = false;
  var hasResolvedTextDecoration = false;
  var hasResolvedTextShadow = false;

  return function (resolvedStyle, prop) {
    var value = (0, _normalizeValue2.default)(prop, style[prop]);

    // Make sure the default border width is explicitly set to '0' to avoid
    // falling back to any unwanted user-agent styles.
    if (borderWidthProps[prop]) {
      value = value == null ? (0, _normalizeValue2.default)(null, 0) : value;
    }

    // Normalize color values
    if (colorProps[prop]) {
      value = (0, _normalizeColor2.default)(value);
    }

    // Ignore everything else with a null value
    if (value == null) {
      return resolvedStyle;
    }

    switch (prop) {
      // Ignore some React Native styles
      case 'aspectRatio':
      case 'elevation':
      case 'overlayColor':
      case 'resizeMode':
      case 'tintColor':
        {
          break;
        }

      // TODO: remove once this issue is fixed
      // https://github.com/rofrischmann/inline-style-prefixer/issues/159
      case 'backgroundClip':
        {
          if (value === 'text') {
            resolvedStyle.backgroundClip = value;
            resolvedStyle.WebkitBackgroundClip = value;
          }
          break;
        }

      case 'display':
        {
          resolvedStyle.display = value;
          // A flex container in React Native has these defaults which should be
          // set only if there is no otherwise supplied flex style.
          if (style.display === 'flex' && style.flex == null) {
            if (style.flexShrink == null) {
              resolvedStyle.flexShrink = 0;
            }
            if (style.flexBasis == null) {
              resolvedStyle.flexBasis = 'auto';
            }
          }
          break;
        }

      // The 'flex' property value in React Native must be a positive integer,
      // 0, or -1.
      case 'flex':
        {
          if (value > 0) {
            resolvedStyle.flexGrow = value;
            resolvedStyle.flexShrink = 1;
            resolvedStyle.flexBasis = '0%';
          } else if (value === 0) {
            resolvedStyle.flexGrow = 0;
            resolvedStyle.flexShrink = 0;
            resolvedStyle.flexBasis = '0%';
          } else if (value === -1) {
            resolvedStyle.flexGrow = 0;
            resolvedStyle.flexShrink = 1;
            resolvedStyle.flexBasis = 'auto';
          }
          break;
        }

      case 'fontFamily':
        {
          if (value.indexOf('System') > -1) {
            var stack = value.split(/\s*,\s*/);
            stack[stack.indexOf('System')] = systemFontStack;
            resolvedStyle.fontFamily = stack.join(', ');
          } else if (value === 'monospace') {
            resolvedStyle.fontFamily = monospaceFontStack;
          } else {
            resolvedStyle.fontFamily = value;
          }
          break;
        }

      case 'fontVariant':
        {
          if (Array.isArray(value) && value.length > 0) {
            resolvedStyle.fontVariant = value.join(' ');
          }
          break;
        }

      case 'shadowColor':
      case 'shadowOffset':
      case 'shadowOpacity':
      case 'shadowRadius':
        {
          if (!hasResolvedShadow) {
            resolveShadow(resolvedStyle, style);
          }
          hasResolvedShadow = true;
          break;
        }

      case 'textAlignVertical':
        {
          resolvedStyle.verticalAlign = value === 'center' ? 'middle' : value;
          break;
        }

      case 'textDecorationColor':
      case 'textDecorationLine':
      case 'textDecorationStyle':
        {
          if (!hasResolvedTextDecoration) {
            resolveTextDecoration(resolvedStyle, style);
          }
          hasResolvedTextDecoration = true;
          break;
        }

      case 'textShadowColor':
      case 'textShadowOffset':
      case 'textShadowRadius':
        {
          if (!hasResolvedTextShadow) {
            resolveTextShadow(resolvedStyle, style);
          }
          hasResolvedTextShadow = true;
          break;
        }

      case 'transform':
      case 'transformMatrix':
        {
          resolveTransform(resolvedStyle, style);
          break;
        }

      default:
        {
          var longFormProperties = styleShortFormProperties[prop];
          if (longFormProperties) {
            longFormProperties.forEach(function (longForm, i) {
              // The value of any longform property in the original styles takes
              // precedence over the shortform's value.
              if (styleProps.indexOf(longForm) === -1) {
                resolvedStyle[longForm] = value;
              }
            });
          } else {
            resolvedStyle[prop] = value;
          }
        }
    }

    return resolvedStyle;
  };
};

var createReactDOMStyle = function createReactDOMStyle(style) {
  if (!style) {
    return emptyObject;
  }
  var styleProps = Object.keys(style);
  var sortedStyleProps = alphaSortProps(styleProps);
  var reducer = createReducer(style, styleProps);
  var resolvedStyle = sortedStyleProps.reduce(reducer, {});
  return resolvedStyle;
};

exports.default = createReactDOMStyle;
module.exports = exports['default'];