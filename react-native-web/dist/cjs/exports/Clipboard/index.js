'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Copyright (c) 2016-present, Nicolas Gallagher.
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

var Clipboard = function () {
  function Clipboard() {
    _classCallCheck(this, Clipboard);
  }

  Clipboard.isAvailable = function isAvailable() {
    return typeof document.queryCommandSupported === 'function' && document.queryCommandSupported('copy');
  };

  Clipboard.getString = function getString() {
    return Promise.resolve('');
  };

  Clipboard.setString = function setString(text) {
    var success = false;
    var body = document.body;

    if (body) {
      // add the text to a hidden node
      var node = document.createElement('span');
      node.textContent = text;
      node.style.opacity = '0';
      node.style.position = 'absolute';
      node.style.whiteSpace = 'pre-wrap';
      body.appendChild(node);

      // select the text
      var selection = window.getSelection();
      selection.removeAllRanges();
      var range = document.createRange();
      range.selectNodeContents(node);
      selection.addRange(range);

      // attempt to copy
      try {
        document.execCommand('copy');
        success = true;
      } catch (e) {}

      // remove selection and node
      selection.removeAllRanges();
      body.removeChild(node);
    }

    return success;
  };

  return Clipboard;
}();

exports.default = Clipboard;
module.exports = exports['default'];