'use strict';

exports.__esModule = true;

var _propTypes = require('prop-types');

var numberOrString = (0, _propTypes.oneOfType)([_propTypes.number, _propTypes.string]); /**
                                                                                         * Copyright (c) 2015-present, Facebook, Inc.
                                                                                         *
                                                                                         * This source code is licensed under the MIT license found in the
                                                                                         * LICENSE file in the root directory of this source tree.
                                                                                         *
                                                                                         * 
                                                                                         */

var TransformPropTypes = {
  perspective: (0, _propTypes.oneOfType)([_propTypes.number, _propTypes.string]),
  perspectiveOrigin: _propTypes.string,
  transform: (0, _propTypes.arrayOf)((0, _propTypes.oneOfType)([(0, _propTypes.shape)({ perspective: numberOrString }), (0, _propTypes.shape)({ rotate: _propTypes.string }), (0, _propTypes.shape)({ rotateX: _propTypes.string }), (0, _propTypes.shape)({ rotateY: _propTypes.string }), (0, _propTypes.shape)({ rotateZ: _propTypes.string }), (0, _propTypes.shape)({ scale: _propTypes.number }), (0, _propTypes.shape)({ scaleX: _propTypes.number }), (0, _propTypes.shape)({ scaleY: _propTypes.number }), (0, _propTypes.shape)({ skewX: _propTypes.string }), (0, _propTypes.shape)({ skewY: _propTypes.string }), (0, _propTypes.shape)({ translateX: numberOrString }), (0, _propTypes.shape)({ translateY: numberOrString }), (0, _propTypes.shape)({ translateZ: numberOrString }), (0, _propTypes.shape)({ translate3d: _propTypes.string })])),
  transformOrigin: _propTypes.string,
  transformStyle: (0, _propTypes.oneOf)(['flat', 'preserve-3d'])
};

exports.default = TransformPropTypes;
module.exports = exports['default'];