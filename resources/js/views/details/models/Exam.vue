<template>
  <div class="pt-5 pb-20 px-4">
    <div class="max-w-6xl mx-auto">
      <breadcrumb :list="record.breadcrumb"/>
      <div class="mt-5 flex flex-wrap -mx-3">
        <div class="w-2/3 px-3">
          <div class="bg-white shadow rounded-lg p-5">
            <div class="flex items-center">
              <div class="text-2xl text-gray-900 leading-none truncate">{{ record.bank_title }}</div>
              <div class="flex-1 ml-3">
                <div class="flex justify-center text-base text-teal-500 border border-teal-500 rounded-sm w-20">模拟考试</div>
              </div>
            </div>
            <div class="mt-4 flex flex-warp items-center text-gray-400">
              <div class="mr-10">本卷共{{ recordItems.length }}{{ record.is_group ? '大题' : '小题' }}</div>
              <div class="mr-10">总分：{{ record.score }}分</div>
              <div class="mr-10">时间：{{ record.time_limit }}分钟</div>
            </div>
          </div>
          <template v-if="record.is_group">
            <div class="mt-8" v-for="(item, index) in recordItems" :key="index">
              <div class="text-base font-semibold">{{ item.title }}</div>
              <exam-item :id="'q-'+index+'-'+i" v-for="(v, i) in item.items" :key="i" :question="v.question" :answer="answerList[index+'-'+i].answer" :index="[index, i]" :show-report="false" :show-remark="false" @answer="handleAnswer"></exam-item>
            </div>
          </template>
          <exam-item v-else :id="'q-'+index" v-for="(item, index) in recordItems" :key="index" :question="item.question" :answer="answerList[index].answer" :index="index" :show-report="false" :show-remark="false" @answer="handleAnswer"></exam-item>
          <empty-data class="mt-5" :show="isLoaded && recordItems.length === 0"/>
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
                      <div class="w-6 h-6 mx-1 mb-2 leading-none flex items-center justify-center border border-gray-200 text-xs rounded-sm cursor-pointer" v-for="(v, i) in item.items" :key="i" :class="[(answerList[index+'-'+i] && answerList[index+'-'+i].answer.length === 0) ? 'text-gray-500 border-gray-100 hover:border-teal-500' : 'text-white bg-gray-400 border-gray-400' ]" @click="toIndex('q-'+index+'-'+i)">{{ i+1 }}</div>
                    </div>
                  </div>
                </template>
                <div class="flex flex-wrap -mx-1" v-else>
                  <div class="w-6 h-6 mx-1 mb-2 leading-none flex items-center justify-center border border-gray-200 text-xs rounded-sm cursor-pointer" v-for="(item, index) in recordItems" :key="index" :class="[(answerList[index] && answerList[index].answer.length === 0) ? 'text-gray-500 border-gray-100 hover:border-teal-500' : 'text-white bg-gray-400 border-gray-400' ]" @click="toIndex('q-'+index)">{{ index+1 }}</div>
                </div>
                <div class="text-gray-400" v-if="isLoaded && Object.keys(answerList).length === 0">还没有数据哦~</div>
              </div>
              <div class="mt-1 px-20 py-3 flex justify-between border-t border-gray-100">
                <div class="flex items-center text-gray-900">
                  <div class="bg-gray-400 border border-gray-400 w-4 h-4 mr-1"></div>
                  <div class="leading-none">已做{{ doneCount }}</div>
                </div>
                <div class="flex items-center text-gray-900">
                  <div class="bg-white border border-gray-200 w-4 h-4 mr-1"></div>
                  <div class="leading-none">未做{{ undoneCount }}</div>
                </div>
              </div>
            </div>
            <div class="bg-white shadow rounded-lg mb-5">
              <div class="border-b border-gray-100 flex leading-none">
                <div class="w-2/3 flex items-center">
                  <div class="w-full flex items-center py-2 px-4 border-r border-gray-100">
                    <svg class="w-6 h-6 stroke-current text-gray-400" fill="none" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <span class="text-teal-500 text-base ml-1"><timing :second="record.time_limit * 60" :is-pause="isPause" @timer="getDoneTime"/></span>
                  </div>
                </div>
                <div class="w-1/3 flex items-center py-2 px-4">
                  <div class="cursor-pointer flex items-center" @click="isPause = true">
                    <svg class="w-6 h-6 stroke-current text-gray-400" fill="none" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <span class="text-gray-900 ml-1">暂停</span>
                  </div>
                </div>
              </div>
              <div class="flex justify-center py-3 px-5 -mx-2">
                <div class="w-1/2 px-2">
                  <button type="button" class="w-full h-8 flex items-center justify-center border border-teal-500 text-teal-500 rounded-sm focus:outline-none">下次继续</button>
                </div>
                <div class="w-1/2 px-2">
                  <button type="button" class="w-full h-8 flex items-center justify-center border border-teal-500 bg-teal-500 text-white rounded-sm focus:outline-none" @click="submitModalVisible = true">交卷</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <t-modal v-model="submitModalVisible" title="结束作答" size="md" :mask-closable="false" @close="submitModalVisible = false">
      <div class="flex flex-col">
        <div class="text-gray-900 text-lg flex justify-center mb-5"><span v-if="undoneCount > 0">你还有 <span class="text-red-500">{{ undoneCount }}</span> 道题未作答，</span>是否确认交卷？</div>
      </div>
      <div slot="footer">
        <div class="flex flex-wrap items-center px-5 -mx-5">
          <div class="w-1/2 px-5 flex justify-center">
            <button type="button" class="inline-flex items-center justify-center w-28 py-1 text-base leading-tight border bg-white rounded focus:outline-none" @click="submitModalVisible = false">继续做题</button>
          </div>
          <div class="w-1/2 px-5 flex justify-center">
            <button type="button" class="inline-flex items-center justify-center w-28 py-1 text-base leading-tight border border-teal-500 bg-teal-500 text-white rounded focus:outline-none"@click="submitRecord">交卷</button>
          </div>
        </div>
      </div>
    </t-modal>
    <t-modal v-model="pauseModalVisible" size="md" :show-close="false" :show-footer="false" :mask-closable="false">
      <div class="flex flex-col items-center justify-center py-10">
        <div class="cursor-pointer" @click="isPause = false">
          <svg class="stroke-current text-gray-500" fill="none" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <div class="mt-2">点击继续</div>
        </div>
      </div>
    </t-modal>
  </div>
