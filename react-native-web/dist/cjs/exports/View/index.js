'use strict';

exports.__esModule = true;

var _applyLayout = require('../../modules/applyLayout');

var _applyLayout2 = _interopRequireDefault(_applyLayout);

var _applyNativeMethods = require('../../modules/applyNativeMethods');

var _applyNativeMethods2 = _interopRequireDefault(_applyNativeMethods);

var _propTypes = require('prop-types');

var _createElement = require('../createElement');

var _createElement2 = _interopRequireDefault(_createElement);

var _filterSupportedProps = require('./filterSupportedProps');

var _filterSupportedProps2 = _interopRequireDefault(_filterSupportedProps);

var _invariant = require('fbjs/lib/invariant');

var _invariant2 = _interopRequireDefault(_invariant);

var _StyleSheet = require('../StyleSheet');

var _StyleSheet2 = _interopRequireDefault(_StyleSheet);

var _ViewPropTypes = require('./ViewPropTypes');

var _ViewPropTypes2 = _interopRequireDefault(_ViewPropTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (c) 2015-present, Nicolas Gallagher.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (c) 2015-present, Facebook, Inc.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * All rights reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var calculateHitSlopStyle = function calculateHitSlopStyle(hitSlop) {
  var hitStyle = {};
  for (var prop in hitSlop) {
    if (hitSlop.hasOwnProperty(prop)) {
      var value = hitSlop[prop];
      hitStyle[prop] = value > 0 ? -1 * value : 0;
    }
  }
  return hitStyle;
};

var View = function (_Component) {
  _inherits(View, _Component);

  function View() {
    _classCallCheck(this, View);

    return _possibleConstructorReturn(this, _Component.apply(this, arguments));
  }

  View.prototype.render = function render() {
    var hitSlop = this.props.hitSlop;
    var supportedProps = (0, _filterSupportedProps2.default)(this.props);

    if (process.env.NODE_ENV !== 'production') {
      _react2.default.Children.toArray(this.props.children).forEach(function (item) {
        (0, _invariant2.default)(typeof item !== 'string', 'Unexpected text node: ' + item + '. A text node cannot be a child of a <View>.');
      });
    }

    var isInAParentText = this.context.isInAParentText;


    supportedProps.style = _StyleSheet2.default.compose(styles.initial, _StyleSheet2.default.compose(isInAParentText && styles.inline, this.props.style));

    if (hitSlop) {
      var hitSlopStyle = calculateHitSlopStyle(hitSlop);
      var hitSlopChild = (0, _createElement2.default)('span', { style: [styles.hitSlop, hitSlopStyle] });
      supportedProps.children = _react2.default.Children.toArray([hitSlopChild, supportedProps.children]);
    }

    return (0, _createElement2.default)('div', supportedProps);
  };

  return View;
}(_react.Component);

View.displayName = 'View';
View.contextTypes = {
  isInAParentText: _propTypes.bool
};
View.propTypes = process.env.NODE_ENV !== "production" ? _ViewPropTypes2.default : {};


var styles = _StyleSheet2.default.create({
  // https://github.com/facebook/css-layout#default-values
  initial: {
    alignItems: 'stretch',
    borderWidth: 0,
    borderStyle: 'solid',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    margin: 0,
    padding: 0,
    position: 'relative',
    zIndex: 0,
    // fix flexbox bugs
    minHeight: 0,
    minWidth: 0
  },
  inline: {
    display: 'inline-flex'
  },
  // this zIndex-ordering positions the hitSlop above the View but behind
  // its children
  hitSlop: Object.assign({}, _StyleSheet2.default.absoluteFillObject, {
    zIndex: -1
  })
});

exports.default = (0, _applyLayout2.default)((0, _applyNativeMethods2.default)(View));
module.exports = exports['default'];