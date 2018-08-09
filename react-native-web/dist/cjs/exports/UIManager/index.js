'use strict';

exports.__esModule = true;

var _setValueForStyles = require('../../vendor/react-dom/setValueForStyles');

var _setValueForStyles2 = _interopRequireDefault(_setValueForStyles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getRect = function getRect(node) {
  var height = node.offsetHeight;
  var width = node.offsetWidth;
  var left = node.offsetLeft;
  var top = node.offsetTop;
  node = node.offsetParent;

  while (node && node.nodeType === 1 /* Node.ELEMENT_NODE */) {
    left += node.offsetLeft - node.scrollLeft;
    top += node.offsetTop - node.scrollTop;
    node = node.offsetParent;
  }
  return { height: height, left: left, top: top, width: width };
}; /**
    * Copyright (c) 2016-present, Nicolas Gallagher.
    *
    * This source code is licensed under the MIT license found in the
    * LICENSE file in the root directory of this source tree.
    *
    * @noflow
    */

var _measureLayout = function _measureLayout(node, relativeToNativeNode, callback) {
  var relativeNode = relativeToNativeNode || node && node.parentNode;
  if (node && relativeNode) {
    setTimeout(function () {
      var relativeRect = getRect(relativeNode);

      var _getRect = getRect(node),
          height = _getRect.height,
          left = _getRect.left,
          top = _getRect.top,
          width = _getRect.width;

      var x = left - relativeRect.left;
      var y = top - relativeRect.top;
      callback(x, y, width, height, left, top);
    }, 0);
  }
};

var UIManager = {
  blur: function blur(node) {
    try {
      node.blur();
    } catch (err) {}
  },
  focus: function focus(node) {
    try {
      node.focus();
    } catch (err) {}
  },
  measure: function measure(node, callback) {
    _measureLayout(node, null, callback);
  },
  measureInWindow: function measureInWindow(node, callback) {
    if (node) {
      setTimeout(function () {
        var _getRect2 = getRect(node),
            height = _getRect2.height,
            left = _getRect2.left,
            top = _getRect2.top,
            width = _getRect2.width;

        callback(left, top, width, height);
      }, 0);
    }
  },
  measureLayout: function measureLayout(node, relativeToNativeNode, onFail, onSuccess) {
    _measureLayout(node, relativeToNativeNode, onSuccess);
  },
  updateView: function updateView(node, props, component /* only needed to surpress React errors in development */) {
    for (var prop in props) {
      if (!Object.prototype.hasOwnProperty.call(props, prop)) {
        continue;
      }

      var value = props[prop];
      switch (prop) {
        case 'style':
          {
            (0, _setValueForStyles2.default)(node, value, component._reactInternalInstance);
            break;
          }
        case 'class':
        case 'className':
          {
            node.setAttribute('class', value);
            break;
          }
        case 'text':
        case 'value':
          // native platforms use `text` prop to replace text input value
          node.value = value;
          break;
        default:
          node.setAttribute(prop, value);
      }
    }
  },
  configureNextLayoutAnimation: function configureNextLayoutAnimation(config, onAnimationDidEnd) {
    onAnimationDidEnd();
  },


  // mocks
  setLayoutAnimationEnabledExperimental: function setLayoutAnimationEnabledExperimental() {}
};

exports.default = UIManager;
module.exports = exports['default'];