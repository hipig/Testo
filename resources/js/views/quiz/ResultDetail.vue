<template>
  <div class="pt-5 pb-20 px-4">
    <div class="max-w-6xl mx-auto">
      <breadcrumb :list="record.breadcrumb"/>
      <div class="mt-5 flex flex-wrap -mx-3">
        <div class="w-2/3 px-3">
          <div class="bg-white shadow rounded-lg p-5 mb-5">
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
          <div v-loading="isLoading" loading-custom-class="h-56">
            <template v-if="record.is_group">
              <div class="mt-8" v-for="(item, index) in recordItems" :key="index">
                <div class="text-base font-semibold mb-3">{{ `${questionTypes[item.item_type].name}（${item.title}）` }}</div>
                <exam-item :id="'q-'+index+'-'+i" v-for="(v, i) in item.items" :key="i" :item="v" :answer="answerList[index+'-'+i].answer" :index="[index, i]" :show-parse="true"></exam-item>
              </div>
            </template>
            <exam-item v-else :id="'q-'+index" v-for="(item, index) in recordItems" :key="index" :item="item" :answer="answerList[index].answer" :index="index" :show-parse="true"></exam-item>
          </div>
          <empty-data class="mt-5" :show="isLoading === false && recordItems.length === 0"/>
        </div>
        <div class="w-1/3 px-3 relative">
          <div class="sticky top-1">
            <div class="bg-white shadow rounded-lg mb-5">
              <div class="px-5 py-3 border-b border-gray-100 text-base text-gray-900 font-semibold">答题卡</div>
              <div class="px-5 py-4">
                <template v-if="record.is_group">
                  <div class="mb-4" v-for="(item, index) in recordItems" :key="index">
                    <div class="mb-2 text-gray-900 flex items-center leading-none"><span class="font-semibold text-base">{{ questionTypes[item.item_type].name }}</span><span class="text-gray-400">{{ '（共'+item.item_count+'题，每题'+item.item_score+'分）' }}</span> </div>
                    <div class="flex flex-wrap -mx-1">
                      <div class="w-6 h-6 mx-1 mb-2 leading-none flex items-center justify-center border text-xs rounded-sm cursor-pointer" v-for="(_, i) in item.items" :key="i" :class="[(answerList[index+'-'+i] && answerList[index+'-'+i].answer.length === 0) ? 'text-gray-500 border-gray-100 hover:border-teal-500' : ((answerList[index+'-'+i] && answerList[index+'-'+i].is_right) ? 'text-white bg-green-500 border-green-500' : 'text-white bg-red-500 border-red-500')]" @click="toIndex('q-'+index+'-'+i)">{{ i+1 }}</div>
                    </div>
                  </div>
                </template>
                <div class="flex flex-wrap -mx-1" v-else>
                  <div class="w-6 h-6 mx-1 mb-2 leading-none flex items-center justify-center border text-xs rounded-sm cursor-pointer" v-for="(_, index) in recordItems" :key="index" :class="[(answerList[index] && answerList[index].answer.length === 0) ? 'text-gray-500 border-gray-100 hover:border-teal-500' : ((answerList[index] && answerList[index].is_right) ? 'text-white bg-green-500 border-green-500' : 'text-white bg-red-500 border-red-500')]" @click="toIndex('q-'+index)">{{ index+1 }}</div>
                </div>
                <div class="text-gray-400" v-if="isLoading === false  && Object.keys(answerList).length === 0">还没有数据哦~</div>
              </div>
              <div class="mt-1 px-8 py-3 flex justify-between border-t border-gray-100">
                <div class="flex items-center text-gray-900">
                  <div class="bg-green-500 w-4 h-4 mr-1"></div>
                  <div class="leading-none">正确 {{ rightCount }}</div>
                </div>
                <div class="flex items-center text-gray-900">
                  <div class="bg-red-500 w-4 h-4 mr-1"></div>
                  <div class="leading-none">错误 {{ errorCount }}</div>
                </div>
                <div class="flex items-center text-gray-900">
                  <div class="leading-none">未做 {{ undoneCount }}</div>
                </div>
              </div>
            </div>
            <div class="bg-white shadow rounded-lg py-3 mb-5">
              <div class="flex justify-center">
                <button type="button" class="px-4 h-8 flex items-center justify-center border border-teal-500 text-teal-500 bg-white rounded focus:outline-none" @click="handleBack">返回学习记录</button>
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
  import { showRecordsResult } from "@/api/learnRecord"

  export default {
    name: "quiz.result.detail",
    components: {
      Breadcrumb,
      EmptyData,
      ExamItem
    },
    mixins: [QuestionType],
    data () {
      return {
        recordId: this.$route.params.id,
        record:{},
        recordItems: [],
        answerList: [],
        rightCount: 0,
        errorCount: 0,
        undoneCount: 0,
        isLoading: null
      }
    },
    mounted() {
      this.showRecordsResult()
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

            let answerList = {}
            this.recordItems.forEach((item, index) => {
              if (res.is_group) {
                item.items.forEach((v, i) => {
                  answerList[index+'-'+i] = {
                    bank_item_id: v.id,
                    question_id: v.question.id,
                    question_type: v.question.type,
                    answer: (v.record && v.record.answer) || "",
                    is_right: v.record && v.record.is_right
                  }
                })
              } else {
                answerList[index] = {
                  bank_item_id: item.id,
                  question_id: item.question.id,
                  question_type: item.question.type,
                  answer: (item.record && item.record.answer) || "",
                  is_right: item.record && item.record.is_right
                }
              }
            })
            this.answerList = answerList
            this.rightCount = Object.values(answerList).filter(item => {
              return item.is_right
            }).length
            this.errorCount = Object.values(answerList).filter(item => {
              return item.is_right === false
            }).length
            this.undoneCount = Object.values(answerList).filter(item => {
              return item.answer.length === 0 || item.is_right === null
            }).length
          })
          .finally(() => {
            this.isLoading = false
          })
      },
      toIndex(index) {
        this.$nextTick(() => {
          document.getElementById(index).scrollIntoView({ behavior: "smooth" })
        })
      },
      handleBack() {
        this.$router.push({name: 'my.learn'})
      }
    }
  }
</script>
