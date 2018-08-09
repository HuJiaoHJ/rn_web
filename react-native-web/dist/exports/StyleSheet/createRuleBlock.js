/**
 * Copyright (c) 2016-present, Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @noflow
 */

import hyphenateStyleName from 'hyphenate-style-name';
import mapKeyValue from '../../modules/mapKeyValue';
import normalizeValue from './normalizeValue';
import prefixStyles from '../../modules/prefixStyles';

var createDeclarationString = function createDeclarationString(prop, val) {
  var name = hyphenateStyleName(prop);
  var value = normalizeValue(prop, val);
  if (Array.isArray(val)) {
    return val.map(function (v) {
      return name + ':' + v;
    }).join(';');
  }
  return name + ':' + value;
};

/**
 * Generates valid CSS rule body from a JS object
 *
 * createRuleBlock({ width: 20, color: 'blue' });
 * // => 'color:blue;width:20px'
 */
var createRuleBlock = function createRuleBlock(style) {
  return mapKeyValue(prefixStyles(style), createDeclarationString).sort().join(';');
};

export default createRuleBlock;