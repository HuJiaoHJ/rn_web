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

import invariant from 'fbjs/lib/invariant';
import unmountComponentAtNode from '../unmountComponentAtNode';
import renderApplication, { getApplication as _getApplication } from './renderApplication';


var emptyObject = {};
var runnables = {};

var componentProviderInstrumentationHook = function componentProviderInstrumentationHook(component) {
  return component();
};
var wrapperComponentProvider = void 0;

/**
 * `AppRegistry` is the JS entry point to running all React Native apps.
 */
var AppRegistry = function () {
  function AppRegistry() {
    _classCallCheck(this, AppRegistry);
  }

  AppRegistry.getAppKeys = function getAppKeys() {
    return Object.keys(runnables);
  };

  AppRegistry.getApplication = function getApplication(appKey, appParameters) {
    invariant(runnables[appKey] && runnables[appKey].getApplication, 'Application ' + appKey + ' has not been registered. ' + 'This is either due to an import error during initialization or failure to call AppRegistry.registerComponent.');

    return runnables[appKey].getApplication(appParameters);
  };

  AppRegistry.registerComponent = function registerComponent(appKey, componentProvider) {
    runnables[appKey] = {
      getApplication: function getApplication(appParameters) {
        return _getApplication(componentProviderInstrumentationHook(componentProvider), appParameters ? appParameters.initialProps : emptyObject, wrapperComponentProvider && wrapperComponentProvider(appParameters));
      },
      run: function run(appParameters) {
        return renderApplication(componentProviderInstrumentationHook(componentProvider), appParameters.initialProps || emptyObject, appParameters.rootTag, wrapperComponentProvider && wrapperComponentProvider(appParameters), appParameters.callback);
      }
    };
    return appKey;
  };

  AppRegistry.registerConfig = function registerConfig(config) {
    config.forEach(function (_ref) {
      var appKey = _ref.appKey,
          component = _ref.component,
          run = _ref.run;

      if (run) {
        AppRegistry.registerRunnable(appKey, run);
      } else {
        invariant(component, 'No component provider passed in');
        AppRegistry.registerComponent(appKey, component);
      }
    });
  };

  // TODO: fix style sheet creation when using this method


  AppRegistry.registerRunnable = function registerRunnable(appKey, run) {
    runnables[appKey] = { run: run };
    return appKey;
  };

  AppRegistry.runApplication = function runApplication(appKey, appParameters) {
    var isDevelopment = process.env.NODE_ENV !== 'production';
    if (isDevelopment) {
      var params = Object.assign({}, appParameters);
      params.rootTag = '#' + params.rootTag.id;

      console.log('Running application "' + appKey + '" with appParams: ' + JSON.stringify(params) + '.\n' + ('Development-level warnings: ' + (isDevelopment ? 'ON' : 'OFF') + '.\n') + ('Performance optimizations: ' + (isDevelopment ? 'OFF' : 'ON') + '.'));
    }

    invariant(runnables[appKey] && runnables[appKey].run, 'Application "' + appKey + '" has not been registered. ' + 'This is either due to an import error during initialization or failure to call AppRegistry.registerComponent.');

    runnables[appKey].run(appParameters);
  };

  AppRegistry.setComponentProviderInstrumentationHook = function setComponentProviderInstrumentationHook(hook) {
    componentProviderInstrumentationHook = hook;
  };

  AppRegistry.setWrapperComponentProvider = function setWrapperComponentProvider(provider) {
    wrapperComponentProvider = provider;
  };

  AppRegistry.unmountApplicationComponentAtRootTag = function unmountApplicationComponentAtRootTag(rootTag) {
    unmountComponentAtNode(rootTag);
  };

  return AppRegistry;
}();

export default AppRegistry;