import { Loading, Message } from 'element-ui';
import instance from './interceptor'

// 请求中的api
let pendingPool = new Map();

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
  return new Promise((resolve, reject) => {
    instance(options).then((res) => {
      if (res.code === 0) {
        pendingPool.delete(401)
        resolve(res)
      } else {
        if (!pendingPool.has(401)) {
          Message({
            message: res.msg || '请求异常',
            type: 'error',
          })
        }
        if (res.code === 401) {
          pendingPool.set(res.code, JSON.stringify(res));
        }
        reject(res)
      }
    }).finally(() => {
      loadingInstance.close();
    })
  })
}