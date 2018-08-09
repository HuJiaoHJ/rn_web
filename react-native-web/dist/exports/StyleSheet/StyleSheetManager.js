function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Copyright (c) 2016-present, Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @noflow
 */

import createAtomicRules from './createAtomicRules';
import hash from '../../vendor/hash';
import initialRules from './initialRules';
import WebStyleSheet from './WebStyleSheet';

var emptyObject = {};
var STYLE_ELEMENT_ID = 'react-native-stylesheet';

var createClassName = function createClassName(prop, value) {
  var hashed = hash(prop + normalizeValue(value));
  return process.env.NODE_ENV !== 'production' ? 'rn-' + prop + '-' + hashed : 'rn-' + hashed;
};

var normalizeValue = function normalizeValue(value) {
  return typeof value === 'object' ? JSON.stringify(value) : value;
};

var StyleSheetManager = function () {
  function StyleSheetManager() {
    var _this = this;

    _classCallCheck(this, StyleSheetManager);

    this._cache = {
      byClassName: {},
      byProp: {}
    };

    this._sheet = new WebStyleSheet(STYLE_ELEMENT_ID);
    initialRules.forEach(function (rule) {
      _this._sheet.insertRuleOnce(rule);
    });
  }

  StyleSheetManager.prototype.getClassName = function getClassName(prop, value) {
    var val = normalizeValue(value);
    var cache = this._cache.byProp;
    return cache[prop] && cache[prop].hasOwnProperty(val) && cache[prop][val];
  };

  StyleSheetManager.prototype.getDeclaration = function getDeclaration(className) {
    var cache = this._cache.byClassName;
    return cache[className] || emptyObject;
  };

  StyleSheetManager.prototype.getStyleSheet = function getStyleSheet() {
    var cssText = this._sheet.cssText;


    return {
      id: STYLE_ELEMENT_ID,
      textContent: cssText
    };
  };

  StyleSheetManager.prototype.injectDeclaration = function injectDeclaration(prop, value) {
    var _this2 = this;

    var val = normalizeValue(value);
    var className = this.getClassName(prop, val);
    if (!className) {
      className = createClassName(prop, val);
      this._addToCache(className, prop, val);
      var rules = createAtomicRules('.' + className, prop, value);
      rules.forEach(function (rule) {
        _this2._sheet.insertRuleOnce(rule);
      });
    }
    return className;
  };

  StyleSheetManager.prototype._addToCache = function _addToCache(className, prop, value) {
    var cache = this._cache;
    if (!cache.byProp[prop]) {
      cache.byProp[prop] = {};
    }
    cache.byProp[prop][value] = className;
    cache.byClassName[className] = { prop: prop, value: value };
  };

  return StyleSheetManager;
}();

export default StyleSheetManager;