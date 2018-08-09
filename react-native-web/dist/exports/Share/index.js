var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Copyright (c) 2018-present, Nicolas Gallagher.
 * Copyright (c) 2016-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

import invariant from 'fbjs/lib/invariant';

var Share = function () {
  function Share() {
    _classCallCheck(this, Share);
  }

  Share.share = function share(content) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    invariant(typeof content === 'object' && content !== null, 'Content to share must be a valid object');
    invariant(typeof content.url === 'string' || typeof content.message === 'string', 'At least one of URL and message is required');
    invariant(typeof options === 'object' && options !== null, 'Options must be a valid object');
    invariant(!content.title || typeof content.title === 'string', 'Invalid title: title should be a string.');

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

export default Share;