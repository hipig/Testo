<template>
  <div class="bg-white shadow rounded-lg">
    <learn-tab active="exam"/>
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
            <div class="flex items-center">
              <div class="mr-8" :class="[item.type === 2 ? 'text-yellow-500' : 'text-red-500']">{{ item.type === 2 ? '模拟考试' : '历年真题' }}</div>
              <div class="mr-10">{{ item.created_at }}</div>
              <div class="border border-red-500 text-red-500 leading-tight px-2 rounded" v-if="item.is_end">{{ item.score }} 分</div>
            </div>
            <div class="cursor-pointer">删除</div>
          </div>
          <div class="text-base mb-2">{{ item.bank_title }}</div>
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <div class="text-gray-900 w-48 mr-2 truncate flex items-center">
                <span class="text-xs">{{ item.subject_title }}</span>
              </div>
              <div class="text-gray-400"><span class="text-teal-500 text-base">{{ item.done_count }}</span>/{{ item.total_count }}</div>
            </div>
            <div class="cursor-pointer font-semibold text-yellow-500" @click="handleContinue(item)">{{ item | actionText }}</div>
          </div>
        </div>
      </div>
      <empty-data :class="['shadow-none']" :show="isLoading === false && records.length === 0"/>
    </div>
  </div>
</template>

<script>
import LearnTab from "./LearnTab"
import EmptyData from "@/components/common/EmptyData"
import { getSubjectsTree, getSubjectsShow } from "@/api/subject"
import { getRecords } from "@/api/learnRecord"

export default {
  name: "my.exam",
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
        subject_id: "",
        type: [2, 3]
      },
      dates: null,
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
    actionText(val) {
      return val.is_end ? '查看解析' : '继续考试'
    }
  },
  methods: {
    getRecordList() {
      this.isLoading = true
      getRecords(this.filterForm)
        .then((res) => {
          this.isLoading = false
          this.records = res.data
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
      if (this.filterForm.subject_pid != "")  this.getSubject(this.filterForm.subject_pid)
      this.filterForm.subject_id = ""

      this.getRecordList()
    },
    selectSubject() {
      this.getRecordList()
    },
    selectDate() {
      this.filterForm.date = this.date
      this.getRecordList()
    },
    handleContinue(val) {
      let routerName = 'mode.exam'
      if (val.is_end) routerName = 'quiz.result'

      this.$router.push({name: routerName, params: { id: val.id }})
    }
  }
}
</script>
