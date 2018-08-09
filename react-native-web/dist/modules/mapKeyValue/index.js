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

export default mapKeyValue;