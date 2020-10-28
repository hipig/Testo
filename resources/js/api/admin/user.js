import service from '@/utils/adminRequest'

const api = {
  login: '/login',
  me: '/me',
  logout: '/logout',
  changePassword: '/change-password'
}

export const login = (params) => service({
  url: api.login,
  method: 'post',
  data: params
})

export const logout = () => service({
  url: api.logout,
  method: 'delete'
})

export const me = () => service({
  url: api.me,
  method: 'get'
})

export const changePassword = (params) => service({
  url: api.changePassword,
  method: 'post',
  data: params
})
