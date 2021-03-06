'use strict';

import React from 'react';

var __DEV__ = process.env.NODE_ENV !== 'production';

function cloneReferencedElement(element, config) {
  var cloneRef = config.ref;
  var originalRef = element.ref;

  for (var _len = arguments.length, children = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    children[_key - 2] = arguments[_key];
  }

  if (originalRef == null || cloneRef == null) {
    return React.cloneElement.apply(React, [element, config].concat(children));
  }

  if (typeof originalRef !== 'function') {
    if (__DEV__) {
      console.warn('Cloning an element with a ref that will be overwritten because it ' + 'is not a function. Use a composable callback-style ref instead. ' + 'Ignoring ref: ' + originalRef);
    }
    return React.cloneElement.apply(React, [element, config].concat(children));
  }

  return React.cloneElement.apply(React, [element, Object.assign({}, config, {
    ref: function ref(component) {
      cloneRef(component);
      originalRef(component);
    }
  })].concat(children));
}

export default cloneReferencedElement;