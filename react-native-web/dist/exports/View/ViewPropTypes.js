/**
 * Copyright (c) 2015-present, Nicolas Gallagher.
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

import EdgeInsetsPropType from '../EdgeInsetsPropType';
import StyleSheetPropType from '../../modules/StyleSheetPropType';
import ViewStylePropTypes from './ViewStylePropTypes';
import { any, array, bool, func, object, oneOf, oneOfType, string } from 'prop-types';

var stylePropType = StyleSheetPropType(ViewStylePropTypes);

var ViewPropTypes = {
  accessibilityComponentType: string,
  accessibilityLabel: string,
  accessibilityLiveRegion: oneOf(['assertive', 'none', 'polite']),
  accessibilityRole: string,
  accessibilityTraits: oneOfType([array, string]),
  accessible: bool,
  children: any,
  hitSlop: EdgeInsetsPropType,
  importantForAccessibility: oneOf(['auto', 'no', 'no-hide-descendants', 'yes']),
  onBlur: func,
  onClick: func,
  onClickCapture: func,
  onContextMenu: func,
  onFocus: func,
  onLayout: func,
  onMoveShouldSetResponder: func,
  onMoveShouldSetResponderCapture: func,
  onResponderGrant: func,
  onResponderMove: func,
  onResponderReject: func,
  onResponderRelease: func,
  onResponderTerminate: func,
  onResponderTerminationRequest: func,
  onStartShouldSetResponder: func,
  onStartShouldSetResponderCapture: func,
  onTouchCancel: func,
  onTouchCancelCapture: func,
  onTouchEnd: func,
  onTouchEndCapture: func,
  onTouchMove: func,
  onTouchMoveCapture: func,
  onTouchStart: func,
  onTouchStartCapture: func,
  pointerEvents: oneOf(['auto', 'box-none', 'box-only', 'none']),
  style: stylePropType,
  testID: string,
  // compatibility with React Native
  accessibilityViewIsModal: bool,
  collapsable: bool,
  needsOffscreenAlphaCompositing: bool,
  onAccessibilityTap: func,
  onMagicTap: func,
  removeClippedSubviews: bool,
  renderToHardwareTextureAndroid: bool,
  shouldRasterizeIOS: bool,
  tvParallaxProperties: object
};

export default ViewPropTypes;