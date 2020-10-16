import service from '@/utils/request'
import {sprintf} from "../utils/util"

const api = {
  userErrors: '/user/errors',
  destroyUserErrors: '/user/errors/%s',
}

export const getUserErrors = (params) => service({
  url: api.userErrors,
  method: 'get',
  params: params
})

export const destroyUserErrors = (id) => service({
  url: sprintf(api.destroyUserErrors, id),
  method: 'delete'
})
