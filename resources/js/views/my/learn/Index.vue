<template>
  <div class="bg-white shadow rounded-lg">
    <learn-tab/>
    <div class="p-5">
      <div class="mb-5 flex items-center justify-between">
        <div class="flex items-center">
          <div class="mr-3">
            <select v-model="filterForm.subject_pid" class="form-select bg-gray-100 border-0 rounded-lg w-48 text-sm py-2 focus:shadow-none" placeholder="请选择" @change="selectSubject">
              <option value="">全部科目</option>
              <optgroup v-for="(value, key) in subjectList" :key="key" :label="value.title">
                <option v-for="(v, k) in value.childrenList" :key="k" :value="v.id">{{ v.title }}</option>
              </optgroup>
            </select>
          </div>
          <div>
            <select v-model="filterForm.subject_id" class="form-select bg-gray-100 border-0 rounded-lg w-48 text-sm py-2 focus:shadow-none text-sm" :class="[subjectSelected ? '' : 'text-gray-400 cursor-not-allowed']" :disabled="!subjectSelected" placeholder="请选择">
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
              v-model="filterForm.date"
              color="teal"
              :popover="{ placement: 'bottom', visibility: 'click' }"
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
      <div>这是最近考试</div>
    </div>
  </div>
</template>

<script>
  import LearnTab from "./LearnTab"
  import { getSubjectsTree, getSubjectsShow } from "@/api/subject"

  export default {
    name: "my.learn.index",
    components: {
      LearnTab
    },
    data () {
      return {
        subjectList: [],
        activeSubject: {},
        filterForm: {
          subject_pid: "",
          subject_id: "",
          date: ""
        }
      }
    },
    mounted() {
      this.getSubjectList()
    },
    computed: {
      subjectSelected() {
        return this.filterForm.subject_pid != ""
      }
    },
    methods: {
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
      selectSubject() {
        if (this.filterForm.subject_pid != "")  this.getSubject(this.filterForm.subject_pid)
        this.filterForm.subject_id = ""
      }
    }
  }
</script>
