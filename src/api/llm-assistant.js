import axios from 'axios'

const baseURL = 'http://8.138.17.252:9999'
// const baseURL = 'http://127.0.0.1:5000'

const instance = axios.create({
  // 基础地址，超时时间
  baseURL,
  timeout: 50000
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
    // ElMessage.success('服务器响应成功')
    // console.log(res,typeof(res))
    // console.log(1)
    return res
  },
  (err) => {

    // 错误的默认情况 => 只要给提示
    ElMessage.error('服务器响应异常')
    return Promise.reject(err)
  }
)

// 获取大模型响应数据
export const llmAssistant = (data) => instance.post('/llm-assistant',JSON.stringify(data) ,{
    headers: {
      'Content-Type': 'application/json'
    }
  })