<template>
  <div class="bg-white shadow rounded-lg">
    <learn-tab/>
    <div class="p-5">
      <div class="mb-5 flex items-center justify-between">
        <div class="flex items-center">
          <div class="mr-3">
            <select v-model="filterForm.subject_pid" class="form-select bg-gray-100 border-0 rounded-lg w-48 text-sm py-2 focus:shadow-none" @change="selectSubjectParent">
              <option value="">全部科目</option>
              <optgroup v-for="(value, key) in subjectList" :key="key" :label="value.title">
                <option v-for="(v, k) in value.childrenList" :key="k" :value="v.id">{{ v.title }}</option>
              </optgroup>
            </select>
          </div>
          <div>
            <select v-model="filterForm.subject_id" class="form-select bg-gray-100 border-0 rounded-lg w-48 text-sm py-2 focus:shadow-none text-sm" :class="[subjectSelected ? '' : 'text-gray-400 cursor-not-allowed']" :disabled="!subjectSelected" @change="selectSubject">
              <option value="">全部科目</option>
              <optgroup v-for="(value, key) in activeSubject.children_group" :key="key" :label="key == 1 ? '专业科目': '公共科目'">
                <option v-for="(v, k) in value" :key="k" :value="v.id">{{ v.title }}</option>
              </optgroup>
            </select>
          </div>
        </div>
        <div>
          <div class="relative">
            <v-date-picker
              mode="range"
              v-model="dates"
              color="teal"
              :popover="{ placement: 'bottom', visibility: 'click' }"
              @input="selectDate"
            >
              <input type="text" slot-scope="{ inputProps, inputEvents, isDragging }" placeholder="选择日期" :class="[`pr-4 py-2 block w-64 bg-gray-100 rounded-lg text-left appearance-none outline-none pl-12 ${isDragging ? 'text-gray-400' : ''}`]" v-bind="inputProps" v-on="inputEvents">
            </v-date-picker>
            <div class="absolute left-0 top-0 bottom-0 w-12 flex items-center justify-center text-gray-400">
              <svg  class="stroke-current w-5 h-5" fill="none" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div v-loading="isLoading" loading-custom-class="h-56">
        <div class="pt-5 pb-4 border-b border-gray-100" v-for="(item, index) in records" :key="index">
          <div class="flex items-center justify-between text-gray-500 text-xs leading-none mb-2">
            <div>{{ item.created_at }}</div>
            <div class="cursor-pointer">删除</div>
          </div>
          <div class="text-base mb-2">{{ item.bank_title }}</div>
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <div class="text-gray-900 w-40 mr-2 truncate flex items-center">
                <div class="mr-1 flex items-center justify-center bg-gradient-to-r text-white leading-none text-xs w-4 h-4 rounded-sm" :class="item.type | labelColor">{{ item.type | labelText }}</div>
                <span class="text-xs">{{ item.subject_title }}</span>
              </div>
              <div class="text-gray-400"><span class="text-teal-500 text-base">{{ item.done_count }}</span>/{{ item.total_count }}</div>
            </div>
            <div class="cursor-pointer font-semibold" :class="item.type | actionColor" @click="handleContinue(item)">{{ item | actionText }}</div>
          </div>
        </div>
        <div class="pt-5 pb-1 flex justify-end">
          <t-pagination :total="total" :current="currentPage" @page-change="changePage"/>
        </div>
      </div>
      <empty-data :class="['shadow-none']" :show="isLoading === false && records.length === 0"/>
    </div>
  </div>
</template>

<script>
  import dayjs from "dayjs"
  import LearnTab from "./LearnTab"
  import EmptyData from "@/components/common/EmptyData"
  import { getSubjectsTree, getSubjectsShow } from "@/api/subject"
  import { getRecords } from "@/api/learnRecord"

  export default {
    name: "my.learn",
    components: {
      LearnTab,
      EmptyData
    },
    data () {
      return {
        records: [],
        subjectList: [],
        activeSubject: {},
        filterForm: {
          subject_pid: "",
          subject_id: ""
        },
        dates: null,
        currentPage: 1,
        total: 0,
        isLoading: null
      }
    },
    mounted() {
      this.getSubjectList()
      this.getRecordList()
    },
    computed: {
      date() {
        let date = []
        if (this.dates) {
          let start = dayjs(this.dates.start).format("YYYY-MM-DD")
          let end = dayjs(this.dates.end).format("YYYY-MM-DD")
          date = [start, end]
        }
        return date
      },
      subjectSelected() {
        return this.filterForm.subject_pid !== ""
      }
    },
    filters: {
      labelColor(val) {
        let isExam = [2 ,3].indexOf(parseInt(val)) > -1
        return isExam ? 'from-yellow-400 to-yellow-500' : 'from-teal-400 to-teal-500'
      },
      labelText(val) {
        let isExam = [2 ,3].indexOf(parseInt(val)) > -1
        return isExam ? '试' : '练'
      },
      actionColor(val) {
        let isExam = [2 ,3].indexOf(parseInt(val)) > -1
        return isExam ? 'text-yellow-500' : 'text-teal-500'
      },
      actionText(val) {
        let isExam = [2 ,3].indexOf(parseInt(val)) > -1
        return val.is_end ? '查看解析' : (isExam ? '继续考试' : '继续练习')
      }
    },
    methods: {
      getRecordList() {
        this.isLoading = true
        let params = this.filterForm
        params.date = this.date
        params.page = this.currentPage

        getRecords(this.filterForm)
          .then((res) => {
            this.records = res.data
            this.total = res.meta.total
          })
          .finally(() => {
            this.isLoading = false
          })
      },
      getSubjectList() {
        getSubjectsTree()
          .then((res) => {
            this.subjectList = res
          })
      },
      getSubject(id) {
        getSubjectsShow(id)
          .then((res) => {
            this.activeSubject = res
          })
      },
      selectSubjectParent() {
        if (this.filterForm.subject_pid !== "")  this.getSubject(this.filterForm.subject_pid)
        this.filterForm.subject_id = ""

        this.getRecordList()
      },
      selectSubject() {
        this.getRecordList()
      },
      selectDate() {
        this.getRecordList()
      },
      handleContinue(val) {
        let routerName = 'mode.exercise'
        if(parseInt(val.quiz_mode) === 2) routerName = 'mode.test'
        if([2 ,3].indexOf(parseInt(val.type)) > -1) routerName = 'mode.exam'
        if (val.is_end) routerName = 'quiz.result'

        this.$router.push({name: routerName, params: { id: val.id }})
      },
      changePage(page) {
        this.currentPage = page
        this.getRecordList()
      }
    }
  }
</script>
