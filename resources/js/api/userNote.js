import service from '@/utils/request'
import {sprintf} from "../utils/util"

const api = {
  userNotes: '/user/notes',
  destroyUserNotes: '/user/notes/%s',
}

export const getUserNotes = (params) => service({
  url: api.userNotes,
  method: 'get',
  params: params
})

export const storeUserNotes = (params) => service({
  url: api.userNotes,
  method: 'post',
  data: params
})

export const destroyUserNotes = (id) => service({
  url: sprintf(api.destroyUserNotes, id),
  method: 'delete'
})
