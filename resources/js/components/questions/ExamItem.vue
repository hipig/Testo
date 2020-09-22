<template>
  <div class="bg-white shadow rounded-lg px-10 py-5 mt-5">
    <div class="flex items-center justify-between mb-5">
      <div class="flex items-start">
        <div class="text-gray-400 text-2xl font-semibold">{{ indexText }}</div>
        <div class="text-teal-500 text-lg ml-3">[{{ questionTypes[question.type] }}]</div>
      </div>
      <question-tool></question-tool>
    </div>
    <div class="text-gray-900 text-lg mb-5">{{ question.title }}</div>
    <template v-if="question.type === 1 || question.type === 3">
      <div class="flex flex-col mb-3">
        <div class="mb-2 text-base" v-for="(item, index) in question.options" :key="index">
          <label class="inline-flex items-center">
            <input type="radio" :value="item.key" v-model="currentAnswer" class="form-radio w-5 h-5 border-2 text-teal-500 focus:shadow-outline-teal" @change="submit">
            <span class="ml-3">{{ item.value }}</span>
          </label>
        </div>
      </div>
    </template>
    <template v-if="question.type === 2">
      <div class="flex flex-col mb-3">
        <div class="mb-2 text-base" v-for="(item, index) in question.options" :key="index">
          <label class="inline-flex items-center">
            <input type="checkbox" :value="item.key" v-model="currentAnswer" class="form-checkbox w-5 h-5 border-2 text-teal-500 focus:shadow-outline-teal">
            <span class="ml-3">{{ item.value }}</span>
          </label>
        </div>
      </div>
    </template>
    <template v-if="question.type === 4">
      <div class="flex flex-col mb-3">
        <label class="flex w-full mb-2" v-for="(v,i) in question.answer">
          <input v-model="currentAnswer[i]" class="w-full px-4 py-3 bg-gray-100 rounded focus:outline-none" placeholder="请输入答案"/>
        </label>
      </div>
    </template>
    <template v-if="question.type === 5">
      <div class="mb-2">
        <label class="flex w-full">
          <textarea v-model="currentAnswer" class="h-24 w-full px-4 py-3 bg-gray-100 rounded resize-none focus:outline-none" placeholder="请输入答案"></textarea>
        </label>
      </div>
      <div class="mb-5 text-gray-400">此类型的题目暂不支持判断对错，你可以点击下方查看答案解析</div>
    </template>
    <div class="mb-5" v-if="question.type === 2 || question.type === 4 || question.type === 5">
      <button type="button" class="inline-flex items-center py-2 px-8 border border-teal-500 text-teal-500 rounded bg-white focus:outline-none" @click="submit">确认</button>
    </div>
  </div>
</template>

<script>
  import QuestionTool from "./QuestionTool"
  import QuestionType from "@/mixins/QuestionType"

  export default {
    name: "ExamItem",
    components: {
      QuestionTool
    },
    props: {
      index: {
        type: Number,
        default: 0
      },
      question: Object,
      answer: {
        type: String | Number | Array,
        default: []
      },
      showFeedback: {
        type: Boolean,
        default: true
      },
      showRemark: {
        type: Boolean,
        default: true
      },
      showCollect: {
        type: Boolean,
        default: true
      }
    },
    mixins: [QuestionType],
    data () {
      return {
        currentAnswer: this.answer,
      }
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
        let status = true
        let questionType = this.question.type
        let rightAnswer = this.question.answer
        let answer = this.currentAnswer

        switch (questionType) {
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
            rightAnswer.forEach((v, i) => {
              if (answer[i] != v) {
                status = false
              }
            })
            break
          default:
            status = true
        }

        return status
      }
    },
    methods: {
      // 提交答案
      submit() {
        if (!this.checkAnswer()) return false
        // 添加答题记录

        this.$emit('answer', this.currentAnswer, this.isRight, this.index, this.question)
      },
      // 校验答案
      checkAnswer() {
        let questionType = this.question.type
        let answer = this.currentAnswer
        switch (questionType) {
          case 2:
            if (answer.length === 0) {
              alert('至少选择一个选项')
              return false
            }
            break
          case 4:
            if (answer.length === 0) {
              alert('内容不能为空')
              return false
            }
            break
          case 5:
            if (answer.length === 0) {
              alert('内容不能为空')
              return false
            }
            break
        }
        return true
      }
    }
  }
</script>
