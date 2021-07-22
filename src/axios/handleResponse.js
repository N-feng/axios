export default (response) => {
  // 根据与后端约定，统一由code，做出对应的提示与处理
  const code = parseInt(response.data && response.data.code)
  if (code === 401) {
    // 清token
    localStorage.removeItem("token");
    // 也可使用router进行跳转
    window.location.href = '/login';
  }
  // 保证文件流输出完全
  if (response.config.responseType === "blob") {
    return response;
  } else {
    return response.data;
  }
}