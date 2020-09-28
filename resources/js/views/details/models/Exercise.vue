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
                <div class="flex justify-center text-base text-teal-500 border border-teal-500 rounded-sm w-20">练习模式</div>
              </div>
            </div>
            <div class="text-base mt-4">
              <label class="flex items-center">
                <input type="checkbox" value="1" v-model="autoNext" class="form-checkbox w-5 h-5 border-2 text-teal-500 focus:shadow-outline-teal">
                <span class="ml-2">做对自动下一题</span>
              </label>
            </div>
          </div>
          <exercise-item v-for="(item, index) in questions" :key="index" v-show="activeIndex === index" :question="item.question" :answer="activeAnswer.answer" :index="index" @answer="handleAnswer"></exercise-item>
          <empty-data class="mt-5" :show="isLoaded && questionsLength === 0"/>
        </div>
        <div class="w-1/3 px-3">
          <div class="bg-white shadow rounded-lg mb-5">
            <div class="px-5 py-3 border-b border-gray-100 text-base text-gray-900 font-semibold">答题卡</div>
            <div class="px-5 py-4 h-36 overflow-auto scrollbar-hover">
              <div class="flex flex-wrap -mx-1 -mb-2" v-if="answerList.length > 0">
                <div class="w-6 h-6 mx-1 mb-2 leading-none flex items-center justify-center border border-gray-200 text-xs rounded-sm cursor-pointer" v-for="(item, index) in answerList" :key="index" :class="[item.answer.length === 0 ? (activeIndex === index ? 'text-gray-500 border-teal-500' : 'text-gray-500 border-gray-100 hover:border-teal-500') : (item.is_right ? 'text-white bg-green-500 border-green-500' : 'text-white bg-red-500 border-red-500') ]" @click="toIndex(index)">{{ index+1 }}</div>
              </div>
              <div class="text-gray-400" v-if="isLoaded && answerList.length === 0">还没有数据哦~</div>
            </div>
            <div class="mt-1 px-8 py-3 flex justify-between border-t border-gray-100">
              <div class="flex items-center text-gray-900">
                <div class="bg-green-500 w-4 h-4 mr-1"></div>
                <div class="leading-none">正确{{ rightCount }}</div>
              </div>
              <div class="flex items-center text-gray-900">
                <div class="bg-red-500 w-4 h-4 mr-1"></div>
                <div class="leading-none">错误{{ errorCount }}</div>
              </div>
              <div class="flex items-center text-gray-900 leading-none">
                <div class="mr-1">正确率</div>
                <div class="text-green-500">{{ rightRate }}</div>
              </div>
            </div>
          </div>
          <div class="bg-white shadow rounded-lg py-3 mb-5">
            <div class="flex justify-center">
              <button type="button" class="px-3 h-8 flex items-center justify-center border border-teal-500 text-teal-500 bg-white rounded focus:outline-none" @click="handleBack">返回章节练习</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="fixed bottom-0 left-0 right-0 px-4">
      <div class="max-w-6xl mx-auto">
        <div class="flex">
          <div class="w-2/3 px-8">
            <div class="flex justify-between py-3 px-10 bg-white rounded-lg shadow-lg mb-5">
              <button type="button" class="inline-flex items-center px-8 py-2 text-white rounded focus:outline-none" :class="[isFirst ? 'bg-gray-400 opacity-50 cursor-not-allowed' : 'bg-teal-500']" @click="prevItem">上一题</button>
              <button type="button" class="inline-flex items-center px-8 py-2 text-white rounded focus:outline-none" :class="[isLast ? 'bg-gray-400 opacity-50 cursor-not-allowed' : 'bg-teal-500']" @click="nextItem">下一题</button>
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
  import ExerciseItem from "@/components/questions/ExerciseItem"
  import { showTestRecords, storeRecordItems } from "@/api/learnRecord"

  export default {
    name: "models.exercise",
    components: {
      Breadcrumb,
      EmptyData,
      ExerciseItem
    },
    data () {
      return {
        recordId: this.$route.params.id,
        record:{},
        questions: [],
        answerList: [],
        activeIndex: 0,
        autoNext: '',
        rightCount: 0,
        errorCount: 0,
        isLoaded: false
      }
    },
    created() {
      this.showTestRecords()
    },
    computed: {
      activeAnswer() {
        return this.answerList[this.activeIndex]
      },
      questionsLength() {
        return this.questions.length
      },
      rightRate() {
        return this.questionsLength > 0 ? Math.round((this.rightCount/this.questionsLength)*100) : 0 + '%'
      },
      isFirst() {
        return this.activeIndex === 0
      },
      isLast() {
        return this.questionsLength === 0 || this.activeIndex === this.questionsLength - 1
      }
    },
    methods: {
      showTestRecords() {
        showTestRecords(this.recordId)
          .then((res) => {
            this.isLoaded = true
            this.record = res
            this.questions = res.questions
            this.answerList = res.questions.map(item => {
              return {
                record_id: this.recordId,
                bank_item_id: item.id,
                question_id: item.question.id,
                answer: []
              }
            })
          })
      },
      toIndex(index) {
        this.activeIndex = index
      },
      prevItem() {
        if (this.activeIndex > 0)  this.activeIndex --
      },
      nextItem() {
        if (this.activeIndex < this.questions.length-1)  this.activeIndex ++
      },
      handleAnswer(answer, isRight, index) {
        console.log(index)
        this.answerList[this.activeIndex] = Object.assign({}, this.answerList[this.activeIndex], {
          answer: answer,
          is_right: isRight
        })

        console.log()

        // 生成答题记录
        storeRecordItems(this.answerList[this.activeIndex])

        if (isRight) {
          !!this.autoNext && this.nextItem()
          this.rightCount ++
        } else {
          this.errorCount ++
        }
      },
      handleBack() {
        this.$Message.info('测试全局消息')
      }
    }
  }
</script>
