import service from '@/admin/utils/request'
import { sprintf } from "@/utils/util"

const api = {
  subjectsTree: '/subjects/tree',
  subjects: '/subjects',
  subjectsShow: '/subjects/%s'
}

export const getSubjects = (params) => service({
  url: api.subjects,
  method: 'get',
  params: params
})

export const getSubjectsTree = () => service({
  url: api.subjectsTree,
  method: 'get'
})

export const showSubjects = (id) => service({
  url: sprintf(api.subjectsShow, id),
  method: 'get'
})

export const storeSubjects = (params) => service({
  url: api.subjects,
  method: 'post',
  data: params
})

export const updateSubjects = (id, params) => service({
  url: sprintf(api.subjectsShow, id),
  method: 'put',
  data: params
})

export const deleteSubjects = (id) => service({
  url: sprintf(api.subjectsShow, id),
  method: 'delete'
})
