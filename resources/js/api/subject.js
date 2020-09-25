import service from '@/utils/request'

const api = {
  subjectsTree: '/subjects/tree',
}


export const getSubjectsTree = (params) => service({
  url: api.subjectsTree,
  method: 'get',
  data: params
})
