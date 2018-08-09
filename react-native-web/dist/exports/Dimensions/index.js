function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Copyright (c) 2015-present, Nicolas Gallagher.
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

import { canUseDOM } from 'fbjs/lib/ExecutionEnvironment';
import debounce from 'debounce';
import invariant from 'fbjs/lib/invariant';

var win = canUseDOM ? window : {
  devicePixelRatio: undefined,
  innerHeight: undefined,
  innerWidth: undefined,
  screen: {
    height: undefined,
    width: undefined
  }
};

var dimensions = {};
var listeners = {};

var Dimensions = function () {
  function Dimensions() {
    _classCallCheck(this, Dimensions);
  }

  Dimensions.get = function get(dimension) {
    invariant(dimensions[dimension], 'No dimension set for key ' + dimension);
    return dimensions[dimension];
  };

  Dimensions.set = function set(initialDimensions) {
    if (initialDimensions) {
      if (canUseDOM) {
        invariant(false, 'Dimensions cannot be set in the browser');
      } else {
        dimensions.screen = initialDimensions.screen;
        dimensions.window = initialDimensions.window;
      }
    }
  };

  Dimensions._update = function _update() {
    dimensions.window = {
      fontScale: 1,
      height: win.innerHeight,
      scale: win.devicePixelRatio || 1,
      width: win.innerWidth
    };

    dimensions.screen = {
      fontScale: 1,
      height: win.screen.height,
      scale: win.devicePixelRatio || 1,
      width: win.screen.width
    };

    if (Array.isArray(listeners['change'])) {
      listeners['change'].forEach(function (handler) {
        return handler(dimensions);
      });
    }
  };

  Dimensions.addEventListener = function addEventListener(type, handler) {
    listeners[type] = listeners[type] || [];
    listeners[type].push(handler);
  };

  Dimensions.removeEventListener = function removeEventListener(type, handler) {
    if (Array.isArray(listeners[type])) {
      listeners[type] = listeners[type].filter(function (_handler) {
        return _handler !== handler;
      });
    }
  };

  return Dimensions;
}();

export default Dimensions;


Dimensions._update();

if (canUseDOM) {
  window.addEventListener('resize', debounce(Dimensions._update, 16), false);
}