import createRuleBlock from './createRuleBlock';
import createReactDOMStyle from './createReactDOMStyle';
import i18nStyle from './i18nStyle';
import hash from '../../vendor/hash';

var hashObject = function hashObject(obj) {
  return hash(JSON.stringify(obj));
};

var createIdentifier = function createIdentifier(obj) {
  var hashed = hashObject(obj);
  return process.env.NODE_ENV !== 'production' ? 'rn-anim-' + hashed : 'rn-' + hashed;
};

var prefixes = ['-webkit-', ''];

var makeBlock = function makeBlock(rule) {
  var domStyle = createReactDOMStyle(i18nStyle(rule));
  return createRuleBlock(domStyle);
};

var makeSteps = function makeSteps(keyframes) {
  return Object.keys(keyframes).map(function (stepName) {
    var rule = keyframes[stepName];
    var block = makeBlock(rule);
    return stepName + '{' + block + '}';
  }).join('');
};

var createKeyframesRules = function createKeyframesRules(keyframes) {
  var identifier = createIdentifier(keyframes);
  var rules = prefixes.map(function (prefix) {
    return '@media all {@' + prefix + 'keyframes ' + identifier + '{' + makeSteps(keyframes) + '}}';
  });
  return { identifier: identifier, rules: rules };
};

export default createKeyframesRules;