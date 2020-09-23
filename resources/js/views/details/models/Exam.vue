<template>
  <div class="pt-5 pb-20 px-4">
    <div class="max-w-6xl mx-auto">
      <div class="text-sm">
        <a href="/">首页</a>
        <span>/</span>
        <a href="/subjects">一级造价工程师</a>
        <span>/</span>
        <span class="text-gray-400">建设工程计价</span>
      </div>
      <div class="mt-5 flex flex-wrap -mx-3">
        <div class="w-2/3 px-3">
          <div class="bg-white shadow rounded-lg p-5">
            <div class="flex items-center">
              <div class="text-2xl text-gray-900 leading-none truncate">{{ bank.title }}</div>
              <div class="flex-1 ml-3">
                <div class="flex justify-center text-base text-teal-500 border border-teal-500 rounded-sm w-20">模拟考试</div>
              </div>
            </div>
            <div class="mt-4 flex flex-warp items-center text-gray-400">
              <div class="mr-10">本卷共{{ bank.list.length }}{{ bank.isGroup ? '大题' : '小题' }}</div>
              <div class="mr-10">总分：{{ bank.score }}分</div>
              <div class="mr-10">时间：{{ bank.minutes }}分钟</div>
            </div>
          </div>
          <div class="mt-8" v-for="(item, index) in bank.list" :key="index" v-if="bank.isGroup">
            <div class="text-base font-semibold">{{ item.title }}</div>
            <exam-item :id="'q-'+index+'-'+i" v-for="(v, i) in item.questions" :key="i" :question="v" :answer="answerList[index+'-'+i].answer" :index="[index, i]" :show-report="false" :show-remark="false" @answer="handleAnswer"></exam-item>
          </div>
          <exam-item v-else :id="'q-'+index" v-for="(item, index) in bank.list" :key="index" :question="item" :answer="answerList[index].answer" :index="index" @answer="handleAnswer"></exam-item>
        </div>
        <div class="w-1/3 px-3 relative">
          <div class="sticky top-1">
            <div class="bg-white shadow rounded-lg mb-5">
              <div class="px-5 py-3 border-b border-gray-100 text-base text-gray-900 font-semibold">答题卡</div>
              <div class="px-5 py-4">
                <div class="mb-4" v-for="(item, index) in bank.list" :key="index" v-if="bank.isGroup">
                  <div class="mb-2 text-gray-900 flex items-center leading-none"><span class="font-semibold text-base">{{ questionTypes[item.type].name }}</span><span class="text-gray-400">{{ '（共'+item.total+'题，每题'+item.score+'分）' }}</span> </div>
                  <div class="flex flex-wrap -mx-1">
                    <div class="w-6 h-6 mx-1 mb-2 leading-none flex items-center justify-center border border-gray-200 text-xs rounded-sm cursor-pointer" v-for="(v, i) in item.questions" :key="i" :xx="answerList[index+'-'+i]" :class="[(answerList[index+'-'+i] && answerList[index+'-'+i].answer.length === 0) ? 'text-gray-500 border-gray-100 hover:border-teal-500' : 'text-white bg-gray-400 border-gray-400' ]" @click="toIndex('q-'+index+'-'+i)">{{ i+1 }}</div>
                  </div>
                </div>
                <div class="flex flex-wrap -mx-1" v-else>
                  <div class="w-6 h-6 mx-1 mb-2 leading-none flex items-center justify-center border border-gray-200 text-xs rounded-sm cursor-pointer" v-for="(item, index) in bank.list" :key="index" :class="[(answerList[index] && answerList[index].answer.length !== 0) ? 'text-gray-500 border-gray-100 hover:border-teal-500' : 'text-white bg-gray-400 border-gray-400' ]" @click="toIndex('q-'+index)">{{ index+1 }}</div>
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
                    <span class="text-teal-500 text-base ml-1"><timing :minute="bank.minutes" :is-pause="isPause"/></span>
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
                  <button type="button" class="w-full h-8 flex items-center justify-center border border-teal-500 bg-teal-500 text-white rounded-sm focus:outline-none">交卷</button>
                </div>
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
import QuestionType from "@/mixins/QuestionType"
import TModal from "@/components/common/modal/Modal"

