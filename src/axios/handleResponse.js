
import { Message } from "element-ui";

// 请求中的api
let pendingPool = new Map();

export default (response) => {
  const resp = response.data;

  if (response.status != 200 || (resp.code && resp.code != 0)) {
    if (pendingPool.has(401)) {
      return
    }
    Message({
      message: resp.data || resp.msg || "请求异常",
      type: "error",
    });
  }

  if (resp.code === 401) {
    // 清token
    localStorage.removeItem("token");
    // 也可使用router进行跳转
    // window.location.href = '/login';
    pendingPool.set(res.code, JSON.stringify(res));
  }

  if (resp.code === 0) {
    pendingPool.delete(401);
  }

  // 保证文件流输出完全
  if (response.config.responseType === "blob") {
    return response;
  } else {
    return response.data;
  }
}