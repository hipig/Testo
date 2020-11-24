import service from '@/admin/utils/request'
import { sprintf } from "@/utils/util"

const api = {
  banks: '/banks',
  banksShow: '/banks/%s'
}

export const getBanks = (params) => service({
  url: api.banks,
  method: 'get',
  params: params
})

export const showBanks = (id) => service({
  url: sprintf(api.banksShow, id),
  method: 'get'
})

export const storeBanks = (params) => service({
  url: api.banks,
  method: 'post',
  data: params
})

export const updateBanks = (id, params) => service({
  url: sprintf(api.banksShow, id),
  method: 'put',
  data: params
})

export const deleteBanks = (id) => service({
  url: sprintf(api.banksShow, id),
  method: 'delete'
})
