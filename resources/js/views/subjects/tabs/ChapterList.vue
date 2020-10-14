<template>
  <div class="flex flex-wrap" ref="chapter-list">
    <div class="w-40 max-h-screen mr-5">
      <div class="bg-white shadow rounded-lg pt-5 pl-2 pr-2">
        <div class="text-gray-500 flex flex-col" v-if="list.length > 0">
          <div v-for="(value, key) in list" :key="key" class="mb-5 pl-3 leading-tight truncate cursor-pointer border-l-4" :class="[key === activeIndex ? 'text-teal-500 border-teal-500' : 'border-transparent']" @click="toIndex(key)">{{ value.title }}</div>
        </div>
        <div class="flex items-center justify-center text-gray-400 pb-4" v-if="isLoading === false && list.length === 0">还没有数据哦~</div>
      </div>
    </div>
    <div class="flex-1 bg-white shadow rounded-lg">
      <div class="px-5 py-2 text-base text-gray-400 flex border-b border-gray-100">
        <div class="w-2/3 pl-10">名称</div>
        <div class="w-1/3">做题进度</div>
      </div>
      <div class="flex flex-wrap relative" v-loading="isLoading" loading-custom-class="h-32">
        <chapter-item :id="'chapter-'+key" v-for="(value, key) in list" :key="key" :title="value.title" :name="value.id" :number="[value.learned_num||0, value.total_count]" :disabled="value.children.length === 0" @btnClick="handleLearn">
          <chapter-item v-for="(v, k) in value.children" :key="k" :title="v.title" :name="v.id" :number="[v.learned_num||0, v.total_count]" second  @btnClick="handleLearn"/>
        </chapter-item>
      </div>
      <empty-data :show="isLoading === false && list.length === 0"/>
    </div>
    <t-modal v-model="filterVisible" title="练习筛选" size="4xl" @close="resetOption">
      <div class="w-full -mb-5">
        <filter-item v-for="(item, index) in filterOptions" :key="index" :title="item.title" :name="item.name" v-model="filterValue[item.name]" :options="item.options" @on-change="optionChange"/>
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
  import EmptyData from "@/components/common/EmptyData"
  import QuestionType from "@/mixins/QuestionType"
  import { getChapterTests, geCountTypeTotal } from "@/api/bank"
  import { storeTestRecords } from "@/api/learnRecord"

  export default {
    name: "ChapterList",
    components: {
      ChapterItem,
      FilterItem,
      EmptyData,
      TModal
    },
    props: {
      subjectId: {
        type: Number | String,
        default: 0,
      }
    },
    mixins: [QuestionType],
    data () {
      return {
        list: [],
        filterOptions: [
          {
            title: '类型',
            name: 'range',
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
                value: '单选题（0）',
                key: 1
              },
              {
                value: '多选题（0）',
                key: 2
              },
              {
                value: '判断题（0）',
                key: 3
              },
              {
                value: '填空题（0）',
                key: 4
              },
              {
                value: '问答题（0）',
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
          'range': 'all',
          'type': 0,
          'number': 5
        },
        typeCount: [],
        activeBankId: '',
        filterVisible: false,
        isLoading: null,
        activeIndex: 0,
        scrollStatus: true
      }
    },
    mounted() {
      this.getChapterTestList()
      let timeId = null
      this.$refs['chapter-list'].addEventListener('scroll', () => {
        clearTimeout(timeId)
        timeId = setTimeout(() => {
          this.scrollToTop()
        }, 200)
      } , true)
    },
    watch: {
      subjectId(val) {
        this.getChapterTestList()
      }
    },
    methods: {
      getChapterTestList() {
        this.isLoading = true
        getChapterTests(this.subjectId)
          .then((res) => {
            this.list = res
          })
          .finally(() => {
            this.isLoading = false
          })
      },
      getTypeCount() {
        geCountTypeTotal(this.activeBankId, {type: this.filterValue.range})
          .then((res) => {
            this.typeCount = res
            let filterOptions = this.filterOptions
            filterOptions.forEach(item => {
              if (item.name === 'type') {
                item.options.map((v, k) => {
                  let type = '全部'
                  if (v.key !== 0) {
                    type = this.questionTypes[v.key].name
                  }
                  v.value = type + '（' + res[v.key] + '）'
                  return v
                })
              }
            })
            this.filterOptions = filterOptions
          })
      },
      storeTestRecords(type) {
         let params = this.filterValue
         params.bank_id = this.activeBankId
         params.mode = type === 'exercise' ? 1 : 2

         storeTestRecords(params)
           .then((res) => {
             let name = type === 'exercise' ? 'mode.exercise' : 'mode.test'
             this.$router.push({name: name, params: {id: res.id}})
           })
      },
      toIndex(index) {
        this.activeIndex = index
        this.$nextTick(() => {
          document.getElementById(`chapter-${index}`).scrollIntoView({ behavior: "smooth" })
        })
        this.scrollStatus = false

        let timeId = null
        clearTimeout(timeId)
        timeId = setTimeout(() => {
          this.scrollStatus=true
        },200)
      },
      scrollToTop() {
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop

        if (this.scrollStatus) {
          this.list.map((v,i) => {
            var offsetTop = document.getElementById(`chapter-${i}`).offsetTop
            var scrollHeight = document.getElementById(`chapter-${i}`).scrollHeight
            if (scrollTop >= offsetTop && scrollTop<=(offsetTop+scrollHeight)) {
              this.activeIndex = i
            }
          })
        }
      },
      handleLearn(key) {
        this.activeBankId = key
        this.filterVisible = true
        this.getTypeCount()
      },
      optionChange(key, name) {
        this.filterValue[name] = key
        if (name === 'range') this.getTypeCount()
      },
      handleExercise() {
        this.storeTestRecords('exercise')
      },
      handleExam() {
        this.storeTestRecords('test')
      },
      resetOption() {
        this.filterVisible = false
        this.filterValue = {
          range: 'all',
          type: 0,
          number: 5
        }
      }
    }
  }
</script>
