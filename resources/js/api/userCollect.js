import service from '@/utils/request'
import { sprintf } from "../utils/util"

const api = {
  userCollects: '/user/collects',
  showUserCollects: '/user/collects/item',
  destroyUserCollects: '/user/collects/%s',
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

export const destroyUserCollects = (id) => service({
  url: sprintf(api.destroyUserCollects, id),
  method: 'delete'
})
