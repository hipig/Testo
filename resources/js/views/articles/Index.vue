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
          <div class="shadow rounded-lg w-full bg-white">
            <div class="flex flex-col ml-5">
              <div class="py-5 pr-5 border-b border-gray-100 flex cursor-pointer">
                <div class="h-32 w-48">
                  <t-image class="h-full w-full" src="https://img.gezitiku.com/public/uploads/image/course/20201016/51ad7a37dff51e6ec08be317204f66d9.jpg" fit="cover"/>
                </div>
                <div class="h-32 flex-1 flex flex-col justify-between ml-5">
                  <div class="flex flex-col">
                    <div class="flex items-center">
                      <div class="inline-flex items-center h-5 px-2 text-xs rounded-sm border border-teal-500 text-teal-500">二级建造师</div>
                      <div class="ml-1 flex-1 truncate text-lg text-gray-900">2020年海南省二级建造师执业资格考试公告</div>
                    </div>
                    <div class="mt-3 text-gray-500 h-10" style="text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">
                      近日，海南住建厅发布了海南省2020年度二级建造师执业资格考试公告，内容提及2020年海南二级建造师考试时间及2020年海南二建考试疫情防控相关通知。具体详情格子题库已整理如下：具体详情格子题库已整理如下：
                    </div>
                  </div>
                  <div class="flex items-center">
                    <div class="flex flex-wrap">
                      <div class="flex items-center text-gray-400 mr-5">
                        <svg class="w-5 h-5 stroke-current" fill="none" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        <span class="leading-none">2020-10-16 10:10</span>
                      </div>
                      <div class="flex items-center text-gray-400">
                        <svg class="w-5 h-5 stroke-current" fill="none" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                        </svg>
                        <span class="leading-none">5</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="py-5 pr-5 border-b border-gray-100 flex cursor-pointer">
                <div class="h-32 w-48">
                  <t-image class="h-full w-full" src="" fit="cover" load-err-text="暂无封面"/>
                </div>
                <div class="h-32 flex-1 flex flex-col justify-between ml-5">
                  <div class="flex flex-col">
                    <div class="flex items-center">
                      <div class="inline-flex items-center h-5 px-2 text-xs rounded-sm border border-teal-500 text-teal-500">一级消防工程师</div>
                      <div class="ml-1 flex-1 truncate text-lg text-gray-900">2019年山东东营一级消防工程师合格证书领取温馨提示</div>
                    </div>
                    <div class="mt-3 text-gray-500 h-10" style="text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">
                      近日，山东东营人事考试网发布了2019年一级消防工程师合格证书领取温馨提示，内容中提到了东营地区一消考生可在10月15日后到指定地点领取合格证书。具体详情格子题库已整理如下：
                    </div>
                  </div>
                  <div class="flex items-center">
                    <div class="flex flex-wrap">
                      <div class="flex items-center text-gray-400 mr-5">
                        <svg class="w-5 h-5 stroke-current" fill="none" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        <span class="leading-none">2020-10-16 10:10</span>
                      </div>
                      <div class="flex items-center text-gray-400">
                        <svg class="w-5 h-5 stroke-current" fill="none" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                        </svg>
                        <span class="leading-none">5</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { getSubjectsTree } from "@/api/subject"

  export default {
    name: "articles.index",
    data () {
      return {
        subjectPid: this.$route.query.subject_pid || '',
        subjectId: this.$route.query.subject_id || '',
        subjectList: [],
        activeSubject: {}

      }
    },
    mounted() {
      this.getSubjectList()
    },
    watch: {
      $route(to,from){
        this.subjectPid = to.query.subject_pid || ''
        this.subjectId = to.query.subject_id || ''
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
