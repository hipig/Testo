import service from '@/utils/request'

const api = {
  captchas: '/captchas',
  verificationCodes: '/verificationCodes',
  login: '/authorizations',
  register: '/users',
  currentUser: '/user',
  currentToken: '/authorizations/current',
}

export const getCaptchas = (params) => service({
  url: api.captchas,
  method: 'post',
  data: params
})

export const getVerificationCodes = (params) => service({
  url: api.verificationCodes,
  method: 'post',
  data: params
})

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
  url: api.currentToken,
  method: 'put'
})

export const deleteToken = () => service({
  url: api.currentToken,
  method: 'delete'
})

export const user = () => service({
  url: api.currentUser,
  method: 'get'
})
