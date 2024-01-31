import axios from 'axios'

import router from '@/router'
const baseURL = 'http://127.0.0.1:5000'

const instance = axios.create({
  // 基础地址，超时时间
  baseURL,
  timeout: 8000
})

// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    return config
  },
  (err) => Promise.reject(err)
    
)

// 响应拦截器
instance.interceptors.response.use(
  (res) => {
    ElMessage.success('服务器响应成功')
    return res
  },
  (err) => {

    // 错误的默认情况 => 只要给提示
    ElMessage.error('服务器响应异常')
    return Promise.reject(err)
  }
)

export default instance
export { baseURL }
