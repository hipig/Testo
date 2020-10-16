import axios from 'axios'
import store from '@/store'
import message from '@/components/common/message'

// 创建 axios 实例
const service = axios.create({
  baseURL: window.config.api_url,
  timeout: 6000
})

service.interceptors.request.use(config => {
  const token = store.getters['user/token']
  if (token) {
    config.headers['Authorization'] = 'Bearer ' + token
  }
  return config
})

service.interceptors.response.use((response) => {
  const token = response.headers.authorization
  if (token) {
    store.dispatch('user/refreshToken', token)
  }
  return response.data
}, (error) => {
  const response = error.response

  const token = response.headers.authorization
  if (token) {
    store.dispatch('user/refreshToken', token)
  }
  switch (response.status) {
    case 401:
      const token = store.getters['user/token']
      if (token) {
        store.dispatch('user/clear')
      }
      message.error('尚未登录，请您先登录！')
      break;
    case 403:
      message.error('您的权限不足，拒绝访问！')
      break;
    case 422:
      message.error(Object.values(response.data.errors)[0][0])
      break;
    case 429:
      message.error('重复访问次数过多！')
      break;
    case 400:
    case 500:
      message.error(response.data.message || '请求出现错误或服务器异常，请稍后再试！')
      break;
  }
  return Promise.reject(response)
})

export default service
