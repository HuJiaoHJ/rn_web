'use strict';

exports.__esModule = true;
var isWebColor = function isWebColor(color) {
  return color === 'currentcolor' || color === 'currentColor' || color === 'inherit' || color.indexOf('var(') === 0;
};

exports.default = isWebColor;
module.exports = exports['default'];