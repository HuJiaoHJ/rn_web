'use strict';

exports.__esModule = true;

var _propTypes = require('prop-types');

var AnimationPropTypes = {
  animationDelay: _propTypes.string,
  animationDirection: (0, _propTypes.oneOf)(['alternate', 'alternate-reverse', 'normal', 'reverse']),
  animationDuration: _propTypes.string,
  animationFillMode: (0, _propTypes.oneOf)(['none', 'forwards', 'backwards', 'both']),
  animationIterationCount: (0, _propTypes.oneOfType)([_propTypes.number, (0, _propTypes.oneOf)(['infinite'])]),
  animationName: (0, _propTypes.oneOfType)([_propTypes.string, (0, _propTypes.arrayOf)((0, _propTypes.oneOfType)([_propTypes.string, _propTypes.object]))]),
  animationPlayState: (0, _propTypes.oneOf)(['paused', 'running']),
  animationTimingFunction: _propTypes.string,
  transitionDelay: _propTypes.string,
  transitionDuration: _propTypes.string,
  transitionProperty: _propTypes.string,
  transitionTimingFunction: _propTypes.string
}; /**
    * Copyright (c) 2017-present, Nicolas Gallagher.
    *
    * This source code is licensed under the MIT license found in the
    * LICENSE file in the root directory of this source tree.
    *
    * 
    */

exports.default = AnimationPropTypes;
module.exports = exports['default'];