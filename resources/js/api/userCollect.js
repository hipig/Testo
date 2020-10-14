import service from '@/utils/request'

const api = {
  userCollects: '/user/collects',
  showUserCollects: '/user/collects/item'
}

export const getUserCollects = (params) => service({
  url: api.userCollects,
  method: 'get',
  params: params
})

export const storeUserCollects = (params) => service({
  url: api.userCollects,
  method: 'post',
  data: params
})

export const showUserCollects = (params) => service({
  url: api.showUserCollects,
  method: 'get',
  params: params
})

export const deleteUserCollects = (params) => service({
  url: api.showUserCollects,
  method: 'delete',
  data: params
})
