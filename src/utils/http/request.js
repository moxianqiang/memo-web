import axios from 'axios'
import {ElMessage, ElMessageBox} from "element-plus";
// 请求
const http = axios.create({
  baseURL: 'http://127.0.0.1:5000/api',
  timeout: 5000,
});
// 请求拦截
http.interceptors.request.use(
  (config) => {
    //请求头设置
    let token = sessionStorage.getItem('token');
    !["/account/login/", "/lookup/", '/common/choice/', '/account/logout/'].includes(config.url) && (config.headers.Authorization = token);
    // config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
    config.headers['Content-Type'] = 'application/json'
    config.headers['withCredentials'] = true
    return config;
  },
  (err) => {
    console.log(err);
  }
);

// 响应拦截
http.interceptors.response.use(
  (res) => {
    // 对响应码的处理
    if (res && res.status) {
      console.log('status: ', res.status)
      switch (res.status) {
        case 200:
          showMessage("success", res.data);
          break;
        case 201:
          showMessage("success", res.data);
          break;
        case 204:
          showMessage("success", res.data);
          break;
        case 400:
          showMessage("warning", res.data);
          break;
        case 401:
          showMessage("warning", res.data);
          break;
        case 403:
          showMessage("warning", res.data);
          break;
        case 404:
          showMessage("warning", res.data);
          break;
        case 422:
          showMessage("warning", res.data);
          break;
        case 500:
          showMessage("warning", res.data);
          break;
      }
      return res.data;
    }
  },
  (error) => {
    if (error.code === "ECONNABORTED") {
      ElMessage({
        message: "请求超时",
        type: "error",
        duration: 5 * 1000,
      });
      return Promise.reject(error);
    }
    const {response} = error;
    const errMsg = {
      401: "登录超时，可以取消继续留在该页面，或者重新登录",
      403: "[403]你没有权限执行此操作",
      404: "[404]资源未找到",
      405: "[405]方法不允许",
      500: "出错啦",
    };
    openErrorMessage(
      response.code,
      // msg根据后端返回的字段来的，后端返回msg就用msg，返回message就用message
      errMsg[response.code] || response.data.msg
    );
    if (response.status === 403) {
      console.log('403')
    }
    return Promise.reject(error);
  }
);
const showMessage = (type, data) => {
  if (type === "warning") {
    ElMessage({
      message: data,
      type: "error",
      duration: 5 * 1000,
    });
  } else {
    if (data.msg) {
      // const arr = data.msg.split(",");
      // let str = "";
      // arr.map((item) => {
      //   str = str + `<div>${item}</div>`;
      // });

      ElMessage({
        dangerouslyUseHTMLString: true,
        message: data.msg,
        type: "success",
        duration: 3 * 1000,
      });
    }
  }
};
const openErrorMessage = (status, message) => {
  if (status === 401) {
    ElMessageBox.confirm(message, "确定登出", {
      confirmButtonText: "重新登录",
      cancelButtonText: "取消",
      type: "warning",
    }).then(() => {
      console.log('401')
    });
  } else {
    ElMessage({
      message: message,
      type: "error",
      duration: 5 * 1000,
    });
  }
};

function request({method = "get", url, data = {}, params = {},timeout= 5000}) {
  return http({
    method,
    url,
    data: {
      ...data,
      token: sessionStorage.getItem('token') || null
    },
    params,
    timeout
  })
}

export default request;
