import service from '@/admin/utils/request'
import { sprintf } from "@/utils/util"

const api = {
  users: '/users',
  usersShow: '/users/%s'
}

export const getUsers = (params) => service({
  url: api.users,
  method: 'get',
  params: params
})

export const showUsers = (id) => service({
  url: sprintf(api.usersShow, id),
  method: 'get'
})

export const deleteUsers = (id) => service({
  url: sprintf(api.usersShow, id),
  method: 'delete'
})
