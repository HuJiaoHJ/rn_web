/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 * @format
 */
'use strict';

exports.__esModule = true;

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ImageURISourcePropType = _propTypes2.default.shape({
  /**
   * `uri` is a string representing the resource identifier for the image, which
   * could be an http address, a local file path, or the name of a static image
   * resource (which should be wrapped in the `require('./path/to/image.png')`
   * function).
   */
  uri: _propTypes2.default.string,
  /**
   * `bundle` is the iOS asset bundle which the image is included in. This
   * will default to [NSBundle mainBundle] if not set.
   * @platform ios
   */
  bundle: _propTypes2.default.string,
  /**
   * `method` is the HTTP Method to use. Defaults to GET if not specified.
   */
  method: _propTypes2.default.string,
  /**
   * `headers` is an object representing the HTTP headers to send along with the
   * request for a remote image.
   */
  headers: _propTypes2.default.objectOf(_propTypes2.default.string),
  /**
   * `body` is the HTTP body to send with the request. This must be a valid
   * UTF-8 string, and will be sent exactly as specified, with no
   * additional encoding (e.g. URL-escaping or base64) applied.
   */
  body: _propTypes2.default.string,
  /**
   * `cache` determines how the requests handles potentially cached
   * responses.
   *
   * - `default`: Use the native platforms default strategy. `useProtocolCachePolicy` on iOS.
   *
   * - `reload`: The data for the URL will be loaded from the originating source.
   * No existing cache data should be used to satisfy a URL load request.
   *
   * - `force-cache`: The existing cached data will be used to satisfy the request,
   * regardless of its age or expiration date. If there is no existing data in the cache
   * corresponding the request, the data is loaded from the originating source.
   *
   * - `only-if-cached`: The existing cache data will be used to satisfy a request, regardless of
   * its age or expiration date. If there is no existing data in the cache corresponding
   * to a URL load request, no attempt is made to load the data from the originating source,
   * and the load is considered to have failed.
   *
   * @platform ios
   */
  cache: _propTypes2.default.oneOf(['default', 'reload', 'force-cache', 'only-if-cached']),
  /**
   * `width` and `height` can be specified if known at build time, in which case
   * these will be used to set the default `<Image/>` component dimensions.
   */
  width: _propTypes2.default.number,
  height: _propTypes2.default.number,
  /**
   * `scale` is used to indicate the scale factor of the image. Defaults to 1.0 if
   * unspecified, meaning that one image pixel equates to one display point / DIP.
   */
  scale: _propTypes2.default.number
});

var ImageSourcePropType = _propTypes2.default.oneOfType([ImageURISourcePropType,
// Opaque type returned by require('./image.jpg')
_propTypes2.default.number, _propTypes2.default.string,
// Multiple sources
_propTypes2.default.arrayOf(ImageURISourcePropType)]);

exports.default = ImageSourcePropType;
module.exports = exports['default'];