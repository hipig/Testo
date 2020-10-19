<template>
  <div class="py-5 px-4">
    <div class="max-w-6xl mx-auto">
      <div class="shadow rounded-lg w-full bg-white px-5 pt-5 mb-5">
        <div class="flex flex-wrap -mx-2">
          <div class="px-2">
            <router-link :to="{name: 'articles.index'}" class="block py-2 px-4 leading-none rounded mb-5 cursor-pointer" :class="[subjectPid == '' ? 'bg-teal-500 text-white' : '']">全部</router-link>
          </div>
          <div class="px-2" v-for="(item, index) in subjectList" :key="index">
            <router-link :to="{name: 'articles.index', query: {subject_pid: item.id}}" class="block py-2 px-4 leading-none rounded mb-5 cursor-pointer" :class="[subjectPid == item.id ? 'bg-teal-500 text-white' : '']">{{ item.title }}</router-link>
          </div>
        </div>
        <div class="flex flex-wrap -mx-2 mt-5" v-if="subjectPid != ''">
          <div class="px-2">
            <router-link :to="{name: 'articles.index', query: {subject_pid: subjectPid}}" class="block py-2 px-4 leading-none rounded mb-5 cursor-pointer" :class="[subjectId == '' ? 'bg-teal-500 text-white' : '']">全部</router-link>
          </div>
          <div class="px-2" v-for="(item, index) in activeSubject.childrenList" :key="index">
            <router-link  :to="{name: 'articles.index', query: {subject_pid: subjectPid, subject_id: item.id}}" class="block py-2 px-4 leading-none rounded mb-5 cursor-pointer" :class="[subjectId == item.id ? 'bg-teal-500 text-white' : '']">{{ item.title }}</router-link>
          </div>
        </div>
      </div>
      <div class="flex flex-wrap -mx-3">
        <div class="w-3/4 px-3">
          <div class="shadow rounded-lg w-full bg-white" v-loading="isLoading" loading-custom-class="h-56">
            <div class="flex flex-col ml-5">
              <div class="py-5 pr-5 border-b border-gray-100 flex cursor-pointer" v-for="(item, index) in articleList" :key="index">
                <div class="h-32 w-48">
                  <t-image class="h-full w-full" :src="item.cover_url" fit="cover" lazy/>
                </div>
                <div class="h-32 flex-1 flex flex-col justify-between min-w-0 ml-5">
                  <div class="flex flex-col">
                    <div class="flex items-center">
                      <div class="inline-flex items-center h-5 px-2 text-xs rounded-sm border border-teal-500 text-teal-500">{{ item.category.title }}</div>
                      <div class="ml-1 flex-1 truncate text-lg text-gray-900">{{ item.title }}</div>
                    </div>
                    <div class="mt-3 text-gray-500 h-10" style="text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;" :title="item.description">
                      {{ item.description }}
                    </div>
                  </div>
                  <div class="flex items-center">
                    <div class="flex flex-wrap">
                      <div class="flex items-center text-gray-400 mr-5">
                        <svg class="w-5 h-5 stroke-current" fill="none" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        <span class="leading-none">{{ item.published_at }}</span>
                      </div>
                      <div class="flex items-center text-gray-400">
                        <svg class="w-5 h-5 stroke-current" fill="none" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                        </svg>
                        <span class="leading-none">{{ item.view_count }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="flex justify-center py-5" v-if="total > 0">
              <t-pagination :total="total" :current="currentPage" @page-change="changePage"/>
            </div>
          </div>
          <empty-data :class="['shadow-none']" :show="isLoading === false && articleList.length === 0"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import EmptyData from "@/components/common/EmptyData"
  import { getSubjectsTree } from "@/api/subject"
  import { getArticles } from "@/api/article"

  export default {
    name: "articles.index",
    components: {
      EmptyData
    },
    data () {
      return {
        subjectPid: this.$route.query.subject_pid || '',
        subjectId: this.$route.query.subject_id || '',
        subjectList: [],
        activeSubject: {},
        articleList: [],
        currentPage: 1,
        total: 0,
        isLoading: null
      }
    },
    mounted() {
      this.getSubjectList()
      this.getArticleList()
    },
    watch: {
      $route(to,from){
        this.subjectPid = to.query.subject_pid || ''
        this.subjectId = to.query.subject_id || ''
        this.currentPage = 1
        this.getArticleList()
      },
      subjectPid(val) {
        let index = this.subjectList.findIndex((item) => {
          return item.id == val
        })
        this.activeSubject = this.subjectList[index]
      }
    },
    methods: {
      getSubjectList() {
        getSubjectsTree()
          .then((res) => {
            this.subjectList = res

            let index = res.findIndex((item) => {
              return item.id == this.subjectPid
            })
            this.activeSubject = res[index]
          })
      },
      getArticleList() {
        this.isLoading = true

        let params = {
          subject_pid: this.subjectPid,
          subject_id: this.subjectId,
          page: this.currentPage
        }

        getArticles(params)
          .then((res) => {
            this.articleList = res.data
            this.total = res.meta.total
          })
          .finally(() => {
            this.isLoading = false
          })
      },
      changePage(page) {
        this.currentPage = page
        this.getArticleList()
      },
      handleNav(pid = '', id ='') {
        this.subjectPid = pid
        this.subjectId = id

        let query = {}
        if (pid) query.subject_pid = pid
        if (id) query.subject_id = id
        this.$router.push({name: 'articles.index', query: query})
      }
    }
  }
</script>