export default {
  name: "models.exam",
  components: {
    ExamItem,
    Timing,
    TModal
  },
  mixins: [QuestionType],
  data () {
    return {
      bank: {
        id: 1,
        title: '2016年一级造价工程师《建设工程计价》真题及答案',
        type: 3,
        score: 100,
        minutes: 180,
        isGroup: true,
        list: [
          {
            id: 100,
            title: '一、单项选择(本类题共3题,每小题1分,共3分。每小题的备选项中，只有一个符合题意，多选，错选,不选均不得分)',
            type:1,
            total: 3,
            score: 1,
            questions: [
              {
                id: 1,
                title: '某企业向银行借款500万元，利率为5.4%，银行要求10%的补偿性余额，则该借款的实际利率是( )。',
                type: 1,
                answer: 'C',
                options: [
                  {
                    key: 'A',
                    value: 'A、6%',
                  },
                  {
                    key: 'B',
                    value: 'B、5.4%',
                  },
                  {
                    key: 'C',
                    value: 'C、4.86%',
                  },
                  {
                    key: 'D',
                    value: 'D、4.91%',
                  }
                ],
                parse: ''
              },
              {
                id: 2,
                title: '某ST公司在2018年3月5日宣布其发行的公司债券本期利息总额为8980元将无法于原定付息日2018年3月9日全额支付，仅能够支付500万元，则该公司债务的投资者面临的风险是( )。',
                type: 1,
                answer: 'B',
                options: [
                  {
                    key: 'A',
                    value: 'A、价格风险',
                  },
                  {
                    key: 'B',
                    value: 'B、购买力风险',
                  },
                  {
                    key: 'C',
                    value: 'C、变现风险',
                  },
                  {
                    key: 'D',
                    value: 'D、违约风险',
                  }
                ],
                parse: ''
              },
              {
                id: 3,
                title: '与企业价值化财务管理目标相比，股东财富化目标的局限性是( )。',
                type: 1,
                answer: 'B',
                options: [
                  {
                    key: 'A',
                    value: 'A、固定成本',
                  },
                  {
                    key: 'B',
                    value: 'B、制造成本',
                  },
                  {
                    key: 'C',
                    value: 'C、全部成本',
                  },
                  {
                    key: 'D',
                    value: 'D、变动成本',
                  }
                ],
                parse: ''
              }
            ],
          },
          {
            id: 101,
            title: '二、多项选择题(本类题共2题,每小题2分,共4分。每小题的备选项中，有两个或两个以上符合题意，多选,少选，错选,不选均不得分)',
            type: 2,
            total: 2,
            score: 2,
            questions: [
              {
                id: 10,
                title: '下列指标中适用于对利润中心进行业绩考评的有( )。',
                type: 2,
                answer: ['A', 'B'],
                options: [
                  {
                    key: 'A',
                    value: 'A、投资报酬率',
                  },
                  {
                    key: 'B',
                    value: 'B、部门边际贡献',
                  },
                  {
                    key: 'C',
                    value: 'C、剩余收益',
                  },
                  {
                    key: 'D',
                    value: 'D、可控边际贡献',
                  }
                ],
                parse: ''
              },
              {
                id: 11,
                title: '下列风险中，属于非系统风险的有( )。',
                type: 2,
                answer: ['A', 'B', 'C'],
                options: [
                  {
                    key: 'A',
                    value: 'A、经营风险',
                  },
                  {
                    key: 'B',
                    value: 'B、利率风险',
                  },
                  {
                    key: 'C',
                    value: 'C、政治风险',
                  },
                  {
                    key: 'D',
                    value: 'D、财务风险',
                  }
                ],
                parse: ''
              }
            ]
          },
          {
            id: 102,
            title: '三、判断题(本类题共2题,每小题1分,共2分。每小题答对的1分，错误不得分)',
            type: 3,
            total: 2,
            score: 1,
            questions: [
              {
                id: 14,
                title: '根据量本利分析基本原理，保本点越高企业经营越安全。( )',
                type: 3,
                answer: 'A',
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
                id: 15,
                title: '净资产收益率是一个综合性比较强的财务分析指标，是杜邦财务分析体系的起点。( )',
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
              }
            ]
          }
        ]
      },
      answerList: {},
      doneCount: 0,
      isPause: false,
      pauseModalVisible: false
    }
  },
  created() {
    this.initAnswerList()
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
    initAnswerList() {
      let answerList = {}
      let bank = this.bank
      bank.list.forEach((item, index) => {
        if (bank.isGroup) {
          item.questions.forEach((v, i) => {
            let key = index+'-'+i
            answerList[key] = {
              bank_id: bank.id,
              group_id: item.id,
              answer: v.recordAnswer ? v.recordAnswer.answer : [],
              question_id: v.id
            }
          })
        } else {
          answerList[index] = {
            bank_id: bank.id,
            answer: v.recordAnswer ? v.recordAnswer.answer : [],
            question_id: v.id
          }
        }
      })
      this.answerList = answerList
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
    }
  }
}
</script>
