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
                <div class="flex justify-center text-base text-teal-500 border border-teal-500 rounded-sm w-20">{{ parseInt(record.type) === 4 ? '每日一练' : '练习模式' }}</div>
              </div>
            </div>
            <div class="text-base mt-4">
              <label class="flex items-center">
                <input type="checkbox" value="1" v-model="autoNext" class="form-checkbox w-5 h-5 border-2 text-teal-500 focus:shadow-outline-teal">
                <span class="ml-2">做对自动下一题</span>
              </label>
            </div>
          </div>
          <div v-loading="isLoading" loading-custom-class="h-56">
            <template v-for="(item, index) in questions">
              <exercise-item :key="index" v-if="activeIndex === index" :item="item" :answer="activeAnswer.answer" :index="index" @answer="handleAnswer"></exercise-item>
            </template>
          </div>
          <empty-data class="mt-5" :show="isLoading === false && questionsLength === 0"/>
        </div>
        <div class="w-1/3 px-3">
          <div class="bg-white shadow rounded-lg mb-5">
            <div class="px-5 py-3 border-b border-gray-100 text-base text-gray-900 font-semibold">答题卡</div>
            <div class="px-5 py-4 h-36 overflow-auto scrollbar-hover">
              <div class="flex flex-wrap -mx-1 -mb-2" v-if="answerList.length > 0">
                <div class="w-6 h-6 mx-1 mb-2 leading-none flex items-center justify-center border border-gray-200 text-xs rounded-sm cursor-pointer" v-for="(item, index) in answerList" :key="index" :item-data="item.answer" :class="[item.answer.length === 0 ? (activeIndex === index ? 'text-gray-500 border-teal-500' : 'text-gray-500 border-gray-100 hover:border-teal-500') : (item.is_right ? 'text-white bg-green-500 border-green-500' : 'text-white bg-red-500 border-red-500') ]" @click="toIndex(index)">{{ index+1 }}</div>
              </div>
              <div class="text-gray-400" v-if="isLoading === false && answerList.length === 0">还没有数据哦~</div>
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
                <div class="leading-none">正确率 <span class="text-green-500">{{ rightRate }}</span></div>
              </div>
            </div>
          </div>
          <div class="bg-white shadow rounded-lg">
            <div class="flex justify-center py-3 px-5 -mx-2">
              <div class="w-1/2 px-2">
                <button type="button" class="w-full h-8 flex items-center justify-center border border-teal-500 text-teal-500 rounded focus:outline-none" @click="handleBack">返回章节练习</button>
              </div>
              <div class="w-1/2 px-2" v-if="submitActionShow">
                <button type="button" class="w-full h-8 flex items-center justify-center border border-teal-500 bg-teal-500 text-white rounded focus:outline-none" @click="submitModalVisible = true">交卷</button>
              </div>
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
    <t-modal v-model="submitModalVisible" title="结束作答" size="max-w-md" :mask-closable="false" @close="submitModalVisible = false">
      <div class="flex flex-col">
        <div class="text-gray-900 text-lg flex justify-center mb-5">你已全部作答完毕，是否确认交卷？</div>
      </div>
      <div slot="footer">
        <div class="flex flex-wrap items-center px-5 -mx-5">
          <div class="w-1/2 px-5 flex justify-center">
            <button type="button" class="inline-flex items-center justify-center w-28 py-1 text-base leading-tight border bg-white rounded focus:outline-none" @click="submitModalVisible = false">取消</button>
          </div>
          <div class="w-1/2 px-5 flex justify-center">
            <button type="button" class="inline-flex items-center justify-center w-28 py-1 text-base leading-tight border border-teal-500 bg-teal-500 text-white rounded focus:outline-none" @click="submitRecord">交卷</button>
          </div>
        </div>
      </div>
    </t-modal>
  </div>
</template>

<script>
  import Breadcrumb from "@/components/common/Breadcrumb"
  import EmptyData from "@/components/common/EmptyData"
  import ExerciseItem from "@/components/questions/ExerciseItem"
  import TModal from "@/components/common/modal/Modal"
  import { showRecords, storeRecordItems, updateRecords } from "@/api/learnRecord"

  export default {
    name: "quiz.mode.exercise",
    components: {
      Breadcrumb,
      EmptyData,
      ExerciseItem,
      TModal
    },
    data () {
      return {
        recordId: this.$route.params.id,
        bankType: this.$route.query.type || 'chapter',
        record:{},
        questions: [],
        answerList: [],
        activeIndex: 0,
        autoNext: '',
        rightCount: 0,
        errorCount: 0,
        doneCount: 0,
        isLoading: null,
        submitModalVisible: false,
        submitActionShow: false,
        timer: null,
        doneTime: 0
      }
    },
    mounted() {
      this.showRecords()
      this.timer = setInterval(() => {
        this.doneTime ++
      }, 1000)
    },
    computed: {
      activeAnswer() {
        return this.answerList[this.activeIndex]
      },
      questionsLength() {
        return this.questions.length
      },
      undoneCount() {
        return this.answerList.length - this.doneCount
      },
      rightRate() {
        return (this.questionsLength > 0 ? Math.round((this.rightCount/this.questionsLength)*100) : 0) + '%'
      },
      isFirst() {
        return this.activeIndex === 0
      },
      isLast() {
        return this.questionsLength === 0 || this.activeIndex === this.questionsLength - 1
      }
    },
    methods: {
      showRecords() {
        this.isLoading = true
        showRecords(this.recordId, {bank_type: this.bankType})
          .then((res) => {
            this.record = res
            this.questions = res.items
            this.answerList = res.items.map(item => {
              return {
                record_id: this.recordId,
                bank_id: res.bank_id,
                bank_item_id: item.id,
                question_id: item.question.id,
                question_type: item.question.type,
                answer: (item.record && item.record.answer) || "",
                is_right: item.record && item.record.is_right
              }
            })
            this.rightCount = this.answerList.filter(item => {
              return item.is_right
            }).length
            this.errorCount = this.answerList.filter(item => {
              return item.is_right === false
            }).length
            this.doneCount = this.answerList.filter(item => {
              return item.answer.length !== 0
            }).length

            if (this.undoneCount === 0) this.submitActionShow = true
          })
          .finally(() => {
            this.isLoading = false
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
      handleAnswer(answer, isRight) {
        this.answerList[this.activeIndex] = Object.assign({}, this.answerList[this.activeIndex], {
          answer: answer,
          is_right: isRight
        })
        // 生成答题记录
        storeRecordItems(this.recordId, this.answerList[this.activeIndex])

        if (isRight) {
          !!this.autoNext && this.nextItem()
          this.rightCount ++
        } else {
          this.errorCount ++
        }

        this.doneCount = this.answerList.filter(item => {
          return item.answer.length !== 0
        }).length

        if (this.undoneCount === 0) {
          this.submitActionShow = true
          this.submitModalVisible = true
        }
      },
      submitRecord() {
        let params = {
          done_time: this.doneTime,
          type: 'end',
          items: []
        }
        updateRecords(this.recordId, params)
          .then((res) => {
            this.submitModalVisible = false
            this.$router.push({name: 'quiz.result', params: {id: this.recordId}})
          })
      },
      handleBack() {
        this.$router.go(-1)
      }
    }
  }
</script>
