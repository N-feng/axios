import { Loading } from 'element-ui';
import instance from './interceptor'

export default (options, loading = true) => {
  let loadingInstance;
  // 请求前loading
  if (loading) loadingInstance = Loading.service({
    fullscreen: true,
    lock: true,
    text: "拼命加载中",
    spinner: "el-icon-loading",
    background: "rgba(255, 255, 255, 0.8)"
  });
  return new Promise((resolve) => {
    instance(options).then((res) => {
      resolve(res)
    }).finally(() => {
      loadingInstance.close();
    })
  })
}