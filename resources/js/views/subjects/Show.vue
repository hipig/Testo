<template>
  <div class="py-5 px-4">
    <div class="max-w-6xl mx-auto">
      <div class="text-sm">
        <a href="/">首页</a>
        <span>/</span>
        <a href="/subjects">会计</a>
        <span>/</span>
        <span class="text-gray-400">初级经济师</span>
      </div>
      <div class="mt-2 shadow rounded-lg w-full bg-white overflow-hidden w-full block relative px-5">
        <div class="my-5 flex justify-between items-center">
          <div class="flex items-center">
            <div class="flex items-center mr-5">
              <svg class="w-8 h-8 stroke-current text-teal-500 mr-2" fill="none" viewBox="0 0 24 24">
                <path d="M12 14l9-5-9-5-9 5 9 5z"></path>
                <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"></path>
              </svg>
              <h3 class="text-xl">初级经济师</h3>
            </div>
            <button type="button" class="border border-teal-200 text-teal-500 rounded-full px-2 flex items-center text-xs focus:outline-none" @click="switchSubject">
              <span class="mr-1">切换考试</span>
              <svg class="w-4 h-4 stroke-current -mr-1" fill="none" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
          </div>
          <div class="flex">
            <a href="#" class="flex items-center text-teal-500">
              <svg class="w-5 h-5 fill-current" fill="none" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"></path>
              </svg>
              <span class="ml-1">题目收藏</span>
            </a>
            <a href="#" class="ml-10 flex items-center text-teal-500">
              <svg class="w-5 h-5 fill-current" fill="none" viewBox="0 0 20 20">
                <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z"></path>
              </svg>
              <span class="ml-1">错题练习</span>
            </a>
          </div>
        </div>
        <div class="flex">
          <div class="mr-5 text-gray-400 h-8 flex items-center">专业科目</div>
          <div class="flex-1 flex flex-wrap">
            <a href="#" v-for="(value, key) in subSubjects.special" :key="key" class="flex items-center h-8 px-5 mr-2 mb-5 rounded-full" :class="{'text-white bg-teal-500': key === 0}">{{ value.name }}</a>
          </div>
        </div>
        <div class="flex justify-center">
          <div class="flex flex-wrap">
            <div v-for="(item, index) in tabs" :key="index" class="flex items-center h-16 mr-24 text-lg cursor-pointer border-b-2 border-transparent" :class="{'text-teal-500 border-teal-500 tab-active': activeTab === item.key}" @click="switchTab(item.key)">{{ item.value }}</div>
          </div>
        </div>
      </div>
      <div class="mt-5">
        <chapter-list :list="chapterTests" v-if="activeTab === 'chapter'"></chapter-list>
        <exam-list :list="mockExams" v-if="activeTab === 'mock'"></exam-list>
        <exam-list :list="oldExams" v-if="activeTab === 'old'"></exam-list>
        <daily-list :list="dailyTests" v-if="activeTab === 'daily'"></daily-list>
      </div>
    </div>
    <t-modal  v-model="switchSubjectVisible" title="切换考试" size="4xl" :showFooter="false" @on-cancel="closeSwitchSubjectModal">
      <div class="w-full">
        <div class="mb-5" v-for="(value, key) in subjects" :key="key">
          <h3 class="text-gray-400 mb-2">{{ value.name }}</h3>
          <div class="flex flex-wrap -mx-3">
            <div class="w-1/4 px-3" v-for="(v, k) in value.childrens" :key="k">
              <a href="#" class="bg-gray-100 flex items-center justify-center py-2 mb-3 rounded text-base">{{ v.name }}</a>
            </div>
          </div>
        </div>
      </div>
    </t-modal>
  </div>
</template>

