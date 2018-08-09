var isWebColor = function isWebColor(color) {
  return color === 'currentcolor' || color === 'currentColor' || color === 'inherit' || color.indexOf('var(') === 0;
};

export default isWebColor;