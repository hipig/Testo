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
            <button type="button" class="border border-teal-200 text-teal-500 rounded-full px-2 flex items-center text-sm focus:outline-none" @click="switchSubjectVisible = !switchSubjectVisible">
              <span class="mr-1">切换考试</span>
              <svg class="w-4 h-4 stroke-current -mr-1" fill="none" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
          </div>
          <div class="flex">
            <a href="#" class="flex items-center text-teal-500">
              <svg class="w-5 h-5 stroke-current" fill="none" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path>
              </svg>
              <span class="ml-1">题目收藏</span>
            </a>
            <a href="#" class="ml-10 flex items-center text-teal-500">
              <svg class="w-5 h-5 stroke-current" fill="none" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
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
            <div class="flex items-center h-16 mr-24 text-lg cursor-pointer text-teal-500 border-teal-500 border-b-2 tab-active">章节练习</div>
            <div class="flex items-center h-16 mr-24 text-lg cursor-pointer">模拟考试</div>
            <div class="flex items-center h-16 mr-24 text-lg cursor-pointer">历年真题</div>
            <div class="flex items-center h-16 text-lg cursor-pointer">每日一练</div>
          </div>
        </div>
      </div>
      <div class="mt-5 flex flex-wrap">
        <div class="w-40 max-h-screen mr-5">
          <div class="bg-white shadow rounded-lg pt-5 pl-2 pr-2 text-gray-500 flex flex-col">
            <div v-for="(value, key) in chapters" :key="key" class="mb-5 pl-3 leading-tight truncate cursor-pointer border-l-4" :class="{'text-teal-500 border-teal-500': key === 0, 'border-transparent': key !== 0}">{{ value.title }}</div>
          </div>
        </div>
        <div class="flex-1 bg-white shadow rounded-lg">
          <div class="px-5 py-2 text-base text-gray-400 flex border-b border-gray-100">
            <div class="w-2/3 pl-10">名称</div>
            <div class="w-1/3">做题进度</div>
          </div>
          <div class="flex flex-wrap">
            <chapter-item v-for="(value, key) in chapters" :key="key" :title="value.title" :name="value.id" :number="[value.learned_num, value.total]" :disabled="value.children.length === 0" @btnClick="handleLearn">
              <chapter-item v-for="(v, k) in value.children" :key="k" :title="v.title" :name="v.id" :number="[v.learned_num, v.total]" second  @btnClick="handleLearn"/>
            </chapter-item>
          </div>
        </div>
      </div>
    </div>
    <t-modal  v-model="switchSubjectVisible" title="切换考试" size="4xl" :showFooter="false">
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
    <t-modal  v-model="filterVisible" title="练习筛选" size="4xl">
      <div class="w-full -mb-5">
        <filter-item v-for="(item, index) in formatterFilterOptions" :key="index" :title="item.title" :name="item.name" v-model="filterValue[item.name]" :options="item.options" @change="optionChange"/>
      </div>
      <div slot="footer">
        <div class="flex items-center justify-end">
          <button type="button" class="inline-flex py-2 px-8 text-base rounded text-white bg-gradient-to-r from-teal-400 to-teal-500 focus:outline-none" @click="handleExercise">练习模式</button>
          <button type="button" class="ml-6 inline-flex py-2 px-8 text-base rounded text-white bg-gradient-to-r from-yellow-400 to-yellow-500 focus:outline-none" @click="handleExam">考试模式</button>
        </div>
      </div>
    </t-modal>
  </div>
</template>

<script>
  import ChapterItem from "@/components/chapters/ChapterItem"
  import FilterItem from "@/components/chapters/FilterItem"
  import TModal from "@/components/common/modal/Modal"

  export default {
    name: "subjects.show",
    components: {
      ChapterItem,
      FilterItem,
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
        chapters: [
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
        filterOptions: [
          {
            title: '类型',
            name: 'category',
            options: [
              {
                value: '全部',
                key: 'all'
              },
              {
                value: '未做',
                key: 'undone'
              },
              {
                value: '已做',
                key: 'done'
              },
              {
                value: '错题',
                key: 'error'
              }
            ]
          },
          {
            title: '题型',
            name: 'type',
            options: [
              {
                value: '全部',
                key: 0
              },
              {
                value: '单选题',
                key: 1
              },
              {
                value: '多选题',
                key: 2
              },
              {
                value: '判断题',
                key: 3
              },
              {
                value: '填空题',
                key: 4
              },
              {
                value: '问答题',
                key: 5
              }
            ]
          },
          {
            title: '数量',
            name: 'number',
            options: [
              {
                value: '5',
                key: 5
              },
              {
                value: '10',
                key: 10
              },
              {
                value: '20',
                key: 20
              },
              {
                value: '30',
                key: 30
              },
              {
                value: '50',
                key: 50
              },
              {
                value: '100',
                key: 100
              },
            ]
          }
        ],
        filterValue: {
          category: 'all',
          type: 0,
          number: 5
        },
        currentChapter: '',

        switchSubjectVisible: false,
        filterVisible: false
      }
    },
    computed: {
      formatterFilterOptions() {
        let filterOptions = this.filterOptions
        let count = [59, 37, 21, 0, 0, 1]
        filterOptions.forEach(item => {
          if (item.name === 'type') {
            item.options.map((v, k) => {
              v.value = v.value + "（" + (count[k]|| 0) + "）"
              return v
            })
          }
        })

        return filterOptions
      }
    },
    methods: {
      handleLearn(name) {
        this.currentChapter = name
        this.filterVisible = true
      },
      optionChange(key, name) {
        this.filterValue[name] = key
      },
      handleExercise() {
        console.log('练习模式', this.filterValue)
      },
      handleExam() {
        console.log('考试模式', this.filterValue)
      },
    }
  }
</script>