</template>

<script>
  import Breadcrumb from "@/components/common/Breadcrumb"
  import EmptyData from "@/components/common/EmptyData"
  import ExamItem from "@/components/questions/ExamItem"
  import Timing from "@/components/common/Timing"
  import QuestionType from "@/mixins/QuestionType"
  import TModal from "@/components/common/modal/Modal"
  import { showExamRecords, updateRecords } from "@/api/learnRecord"

  export default {
    name: "models.exam",
    components: {
      Breadcrumb,
      EmptyData,
      ExamItem,
      Timing,
      TModal
    },
    mixins: [QuestionType],
    data () {
      return {
        recordId: this.$route.params.id,
        record:{},
        recordItems: [],
        answerList: [],
        doneCount: 0,
        isPause: false,
        isLoaded: false,
        pauseModalVisible: false,
        submitModalVisible: false,
        doneTime: 0
      }
    },
    created() {
      this.showExamRecords()
    },
    computed: {
      undoneCount() {
        return Object.keys(this.answerList).length - this.doneCount
      }
    },
    watch: {
      isPause(val) {
        this.pauseModalVisible = val
      }
    },
    methods: {
      showExamRecords() {
        showExamRecords(this.recordId)
          .then((res) => {
            this.isLoaded = true
            this.record = res
            this.recordItems = res.items

            let answerList = {}
            this.recordItems.forEach((item, index) => {
              if (res.is_group) {
                item.items.forEach((v, i) => {
                  let key = index+'-'+i
                  answerList[key] = {
                    record_id: this.recordId,
                    bank_item_id: v.id,
                    question_id: v.question.id,
                    answer: []
                  }
                })
              } else {
                answerList[index] = {
                  record_id: this.recordId,
                  bank_item_id: item.id,
                  question_id: item.question.id,
                  answer: []
                }
              }
            })
            this.answerList = answerList
          })
      },
      toIndex(index) {
        this.$nextTick(() => {
          document.getElementById(index).scrollIntoView({ behavior: "smooth" })
        })
      },
      handleAnswer(answer, isRight, index) {
        index = typeof index === "object" ? index.join('-') : index
        this.answerList[index] = Object.assign({}, this.answerList[index], {
          answer: answer,
          isRight: isRight
        })
        this.doneCount = Object.values(this.answerList).filter(item => {
          return item.answer.length !== 0
        }).length
      },
      getDoneTime(second) {
        this.doneTime = second
      },
      submitRecord() {
        updateRecords(this.recordId, {done_time: this.doneTime})
          .then((res) => {
            this.submitModalVisible = false
            this.$Message.success('交卷成功！')
          })
      }
    }
  }
</script>
