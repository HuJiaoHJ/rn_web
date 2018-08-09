'use strict';

exports.__esModule = true;

var _ColorPropType = require('../ColorPropType');

var _ColorPropType2 = _interopRequireDefault(_ColorPropType);

var _ViewStylePropTypes = require('../View/ViewStylePropTypes');

var _ViewStylePropTypes2 = _interopRequireDefault(_ViewStylePropTypes);

var _propTypes = require('prop-types');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var numberOrString = (0, _propTypes.oneOfType)([_propTypes.number, _propTypes.string]); /**
                                                                                         * Copyright (c) 2015-present, Nicolas Gallagher.
                                                                                         * Copyright (c) 2015-present, Facebook, Inc.
                                                                                         *
                                                                                         * This source code is licensed under the MIT license found in the
                                                                                         * LICENSE file in the root directory of this source tree.
                                                                                         *
                                                                                         * 
                                                                                         */

var TextStylePropTypes = Object.assign({}, _ViewStylePropTypes2.default, {
  color: _ColorPropType2.default,
  fontFamily: _propTypes.string,
  fontFeatureSettings: _propTypes.string,
  fontSize: numberOrString,
  fontStyle: _propTypes.string,
  fontWeight: _propTypes.string,
  fontVariant: _propTypes.array,
  letterSpacing: numberOrString,
  lineHeight: numberOrString,
  textAlign: (0, _propTypes.oneOf)(['center', 'end', 'inherit', 'justify', 'justify-all', 'left', 'right', 'start']),
  textAlignVertical: _propTypes.string,
  textDecorationColor: _ColorPropType2.default,
  textDecorationLine: _propTypes.string,
  textDecorationStyle: _propTypes.string,
  textShadowColor: _ColorPropType2.default,
  textShadowOffset: (0, _propTypes.shape)({ width: _propTypes.number, height: _propTypes.number }),
  textShadowRadius: _propTypes.number,
  writingDirection: (0, _propTypes.oneOf)(['auto', 'ltr', 'rtl']),
  /* @platform web */
  textIndent: numberOrString,
  textOverflow: _propTypes.string,
  textRendering: (0, _propTypes.oneOf)(['auto', 'geometricPrecision', 'optimizeLegibility', 'optimizeSpeed']),
  textTransform: (0, _propTypes.oneOf)(['capitalize', 'lowercase', 'none', 'uppercase']),
  unicodeBidi: (0, _propTypes.oneOf)(['normal', 'bidi-override', 'embed', 'isolate', 'isolate-override', 'plaintext']),
  whiteSpace: _propTypes.string,
  wordWrap: _propTypes.string,
  MozOsxFontSmoothing: _propTypes.string,
  WebkitFontSmoothing: _propTypes.string
});

exports.default = TextStylePropTypes;
module.exports = exports['default'];