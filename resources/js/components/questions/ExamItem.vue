<template>
  <div class="bg-white shadow rounded-lg px-10 py-5 mt-5">
    <div class="flex items-center justify-between mb-5">
      <div class="flex items-start">
        <div class="text-gray-400 text-2xl font-semibold">{{ indexText }}</div>
        <div class="text-teal-500 text-lg ml-3">[{{ questionTypes[question.type].name }}]</div>
      </div>
      <question-tool :show-report="showReport" :show-remark="showRemark" :show-collect="showCollect"></question-tool>
    </div>
    <div class="text-gray-900 text-lg mb-5">{{ question.title }}</div>
    <template v-if="question.type === 1 || question.type === 3">
      <div class="flex flex-col mb-3">
        <div class="mb-2 text-base" v-for="(item, index) in question.option" :key="index">
          <label class="inline-flex items-center">
            <input type="radio" :value="index" v-model="currentAnswer" class="form-radio w-5 h-5 border-2 text-teal-500 focus:shadow-outline-teal" @change="submit">
            <span class="ml-3">{{ item }}</span>
          </label>
        </div>
      </div>
    </template>
    <template v-if="question.type === 2">
      <div class="flex flex-col mb-3">
        <div class="mb-2 text-base" v-for="(item, index) in question.option" :key="index">
          <label class="inline-flex items-center">
            <input type="checkbox" :value="index" v-model="currentAnswer" class="form-checkbox w-5 h-5 border-2 text-teal-500 focus:shadow-outline-teal" @change="submit">
            <span class="ml-3">{{ item }}</span>
          </label>
        </div>
      </div>
    </template>
    <template v-if="question.type === 4">
      <div class="flex flex-col mb-3">
        <label class="flex w-full mb-2" v-for="(v,i) in question.answer">
          <input v-model="fillBlackAnswer[i]" class="w-full px-4 py-3 bg-gray-100 rounded focus:outline-none" placeholder="请输入答案" @change="submit"/>
        </label>
      </div>
    </template>
    <template v-if="question.type === 5">
      <div class="mb-2">
        <label class="flex w-full">
          <textarea v-model="currentAnswer" class="h-24 w-full px-4 py-3 bg-gray-100 rounded resize-none focus:outline-none" placeholder="请输入答案" @input="submit"></textarea>
        </label>
      </div>
      <div class="mb-5 text-gray-400">主观题仅提供作答，默认得分，不计入错题集，建议收藏。</div>
    </template>
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
        type: Number | Array,
        default: 0
      },
      question: Object,
      answer: {
        type: String | Number | Array,
        default: []
      },
      showReport: {
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
        currentAnswer: [],
        fillBlackAnswer: [],
      }
    },
    computed: {
      indexText() {
        let index = this.index
        index = parseInt((typeof index === "object" ? index.slice(-1) : index)) + 1
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
    watch: {
      fillBlackAnswer(val) {
        this.currentAnswer = val
      }
    },
    methods: {
      // 提交答案
      submit() {
        this.$emit('answer', this.currentAnswer, this.isRight, this.index, this.question)
      }
    }
  }
</script>
