/**
 * Copyright (c) 2018-present, Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

import normalizeColor from '../../modules/normalizeColor';
import normalizeValue from './normalizeValue';

var defaultOffset = { height: 0, width: 0 };

var resolveShadowValue = function resolveShadowValue(style) {
  var shadowColor = style.shadowColor,
      shadowOffset = style.shadowOffset,
      shadowOpacity = style.shadowOpacity,
      shadowRadius = style.shadowRadius;

  var _ref = shadowOffset || defaultOffset,
      height = _ref.height,
      width = _ref.width;

  var offsetX = normalizeValue(null, width);
  var offsetY = normalizeValue(null, height);
  var blurRadius = normalizeValue(null, shadowRadius || 0);
  var color = normalizeColor(shadowColor || 'black', shadowOpacity);
  if (color) {
    return offsetX + ' ' + offsetY + ' ' + blurRadius + ' ' + color;
  }
};

export default resolveShadowValue;