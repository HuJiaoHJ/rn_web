'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var __DEV__ = process.env.NODE_ENV !== 'production';

function cloneReferencedElement(element, config) {
  var cloneRef = config.ref;
  var originalRef = element.ref;

  for (var _len = arguments.length, children = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    children[_key - 2] = arguments[_key];
  }

  if (originalRef == null || cloneRef == null) {
    return _react2.default.cloneElement.apply(_react2.default, [element, config].concat(children));
  }

  if (typeof originalRef !== 'function') {
    if (__DEV__) {
      console.warn('Cloning an element with a ref that will be overwritten because it ' + 'is not a function. Use a composable callback-style ref instead. ' + 'Ignoring ref: ' + originalRef);
    }
    return _react2.default.cloneElement.apply(_react2.default, [element, config].concat(children));
  }

  return _react2.default.cloneElement.apply(_react2.default, [element, Object.assign({}, config, {
    ref: function ref(component) {
      cloneRef(component);
      originalRef(component);
    }
  })].concat(children));
}

exports.default = cloneReferencedElement;
module.exports = exports['default'];