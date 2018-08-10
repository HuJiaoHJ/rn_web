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

const emptyObject = {};
const STYLE_ELEMENT_ID = 'react-native-stylesheet';

const createClassName = (prop, value) => {
  const hashed = hash(prop + normalizeValue(value));
  return process.env.NODE_ENV !== 'production' ? `rn-${prop}-${hashed}` : `rn-${hashed}`;
};

const normalizeValue = value => (typeof value === 'object' ? JSON.stringify(value) : value);

export default class StyleSheetManager {
  _cache = {
    byClassName: {},
    byProp: {}
  };

  constructor() {
    this._sheet = new WebStyleSheet(STYLE_ELEMENT_ID);
    initialRules.forEach(rule => {
      this._sheet.insertRuleOnce(rule);
    });
  }

  getClassName(prop, value) {
    const val = normalizeValue(value);
    const cache = this._cache.byProp;
    return cache[prop] && cache[prop].hasOwnProperty(val) && cache[prop][val];
  }

  getDeclaration(className) {
    const cache = this._cache.byClassName;
    return cache[className] || emptyObject;
  }

  getStyleSheet() {
    const { cssText } = this._sheet;

    return {
      id: STYLE_ELEMENT_ID,
      textContent: cssText
    };
  }

  injectDeclaration(prop, value): string {
    // 标准化属性值，需要加单位则加单位
    const val = normalizeValue(value);
    // 获取缓存中对应的className
    let className = this.getClassName(prop, val);
    // 不存在缓存，则新建
    if (!className) {
      // props和value字符串的hash值
      className = createClassName(prop, val);
      // 将此className缓存
      this._addToCache(className, prop, val);
      // 将样式格式化成：.className { prop: value } 的格式，对于一些特殊样式属性，需要特殊处理
      const rules = createAtomicRules(`.${className}`, prop, value);
      // rules数组只有一个元素
      rules.forEach(rule => {
        // 将样式插入到webStyleSheet中
        this._sheet.insertRuleOnce(rule);
      });
    }
    return className;
  }

  _addToCache(className, prop, value) {
    const cache = this._cache;
    if (!cache.byProp[prop]) {
      cache.byProp[prop] = {};
    }
    cache.byProp[prop][value] = className;
    cache.byClassName[className] = { prop, value };
  }
}
