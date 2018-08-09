'use strict';

exports.__esModule = true;
/**
 * Copyright (c) 2016-present, Nicolas Gallagher.
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

var Platform = {
  OS: 'web',
  select: function select(obj) {
    return 'web' in obj ? obj.web : obj.default;
  }
};

exports.default = Platform;
module.exports = exports['default'];