import service from '@/utils/request'
import { sprintf } from '@/utils/util'

const api = {
  getRecords: '/records',
  showTestRecords: '/records/test/%s',
  testRecords: '/records/test',
  showExamRecords: '/records/exam/%s',
  examRecords: '/records/exam',
  recordItems: '/records/%s/items',
  updateRecords: '/records/%s'
}

export const getRecords = (params) => service({
  url: api.getRecords,
  method: 'get',
  params: params
})

export const showTestRecords = (id, params) => service({
  url: sprintf(api.showTestRecords, id),
  method: 'get',
  params: params
})

export const storeTestRecords = (params) => service({
  url: api.testRecords,
  method: 'post',
  data: params
})

export const showExamRecords = (id) => service({
  url: sprintf(api.showExamRecords, id),
  method: 'get'
})

export const storeExamRecords = (params) => service({
  url: api.examRecords,
  method: 'post',
  data: params
})

export const storeRecordItems = (id, params) => service({
  url: sprintf(api.recordItems, id),
  method: 'post',
  data: params
})

export const updateRecords = (id, params) => service({
  url: sprintf(api.updateRecords, id),
  method: 'put',
  data: params
})
