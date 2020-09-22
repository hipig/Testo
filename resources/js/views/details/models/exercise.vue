<template>
  <div class="pt-5 pb-20 px-4">
    <div class="max-w-6xl mx-auto">
      <div class="text-sm">
        <a href="/">首页</a>
        <span>/</span>
        <a href="/subjects">会计</a>
        <span>/</span>
        <span class="text-gray-400">初级经济师</span>
      </div>
      <div class="mt-5 flex flex-wrap -mx-3">
        <div class="w-2/3 px-3">
          <div class="bg-white shadow rounded-lg p-5">
            <div class="flex items-center mb-4">
              <div class="text-2xl text-gray-900 leading-none truncate">第一章　市场需求、供给与均衡价格</div>
              <div class="flex-1 ml-3">
                <div class="flex justify-center text-base text-teal-500 border border-teal-500 rounded-sm w-20">刷题练习</div>
              </div>
            </div>
            <div class="text-base">
              <label class="flex items-center">
                <input type="checkbox" value="1" v-model="autoNext" class="form-checkbox w-5 h-5 border-2 text-teal-500 focus:shadow-outline-teal">
                <span class="ml-2">做对自动下一题</span>
              </label>
            </div>
          </div>
          <exercise-item v-for="(item, index) in questions" :key="index" v-show="activeIndex === index" :question="item" :answer="activeAnswer.answer" :index="index" @answer="handleAnswer"></exercise-item>
        </div>
        <div class="w-1/3 px-3">
          <div class="bg-white shadow rounded-lg mb-5">
            <div class="px-5 py-3 border-b border-gray-100 text-base text-gray-900 font-semibold">答题卡</div>
            <div class="px-5 py-4 h-36 overflow-auto scrollbar-hover">
              <div class="flex flex-wrap -mx-1">
                <div class="w-6 h-6 mx-1 mb-2 leading-none flex items-center justify-center border text-xs rounded-sm cursor-pointer" v-for="(item, index) in answerList" :key="index" :class="[item.answer.length === 0 ? (activeIndex === index ? 'text-gray-500 border-teal-500' : 'text-gray-500 border-gray-100 hover:border-teal-500') : (item.isRight ? 'text-white bg-green-500 border-green-500' : 'text-white bg-red-500 border-red-500') ]" @click="toIndex(index)">{{ index+1 }}</div>
              </div>
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
              <button type="button" class="px-3 h-8 flex items-center justify-center border border-teal-500 text-teal-500 bg-white rounded focus:outline-none">返回章节练习</button>
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
  import ExerciseItem from "@/components/questions/ExerciseItem"

  export default {
    name: "models.exercise",
    components: {
      ExerciseItem
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
        questions: [
          {
            id: 1,
            title: '关于社会经济制度的说法，正确的有（）。',
            type: 1,
            answer: 'C',
            options: [
              {
                key: 'A',
                value: 'A、规定保护价格',
              },
              {
                key: 'B',
                value: 'B、调整均衡价格',
              },
              {
                key: 'C',
                value: 'C、规定最高限价',
              },
              {
                key: 'D',
                value: 'D、降低农业生产资料价格',
              }
            ],
            parse: '影响供给的因素主要有：(1)产品价格。在其他条件不变的情况下，某种产品自身的价格和其供给的变动成正方向变化。(2)生产成本。在其他条件不变的情况下，某种产品自身的成本和其供给的变动成反方向变化。(3)生产技术。技术水平在一定程度上决定着生产成本并进而影响供给(4)预期。(5)相关产品的价格。(6)其他因素。包括生产要素的价格以及国家政策等。'
          },
          {
            id: 2,
            title: '关于社会经济制度的说法，正确的有（）。',
            type: 2,
            answer: ['A', 'B'],
            options: [
              {
                key: 'A',
                value: 'A、社会经济制度是一定时期占统治地位的社会生产关系的总和',
              },
              {
                key: 'B',
                value: 'B、社会经济制度规定着社会的政治制度、法律制度和人们的意识形态',
              },
              {
                key: 'C',
                value: 'C、社会经济制度变革的根本原因是各阶级的政治斗争',
              },
              {
                key: 'D',
                value: 'D、社会经济制度是区分人类历史上不同社会形态的根本标志',
              },
              {
                key: 'E',
                value: 'E、社会经济制度变革的一般规律是生产力随着生产关系的发展而改变自身的性质',
              }
            ],
            parse: '社会基本矛盾的运动是社会经济制度变革的根本原因，所以C项错误。社会经济制度变革的一般规律是生产关系随着生产力的发展而改变自身的性质，所以E项错误。'
          },
          {
            id: 3,
            title: '中国澳门的区旗图包括五星、月亮、大桥和海，区花是莲花。（）',
            type: 3,
            answer: 'B',
            options: [
              {
                key: 'A',
                value: 'A、正确',
              },
              {
                key: 'B',
                value: 'B、错误',
              }
            ],
            parse: ''
          },
          {
            id: 4,
            title: '商务旅游者向来被航空公司和高档饭店看重，请简述原因。',
            type: 5,
            answer: '',
            options: [],
            parse: '商务旅游者向来被航空公司和高档饭店看重，原因'
          }
        ],
        answerList: [],
        activeIndex: 0,
        autoNext: '',
        rightCount: 0,
        errorCount: 0
      }
    },
    created() {
      this.answerList = this.questions.map(item => {
        return {
          id: item.id,
          answer: []
        }
      })
    },
    computed: {
      activeQuestion() {
        return this.questions[this.activeIndex]
      },
      activeAnswer() {
        return this.answerList[this.activeIndex]
      },
      rightRate() {
        return Math.round((this.rightCount/this.questions.length)*100) + '%'
      },
      isFirst() {
        return this.activeIndex === 0
      },
      isLast() {
        return this.activeIndex === this.questions.length - 1
      }
    },
    methods: {
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
        this.answerList[index] = Object.assign({}, this.answerList[index], {
          answer: answer,
          isRight: isRight
        })
        if (isRight) {
          !!this.autoNext && this.nextItem()
          this.rightCount ++
        } else {
          this.errorCount ++
        }
      }
    }
  }
</script>
