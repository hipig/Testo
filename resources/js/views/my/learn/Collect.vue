<template>
  <div class="bg-white shadow rounded-lg">
    <learn-tab active="collect"/>
    <div class="p-5">
      <learn-filter :show-question-type-select="true" @on-select="handleSelect"/>
      <div v-loading="isLoading" loading-custom-class="h-56">
        <div class="pt-5 pb-4 border-b border-gray-100" v-for="(item, index) in collects" :key="index">
          <div class="flex items-center justify-between text-gray-500 text-xs leading-none mb-2">
            <div class="flex items-center">
              <div>{{ item.created_at }}</div>
            </div>
            <div class="cursor-pointer" @click="handleCancelCollect(item)">取消收藏</div>
          </div>
          <div class="flex items-baseline text-base mb-2">
            <div class="text-teal-500 w-16">{{ `[${questionTypes[item.question_type].name}]` }}</div>
            <div class="flex-1">{{ item.question_title }}</div>
          </div>
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <div class="text-gray-400 text-xs mr-2 truncate flex items-center">
                来源：<span class="text-gray-900">{{ item.subject_title }}</span>
              </div>
            </div>
            <div class="cursor-pointer font-semibold text-teal-500" @click="handleContinue(item)">查看详情</div>
          </div>
        </div>
        <div class="pt-5 pb-1 flex justify-end" v-if="total > 0">
          <t-pagination :total="total" :current="currentPage" @page-change="changePage"/>
        </div>
      </div>
      <empty-data :class="['shadow-none']" :show="isLoading === false && collects.length === 0"/>
    </div>
  </div>
</template>

<script>
import LearnTab from "./LearnTab"
import LearnFilter from "./LearnFilter"
import QuestionType from "@/mixins/QuestionType"
import EmptyData from "@/components/common/EmptyData"
import { getUserCollects, destroyUserCollects } from "@/api/userCollect"

export default {
  name: "my.exam",
  components: {
    LearnTab,
    LearnFilter,
    EmptyData
  },
  mixins: [QuestionType],
  data () {
    return {
      collects: [],
      filterForm: {},
      currentPage: 1,
      total: 0,
      isLoading: null
    }
  },
  mounted() {
    this.getUserCollects()
  },
  methods: {
    getUserCollects() {
      this.isLoading = true
      let params = this.filterForm
      params.page = this.currentPage

      getUserCollects(params)
        .then((res) => {
          this.collects = res.data
          this.total = res.meta.total
        })
        .finally(() => {
          this.isLoading = false
        })
    },
    handleSelect(form) {
      this.filterForm = form
      this.getUserCollects()
    },
    handleContinue(val) {
      this.$router.push({name: 'home'})
    },
    changePage(page) {
      this.currentPage = page
      this.getUserCollects()
    },
    handleCancelCollect(item) {
      return this.$Dialog.confirm({
        title: '温馨提示',
        content: `确认取消收藏？`
      })
      .then(_ => {
        destroyUserCollects(item.id)
          .then(_ => {
            this.$Message.success('取消收藏成功')
            this.getUserCollects()
          })
      })
      .catch(_ => {})
    }
  }
}
</script>
