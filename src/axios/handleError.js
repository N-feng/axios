export default (error) => {
  switch (error.response.status) {
    case 200:
      error.message = '错误响应也会有状态码为200的情况'
      break
    case 400:
      error.message = '请求错误(400)'
      break
    case 401:
      error.message = '您没有此功能权限，如需开通，请联系管理员。'
      break
    case 403:
      error.message = '登陆过期，请重新登录(403)';
      break
    case 404:
      error.message = '请求错误,未找到该资源(404)'
      break
    case 408:
      error.message = '请求超时(408)'
      break
    case 500:
      error.message = '服务器错误(500)'
      break
    case 501:
      error.message = '服务未实现(501)'
      break
    case 502:
      error.message = '网络错误(502)'
      break
    case 503:
      error.message = '服务不可用(503)'
      break
    case 504:
      error.message = '网络超时(504)'
      break
    case 505:
      error.message = 'HTTP版本不受支持(505)'
      break
    default:
      error.message = `连接出错，状态码：(${error.response.status})!`
  }
}