<script>
  import ChapterList from "./tabs/ChapterList"
  import ExamList from "./tabs/ExamList"
  import DailyList from "./tabs/DailyList"
  import TModal from "@/components/common/modal/Modal"

  export default {
    name: "subjects.show",
    components: {
      ChapterList,
      ExamList,
      DailyList,
      TModal
    },
    data () {
      return {
        subjects: [
          {
            id: 1,
            name: '会计',
            childrens: [
              {
                id: 2,
                name: '初级经济师'
              },
              {
                id: 3,
                name: '中级经济师'
              },
              {
                id: 4,
                name: '初级会计师'
              },
              {
                id: 5,
                name: '中级会计师'
              },
              {
                id: 6,
                name: '初级统计师'
              },
              {
                id: 7,
                name: '中级统计师'
              },
              {
                id: 8,
                name: '注册会计师CPA'
              }
            ]
          },
          {
            id: 9,
            name: '金融',
            childrens: [
              {
                id: 10,
                name: '银行'
              },
              {
                id: 11,
                name: '证券'
              },
              {
                id: 12,
                name: '期货'
              },
              {
                id: 13,
                name: '基金'
              }
            ]
          }
        ],
        subSubjects: {
          special: [
            {
              id: 100,
              name: '初级经济基础知识',
            },
            {
              id: 101,
              name: '初级财政税收',
            },
            {
              id: 102,
              name: '初级金融',
            },
            {
              id: 103,
              name: '初级人力资源',
            },
            {
              id: 104,
              name: '初级工商管理',
            },
            {
              id: 105,
              name: '初级建筑经济',
            },
          ]
        },
        tabs: [
          {
            value: '章节练习',
            key: 'chapter'
          },
          {
            value: '模拟考试',
            key: 'mock'
          },
          {
            value: '历年真题',
            key: 'old'
          },
          {
            value: '每日一练',
            key: 'daily'
          }
        ],
        activeTab: 'chapter',
        chapterTests: [
          {
            id: 1,
            title: '第一章 社会经济制度',
            learned_num: 0,
            total: 58,
            children: [
              {
                id: 2,
                title: '第一节 物质资料生产和基本经济规律',
                learned_num: 0,
                total: 22,
              },
              {
                id: 3,
                title: '第二节 社会经济制度的变革和演化',
                learned_num: 0,
                total: 11,
              },
              {
                id: 4,
                title: '第三节 自然经济与商品经济',
                learned_num: 0,
                total: 5,
              },
              {
                id: 5,
                title: '第四节 市场与市场体系',
                learned_num: 0,
                total: 7,
              },
              {
                id: 6,
                title: '第五节 商品经济与市场经济',
                learned_num: 0,
                total: 4,
              },
              {
                id: 7,
                title: '第六节 资源配置方式与经济体制',
                learned_num: 0,
                total: 9,
              }
            ]
          },
          {
            id: 10,
            title: '第二章 我国土地基本制度',
            learned_num: 0,
            total: 78,
            children: [
              {
                id: 11,
                title: '第一节　土地所有制',
                learned_num: 0,
                total: 10,
              },
              {
                id: 12,
                title: '第二节　土地征收征用制度',
                learned_num: 0,
                total: 8,
              },
              {
                id: 13,
                title: '第三节　土地管理制度',
                learned_num: 0,
                total: 33,
              },
              {
                id: 14,
                title: '第四节　国有建设用地使用制度',
                learned_num: 0,
                total: 17,
              },
              {
                id: 15,
                title: '第五节　集体土地使用制度',
                learned_num: 0,
                total: 10,
              }
            ]
          }
        ],
        mockExams: [
          {
            id: 1,
            title: '2019年初级经济师《基础知识》考试模拟卷三',
            learned_num: 0,
            total: 105,
            score: 140,
            minutes: 120
          },
          {
            id: 2,
            title: '2019年初级经济师《基础知识》考试模拟卷二',
            learned_num: 0,
            total: 105,
            score: 140,
            minutes: 120
          },
          {
            id: 3,
            title: '2019年初级经济师《基础知识》考试模拟卷一',
            learned_num: 0,
            total: 105,
            score: 140,
            minutes: 120
          }
        ],
        oldExams: [
          {
            id: 1,
            title: '2018年初级经济师《基础知识》考试真题',
            learned_num: 0,
            total: 105,
            score: 140,
            minutes: 120
          },
          {
            id: 2,
            title: '2017年初级经济师《基础知识》考试真题\n',
            learned_num: 0,
            total: 105,
            score: 140,
            minutes: 120
          },
          {
            id: 3,
            title: '2016年初级经济师《基础知识》考试真题',
            learned_num: 0,
            total: 105,
            score: 140,
            minutes: 120
          },
          {
            id: 4,
            title: '2015年初级经济师《基础知识》考试真题',
            learned_num: 0,
            total: 105,
            score: 140,
            minutes: 120
          }
        ],
        dailyTests: [
          {
            id: 1,
            title: '初级经济基础知识每日一练',
            total: 30,
            date: '09月19日',
            questions: [
              {
                type: 2,
                title: '股份有限公司的特点有（　）。',
              },
              {
                type: 2,
                title: '在社会主义初级阶段的收入分配制度中，按劳分配的具体形式包括（　）。',
              },
              {
                type: 2,
                title: '一个完善的市场体系应具备的功能包括（　）。',
              }
            ]
          },
          {
            id: 2,
            title: '初级经济基础知识每日一练',
            total: 30,
            date: '09月18日',
            questions: [
              {
                type: 1,
                title: '在社会主义初级阶段实行以按劳分配为主体，多种分配方式并存的分配制度，是为了（　）。',
              },
              {
                type: 1,
                title: '在价值形式发展过程中，一切商品的价值都统一表现在从商品世界中分离出来充当一般等价物的某一种商品上，这种价值形式是（　）。',
              },
              {
                type: 2,
                title: '在商品经济条件下，价值规律的作用体现在（　）。',
              }
            ]
          },
          {
            id: 3,
            title: '初级经济基础知识每日一练',
            total: 30,
            date: '09月17日',
            questions: [
              {
                type: 1,
                title: '仲裁的原则中，不包括（　）。',
              },
              {
                type: 1,
                title: '下列民事纠纷中，适用1年特别诉讼时效的是（　）。',
              },
              {
                type: 1,
                title: '资产类账户的内部勾稽关系是（　）。',
              }
            ]
          }
        ],

        switchSubjectVisible: false
      }
    },
    methods: {
      switchTab(name) {
        this.activeTab = name
      },
      switchSubject() {
        this.switchSubjectVisible = !this.switchSubjectVisible
      },
      closeSwitchSubjectModal() {
        this.switchSubjectVisible = false
      }
    }
  }
</script>
