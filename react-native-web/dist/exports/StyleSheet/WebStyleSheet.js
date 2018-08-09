var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Copyright (c) 2016-present, Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

import { canUseDOM } from 'fbjs/lib/ExecutionEnvironment';
import modality from './modality';

var WebStyleSheet = function () {
  function WebStyleSheet(id) {
    _classCallCheck(this, WebStyleSheet);

    this._cssRules = [];
    this._sheet = null;
    this._textContent = '';

    var domStyleElement = void 0;

    // on the client we check for an existing style sheet before injecting
    if (canUseDOM) {
      domStyleElement = document.getElementById(id);
      if (!domStyleElement) {
        var html = '<style id="' + id + '"></style>';
        if (document.head) {
          document.head.insertAdjacentHTML('afterbegin', html);
          domStyleElement = document.getElementById(id);
        }
      }

      if (domStyleElement) {
        modality(domStyleElement);
        // $FlowFixMe
        this._sheet = domStyleElement.sheet;
        this._textContent = domStyleElement.textContent;
      }
    }
  }

  WebStyleSheet.prototype.containsRule = function containsRule(rule) {
    return this._cssRules.indexOf(rule) > -1;
  };

  WebStyleSheet.prototype.insertRuleOnce = function insertRuleOnce(rule, position) {
    // Reduce chance of duplicate rules
    if (!this.containsRule(rule)) {
      this._cssRules.push(rule);

      // Check whether a rule was part of any prerendered styles (textContent
      // doesn't include styles injected via 'insertRule')
      if (this._textContent.indexOf(rule) === -1 && this._sheet) {
        var pos = position || this._sheet.cssRules.length;
        this._sheet.insertRule(rule, pos);
      }
    }
  };

  _createClass(WebStyleSheet, [{
    key: 'cssText',
    get: function get() {
      return this._cssRules.join('\n');
    }
  }]);

  return WebStyleSheet;
}();

export default WebStyleSheet;