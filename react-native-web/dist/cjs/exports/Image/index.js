'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _applyNativeMethods = require('../../modules/applyNativeMethods');

var _applyNativeMethods2 = _interopRequireDefault(_applyNativeMethods);

var _createElement = require('../createElement');

var _createElement2 = _interopRequireDefault(_createElement);

var _AssetRegistry = require('../../modules/AssetRegistry');

var _resolveShadowValue = require('../StyleSheet/resolveShadowValue');

var _resolveShadowValue2 = _interopRequireDefault(_resolveShadowValue);

var _ImageLoader = require('../../modules/ImageLoader');

var _ImageLoader2 = _interopRequireDefault(_ImageLoader);

var _ImageResizeMode = require('./ImageResizeMode');

var _ImageResizeMode2 = _interopRequireDefault(_ImageResizeMode);

var _ImageSourcePropType = require('./ImageSourcePropType');

var _ImageSourcePropType2 = _interopRequireDefault(_ImageSourcePropType);

var _ImageStylePropTypes = require('./ImageStylePropTypes');

var _ImageStylePropTypes2 = _interopRequireDefault(_ImageStylePropTypes);

var _ImageUriCache = require('./ImageUriCache');

var _ImageUriCache2 = _interopRequireDefault(_ImageUriCache);

var _StyleSheet = require('../StyleSheet');

var _StyleSheet2 = _interopRequireDefault(_StyleSheet);

var _StyleSheetPropType = require('../../modules/StyleSheetPropType');

var _StyleSheetPropType2 = _interopRequireDefault(_StyleSheetPropType);

var _View = require('../View');

var _View2 = _interopRequireDefault(_View);

var _ViewPropTypes = require('../ViewPropTypes');

var _ViewPropTypes2 = _interopRequireDefault(_ViewPropTypes);

var _propTypes = require('prop-types');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (c) 2016-present, Nicolas Gallagher.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (c) 2015-present, Facebook, Inc.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * This source code is licensed under the MIT license found in the
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * LICENSE file in the root directory of this source tree.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var emptyObject = {};

var STATUS_ERRORED = 'ERRORED';
var STATUS_LOADED = 'LOADED';
var STATUS_LOADING = 'LOADING';
var STATUS_PENDING = 'PENDING';
var STATUS_IDLE = 'IDLE';

var getImageState = function getImageState(uri, shouldDisplaySource) {
  return shouldDisplaySource ? STATUS_LOADED : uri ? STATUS_PENDING : STATUS_IDLE;
};

var resolveAssetDimensions = function resolveAssetDimensions(source) {
  if (typeof source === 'number') {
    var _getAssetByID = (0, _AssetRegistry.getAssetByID)(source),
        height = _getAssetByID.height,
        width = _getAssetByID.width;

    return { height: height, width: width };
  } else if (typeof source === 'object') {
    var _height = source.height,
        _width = source.width;

    return { height: _height, width: _width };
  }
};

var svgDataUriPattern = /^(data:image\/svg\+xml;utf8,)(.*)/;
var resolveAssetUri = function resolveAssetUri(source) {
  var uri = '';
  if (typeof source === 'number') {
    // get the URI from the packager
    var asset = (0, _AssetRegistry.getAssetByID)(source);
    var scale = asset.scales[0];
    var scaleSuffix = scale !== 1 ? '@' + scale + 'x' : '';
    uri = asset ? asset.httpServerLocation + '/' + asset.name + scaleSuffix + '.' + asset.type : '';
  } else if (typeof source === 'string') {
    uri = source;
  } else if (source && typeof source.uri === 'string') {
    uri = source.uri;
  }

  if (uri) {
    var match = uri.match(svgDataUriPattern);
    // inline SVG markup may contain characters (e.g., #, ") that need to be escaped
    if (match) {
      var prefix = match[1],
          svg = match[2];

      var encodedSvg = encodeURIComponent(svg);
      return '' + prefix + encodedSvg;
    }
  }

  return uri;
};

var filterId = 0;

