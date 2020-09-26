import service from '@/utils/request'
import { sprintf } from '@/utils/util'

const api = {
  subjectsTree: '/subjects/tree',
  subjectsShow: '/subjects/%s',
}


export const getSubjectsTree = () => service({
  url: api.subjectsTree,
  method: 'get'
})

export const getSubjectsShow = (id) => service({
  url: sprintf(api.subjectsShow, id),
  method: 'get'
})
