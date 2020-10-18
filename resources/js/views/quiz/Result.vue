<template>
  <div class="pt-5 pb-20 px-4">
    <div class="max-w-6xl mx-auto">
      <breadcrumb :list="record.breadcrumb"/>
      <div class="mt-5 flex flex-wrap -mx-3">
        <div class="w-2/3 px-3">
          <div class="bg-white shadow rounded-lg p-5 mb-6">
            <div class="flex items-center">
              <div class="text-2xl text-gray-900 leading-none truncate">{{ record.bank_title }}</div>
              <div class="flex-1 ml-3">
                <div class="flex justify-center text-base text-teal-500 border border-teal-500 rounded-sm w-20">{{ record | formatModeName }}</div>
              </div>
            </div>
            <div class="mt-4 flex flex-warp items-center text-gray-400" v-if="[2, 3].indexOf(parseInt(record.type)) > -1">
              <div class="mr-10">{{ `本卷共${recordItems.length}${record.is_group ? '大' : '小'}题` }}</div>
              <div class="mr-10">{{ `总分：${record.score || 0}分` }}</div>
              <div class="mr-10">{{ `时间：${record.time_limit || 0}分钟` }}</div>
            </div>
          </div>
          <div class="bg-white shadow rounded-lg">
            <div class="h-40 flex flex-col items-center justify-center rounded-tl-lg rounded-tr-lg bg-gradient-to-r from-teal-400 via-teal-500 to-teal-400 text-white mb-3">
              <div class="mb-3"><span class="text-5xl">{{ record.result_score }}</span> 分</div>
              <div class="mb-1 text-xs">总分：<span class="text-sm">{{ totalScore }} 分</span></div>
              <div class="text-xs">{{ doneTimeText }}</div>
            </div>
            <div class="flex flex-col items-center justify-center">
              <table class="border-b border-gray-100" v-loading="isLoading" loading-custom-class="h-56">
                <thead>
                  <tr>
                    <th class="w-24 text-left text-gray-400 font-normal py-3">题型</th>
                    <th class="w-24 text-gray-400 font-normal py-3">数量</th>
                    <th class="w-24 text-gray-400 font-normal py-3">正确</th>
                    <th class="w-24 text-gray-400 font-normal py-3">错误</th>
                    <th class="w-24 text-gray-400 font-normal py-3">得分</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in recordResult" :key="index">
                    <td class="text-gray-900 font-semibold py-2">{{ questionTypes[item.type].name }}</td>
                    <td class="text-center text-base text-gray-900 font-semibold py-2">{{ item.total }}</td>
                    <td class="text-center text-base text-green-500 font-semibold py-2">{{ item.right }}</td>
                    <td class="text-center text-base text-red-500 font-semibold py-2">{{ item.error }}</td>
                    <td class="text-center py-2">{{ item.score }}</td>
                  </tr>
                </tbody>
              </table>
              <div class="text-gray-400 text-xs py-2">主观题无法判断对错，按正确计分</div>
              <div class="pt-8 pb-12">
                <button type="button" class="inline-flex justify-center py-3 w-64 leading-tight rounded text-white bg-gradient-to-r from-teal-400 to-teal-500 focus:outline-none" @click="toDetail">查看解析</button>
              </div>
            </div>
          </div>
        </div>
        <div class="w-1/3 px-3">

        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Breadcrumb from "@/components/common/Breadcrumb"
  import QuestionType from "@/mixins/QuestionType"
  import { showRecordsResult } from "@/api/learnRecord"

  export default {
    name: "quiz.result",
    components: {
      Breadcrumb
    },
    mixins: [QuestionType],
    data () {
      return {
        recordId: this.$route.params.id,
        record:{},
        recordItems: {},
        recordResult: {},
        totalScore: 0,
        doneTimeText: '00:00:00',
        isLoading: null
      }
    },
    mounted() {
      this.showRecordsResult()
    },
    watch: {
      record(val) {
        let time = val.done_time

        let hour = this.formatTime(Math.floor(time / 3600))
        let minutes = this.formatTime(Math.floor(time % 3600 / 60))
        let seconds = this.formatTime(Math.floor(time % 60))

        this.doneTimeText = hour + ':' + minutes + ':' + seconds
      }
    },
    filters: {
      formatModeName(val) {
        let name
        switch (parseInt(val.type)) {
          case 1:
            name = parseInt(val.quiz_mode) === 1 ? '练习模式' : '考试模式'
            break
          case 2:
            name = '模拟考试'
            break
          case 3:
            name = '历年真题'
            break
          case 4:
            name = '每日一练'
            break
        }

        return name
      }
    },
    methods: {
      showRecordsResult() {
        this.isLoading = true
        showRecordsResult(this.recordId)
          .then((res) => {
            this.record = res
            this.recordItems = res.items
            this.recordResult = res.result

            let score = 0
            this.recordItems.forEach((v, k) => {
              score += v.score
            })
            this.totalScore = [1, 4].indexOf(parseInt(res.type)) > -1 ? score : res.score
          })
          .finally(() => {
            this.isLoading = false
          })
      },
      formatTime(time) {
        if (time < 10)  time = '0' + time
        return time
      },
      toDetail() {
        this.$router.push({name: 'quiz.result.detail', params: {id: this.recordId}})
      }
    }
  }
</script>
