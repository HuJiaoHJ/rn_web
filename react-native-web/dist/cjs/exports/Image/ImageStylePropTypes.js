'use strict';

exports.__esModule = true;

var _AnimationPropTypes = require('../../modules/AnimationPropTypes');

var _AnimationPropTypes2 = _interopRequireDefault(_AnimationPropTypes);

var _BorderPropTypes = require('../../modules/BorderPropTypes');

var _BorderPropTypes2 = _interopRequireDefault(_BorderPropTypes);

var _ColorPropType = require('../ColorPropType');

var _ColorPropType2 = _interopRequireDefault(_ColorPropType);

var _ImageResizeMode = require('./ImageResizeMode');

var _ImageResizeMode2 = _interopRequireDefault(_ImageResizeMode);

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

var ImageStylePropTypes = Object.assign({}, _AnimationPropTypes2.default, _BorderPropTypes2.default, _InteractionPropTypes2.default, _LayoutPropTypes2.default, _ShadowPropTypes2.default, _TransformPropTypes2.default, {
  backgroundColor: _ColorPropType2.default,
  opacity: _propTypes.number,
  resizeMode: (0, _propTypes.oneOf)(Object.keys(_ImageResizeMode2.default)),
  tintColor: _ColorPropType2.default,
  /**
   * @platform unsupported
   */
  overlayColor: _propTypes.string,
  /**
   * @platform web
   */
  boxShadow: _propTypes.string,
  filter: _propTypes.string
});

exports.default = ImageStylePropTypes;
module.exports = exports['default'];