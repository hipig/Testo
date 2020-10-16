<template>
  <div class="py-5 px-4">
    <div class="max-w-6xl mx-auto">
      <breadcrumb :list="subject.breadcrumb"/>
      <div class="mt-2 shadow rounded-lg w-full bg-white overflow-hidden w-full block relative px-5">
        <div class="my-5 flex justify-between items-center">
          <div class="flex items-center">
            <div class="flex items-center mr-5">
              <svg class="w-8 h-8 stroke-current text-teal-500 mr-2" fill="none" viewBox="0 0 24 24">
                <path d="M12 14l9-5-9-5-9 5 9 5z"></path>
                <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"></path>
              </svg>
              <h3 class="text-xl">{{ subject.title }}</h3>
            </div>
            <button type="button" class="border border-teal-200 text-teal-500 rounded-full px-2 flex items-center text-xs focus:outline-none" @click="showSwitchSubject">
              <span class="mr-1">切换考试</span>
              <svg class="w-4 h-4 stroke-current -mr-1" fill="none" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
          </div>
          <div class="flex">
            <router-link :to="{name: 'quiz.items', params: {type: 'collect'}, query: {subject_id: id}}" class="flex items-center text-teal-500">
              <svg class="w-5 h-5 fill-current" fill="none" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"></path>
              </svg>
              <span class="ml-1">题目收藏</span>
            </router-link>
            <router-link :to="{name: 'quiz.items', params: {type: 'error'}, query: {subject_id: id}}" class="ml-10 flex items-center text-teal-500">
              <svg class="w-5 h-5 fill-current" fill="none" viewBox="0 0 20 20">
                <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z"></path>
              </svg>
              <span class="ml-1">错题练习</span>
            </router-link>
          </div>
        </div>
        <div class="flex flex-col">
          <div class="flex" v-for="(item, index) in subject.children_group" :index="index">
            <div class="mr-5 text-gray-400 h-8 flex items-center">{{ parseInt(index) === 1 ? '专业科目': '公共科目' }}</div>
            <div class="flex-1 flex flex-wrap">
              <router-link :to="{name: 'subjects.show', params: {pid: pid, id:value.id}}" v-for="(value, key) in item" :key="key" class="flex items-center h-8 px-5 mr-2 mb-5 rounded-full cursor-pointer" :class="{'text-white bg-teal-500': value.id == id}">{{ value.title }}</router-link>
            </div>
          </div>
        </div>
        <div class="flex justify-center">
          <div class="flex flex-wrap">
            <div v-for="(item, index) in tabs" :key="index" class="flex items-center h-16 mr-24 text-lg cursor-pointer border-b-2 border-transparent" :class="{'text-teal-500 border-teal-500 tab-active': activeTab == index}" @click="switchTab(index)">{{ item }}</div>
          </div>
        </div>
      </div>
      <div class="mt-5">
        <chapter-list :subject-id="id" v-if="parseInt(activeTab) === 1 && id"></chapter-list>
        <exam-list :subject-id="id" v-if="parseInt(activeTab) === 2 && id"></exam-list>
        <exam-list :subject-id="id" type="old" v-if="parseInt(activeTab) === 3 && id"></exam-list>
        <daily-list :subject-id="id" v-if="parseInt(activeTab) === 4 && id"></daily-list>
      </div>
    </div>
    <t-modal v-model="switchSubjectVisible" title="切换考试" size="max-w-4xl" :show-footer="false" @close="closeSwitchSubjectModal">
      <div class="w-full" v-loading="listLoading">
        <div class="mb-5" v-for="(value, key) in subjectList" :key="key">
          <h3 class="text-gray-400 mb-2">{{ value.title }}</h3>
          <div class="flex flex-wrap -mx-3">
            <div class="w-1/4 px-3" v-for="(v, k) in value.childrenList" :key="k" @click="closeSwitchSubjectModal">
              <router-link :to="{name: 'subjects.show', params: {pid: v.id}}" class="bg-gray-100 flex items-center justify-center py-2 mb-3 rounded text-base">{{ v.title }}</router-link>
            </div>
          </div>
        </div>
      </div>
    </t-modal>
  </div>
</template>

<script>
  import ChapterList from "./tabs/ChapterList"
  import ExamList from "./tabs/ExamList"
  import DailyList from "./tabs/DailyList"
  import Breadcrumb from "@/components/common/Breadcrumb"
  import TModal from "@/components/common/modal/Modal"
  import { getSubjectsTree, getSubjectsShow } from "@/api/subject"

  export default {
    name: "subjects.show",
    components: {
      ChapterList,
      ExamList,
      DailyList,
      Breadcrumb,
      TModal
    },
    data () {
      return {
        pid: this.$route.params.pid,
        id: 0,
        subject: {},
        subjectList: [],
        tabs: {
          1: '章节练习',
          2: '模拟考试',
          3: '历年真题',
          4: '每日一练',
        },
        activeTab: 1,
        switchSubjectVisible: false,
        isLoading: null,
        listLoading: null
      }
    },
    mounted() {
      this.getSubject()
    },
    watch: {
      $route(to,from){
        this.id = to.params.id
        this.getSubject()
      }
    },
    methods: {
      getSubjectList() {
        this.listLoading = true
        getSubjectsTree()
          .then((res) => {
            this.subjectList = res
          })
          .finally(() => {
            this.listLoading = false
          })
      },
      getSubject() {
        this.isLoading = true
        getSubjectsShow(this.pid)
          .then((res) => {
            this.subject = res
            this.id = this.$route.params.id || res.children_group[0][0].id
          })
          .finally(() => {
            this.isLoading = false
          })
      },
      switchTab(name) {
        this.activeTab = name
      },
      showSwitchSubject() {
        this.switchSubjectVisible = !this.switchSubjectVisible
        this.getSubjectList()
      },
      closeSwitchSubjectModal() {
        this.switchSubjectVisible = false
      }
    }
  }
</script>
