(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('element-ui'), require('axios')) :
  typeof define === 'function' && define.amd ? define(['element-ui', 'axios'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.App = factory(global.elementUi, global.axios));
}(this, (function (elementUi, axios) { 'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var axios__default = /*#__PURE__*/_interopDefaultLegacy(axios);

  var pendingPool = new Map();
  var handleResponse = (function (response) {
    var resp = response.data;

    if (response.status != 200 || resp.code && resp.code != 0) {
      if (pendingPool.has(401)) {
        return;
      }

      elementUi.Message({
        message: resp.data || resp.msg || "请求异常",
        type: "error"
      });
    }

    if (resp.code === 401) {
      // 清token
      localStorage.removeItem("token"); // 也可使用router进行跳转
      // window.location.href = '/login';

      pendingPool.set(res.code, JSON.stringify(res));
    }

    if (resp.code === 0) {
      pendingPool["delete"](401);
    } // 保证文件流输出完全


    if (response.config.responseType === "blob") {
      return response;
    } else {
      return response.data;
    }
  });

  var handleError = (function (error) {
    switch (error.response.status) {
      case 200:
        error.message = '错误响应也会有状态码为200的情况';
        break;

      case 400:
        error.message = '请求错误(400)';
        break;

      case 401:
        error.message = '您没有此功能权限，如需开通，请联系管理员。';
        break;

      case 403:
        error.message = '登陆过期，请重新登录(403)';
        break;

      case 404:
        error.message = '请求错误,未找到该资源(404)';
        break;

      case 408:
        error.message = '请求超时(408)';
        break;

      case 500:
        error.message = '服务器错误(500)';
        break;

      case 501:
        error.message = '服务未实现(501)';
        break;

      case 502:
        error.message = '网络错误(502)';
        break;

      case 503:
        error.message = '服务不可用(503)';
        break;

      case 504:
        error.message = '网络超时(504)';
        break;

      case 505:
        error.message = 'HTTP版本不受支持(505)';
        break;

      default:
        error.message = "\u8FDE\u63A5\u51FA\u9519\uFF0C\u72B6\u6001\u7801\uFF1A(".concat(error.response.status, ")!");
    }
  });

  var service = axios__default['default'].create({
    timeout: 10000,
    baseURL: process.env.VUE_APP_BASE_API
  });
  service.interceptors.request.use(function (config) {
    var token = localStorage.getItem("token");

    if (token) {
      config.headers.common["token"] = token;
    }

    return config;
  }, function (error) {
    return Promise.reject(error);
  });
  service.interceptors.response.use(function (response) {
    return Promise.resolve(handleResponse(response));
  }, function (error) {
    if (error && error.response) {
      handleError(error);
    } // 没有response(没有状态码)的情况
    // eg: 超时；断网；请求重复被取消；主动取消请求；
    else {
      // 错误信息err传入isCancel方法，可以判断请求是否被取消
      if (axios__default['default'].isCancel(error)) {
        throw new axios__default['default'].Cancel(error.message);
      } else if (JSON.stringify(error).includes('timeout')) {
        error.message = '服务器响应超时，请刷新当前页';
      } else {
        error.message = '连接服务器失败!';
      }
    }

    elementUi.Message.error(error.message);
    /***** 处理结束 *****/
    //如果不需要错误处理，以上的处理过程都可省略

    return Promise.reject(error);
  });

  var request = (function (options) {
    var loading = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    var loadingInstance; // 请求前loading

    if (loading) loadingInstance = elementUi.Loading.service({
      fullscreen: true,
      lock: true,
      text: "拼命加载中",
      spinner: "el-icon-loading",
      background: "rgba(255, 255, 255, 0.8)"
    });
    return new Promise(function (resolve) {
      service(options).then(function (res) {
        resolve(res);
      })["finally"](function () {
        loadingInstance.close();
      });
    });
  });

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
    request: request
  }; // It's possible to expose named exports when writing components that can
  // also be used as directives, etc. - eg. import { RollupDemoDirective } from 'rollup-demo';
  // export const RollupDemoDirective = component;

  return index;

})));
