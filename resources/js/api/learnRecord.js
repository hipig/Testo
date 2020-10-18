import service from '@/utils/request'
import { sprintf } from '@/utils/util'

const api = {
  getRecords: '/records',
  showRecords: '/records/%s',
  showRecordsResult: '/records/%s/result',
  testRecords: '/records/test',
  examRecords: '/records/exam',
  dailyTestRecords: '/records/daily-test',
  recordItems: '/records/%s/items',
  updateRecords: '/records/%s'
}

export const getRecords = (params) => service({
  url: api.getRecords,
  method: 'get',
  params: params
})

export const showRecords = (id, params) => service({
  url: sprintf(api.showRecords, id),
  method: 'get',
  params: params
})

export const showRecordsResult = (id, params) => service({
  url: sprintf(api.showRecordsResult, id),
  method: 'get',
  params: params
})

export const storeTestRecords = (params) => service({
  url: api.testRecords,
  method: 'post',
  data: params
})

export const storeExamRecords = (params) => service({
  url: api.examRecords,
  method: 'post',
  data: params
})

export const storeDailyTestRecords = (params) => service({
  url: api.dailyTestRecords,
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

export const deleteRecords = (id) => service({
  url: sprintf(api.updateRecords, id),
  method: 'delete'
})
