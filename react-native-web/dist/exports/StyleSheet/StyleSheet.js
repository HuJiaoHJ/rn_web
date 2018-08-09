/**
 * Copyright (c) 2016-present, Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @noflow
 */

import StyleSheetValidation from './StyleSheetValidation';
import ReactNativePropRegistry from '../../modules/ReactNativePropRegistry';
import flattenStyle from './flattenStyle';

var absoluteFillObject = {
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0
};
var absoluteFill = ReactNativePropRegistry.register(absoluteFillObject);

var StyleSheet = {
  absoluteFill: absoluteFill,
  absoluteFillObject: absoluteFillObject,
  compose: function compose(style1, style2) {
    if (style1 && style2) {
      return [style1, style2];
    } else {
      return style1 || style2;
    }
  },
  create: function create(styles) {
    var result = {};
    Object.keys(styles).forEach(function (key) {
      if (process.env.NODE_ENV !== 'production') {
        StyleSheetValidation.validateStyle(key, styles);
      }
      var id = styles[key] && ReactNativePropRegistry.register(styles[key]);
      result[key] = id;
    });
    return result;
  },

  flatten: flattenStyle,
  hairlineWidth: 1
};

export default StyleSheet;