/**
 * Copyright (c) 2016-present, Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

import ColorPropType from '../../exports/ColorPropType';
import { number, oneOfType, shape, string } from 'prop-types';
var numberOrString = oneOfType([number, string]);

var ShadowPropTypes = {
  shadowColor: ColorPropType,
  shadowOffset: shape({
    width: numberOrString,
    height: numberOrString
  }),
  shadowOpacity: number,
  shadowRadius: numberOrString,
  shadowSpread: numberOrString
};

export default ShadowPropTypes;