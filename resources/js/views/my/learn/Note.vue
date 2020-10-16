<template>
  <div class="bg-white shadow rounded-lg">
    <learn-tab active="note"/>
    <div class="p-5">
      <learn-filter :show-question-type-select="true" @on-select="handleSelect"/>
      <div v-loading="isLoading" loading-custom-class="h-56">
        <div class="pt-5 pb-4 border-b border-gray-100" v-for="(item, index) in notes" :key="index">
          <div class="flex justify-between text-xs leading-none mb-3">
            <div class="flex flex-col flex-1">
              <div class="text-base" v-html="item.content"></div>
              <div class="flex flex-wrap -mr-3 mt-3">
                <img class="h-24 mr-3" v-for="(v, k) in item.upload_items" :key="k" :src="v.url" :alt="v.name">
              </div>
            </div>
            <div class="pl-2 text-gray-400">{{ item.created_at }}</div>
          </div>
          <div class="flex flex-col p-3 mb-3 bg-gray-100 border border-gray-200 rounded">
            <div class="flex items-baseline text-base mb-2">
              <div class="text-teal-500 w-16">{{ `[${questionTypes[item.question_type].name}]` }}</div>
              <div class="flex-1">{{ item.question_title }}</div>
            </div>
            <div class="text-gray-400 text-xs mr-2 truncate flex items-center">
              来源：<span class="text-gray-900">{{ item.subject_title }}</span>
            </div>
          </div>
          <div class="flex items-center justify-between">
            <div class="cursor-pointer text-xs text-gray-400" @click="handleDelete(item)">删除</div>
            <div class="cursor-pointer font-semibold text-teal-500" @click="handleView(item)">查看详情</div>
          </div>
        </div>
        <div class="pt-5 pb-1 flex justify-end" v-if="total > 0">
          <t-pagination :total="total" :current="currentPage" @page-change="changePage"/>
        </div>
      </div>
      <empty-data :class="['shadow-none']" :show="isLoading === false && notes.length === 0"/>
    </div>
  </div>
</template>

<script>
  import LearnTab from "./LearnTab"
  import LearnFilter from "./LearnFilter"
  import QuestionType from "@/mixins/QuestionType"
  import EmptyData from "@/components/common/EmptyData"
  import { getUserNotes, destroyUserNotes } from "@/api/userNote"

  export default {
    name: "my.note",
    components: {
      LearnTab,
      LearnFilter,
      EmptyData
    },
    mixins: [QuestionType],
    data () {
      return {
        notes: [],
        filterForm: {},
        currentPage: 1,
        total: 0,
        isLoading: null
      }
    },
    mounted() {
      this.getUserNotes()
    },
    methods: {
      getUserNotes() {
        this.isLoading = true
        let params = this.filterForm
        params.page = this.currentPage

        getUserNotes(params)
          .then((res) => {
            this.notes = res.data
            this.total = res.meta.total
          })
          .finally(() => {
            this.isLoading = false
          })
      },
      handleSelect(form) {
        this.filterForm = form
        this.getUserNotes()
      },
      handleView(item) {
        this.$router.push({name: 'quiz.items', params: {type: 'note'}, query: Object.assign({}, this.filterForm, {index: `q-${item.bank_item_id}`})})
      },
      changePage(page) {
        this.currentPage = page
        this.getUserNotes()
      },
      handleDelete(item) {
        return this.$Dialog.confirm({
          title: '温馨提示',
          content: `是否删除该条笔记？`
        })
          .then(_ => {
            destroyUserNotes(item.id)
              .then(_ => {
                this.$Message.success('删除成功')
                this.getUserNotes()
              })
          })
          .catch(_ => {})
      }
    }
  }
</script>
