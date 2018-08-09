'use strict';

exports.__esModule = true;

var _AnimationPropTypes = require('../../modules/AnimationPropTypes');

var _AnimationPropTypes2 = _interopRequireDefault(_AnimationPropTypes);

var _BorderPropTypes = require('../../modules/BorderPropTypes');

var _BorderPropTypes2 = _interopRequireDefault(_BorderPropTypes);

var _ColorPropType = require('../ColorPropType');

var _ColorPropType2 = _interopRequireDefault(_ColorPropType);

var _InteractionPropTypes = require('../../modules/InteractionPropTypes');

var _InteractionPropTypes2 = _interopRequireDefault(_InteractionPropTypes);

var _LayoutPropTypes = require('../../modules/LayoutPropTypes');

var _LayoutPropTypes2 = _interopRequireDefault(_LayoutPropTypes);

var _ShadowPropTypes = require('../../modules/ShadowPropTypes');

var _ShadowPropTypes2 = _interopRequireDefault(_ShadowPropTypes);

var _TransformPropTypes = require('../../modules/TransformPropTypes');

var _TransformPropTypes2 = _interopRequireDefault(_TransformPropTypes);

var _propTypes = require('prop-types');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Copyright (c) 2015-present, Nicolas Gallagher.
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

var overscrollBehaviorType = (0, _propTypes.oneOf)(['auto', 'contain', 'none']);

var ViewStylePropTypes = Object.assign({}, _AnimationPropTypes2.default, _BorderPropTypes2.default, _InteractionPropTypes2.default, _LayoutPropTypes2.default, _ShadowPropTypes2.default, _TransformPropTypes2.default, {
  backgroundColor: _ColorPropType2.default,
  opacity: _propTypes.number,
  /**
   * @platform unsupported
   */
  elevation: _propTypes.number,
  /**
   * @platform web
   */
  backgroundAttachment: _propTypes.string,
  backgroundBlendMode: _propTypes.string,
  backgroundClip: _propTypes.string,
  backgroundImage: _propTypes.string,
  backgroundOrigin: (0, _propTypes.oneOf)(['border-box', 'content-box', 'padding-box']),
  backgroundPosition: _propTypes.string,
  backgroundRepeat: _propTypes.string,
  backgroundSize: _propTypes.string,
  boxShadow: _propTypes.string,
  clip: _propTypes.string,
  filter: _propTypes.string,
  outline: _propTypes.string,
  outlineColor: _ColorPropType2.default,
  overscrollBehavior: overscrollBehaviorType,
  overscrollBehaviorX: overscrollBehaviorType,
  overscrollBehaviorY: overscrollBehaviorType,
  WebkitMaskImage: _propTypes.string,
  WebkitOverflowScrolling: (0, _propTypes.oneOf)(['auto', 'touch'])
});

exports.default = ViewStylePropTypes;
module.exports = exports['default'];