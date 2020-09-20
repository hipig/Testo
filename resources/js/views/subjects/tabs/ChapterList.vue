<template>
  <div class="flex flex-wrap">
    <div class="w-40 max-h-screen mr-5">
      <div class="bg-white shadow rounded-lg pt-5 pl-2 pr-2 text-gray-500 flex flex-col">
        <div v-for="(value, key) in list" :key="key" class="mb-5 pl-3 leading-tight truncate cursor-pointer border-l-4" :class="{'text-teal-500 border-teal-500': key === 0, 'border-transparent': key !== 0}">{{ value.title }}</div>
      </div>
    </div>
    <div class="flex-1 bg-white shadow rounded-lg">
      <div class="px-5 py-2 text-base text-gray-400 flex border-b border-gray-100">
        <div class="w-2/3 pl-10">名称</div>
        <div class="w-1/3">做题进度</div>
      </div>
      <div class="flex flex-wrap">
        <chapter-item v-for="(value, key) in list" :key="key" :title="value.title" :name="value.id" :number="[value.learned_num, value.total]" :disabled="value.children.length === 0" @btnClick="handleLearn">
          <chapter-item v-for="(v, k) in value.children" :key="k" :title="v.title" :name="v.id" :number="[v.learned_num, v.total]" second  @btnClick="handleLearn"/>
        </chapter-item>
      </div>
    </div>
    <t-modal  v-model="filterVisible" title="练习筛选" size="4xl" @on-cancel="resetOption">
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
    name: "ChapterList",
    components: {
      ChapterItem,
      FilterItem,
      TModal
    },
    props: {
      list: {
        type: Array,
        default: []
      }
    },
    data () {
      return {
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
        this.$router.push({name: 'models.exercise', params: {id: 1}})
      },
      handleExam() {
        console.log('考试模式', this.filterValue)
      },
      resetOption() {
        this.filterVisible = false
        this.filterValue = {
          category: 'all',
          type: 0,
          number: 5
        }
      }
    }
  }
</script>

<style scoped>

</style>
