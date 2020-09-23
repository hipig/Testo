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
            <div class="flex items-center">
              <div class="text-2xl text-gray-900 leading-none truncate">第一章　市场需求、供给与均衡价格</div>
              <div class="flex-1 ml-3">
                <div class="flex justify-center text-base text-teal-500 border border-teal-500 rounded-sm w-20">考试模式</div>
              </div>
            </div>
          </div>
          <exam-item :id="'q-'+index" v-for="(item, index) in questions" :key="index" :question="item" :answer="answerList[index].answer" :index="index" @answer="handleAnswer"></exam-item>
        </div>
        <div class="w-1/3 px-3 relative">
          <div class="sticky top-1">
            <div class="bg-white shadow rounded-lg mb-5">
              <div class="px-5 py-3 border-b border-gray-100 text-base text-gray-900 font-semibold">答题卡</div>
              <div class="px-5 py-4 h-36 overflow-auto scrollbar-hover">
                <div class="flex flex-wrap -mx-1">
                  <div class="w-6 h-6 mx-1 mb-2 leading-none flex items-center justify-center border border-gray-200 text-xs rounded-sm cursor-pointer" v-for="(item, index) in answerList" :key="index" :class="[item.answer.length === 0 ? 'text-gray-500 border-gray-100 hover:border-teal-500' : 'text-white bg-gray-400 border-gray-400' ]" @click="toIndex('q-'+index)">{{ index+1 }}</div>
                </div>
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
                    <span class="text-teal-500 text-base ml-1"><timing :is-pause="isPause"/></span>
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
              <div class="flex justify-center py-3">
                <button type="button" class="w-36 h-8 flex items-center justify-center border border-teal-500 bg-teal-500 text-white rounded-sm focus:outline-none">交卷</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
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
import ExamItem from "@/components/questions/ExamItem"
import Timing from "@/components/common/Timing"
import TModal from "@/components/common/modal/Modal"

export default {
  name: "models.test",
  components: {
    ExamItem,
    Timing,
    TModal
  },
  data () {
    return {
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
          title: '收入弹性的大小，可以作为划分——、——和——的标准。',
          type: 4,
          answer: ['高档品', '必需品', '低档物品'],
          options: [],
          parse: ''
        },
        {
          id: 5,
          title: '商务旅游者向来被航空公司和高档饭店看重，请简述原因。',
          type: 5,
          answer: '',
          options: [],
          parse: '商务旅游者向来被航空公司和高档饭店看重，原因'
        }
      ],
      answerList: [],
      doneCount: 0,
      isPause: false,
      pauseModalVisible: false
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
    undoneCount() {
      return this.answerList.length - this.doneCount
    }
  },
  watch: {
    isPause(val) {
      this.pauseModalVisible = val
    }
  },
  methods: {
    toIndex(index) {
      this.$nextTick(() => {
        document.getElementById(index).scrollIntoView({ behavior: "smooth" })
      })
    },
    handleAnswer(answer, isRight, index) {
      this.answerList[index] = Object.assign({}, this.answerList[index], {
        answer: answer,
        isRight: isRight
      })
      this.doneCount = this.answerList.filter(item => {
        return item.answer.length !== 0
      }).length
    }
  }
}
</script>
