'use strict';

exports.__esModule = true;

var _ExecutionEnvironment = require('fbjs/lib/ExecutionEnvironment');

var _ExecutionEnvironment2 = _interopRequireDefault(_ExecutionEnvironment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var doLeftAndRightSwapInRTL = true; /**
                                     * Copyright (c) 2016-present, Nicolas Gallagher.
                                     * Copyright (c) 2015-present, Facebook, Inc.
                                     *
                                     * This source code is licensed under the MIT license found in the
                                     * LICENSE file in the root directory of this source tree.
                                     *
                                     * 
                                     */

var isPreferredLanguageRTL = false;
var isRTLAllowed = true;
var isRTLForced = false;

var isRTL = function isRTL() {
  if (isRTLForced) {
    return true;
  }
  return isRTLAllowed && isPreferredLanguageRTL;
};

var onDirectionChange = function onDirectionChange() {
  if (_ExecutionEnvironment2.default.canUseDOM) {
    if (document.documentElement && document.documentElement.setAttribute) {
      document.documentElement.setAttribute('dir', isRTL() ? 'rtl' : 'ltr');
    }
  }
};

var I18nManager = {
  allowRTL: function allowRTL(bool) {
    isRTLAllowed = bool;
    onDirectionChange();
  },
  forceRTL: function forceRTL(bool) {
    isRTLForced = bool;
    onDirectionChange();
  },
  setPreferredLanguageRTL: function setPreferredLanguageRTL(bool) {
    isPreferredLanguageRTL = bool;
    onDirectionChange();
  },
  swapLeftAndRightInRTL: function swapLeftAndRightInRTL(bool) {
    doLeftAndRightSwapInRTL = bool;
  },

  get doLeftAndRightSwapInRTL() {
    return doLeftAndRightSwapInRTL;
  },
  get isRTL() {
    return isRTL();
  }
};

exports.default = I18nManager;
module.exports = exports['default'];