var createTintColorSVG = function createTintColorSVG(tintColor, id) {
  return tintColor && id != null ? _react2.default.createElement(
    'svg',
    { style: { position: 'absolute', height: 0, visibility: 'hidden', width: 0 } },
    _react2.default.createElement(
      'defs',
      null,
      _react2.default.createElement(
        'filter',
        { id: 'tint-' + id },
        _react2.default.createElement('feFlood', { floodColor: '' + tintColor }),
        _react2.default.createElement('feComposite', { in2: 'SourceAlpha', operator: 'atop' })
      )
    )
  ) : null;
};

var Image = function (_Component) {
  _inherits(Image, _Component);

  Image.getSize = function getSize(uri, success, failure) {
    _ImageLoader2.default.getSize(uri, success, failure);
  };

  Image.prefetch = function prefetch(uri) {
    return _ImageLoader2.default.prefetch(uri);
  };

  function Image(props, context) {
    _classCallCheck(this, Image);

    // If an image has been loaded before, render it immediately
    var _this = _possibleConstructorReturn(this, _Component.call(this, props, context));

    _this._filterId = 0;
    _this._imageRef = null;
    _this._imageRequestId = null;
    _this._imageState = null;
    _this._isMounted = false;

    _this._createLayoutHandler = function (resizeMode) {
      var onLayout = _this.props.onLayout;

      if (resizeMode === 'center' || resizeMode === 'repeat' || onLayout) {
        return function (e) {
          var layout = e.nativeEvent.layout;

          onLayout && onLayout(e);
          _this.setState(function () {
            return { layout: layout };
          });
        };
      }
    };

    _this._getBackgroundSize = function (resizeMode) {
      if (_this._imageRef && (resizeMode === 'center' || resizeMode === 'repeat')) {
        var _this$_imageRef = _this._imageRef,
            naturalHeight = _this$_imageRef.naturalHeight,
            naturalWidth = _this$_imageRef.naturalWidth;
        var _this$state$layout = _this.state.layout,
            height = _this$state$layout.height,
            width = _this$state$layout.width;

        if (naturalHeight && naturalWidth && height && width) {
          var scaleFactor = Math.min(1, width / naturalWidth, height / naturalHeight);
          var x = Math.ceil(scaleFactor * naturalWidth);
          var y = Math.ceil(scaleFactor * naturalHeight);
          return {
            backgroundSize: x + 'px ' + y + 'px'
          };
        }
      }
    };

    _this._onError = function () {
      var _this$props = _this.props,
          onError = _this$props.onError,
          source = _this$props.source;

      _this._updateImageState(STATUS_ERRORED);
      if (onError) {
        onError({
          nativeEvent: {
            error: 'Failed to load resource ' + resolveAssetUri(source) + ' (404)'
          }
        });
      }
      _this._onLoadEnd();
    };

    _this._onLoad = function (e) {
      var _this$props2 = _this.props,
          onLoad = _this$props2.onLoad,
          source = _this$props2.source;

      var event = { nativeEvent: e };
      _ImageUriCache2.default.add(resolveAssetUri(source));
      _this._updateImageState(STATUS_LOADED);
      if (onLoad) {
        onLoad(event);
      }
      _this._onLoadEnd();
    };

    _this._setImageRef = function (ref) {
      _this._imageRef = ref;
    };

    var uri = resolveAssetUri(props.source);
    var shouldDisplaySource = _ImageUriCache2.default.has(uri);
    _this.state = { layout: {}, shouldDisplaySource: shouldDisplaySource };
    _this._imageState = getImageState(uri, shouldDisplaySource);
    _this._filterId = filterId;
    filterId++;
    return _this;
  }

  Image.prototype.componentDidMount = function componentDidMount() {
    this._isMounted = true;
    if (this._imageState === STATUS_PENDING) {
      this._createImageLoader();
    } else if (this._imageState === STATUS_LOADED) {
      this._onLoad({ target: this._imageRef });
    }
  };

  Image.prototype.componentDidUpdate = function componentDidUpdate(prevProps) {
    var prevUri = resolveAssetUri(prevProps.source);
    var uri = resolveAssetUri(this.props.source);
    if (prevUri !== uri) {
      _ImageUriCache2.default.remove(prevUri);
      var isPreviouslyLoaded = _ImageUriCache2.default.has(uri);
      isPreviouslyLoaded && _ImageUriCache2.default.add(uri);
      this._updateImageState(getImageState(uri, isPreviouslyLoaded));
    }
    if (this._imageState === STATUS_PENDING) {
      this._createImageLoader();
    }
  };

  Image.prototype.componentWillUnmount = function componentWillUnmount() {
    var uri = resolveAssetUri(this.props.source);
    _ImageUriCache2.default.remove(uri);
    this._destroyImageLoader();
    this._isMounted = false;
  };

  Image.prototype.render = function render() {
    var shouldDisplaySource = this.state.shouldDisplaySource;

    var _props = this.props,
        accessibilityLabel = _props.accessibilityLabel,
        accessible = _props.accessible,
        blurRadius = _props.blurRadius,
        defaultSource = _props.defaultSource,
        draggable = _props.draggable,
        source = _props.source,
        testID = _props.testID,
        capInsets = _props.capInsets,
        onError = _props.onError,
        onLayout = _props.onLayout,
        onLoad = _props.onLoad,
        onLoadEnd = _props.onLoadEnd,
        onLoadStart = _props.onLoadStart,
        resizeMethod = _props.resizeMethod,
        resizeMode = _props.resizeMode,
        other = _objectWithoutProperties(_props, ['accessibilityLabel', 'accessible', 'blurRadius', 'defaultSource', 'draggable', 'source', 'testID', 'capInsets', 'onError', 'onLayout', 'onLoad', 'onLoadEnd', 'onLoadStart', 'resizeMethod', 'resizeMode']);

    if (process.env.NODE_ENV !== 'production') {
      if (this.props.src) {
        console.warn('The <Image> component requires a `source` property rather than `src`.');
      }

      if (this.props.children) {
        throw new Error('The <Image> component cannot contain children. If you want to render content on top of the image, consider using the <ImageBackground> component or absolute positioning.');
      }
    }

    var selectedSource = shouldDisplaySource ? source : defaultSource;
    var displayImageUri = resolveAssetUri(selectedSource);
    var imageSizeStyle = resolveAssetDimensions(selectedSource);
    var backgroundImage = displayImageUri ? 'url("' + displayImageUri + '")' : null;
    var flatStyle = Object.assign({}, _StyleSheet2.default.flatten(this.props.style));
    var finalResizeMode = resizeMode || flatStyle.resizeMode || _ImageResizeMode2.default.cover;

    // CSS filters
    var filters = [];
    var tintColor = flatStyle.tintColor;
    if (flatStyle.filter) {
      filters.push(flatStyle.filter);
    }
    if (blurRadius) {
      filters.push('blur(' + blurRadius + 'px)');
    }
    if (flatStyle.shadowOffset) {
      var shadowString = (0, _resolveShadowValue2.default)(flatStyle);
      if (shadowString) {
        filters.push('drop-shadow(' + shadowString + ')');
      }
    }
    if (flatStyle.tintColor) {
      filters.push('url(#tint-' + this._filterId + ')');
    }

    // these styles were converted to filters
    delete flatStyle.shadowColor;
    delete flatStyle.shadowOpacity;
    delete flatStyle.shadowOffset;
    delete flatStyle.shadowRadius;
    delete flatStyle.tintColor;
    // these styles are not supported on View
    delete flatStyle.overlayColor;
    delete flatStyle.resizeMode;

    // Accessibility image allows users to trigger the browser's image context menu
    var hiddenImage = displayImageUri ? (0, _createElement2.default)('img', {
      alt: accessibilityLabel || '',
      draggable: draggable || false,
      ref: this._setImageRef,
      src: displayImageUri,
      style: styles.accessibilityImage
    }) : null;

    return _react2.default.createElement(
      _View2.default,
      _extends({}, other, {
        accessibilityLabel: accessibilityLabel,
        accessible: accessible,
        onLayout: this._createLayoutHandler(finalResizeMode),
        style: [styles.root, this.context.isInAParentText && styles.inline, imageSizeStyle, flatStyle],
        testID: testID
      }),
      _react2.default.createElement(_View2.default, {
        style: [styles.image, resizeModeStyles[finalResizeMode], this._getBackgroundSize(finalResizeMode), backgroundImage && { backgroundImage: backgroundImage }, filters.length > 0 && { filter: filters.join(' ') }]
      }),
      hiddenImage,
      createTintColorSVG(tintColor, this._filterId)
    );
  };

  Image.prototype._createImageLoader = function _createImageLoader() {
    var source = this.props.source;

    this._destroyImageLoader();
    var uri = resolveAssetUri(source);
    this._imageRequestId = _ImageLoader2.default.load(uri, this._onLoad, this._onError);
    this._onLoadStart();
  };

  Image.prototype._destroyImageLoader = function _destroyImageLoader() {
    if (this._imageRequestId) {
      _ImageLoader2.default.abort(this._imageRequestId);
      this._imageRequestId = null;
    }
  };

  Image.prototype._onLoadEnd = function _onLoadEnd() {
    var onLoadEnd = this.props.onLoadEnd;

    if (onLoadEnd) {
      onLoadEnd();
    }
  };

  Image.prototype._onLoadStart = function _onLoadStart() {
    var onLoadStart = this.props.onLoadStart;

    this._updateImageState(STATUS_LOADING);
    if (onLoadStart) {
      onLoadStart();
    }
  };

  Image.prototype._updateImageState = function _updateImageState(status) {
    this._imageState = status;
    var shouldDisplaySource = this._imageState === STATUS_LOADED || this._imageState === STATUS_LOADING;
    // only triggers a re-render when the image is loading (to support PJEG), loaded, or failed
    if (shouldDisplaySource !== this.state.shouldDisplaySource) {
      if (this._isMounted) {
        this.setState(function () {
          return { shouldDisplaySource: shouldDisplaySource };
        });
      }
    }
  };

  return Image;
}(_react.Component);

