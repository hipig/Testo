<template>
  <div class="bg-white shadow rounded-lg px-10 py-5 mb-5">
    <div class="flex items-center justify-between mb-5">
      <div class="flex items-start">
        <div class="text-gray-400 text-2xl font-semibold">{{ indexText }}</div>
        <div class="text-teal-500 text-lg ml-3">[{{ questionTypes[question.type].name }}]</div>
      </div>
      <question-tool
        :is-collect="isCollect"
        :extra-data="toolForm"
      />
    </div>
    <div class="text-gray-900 text-lg mb-5">{{ question.title }}</div>
    <template v-if="question.type === 1 || question.type === 3">
      <div class="flex flex-col mb-3">
        <div class="mb-2 text-base" v-for="(item, index) in question.option" :key="index">
          <label class="inline-flex items-center" :class="[showAnswer ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer']">
            <input type="radio" :value="index" v-model="currentAnswer" class="form-radio w-5 h-5 border-2" :class="[isAnswered ? (isRight ? 'text-green-500 focus:shadow-outline-green' : 'text-red-500 focus:shadow-outline-red') : 'text-teal-500 focus:shadow-outline-teal']" :disabled="showAnswer" @change="submit">
            <span class="ml-3">{{ item }}</span>
          </label>
        </div>
      </div>
    </template>
    <template v-if="question.type === 2">
      <div class="flex flex-col mb-3">
        <div class="mb-2 text-base" v-for="(item, index) in question.option" :key="index">
          <label class="inline-flex items-center" :class="[showAnswer ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer']">
            <input type="checkbox" :value="index" v-model="currentAnswer" class="form-checkbox w-5 h-5 border-2" :class="[isAnswered ? (isRight ? 'text-green-500 focus:shadow-outline-green' : 'text-red-500 focus:shadow-outline-red') : 'text-teal-500 focus:shadow-outline-teal']" :disabled="showAnswer">
            <span class="ml-3">{{ item }}</span>
          </label>
        </div>
      </div>
    </template>
    <template v-if="question.type === 4">
      <div class="flex flex-col mb-3">
        <label class="flex w-full mb-2" v-for="(_,i) in question.answer" :key="i">
          <input v-model="fillBlackAnswer[i]" class="w-full px-4 py-3 rounded focus:outline-none" :class="[isAnswered ? (isRight ? 'text-green-500 bg-green-100' : 'text-red-500 bg-red-100') : 'bg-gray-100']" placeholder="请输入答案" :disabled="showAnswer">
        </label>
      </div>
    </template>
    <template v-if="question.type === 5">
      <div class="mb-2">
        <label class="flex w-full">
          <textarea v-model="currentAnswer" class="h-24 w-full px-4 py-3 bg-gray-100 rounded resize-none focus:outline-none" placeholder="请输入答案" :disabled="showAnswer"></textarea>
        </label>
      </div>
      <div class="mb-5 text-gray-400">此类型的题目暂不支持判断对错，你可以点击下方查看答案解析</div>
    </template>
    <div class="mb-5" v-if="question.type === 2 || question.type === 4 || question.type === 5">
      <button type="button" class="inline-flex items-center py-2 px-8 border border-teal-500 text-teal-500 rounded bg-white focus:outline-none" :class="[showAnswer && 'opacity-50 cursor-not-allowed']" :disabled="showAnswer" @click="submit">确认</button>
    </div>

    <div class="mb-3">
      <div class="flex items-center cursor-pointer py-1 mb-2" @click="showAnswer = !showAnswer" v-if="!isAnswered">
        <svg class="w-5 h-5 stroke-current text-gray-400 mr-1" fill="none" viewBox="0 0 24 24" v-if="showAnswer">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"></path>
        </svg>
        <svg class="w-5 h-5 stroke-current text-gray-400 mr-1" fill="none" viewBox="0 0 24 24" v-else>
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 21h7a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v11m0 5l4.879-4.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242z"></path>
        </svg>
        <span class="text-gray-900 leading-none">{{ showAnswer ? '隐藏答案' : '查看答案' }}</span>
      </div>
      <div v-show="showAnswer">
        <div class="py-2 px-5 bg-gray-100 flex leading-tight rounded" :class="[question.type === 4 ? 'flex-col' : 'flex-wrap items-center']" v-if="showAnswerBar">
          <div class="mr-10 py-1" :class="isRight ? 'text-green-500' : 'text-red-500'" v-if="isAnswered">{{ isRight ? '回答正确': '回答错误' }}</div>
          <div class="mr-10 py-1 flex" :class="[question.type === 4 ? 'items-baseline' : 'items-center']">
            <span class="text-gray-500">正确答案：</span>
            <span class="flex-1 text-green-500 text-base font-semibold leading-tight">{{ rightAnswerText }}</span>
          </div>
          <div class="mr-10 py-1 flex" :class="[question.type === 4 ? 'items-baseline' : 'items-center']" v-if="isAnswered && !isRight">
            <span class="text-gray-500">你的答案：</span>
            <span class="flex-1 text-base font-semibold leading-tight">{{ answerText }}</span>
          </div>
        </div>
        <div class="px-5 mt-5">
          <div class="flex flex-wrap items-baseline">
            <div class="text-gray-400">解析：</div>
            <div class="flex-1 text-base">
              {{ question.parse }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import QuestionTool from "./QuestionTool"
  import QuestionType from "@/mixins/QuestionType"

  export default {
    name: "ExerciseItem",
    components: {
      QuestionTool
    },
    props: {
      index: {
        type: Number,
        default: 0
      },
      item: Object,
      answer: {
        type: String | Number | Array,
        default: []
      },
      bankItemId: Number
    },
    mixins: [QuestionType],
    data () {
      return {
        question: this.item.question,
        currentAnswer: this.answer || [],
        fillBlackAnswer: this.answer || [],
        showAnswer: false,
        isAnswered: false,
        isCollect: this.item.is_collect || false,
        toolForm: {
          subject_id: this.item.subject_id,
          bank_item_id: this.item.id,
          question_id: this.item.question.id,
          question_type: this.item.question.type
        }
      }
    },
    created() {
      if (this.answer.length !== 0) this.isAnswered = true
    },
    computed: {
      indexText() {
        let index = this.index+1
       return index > 9 ? index : '0' + index
      },
      rightAnswerText() {
        let answer = this.question.answer
        return typeof answer === "object" ? answer.join(',') : answer
      },
      answerText() {
        let answer = this.currentAnswer
        return typeof answer === "object" ? answer.join(',') : answer
      },
      isRight() {
        return this.checkRight(this.currentAnswer, this.question.answer, this.question.type)
      },
      showAnswerBar() {
        let type = this.question.type
        return type !== 5
      }
    },
    watch: {
      isAnswered(val) {
        this.showAnswer = val
      },
      fillBlackAnswer(val) {
        this.currentAnswer = val
      }
    },
    methods: {
      // 提交答案
      submit() {
        if (this.showAnswer) return false
        if (!this.checkAnswer()) return false

        this.isAnswered = true
        this.$emit('answer', this.currentAnswer, this.isRight, this.index, this.question)
      },
      // 校验答案
      checkAnswer() {
        let questionType = this.question.type
        let answer = this.currentAnswer
        switch (questionType) {
          case 2:
            if (answer.length === 0) {
              this.$Message.error('至少选择一个选项。')
              return false
            }
            break
          case 4:
            if (answer.length === 0) {
              this.$Message.error('内容不能为空。')
              return false
            }
            break
          case 5:
            if (answer.length === 0) {
              this.$Message.error('内容不能为空。')
              return false
            }
            break
        }
        return true
      },
      checkRight(answer, rightAnswer, type) {
        let status = false
        switch (type) {
          // 单选 判断
          case 1:
          case 3:
            status = answer == rightAnswer
            break
          // 多选
          case 2:
            status = JSON.stringify(answer.sort()) == JSON.stringify(rightAnswer.sort())
            break
          // 填空
          case 4:
            status = true
            rightAnswer.forEach((v, i) => {
              if (answer[i] != v) {
                status = false
              }
            })
            break
          case 5:
            status = answer.length > 0
            break
        }

        return status
      }
    }
  }
</script>
