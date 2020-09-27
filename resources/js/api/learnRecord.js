import service from '@/utils/request'
import { sprintf } from '@/utils/util'

const api = {
  chapterTests: '/records/test'
}

export const storeTestRecords = (params) => service({
  url: api.chapterTests,
  method: 'post',
  data: params
})
