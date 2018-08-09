/**
 * Copyright (c) 2017-present, Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

import propsToAriaRole from './propsToAriaRole';

var roleComponents = {
  article: 'article',
  banner: 'header',
  complementary: 'aside',
  contentinfo: 'footer',
  form: 'form',
  label: 'label',
  link: 'a',
  list: 'ul',
  listitem: 'li',
  main: 'main',
  navigation: 'nav',
  region: 'section'
};

var emptyObject = {};

var propsToAccessibilityComponent = function propsToAccessibilityComponent() {
  var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : emptyObject;

  var role = propsToAriaRole(props);
  if (role) {
    if (role === 'heading') {
      var level = props['aria-level'] || 1;
      return 'h' + level;
    }
    return roleComponents[role];
  }
};

export default propsToAccessibilityComponent;