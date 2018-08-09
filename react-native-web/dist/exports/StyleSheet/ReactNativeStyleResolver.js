function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Copyright (c) 2016-present, Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @noflow
 */

/**
 * WARNING: changes to this file in particular can cause significant changes to
 * the results of render performance benchmarks.
 */

import { canUseDOM } from 'fbjs/lib/ExecutionEnvironment';
import createReactDOMStyle from './createReactDOMStyle';
import flattenArray from '../../modules/flattenArray';
import flattenStyle from './flattenStyle';
import I18nManager from '../I18nManager';
import i18nStyle from './i18nStyle';
import { prefixInlineStyles } from '../../modules/prefixStyles';
import StyleSheetManager from './StyleSheetManager';

var emptyObject = {};

var ReactNativeStyleResolver = function () {
  ReactNativeStyleResolver.prototype._init = function _init() {
    this.cache = { ltr: {}, rtl: {}, rtlNoSwap: {} };
    this.injectedCache = { ltr: {}, rtl: {}, rtlNoSwap: {} };
    this.styleSheetManager = new StyleSheetManager();
  };

  function ReactNativeStyleResolver() {
    _classCallCheck(this, ReactNativeStyleResolver);

    this._init();
  }

  ReactNativeStyleResolver.prototype.getStyleSheet = function getStyleSheet() {
    // reset state on the server so critical css is always the result
    var sheet = this.styleSheetManager.getStyleSheet();
    if (!canUseDOM) {
      this._init();
    }
    return sheet;
  };

  ReactNativeStyleResolver.prototype._injectRegisteredStyle = function _injectRegisteredStyle(id) {
    var _this = this;

    var doLeftAndRightSwapInRTL = I18nManager.doLeftAndRightSwapInRTL,
        isRTL = I18nManager.isRTL;

    var dir = isRTL ? doLeftAndRightSwapInRTL ? 'rtl' : 'rtlNoSwap' : 'ltr';
    if (!this.injectedCache[dir][id]) {
      var style = flattenStyle(id);
      var domStyle = createReactDOMStyle(i18nStyle(style));
      Object.keys(domStyle).forEach(function (styleProp) {
        var value = domStyle[styleProp];
        if (value != null) {
          _this.styleSheetManager.injectDeclaration(styleProp, value);
        }
      });
      this.injectedCache[dir][id] = true;
    }
  };

  /**
   * Resolves a React Native style object to DOM attributes
   */


  ReactNativeStyleResolver.prototype.resolve = function resolve(style) {
    if (!style) {
      return emptyObject;
    }

    // fast and cachable
    if (typeof style === 'number') {
      this._injectRegisteredStyle(style);
      var _key = createCacheKey(style);
      return this._resolveStyleIfNeeded(style, _key);
    }

    // resolve a plain RN style object
    if (!Array.isArray(style)) {
      return this._resolveStyleIfNeeded(style);
    }

    // flatten the style array
    // cache resolved props when all styles are registered
    // otherwise fallback to resolving
    var flatArray = flattenArray(style);
    var isArrayOfNumbers = true;
    for (var i = 0; i < flatArray.length; i++) {
      var id = flatArray[i];
      if (typeof id !== 'number') {
        isArrayOfNumbers = false;
      } else {
        this._injectRegisteredStyle(id);
      }
    }
    var key = isArrayOfNumbers ? createCacheKey(flatArray.join('-')) : null;
    return this._resolveStyleIfNeeded(flatArray, key);
  };

  /**
   * Resolves a React Native style object to DOM attributes, accounting for
   * the existing styles applied to the DOM node.
   *
   * To determine the next style, some of the existing DOM state must be
   * converted back into React Native styles.
   */


  ReactNativeStyleResolver.prototype.resolveWithNode = function resolveWithNode(rnStyleNext, node) {
    var _this2 = this;

    var _getDOMStyleInfo = getDOMStyleInfo(node),
        rdomClassList = _getDOMStyleInfo.classList,
        rdomStyle = _getDOMStyleInfo.style;
    // Convert the DOM classList back into a React Native form
    // Preserves unrecognized class names.


    var _rdomClassList$reduce = rdomClassList.reduce(function (styleProps, className) {
      var _styleSheetManager$ge = _this2.styleSheetManager.getDeclaration(className),
          prop = _styleSheetManager$ge.prop,
          value = _styleSheetManager$ge.value;

      if (prop) {
        styleProps.style[prop] = value;
      } else {
        styleProps.classList.push(className);
      }
      return styleProps;
    }, { classList: [], style: {} }),
        rnClassList = _rdomClassList$reduce.classList,
        rnStyle = _rdomClassList$reduce.style;

    // Create next DOM style props from current and next RN styles


    var _resolve = this.resolve([i18nStyle(rnStyle), rnStyleNext]),
        rdomClassListNext = _resolve.classList,
        rdomStyleNext = _resolve.style;

    // Final className
    // Add the current class names not managed by React Native


    var className = classListToString(rdomClassListNext.concat(rnClassList));

    // Final style
    // Next class names take priority over current inline styles
    var style = Object.assign({}, rdomStyle);
    rdomClassListNext.forEach(function (className) {
      var _styleSheetManager$ge2 = _this2.styleSheetManager.getDeclaration(className),
          prop = _styleSheetManager$ge2.prop;

      if (style[prop]) {
        style[prop] = '';
      }
    });
    // Next inline styles take priority over current inline styles
    Object.assign(style, rdomStyleNext);

    return { className: className, style: style };
  };

  /**
   * Resolves a React Native style object
   */


  ReactNativeStyleResolver.prototype._resolveStyle = function _resolveStyle(style) {
    var _this3 = this;

    var flatStyle = flattenStyle(style);
    var domStyle = createReactDOMStyle(i18nStyle(flatStyle));

    var props = Object.keys(domStyle).reduce(function (props, styleProp) {
      var value = domStyle[styleProp];
      if (value != null) {
        var className = _this3.styleSheetManager.getClassName(styleProp, value);
        if (className) {
          props.classList.push(className);
        } else {
          // Certain properties and values are not transformed by 'createReactDOMStyle' as they
          // require more complex transforms into multiple CSS rules. Here we assume that StyleManager
          // can bind these styles to a className, and prevent them becoming invalid inline-styles.
          if (styleProp === 'pointerEvents' || styleProp === 'placeholderTextColor' || styleProp === 'animationName') {
            var _className = _this3.styleSheetManager.injectDeclaration(styleProp, value);
            if (_className) {
              props.classList.push(_className);
            }
          } else {
            if (!props.style) {
              props.style = {};
            }
            // 4x slower render
            props.style[styleProp] = value;
          }
        }
      }
      return props;
    }, { classList: [] });

    props.className = classListToString(props.classList);
    if (props.style) {
      props.style = prefixInlineStyles(props.style);
    }
    return props;
  };

  /**
   * Caching layer over 'resolveStyle'
   */


  ReactNativeStyleResolver.prototype._resolveStyleIfNeeded = function _resolveStyleIfNeeded(style, key) {
    if (key) {
      var doLeftAndRightSwapInRTL = I18nManager.doLeftAndRightSwapInRTL,
          isRTL = I18nManager.isRTL;

      var dir = isRTL ? doLeftAndRightSwapInRTL ? 'rtl' : 'rtlNoSwap' : 'ltr';
      if (!this.cache[dir][key]) {
        // slow: convert style object to props and cache
        this.cache[dir][key] = this._resolveStyle(style);
      }
      return this.cache[dir][key];
    }
    return this._resolveStyle(style);
  };

  return ReactNativeStyleResolver;
}();

/**
 * Misc helpers
 */


export default ReactNativeStyleResolver;
var createCacheKey = function createCacheKey(id) {
  var prefix = 'rn';
  return prefix + '-' + id;
};

var classListToString = function classListToString(list) {
  return list.join(' ').trim();
};

/**
 * Copies classList and style data from a DOM node
 */
var hyphenPattern = /-([a-z])/g;
var toCamelCase = function toCamelCase(str) {
  return str.replace(hyphenPattern, function (m) {
    return m[1].toUpperCase();
  });
};

var getDOMStyleInfo = function getDOMStyleInfo(node) {
  var nodeStyle = node.style;
  var classList = Array.prototype.slice.call(node.classList);
  var style = {};
  // DOM style is a CSSStyleDeclaration
  // https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleDeclaration
  for (var i = 0; i < nodeStyle.length; i += 1) {
    var property = nodeStyle.item(i);
    if (property) {
      // DOM style uses hyphenated prop names and may include vendor prefixes
      // Transform back into React DOM style.
      style[toCamelCase(property)] = nodeStyle.getPropertyValue(property);
    }
  }
  return { classList: classList, style: style };
};