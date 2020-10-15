import service from '@/utils/request'

const api = {
  userReports: '/user/reports',
}

export const storeUserReports = (params) => service({
  url: api.userReports,
  method: 'post',
  data: params
})
