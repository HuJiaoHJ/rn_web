'use strict';

exports.__esModule = true;

var _ExecutionEnvironment = require('fbjs/lib/ExecutionEnvironment');

var _StyleSheet = require('./StyleSheet');

var _StyleSheet2 = _interopRequireDefault(_StyleSheet);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// allow component styles to be editable in React Dev Tools
if (process.env.NODE_ENV !== 'production') {
  if (_ExecutionEnvironment.canUseDOM && window.__REACT_DEVTOOLS_GLOBAL_HOOK__) {
    window.__REACT_DEVTOOLS_GLOBAL_HOOK__.resolveRNStyle = _StyleSheet2.default.flatten;
  }
}

exports.default = _StyleSheet2.default;
module.exports = exports['default'];