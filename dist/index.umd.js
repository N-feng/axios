(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('axios')) :
  typeof define === 'function' && define.amd ? define(['axios'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.App = factory(global.axios));
}(this, (function (axios) { 'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var axios__default = /*#__PURE__*/_interopDefaultLegacy(axios);

  console.log('axios: ', axios__default['default']);
  var instance = {};

  // Import vue component
  var components = []; // will install the plugin only once

  var install = function install(Vue) {
    components.forEach(function (component) {
      Vue.component(component.name, component);
    });
  };

  if (typeof window !== "undefined" && window.Vue) {
    install(window.Vue);
  } // To allow use as module (npm/webpack/etc.) export component


  var index = {
    install: install,
    instance: instance
  }; // It's possible to expose named exports when writing components that can
  // also be used as directives, etc. - eg. import { RollupDemoDirective } from 'rollup-demo';
  // export const RollupDemoDirective = component;

  return index;

})));
