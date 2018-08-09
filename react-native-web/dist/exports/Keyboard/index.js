/**
 * Copyright (c) 2016-present, Nicolas Gallagher.
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

import dismissKeyboard from '../../modules/dismissKeyboard';

var Keyboard = {
  addListener: function addListener() {
    return { remove: function remove() {} };
  },
  dismiss: function dismiss() {
    dismissKeyboard();
  },
  removeAllListeners: function removeAllListeners() {},
  removeListener: function removeListener() {}
};

export default Keyboard;