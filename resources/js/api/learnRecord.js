import service from '@/utils/request'
import { sprintf } from '@/utils/util'

const api = {
  showTestRecords: '/records/test/%s',
  testRecords: '/records/test',
  recordItems: '/record-items'
}

export const showTestRecords = (id) => service({
  url: sprintf(api.showTestRecords, id),
  method: 'get'
})

export const storeTestRecords = (params) => service({
  url: api.testRecords,
  method: 'post',
  data: params
})

export const storeRecordItems = (params) => service({
  url: api.recordItems,
  method: 'post',
  data: params
})
