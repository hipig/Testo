<template>
  <div class="bg-white shadow rounded-lg">
    <learn-tab active="exam"/>
    <div class="p-5">
      <learn-filter @on-select="handleSelect"/>
      <div v-loading="isLoading" loading-custom-class="h-56">
        <div class="pt-5 pb-4 border-b border-gray-100" v-for="(item, index) in records" :key="index">
          <div class="flex items-center justify-between text-gray-500 text-xs leading-none mb-2">
            <div class="flex items-center">
              <div class="mr-8" :class="[item.type === 2 ? 'text-yellow-500' : 'text-green-500']">{{ item.type === 2 ? '模拟考试' : '历年真题' }}</div>
              <div class="mr-10">{{ item.created_at }}</div>
              <div class="border border-red-500 text-red-500 leading-tight px-2 rounded" v-if="item.is_end">{{ item.score }} 分</div>
            </div>
            <div class="cursor-pointer" @click="handleDelete">删除</div>
          </div>
          <div class="text-base mb-2 truncate">{{ item.bank_title }}</div>
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <div class="text-gray-900 w-40 mr-2 truncate flex items-center">
                <span class="text-xs">{{ item.subject_title }}</span>
              </div>
              <div class="text-gray-400"><span class="text-teal-500 text-base">{{ item.done_count }}</span>/{{ item.total_count }}</div>
            </div>
            <div class="cursor-pointer font-semibold text-yellow-500" @click="handleContinue(item)">{{ item | actionText }}</div>
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
    name: "my.exam",
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
      actionText(val) {
        return val.is_end ? '查看解析' : '继续考试'
      }
    },
    methods: {
      getRecordList() {
        this.isLoading = true
        let params = this.filterForm
        params.type = [2, 3]
        params.page = this.currentPage

        getRecords(params)
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
        let routerName = 'mode.exam'
        if (val.is_end) routerName = 'quiz.result'

        this.$router.push({name: routerName, params: { id: val.id }})
      },
      changePage(page) {
        this.currentPage = page
        this.getRecordList()
      },
      handleDelete() {
        return this.$Dialog.confirm({
          title: '温馨提示',
          content: `确定删除该考试记录？`
        })
        .then(_ => {
          deleteRecords(item.id)
            .then(_ => {
              this.$Message.success('删除成功！')
            })
        })
        .catch(_ => {})
      }
    }
  }
</script>
