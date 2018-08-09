function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Copyright (c) 2016-present, Nicolas Gallagher.
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

import ImageStylePropTypes from '../Image/ImageStylePropTypes';
import TextInputStylePropTypes from '../TextInput/TextInputStylePropTypes';
import TextStylePropTypes from '../Text/TextStylePropTypes';
import ViewStylePropTypes from '../View/ViewStylePropTypes';
import warning from 'fbjs/lib/warning';
import { number, oneOf, string } from 'prop-types';

// Hardcoded because this is a legit case but we don't want to load it from
// a private API. We might likely want to unify style sheet creation with how it
// is done in the DOM so this might move into React. I know what I'm doing so
// plz don't fire me.
var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

var StyleSheetValidation = function () {
  function StyleSheetValidation() {
    _classCallCheck(this, StyleSheetValidation);
  }

  StyleSheetValidation.validateStyleProp = function validateStyleProp(prop, style, caller) {
    if (process.env.NODE_ENV !== 'production') {
      var value = style[prop];

      var isCustomProperty = prop.indexOf('--') === 0;
      if (isCustomProperty) return;

      if (allStylePropTypes[prop] === undefined) {
        var message1 = '"' + prop + '" is not a valid style property.';
        var message2 = '\nValid style props: ' + JSON.stringify(Object.keys(allStylePropTypes).sort(), null, '  ');
        styleError(message1, style, caller, message2);
      } else if (typeof value === 'string' && value.indexOf('!important') > -1) {
        styleError('Invalid value of "' + value + '" set on prop "' + prop + '". Values cannot include "!important"', style, caller);
      } else {
        var error = allStylePropTypes[prop](style, prop, caller, 'prop', null, ReactPropTypesSecret);
        if (error) {
          styleError(error.message, style, caller);
        }
      }
    }
  };

  StyleSheetValidation.validateStyle = function validateStyle(name, styles) {
    if (process.env.NODE_ENV !== 'production') {
      for (var prop in styles[name]) {
        StyleSheetValidation.validateStyleProp(prop, styles[name], 'StyleSheet ' + name);
      }
    }
  };

  StyleSheetValidation.addValidStylePropTypes = function addValidStylePropTypes(stylePropTypes) {
    for (var key in stylePropTypes) {
      allStylePropTypes[key] = stylePropTypes[key];
    }
  };

  return StyleSheetValidation;
}();

var styleError = function styleError(message1, style, caller, message2) {
  warning(false, message1 + '\n' + (caller || '<<unknown>>') + ': ' + JSON.stringify(style, null, '  ') + (message2 || ''));
};

var allStylePropTypes = {};

StyleSheetValidation.addValidStylePropTypes(ImageStylePropTypes);
StyleSheetValidation.addValidStylePropTypes(TextStylePropTypes);
StyleSheetValidation.addValidStylePropTypes(TextInputStylePropTypes);
StyleSheetValidation.addValidStylePropTypes(ViewStylePropTypes);

StyleSheetValidation.addValidStylePropTypes({
  appearance: string,
  borderCollapse: string,
  borderSpacing: oneOf([number, string]),
  clear: string,
  cursor: string,
  fill: string,
  float: oneOf(['end', 'left', 'none', 'right', 'start']),
  listStyle: string,
  pointerEvents: string,
  tableLayout: string,
  /* @private */
  MozAppearance: string,
  WebkitAppearance: string
});

export default StyleSheetValidation;