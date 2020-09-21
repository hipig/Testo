<template>
  <div class="bg-white shadow rounded-lg px-10 py-5 mt-5">
    <div class="flex items-center justify-between mb-5">
      <div class="flex items-start">
        <div class="text-gray-400 text-2xl font-semibold">{{ index+1 }}</div>
        <div class="text-teal-500 text-lg ml-3">[{{ types[question.type] }}]</div>
      </div>
      <div class="flex flex-wrap">
        <div class="flex items-center cursor-pointer mr-8">
          <svg class="w-6 h-6 stroke-current text-gray-400 mr-1" fill="none" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
          </svg>
          <span class="text-base text-gray-900">纠错</span>
        </div>
        <div class="flex items-center cursor-pointer mr-8">
          <svg class="w-6 h-6 stroke-current text-gray-400 mr-1" fill="none" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
          </svg>
          <span class="text-base text-gray-900">写笔记</span>
        </div>
        <div class="flex items-center cursor-pointer">
          <svg class="w-6 h-6 stroke-current text-gray-400 mr-1" fill="none" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path>
          </svg>
          <span class="text-base text-gray-900">收藏</span>
        </div>
      </div>
    </div>
    <div class="text-gray-900 text-lg mb-5">{{ question.title }}</div>
    <template v-if="question.type === 1">
      <div class="flex flex-col mb-3">
        <div class="mb-2 text-base" v-for="(item, index) in question.options" :key="index">
          <label class="inline-flex items-center cursor-pointer">
            <input type="radio" :value="item.key" v-model="answer" class="form-radio w-5 h-5 border-2 text-teal-500 focus:shadow-outline-teal" :disabled="isAnswered || (!isAnswered && showAnswer)" @change="submit">
            <span class="ml-3">{{ item.value }}</span>
          </label>
        </div>
      </div>
    </template>
    <template v-if="question.type === 2">
      <div class="flex flex-col mb-3">
        <div class="mb-2 text-base" v-for="(item, index) in question.options" :key="index">
          <label class="inline-flex items-center cursor-pointer">
            <input type="checkbox" :value="item.key" v-model="answer" class="form-checkbox w-5 h-5 border-2 text-teal-500 focus:shadow-outline-teal" :disabled="showAnswer">
            <span class="ml-3">{{ item.value }}</span>
          </label>
        </div>
      </div>
      <div class="mb-5">
        <button type="button" class="inline-flex items-center py-2 px-8 border border-teal-500 text-teal-500 rounded bg-white focus:outline-none" @click="submit">确认</button>
      </div>
    </template>
    <template v-if="question.type === 4">
      <div class="flex flex-col mb-3">
        <label class="flex w-full mb-2" v-for="(v,i) in question.answer">
          <input v-model="answer[i]" class="w-full px-4 py-3 bg-gray-100 rounded resize-none focus:outline-none" placeholder="请输入答案"/>
        </label>
      </div>
      <div class="mb-5">
        <button type="button" class="inline-flex items-center py-2 px-8 border border-teal-500 text-teal-500 rounded bg-white focus:outline-none" @click="submit">确认</button>
      </div>
    </template>
    <template v-if="question.type === 5">
      <div class="mb-5">
        <label class="flex w-full">
          <textarea v-model="answer" class="h-24 w-full px-4 py-3 bg-gray-100 rounded resize-none focus:outline-none" placeholder="请输入答案"></textarea>
        </label>
      </div>
      <div class="mb-5">
        <button type="button" class="inline-flex items-center py-2 px-8 border border-teal-500 text-teal-500 rounded bg-white focus:outline-none" @click="submit">确认</button>
      </div>
    </template>

    <div class="mb-3">
      <div class="flex items-center cursor-pointer py-1 mb-2" @click="showAnswer = !showAnswer" v-if="!isExam && !isAnswered">
        <svg class="w-5 h-5 stroke-current text-gray-400 mr-1" fill="none" viewBox="0 0 24 24" v-if="showAnswer">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"></path>
        </svg>
        <svg class="w-5 h-5 stroke-current text-gray-400 mr-1" fill="none" viewBox="0 0 24 24" v-else>
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 21h7a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v11m0 5l4.879-4.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242z"></path>
        </svg>
        <span class="text-gray-900 leading-none">{{ showAnswer ? '隐藏答案' : '查看答案' }}</span>
      </div>
      <div v-show="showAnswer">
        <div class="py-2 px-5 bg-gray-200 flex leading-tight rounded" :class="[question.type === 4 ? 'flex-col' : 'flex-wrap items-center']" v-if="showAnswerBar">
          <div class="mr-10 py-1" :class="isRight ? 'text-green-500' : 'text-red-500'" v-if="isAnswered">{{ isRight ? '回答正确': '回答错误' }}</div>
          <div class="mr-10 py-1 flex items-baseline">
            <span>正确答案：</span>
            <span class="flex-1 text-green-500 text-base font-semibold">{{ rightAnswerText }}</span>
          </div>
          <div class="mr-10 py-1 flex items-baseline" v-if="isAnswered && !isRight">
            <span>你的答案：</span>
            <span class="flex-1 text-base font-semibold">{{ answerText }}</span>
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
  export default {
    name: "QuestionItem",
    props: {
      index: {
        type: Number,
        default: 0
      },
      question: Object,
      isExam: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        types: {
          1: '单选题',
          2: '多选题',
          3: '判断题',
          4: '填空题',
          5: '问答题'
        },
        answer: [],
        showAnswer: false,
        isAnswered: false
      }
    },
    computed: {
      rightAnswerText() {
        let answer = this.question.answer
        return typeof answer === "object" ? answer.join(',') : answer
      },
      answerText() {
        let answer = this.answer
        return typeof answer === "object" ? answer.join(',') : answer
      },
      isRight() {
        let status = true
        let questionType = this.question.type
        let rightAnswer = this.question.answer
        let answer = this.answer

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
      },
      showAnswerBar() {
        let type = this.question.type
        return type !== 5
      }
    },
    methods: {
      // 提交答案
      submit() {
        if (this.isAnswered) return false
        if (this.showAnswer) return false
        if (!this.checkAnswer()) return false

        this.isAnswered = true
        this.showAnswer = true

        this.$emit('answer', this.index, this.answer, this.isRight, this.question)
      },
      // 校验答案
      checkAnswer() {
        let questionType = this.question.type
        let answer = this.answer
        switch (questionType) {
          case 2:
            if (answer.length === 0) {
              alert('至少选择一个选项')
              return false
            }
            break
          case 4:
            console.log(answer)
            if (answer.length === 0) {
              alert('所有的填空不能为空')
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

<style scoped>

</style>
