import axios from 'axios'
import store from '@/store'
import message from '@/components/common/message'

// 创建 axios 实例
const service = axios.create({
  baseURL: window.config.api_url,
  timeout: 6000
})

service.interceptors.request.use(config => {
  const token = window.localStorage.getItem('token')

  if (token) {
    config.headers['Authorization'] = token
  }
  return config
})

service.interceptors.response.use((response) => {
  const token = response.headers.authorization
  if (token) {
    store.dispatch('user/RefreshToken', token)
  }
  return response.data
}, (error) => {
  const response = error.response
  const token = response.headers.authorization
  if (token) {
    store.dispatch('user/RefreshToken', token)
  }
  switch (response.status) {
    case 401:
      const token = window.localStorage.getItem('token')
      if (token) {
        store.dispatch('user/Clear')
      }
      window.location.reload()
      break;
    case 403:
      message.error('您的权限不足， 拒绝访问！')
      break;
    case 422:
      break;
    case 429:
      message.error('重复访问次数过多！')
      break;
    case 500:
      message.error('请求出现错误或服务器异常，请稍后再试！')
      break;
    default:
      message.error(response.data.message|| '请求出现错误或服务器异常，请稍后再试！')
      break;
  }
  return Promise.reject(response)
})

export default service
