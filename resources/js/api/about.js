import service from '@/utils/request'
import { sprintf } from '@/utils/util'

const api = {
  abouts: '/abouts',
  aboutsShow: '/abouts/%s',
}

export const getAbouts = () => service({
  url: api.abouts,
  method: 'get'
})

export const getAboutsShow = (name) => service({
  url: sprintf(api.aboutsShow, name),
  method: 'get'
})
