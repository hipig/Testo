import service from '@/utils/request'
import { sprintf } from '@/utils/util'

const api = {
  chapterTests: '/subjects/%s/chapter-tests',
  mockExams: '/subjects/%s/mock-exams',
  oldExams: '/subjects/%s/old-exams',
  dailyTests: '/subjects/%s/daily-tests',
  countTypeTotal: '/banks/%s/count-type-total'
}

export const getChapterTests = (id) => service({
  url: sprintf(api.chapterTests, id),
  method: 'get'
})

export const getMockExams = (id) => service({
  url: sprintf(api.mockExams, id),
  method: 'get'
})

export const getOldExams = (id) => service({
  url: sprintf(api.oldExams, id),
  method: 'get'
})

export const getDailyTests = (id) => service({
  url: sprintf(api.dailyTests, id),
  method: 'get'
})

export const geCountTypeTotal = (id, params) => service({
  url: sprintf(api.countTypeTotal, id),
  method: 'get',
  params: params
})
