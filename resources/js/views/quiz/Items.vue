<template>
  <div class="pt-5 pb-20 px-4">
    <div class="max-w-6xl mx-auto">
      <div class="text-sm">
        <router-link :to="{name: 'home'}">首页</router-link>
        <span> / </span>
        <span class="text-gray-400">{{ typeTitle }}</span>
      </div>
      <div class="mt-5 flex flex-wrap -mx-3">
        <div class="w-2/3 px-3">
          <div class="bg-white shadow rounded-lg p-5 mb-5">
            <div class="flex items-center">
              <div class="text-2xl text-gray-900 leading-none truncate">{{ typeTitle }}</div>
            </div>
            <div class="mt-4 flex flex-warp items-center text-gray-400" v-if="form.subject_id">
              {{ subject.title }}
            </div>
          </div>
          <exam-item :id="'q-'+item.id" v-for="(item, index) in items" :key="index" :item="type === 'note' ? item : item.bank_item" :index="index" :answer="type === 'note' ? item.question.answer : item.bank_item.question.answer" :show-parse="true" :show-check-result="false" :show-answer-bar="(type === 'note' ? item : item.bank_item).question_type !==5" :show-collect="type !== 'collect'">
            <div slot="tool" v-if="type !== 'note'">
              <div class="flex items-center cursor-pointer" @click="handleDelete(item)">
                <svg class="w-6 h-6 stroke-current text-gray-400 mr-1" fill="none" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                </svg>
                <span class="text-base text-gray-900">{{ type === 'collect' ? '取消收藏' : '移除' }}</span>
              </div>
            </div>
            <div slot="footer" v-if="type === 'note' && item.notes">
              <div class="mb-4 px-4 pb-3 border-b border-gray-100" v-for="(value, key) in item.notes" :key="key">
                <div class="flex items-center justify-between text-xs text-gray-400">
                  <div class="">{{ value.created_at }}</div>
                  <div class="cursor-pointer" @click="handleDelete(value)">删除</div>
                </div>
                <div class="flex flex-col text-base">
                  <div v-html="value.content"></div>
                  <div class="flex flex-wrap -mb-2 -mr-2 mt-3">
                    <div class="pr-3 pb-3 flex" v-for="(v, k) in value.upload_items">
                      <t-image class="w-24 h-24 mr-2" :key="k" :src="v.url" :preview-src-list="value.upload_urls" fit="cover" :alt="v.name"/>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </exam-item>
          <div v-loading="isLoading" loading-custom-class="h-56"/>
          <empty-data class="mt-5" :show="isLoading === false && items.length === 0"/>
        </div>
        <div class="w-1/3 px-3 relative">
          <div class="sticky top-1">
            <div class="bg-white shadow rounded-lg mb-5">
              <div class="px-5 py-3 border-b border-gray-100 text-base text-gray-900 font-semibold">选项卡</div>
              <div class="px-5 py-4">
                <div class="flex flex-wrap -mx-1">
                  <div class="w-6 h-6 mx-1 mb-2 leading-none flex items-center justify-center border border-gray-100 hover:border-teal-500 text-gray-500 text-xs rounded-sm cursor-pointer" v-for="(item, index) in items" :key="index" @click="toIndex('q-'+item.id)">{{ index+1 }}</div>
                </div>
                <div class="text-gray-400" v-if="isLoading === false  && items.length === 0">还没有数据哦~</div>
              </div>
            </div>
            <div class="bg-white shadow rounded-lg py-3 mb-5">
              <div class="flex justify-center">
                <button type="button" class="px-4 h-8 flex items-center justify-center border border-teal-500 text-teal-500 bg-white rounded focus:outline-none" @click="handleBack">返回上级</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Breadcrumb from "@/components/common/Breadcrumb"
  import EmptyData from "@/components/common/EmptyData"
  import ExamItem from "@/components/questions/ExamItem"
  import QuestionType from "@/mixins/QuestionType"
  import { getSubjectsShow } from "@/api/subject"
  import { getUserCollects, destroyUserCollects } from "@/api/userCollect"
  import { getUserNotesDetail, destroyUserNotes } from "@/api/userNote"
  import { getUserErrors, destroyUserErrors } from "@/api/userError"

  export default {
    name: "quiz.items",
    components: {
      Breadcrumb,
      EmptyData,
      ExamItem,
    },
    mixins: [QuestionType],
    data () {
      return {
        type: this.$route.params.type,
        form: {
          subject_pid: this.$route.query.subject_pid || "",
          subject_id: this.$route.query.subject_id || "",
          question_type: this.$route.query.question_type || "",
          date: this.$route.query.date || []
        },
        index: this.$route.query.index,
        subject:{},
        items: [],
        page: this.$route.query.page || 1,
        totalPage: 0,
        isLoading: null,
        isScroll: false
      }
    },
    mounted() {
      this.getItems()
      this.form.subject_id && this.getSubject()
      this.$nextTick(() => {
        document.addEventListener('scroll', this.onScroll)
      })
    },
    beforeDestroy () {
      document.removeEventListener('scroll', this.onScroll)
    },
    computed: {
      typeTitle() {
        let typeTitles = {
          'collect': '收藏集',
          'error': '错题集',
          'note': '我的笔记'
        }
        return typeTitles[this.type]
      }
    },
    methods: {
      onScroll() {
        let scrollTop = document.documentElement.scrollTop || document.body.scrollTop
        let clientHeight = document.documentElement.clientHeight || document.body.clientHeight
        let scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight
        if (scrollHeight - scrollTop - clientHeight < 100 && !this.isScroll && this.totalPage > this.page) {
          this.isScroll = true
          setTimeout(() => {
            this.page++
            this.getItems()
          }, 500)
        }
      },
      getSubject() {
        getSubjectsShow(this.form.subject_id)
          .then((res) => {
            this.subject = res
          })
      },
      getItems() {
        this.isLoading = true

        let requests = {
          'collect': getUserCollects,
          'note': getUserNotesDetail,
          'error': getUserErrors
        }
        let params = this.form
        params.page = this.page
        requests[this.type](params)
          .then((res) => {
            let items = res.data
            if (this.type === 'note') {
              items = items.map((item) => {
                item.notes = item.notes.map((val) => {
                  val.upload_urls = val.upload_items.map((v) => {
                    return v.url
                  })
                  return val
                })
                return item
              })
            }
            this.items = this.items.concat(items)
            this.totalPage = res.meta.last_page

            this.index && this.toIndex(this.index)
            this.isScroll = this.page === this.totalPage
          })
          .finally(() => {
            this.isLoading = false
          })
      },
      handleDelete(item) {
        let requests = {
          'collect': destroyUserCollects,
          'note': destroyUserNotes,
          'error': destroyUserErrors
        }
        this.$Dialog.confirm(this.type === 'collect'? '是否取消收藏？' : '是否删除？', '温馨提示')
          .then(_ => {
            requests[this.type](item.id)
              .then(_ => {
                this.$Message.success('删除成功')
                this.$router.go(0)
              })
          })
          .catch(_ => {})
      },
      toIndex(index) {
        this.$nextTick(() => {
          document.getElementById(index).scrollIntoView({ behavior: "smooth" })
        })
      },
      handleBack() {
        this.$router.go(-1)
      }
    }
  }
</script>
