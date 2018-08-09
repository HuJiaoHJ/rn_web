"use strict";

exports.__esModule = true;
var hasOwnProperty = Object.prototype.hasOwnProperty;

var mapKeyValue = function mapKeyValue(obj, fn) {
  var result = [];
  for (var key in obj) {
    if (hasOwnProperty.call(obj, key)) {
      var r = fn(key, obj[key]);
      r && result.push(r);
    }
  }
  return result;
};

exports.default = mapKeyValue;
module.exports = exports["default"];