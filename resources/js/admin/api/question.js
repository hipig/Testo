import service from '@/admin/utils/request'
import { sprintf } from "@/utils/util"

const api = {
  questions: '/questions',
  questionsShow: '/questions/%s'
}

export const getQuestions = (params) => service({
  url: api.questions,
  method: 'get',
  params: params
})

export const showQuestions = (id) => service({
  url: sprintf(api.questionsShow, id),
  method: 'get'
})

export const storeQuestions = (params) => service({
  url: api.questions,
  method: 'post',
  data: params
})

export const updateQuestions = (id, params) => service({
  url: sprintf(api.questionsShow, id),
  method: 'put',
  data: params
})

export const deleteQuestions = (id) => service({
  url: sprintf(api.questionsShow, id),
  method: 'delete'
})
