import service from '@/utils/request'
import { sprintf } from '@/utils/util'

const api = {
  articles: '/articles',
  hotArticles: '/hot-articles',
  articlesShow: '/articles/%s',
}

export const getArticles = (params) => service({
  url: api.articles,
  method: 'get',
  params: params
})

export const getHotArticles = () => service({
  url: api.hotArticles,
  method: 'get'
})

export const getArticlesShow = (id) => service({
  url: sprintf(api.articlesShow, id),
  method: 'get'
})
