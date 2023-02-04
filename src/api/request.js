import axios from 'axios'
//引入进度条
import nProgress from 'nprogress';
import "nprogress/nprogress.css"

const http = axios.create({
    baseURL:' http://gmall-h5-api.atguigu.cn/api',
    timeout:5000,
})

// 添加请求拦截器
http.interceptors.request.use((config)=>{
    // 在发送请求之前做些什么
    nProgress.start();
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
http.interceptors.response.use((response)=>{
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    nProgress.done();
    return response;
  }, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error);
});

export default http