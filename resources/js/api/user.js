import service from '@/utils/request'

const api = {
  login: '/auth/login',
  register: '/auth/register',
  authUser: '/user',
  current: '/auth/current',
}

export const login = (params) => service({
  url: api.login,
  method: 'post',
  data: params
})

export const register = (params) => service({
  url: api.register,
  method: 'post',
  data: params
})

export const refreshToken = () => service({
  url: api.current,
  method: 'put'
})

export const deleteToken = () => service({
  url: api.current,
  method: 'delete'
})

export const user = () => service({
  url: api.authUser,
  method: 'get'
})
