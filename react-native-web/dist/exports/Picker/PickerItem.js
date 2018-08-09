function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import ColorPropType from '../ColorPropType';
import { Component } from 'react';
import createElement from '../createElement';
import { number, oneOfType, string } from 'prop-types';

var PickerItem = function (_Component) {
  _inherits(PickerItem, _Component);

  function PickerItem() {
    _classCallCheck(this, PickerItem);

    return _possibleConstructorReturn(this, _Component.apply(this, arguments));
  }

  PickerItem.prototype.render = function render() {
    var _props = this.props,
        color = _props.color,
        label = _props.label,
        testID = _props.testID,
        value = _props.value;

    var style = { color: color };
    return createElement('option', { style: style, testID: testID, value: value }, label);
  };

  return PickerItem;
}(Component);

export default PickerItem;
PickerItem.propTypes = process.env.NODE_ENV !== "production" ? {
  color: ColorPropType,
  label: string.isRequired,
  testID: string,
  value: oneOfType([number, string])
} : {};