Image.displayName = 'Image';
Image.contextTypes = {
  isInAParentText: _propTypes.bool
};
Image.defaultProps = {
  style: emptyObject
};
Image.resizeMode = _ImageResizeMode2.default;
Image.propTypes = process.env.NODE_ENV !== "production" ? Object.assign({}, _ViewPropTypes2.default, {
  blurRadius: _propTypes.number,
  defaultSource: _ImageSourcePropType2.default,
  draggable: _propTypes.bool,
  onError: _propTypes.func,
  onLayout: _propTypes.func,
  onLoad: _propTypes.func,
  onLoadEnd: _propTypes.func,
  onLoadStart: _propTypes.func,
  resizeMode: (0, _propTypes.oneOf)(Object.keys(_ImageResizeMode2.default)),
  source: _ImageSourcePropType2.default,
  style: (0, _StyleSheetPropType2.default)(_ImageStylePropTypes2.default),
  // compatibility with React Native
  /* eslint-disable react/sort-prop-types */
  capInsets: (0, _propTypes.shape)({ top: _propTypes.number, left: _propTypes.number, bottom: _propTypes.number, right: _propTypes.number }),
  resizeMethod: (0, _propTypes.oneOf)(['auto', 'resize', 'scale'])
  /* eslint-enable react/sort-prop-types */
}) : {};


var styles = _StyleSheet2.default.create({
  root: {
    flexBasis: 'auto',
    overflow: 'hidden',
    zIndex: 0
  },
  inline: {
    display: 'inline-flex'
  },
  image: Object.assign({}, _StyleSheet2.default.absoluteFillObject, {
    backgroundColor: 'transparent',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    height: '100%',
    width: '100%',
    zIndex: -1
  }),
  accessibilityImage: Object.assign({}, _StyleSheet2.default.absoluteFillObject, {
    height: '100%',
    opacity: 0,
    width: '100%',
    zIndex: -1
  })
});

var resizeModeStyles = _StyleSheet2.default.create({
  center: {
    backgroundSize: 'auto'
  },
  contain: {
    backgroundSize: 'contain'
  },
  cover: {
    backgroundSize: 'cover'
  },
  none: {
    backgroundPosition: '0 0',
    backgroundSize: 'auto'
  },
  repeat: {
    backgroundPosition: '0 0',
    backgroundRepeat: 'repeat',
    backgroundSize: 'auto'
  },
  stretch: {
    backgroundSize: '100% 100%'
  }
});

exports.default = (0, _applyNativeMethods2.default)(Image);
module.exports = exports['default'];