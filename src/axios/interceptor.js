import axios from "axios";
import { Message } from "element-ui";
import handleResponse from "./handleResponse"
import handleError from "./handleError"

const service = axios.create({
  timeout: 10000,
  baseURL: process.env.VUE_APP_BASE_API
});

service.interceptors.request.use(
  (config) => {
    let token = localStorage.getItem("token");
    if (token) {
      config.headers.common["token"] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

service.interceptors.response.use(
  (response) => {
    return Promise.resolve(handleResponse(response));
  },
  (error) => {
    if (error && error.response) {
      handleError(error)
    }
    // 没有response(没有状态码)的情况
    // eg: 超时；断网；请求重复被取消；主动取消请求；
    else {
      // 错误信息err传入isCancel方法，可以判断请求是否被取消
      if (axios.isCancel(error)) {
        throw new axios.Cancel(error.message)
      } else if (JSON.stringify(error).includes('timeout')) {
        error.message = '服务器响应超时，请刷新当前页'
      } else {
        error.message = '连接服务器失败!'
      }
    }
    Message.error(error.message);
    /***** 处理结束 *****/
    //如果不需要错误处理，以上的处理过程都可省略
    return Promise.reject(error);
  }
);

export default service;
