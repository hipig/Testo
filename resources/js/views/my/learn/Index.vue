<template>
  <div class="bg-white shadow rounded-lg">
    <learn-tab/>
    <div class="p-5">
      <learn-filter @on-select="handleSelect"/>
      <div v-loading="isLoading" loading-custom-class="h-56">
        <div class="pt-5 pb-4 border-b border-gray-100" v-for="(item, index) in records" :key="index">
          <div class="flex items-center justify-between text-gray-500 text-xs leading-none mb-2">
            <div>{{ item.created_at }}</div>
            <div class="cursor-pointer" @click="handleDelete(item)">删除</div>
          </div>
          <div class="text-base mb-2">{{ item.bank_title }}</div>
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <div class="text-gray-900 w-40 mr-2 truncate flex items-center">
                <div class="mr-1 flex items-center justify-center bg-gradient-to-r text-white leading-none text-xs w-4 h-4 rounded-sm" :class="item.type | labelColor">{{ item.type | labelText }}</div>
                <span class="text-xs">{{ item.subject_title }}</span>
              </div>
              <div class="text-gray-400"><span class="text-teal-500 text-base">{{ item.done_count }}</span>/{{ item.total_count }}</div>
            </div>
            <div class="cursor-pointer font-semibold" :class="item.type | actionColor" @click="handleContinue(item)">{{ item | actionText }}</div>
          </div>
        </div>
        <div class="pt-5 pb-1 flex justify-end" v-if="total > 0">
          <t-pagination :total="total" :current="currentPage" @page-change="changePage"/>
        </div>
      </div>
      <empty-data :class="['shadow-none']" :show="isLoading === false && records.length === 0"/>
    </div>
  </div>
</template>

<script>
  import LearnTab from "./LearnTab"
  import LearnFilter from "./LearnFilter"
  import EmptyData from "@/components/common/EmptyData"
  import { getRecords, deleteRecords } from "@/api/learnRecord"

  export default {
    name: "my.learn",
    components: {
      LearnTab,
      LearnFilter,
      EmptyData
    },
    data () {
      return {
        records: [],
        filterForm: {},
        currentPage: 1,
        total: 0,
        isLoading: null
      }
    },
    mounted() {
      this.getRecordList()
    },
    filters: {
      labelColor(val) {
        let isExam = [2 ,3].indexOf(parseInt(val)) > -1
        return isExam ? 'from-yellow-400 to-yellow-500' : 'from-teal-400 to-teal-500'
      },
      labelText(val) {
        let isExam = [2 ,3].indexOf(parseInt(val)) > -1
        return isExam ? '试' : '练'
      },
      actionColor(val) {
        let isExam = [2 ,3].indexOf(parseInt(val)) > -1
        return isExam ? 'text-yellow-500' : 'text-teal-500'
      },
      actionText(val) {
        let isExam = [2 ,3].indexOf(parseInt(val)) > -1
        return val.is_end ? '查看解析' : (isExam ? '继续考试' : '继续练习')
      }
    },
    methods: {
      getRecordList() {
        this.isLoading = true
        let params = this.filterForm
        params.page = this.currentPage

        getRecords(this.filterForm)
          .then((res) => {
            this.records = res.data
            this.total = res.meta.total
          })
          .finally(() => {
            this.isLoading = false
          })
      },
      handleSelect(form) {
        this.filterForm = form
        this.getRecordList()
      },
      handleContinue(val) {
        let routerName = 'mode.exercise'
        if(parseInt(val.quiz_mode) === 2) routerName = 'mode.test'
        if([2 ,3].indexOf(parseInt(val.type)) > -1) routerName = 'mode.exam'
        if (val.is_end) routerName = 'quiz.result'

        this.$router.push({name: routerName, params: { id: val.id }})
      },
      changePage(page) {
        this.currentPage = page
        this.getRecordList()
      },
      handleDelete(item) {
        return this.$Dialog.confirm({
          title: '温馨提示',
          content: `确定删除该学习记录？`
        })
        .then(_ => {
          deleteRecords(item.id)
            then(_ => {
              this.$Message.success('删除成功！')
            })
        })
        .catch(_ => {})
      }
    }
  }
</script>
