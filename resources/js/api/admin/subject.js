import service from '@/utils/adminRequest'
import { sprintf } from "@/utils/util"

const api = {
  subjects: '/subjects',
  subjectsShow: '/subjects/%s'
}

export const getSubjects = (params) => service({
  url: api.subjects,
  method: 'get',
  params: params
})

export const storeSubjects = (params) => service({
  url: api.subjects,
  method: 'post',
  data: params
})

export const deleteSubjects = (id) => service({
  url: sprintf(api.subjectsShow, id),
  method: 'delete'
})
