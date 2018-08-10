var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

/**
 * Copyright (c) 2015-present, Nicolas Gallagher.
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

import AppContainer from './AppContainer';
import invariant from 'fbjs/lib/invariant';
import hydrate from '../../modules/hydrate';
import render from '../render';
import styleResolver from '../StyleSheet/styleResolver';
import React from 'react';

/**
 * import { render, hydrate } from 'react-dom'
 * 这也是为什么引入react-native-web需要安装react-dom
 */
var renderFn = process.env.NODE_ENV !== 'production' ? render : hydrate;

/**
 * RootComponent: 根组件（APP）
 * initialProps: 模拟native给RN注入props
 * rootTag: 根节点(DOM)
 * WrapperComponent(TODO: ?)
 * callback: 回调
 */
export default function renderApplication(RootComponent, initialProps, rootTag, WrapperComponent, callback) {
  invariant(rootTag, 'Expect to have a valid rootTag, instead got ', rootTag);

  /**
   * ReactDOM.render(React.createElement(App, null), document.getElementById('root'));
   * React.createElement(type, config, children)
   * type: 组件的构建函数
   * config: 组件配置，如props等
   * 
   * AppContainer：两个View组件嵌套的组件
   */
  renderFn(React.createElement(
    AppContainer,
    { WrapperComponent: WrapperComponent, rootTag: rootTag },
    React.createElement(RootComponent, initialProps)
  ), rootTag, callback);
}

export function getApplication(RootComponent, initialProps, WrapperComponent) {
  var element = React.createElement(
    AppContainer,
    { WrapperComponent: WrapperComponent, rootTag: {} },
    React.createElement(RootComponent, initialProps)
  );
  // Don't escape CSS text
  var getStyleElement = function getStyleElement(props) {
    var sheet = styleResolver.getStyleSheet();
    return React.createElement('style', _extends({}, props, { dangerouslySetInnerHTML: { __html: sheet.textContent }, id: sheet.id }));
  };
  return { element: element, getStyleElement: getStyleElement };
}