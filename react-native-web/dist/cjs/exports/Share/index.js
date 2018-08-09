'use strict';

exports.__esModule = true;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Copyright (c) 2018-present, Nicolas Gallagher.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Copyright (c) 2016-present, Facebook, Inc.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * This source code is licensed under the MIT license found in the
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * LICENSE file in the root directory of this source tree.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

var _invariant = require('fbjs/lib/invariant');

var _invariant2 = _interopRequireDefault(_invariant);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Share = function () {
  function Share() {
    _classCallCheck(this, Share);
  }

  Share.share = function share(content) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    (0, _invariant2.default)(typeof content === 'object' && content !== null, 'Content to share must be a valid object');
    (0, _invariant2.default)(typeof content.url === 'string' || typeof content.message === 'string', 'At least one of URL and message is required');
    (0, _invariant2.default)(typeof options === 'object' && options !== null, 'Options must be a valid object');
    (0, _invariant2.default)(!content.title || typeof content.title === 'string', 'Invalid title: title should be a string.');

    if (window.navigator.share !== undefined) {
      return window.navigator.share({
        title: content.title,
        text: content.message,
        url: content.url
      });
    } else {
      return Promise.reject(new Error('Share is not supported in this browser'));
    }
  };

  /**
   * The content was successfully shared.
   */


  _createClass(Share, null, [{
    key: 'sharedAction',
    get: function get() {
      return 'sharedAction';
    }

    /**
     * The dialog has been dismissed.
     * @platform ios
     */

  }, {
    key: 'dismissedAction',
    get: function get() {
      return 'dismissedAction';
    }
  }]);

  return Share;
}();

exports.default = Share;
module.exports = exports['default'];