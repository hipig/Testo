<template>
  <div class="flex flex-col">
    <div class="flex items-center mb-4">
      <h1 class="text-2xl font-semibold text-gray-900">题库 <span class="text-lg font-normal">{{ isCreate ? '添加' : '编辑' }}</span></h1>
    </div>
    <div class="flex flex-col py-4">
      <div class="shadow rounded-md bg-white overflow-hidden">
        <div class="p-6">
          <div class="flex justify-between pb-4 mb-8 border-b border-dashed border-gray-200">
            <div class="text-2xl text-gray-900 font-semibold">基本信息</div>
          </div>
          <div class="mb-6">
            <div class="flex flex-wrap items-center -mx-3">
              <div class="w-1/6 px-3">
                <div class="leading-tight text-right text-gray-900">名称</div>
              </div>
              <div class="w-5/6 px-3">
                <input type="text" v-model="bankForm.title" class="form-input w-full max-w-lg text-sm focus:shadow-outline-teal" placeholder="请输入名称">
              </div>
            </div>
          </div>
          <div class="mb-6">
            <div class="flex flex-wrap items-center -mx-3">
              <div class="w-1/6 px-3">
                <div class="leading-tight text-right">关联科目</div>
              </div>
              <div class="w-5/6 px-3">
                <select v-model="bankForm.subject_pid" class="form-select w-48 max-w-lg text-sm focus:shadow-outline-teal" @change="selectSubjectParent">
                  <option value="" disabled>全部科目</option>
                  <optgroup v-for="(value, key) in subjectTree" :key="key" :label="value.title">
                    <option v-for="(v, k) in value.childrenList" :key="k" :value="v.id">{{ v.title }}</option>
                  </optgroup>
                </select>
                <select v-model="bankForm.subject_id" class="ml-5 form-select w-48 max-w-lg text-sm focus:shadow-outline-teal" :class="[subjectSelected ? '' : 'text-gray-400 cursor-not-allowed']" :disabled="!subjectSelected">
                  <option value="" disabled>全部科目</option>
                  <optgroup v-for="(value, key) in activeSubject.children_group" :key="key" :label="key == 1 ? '专业科目': '公共科目'">
                    <option v-for="(v, k) in value" :key="k" :value="v.id">{{ v.title }}</option>
                  </optgroup>
                </select>
              </div>
            </div>
          </div>
          <div class="mb-6">
            <div class="flex flex-wrap items-center -mx-3">
              <div class="w-1/6 px-3">
                <div class="leading-tight text-right">题库类型</div>
              </div>
              <div class="w-5/6 px-3">
                <div class="flex items-center">
                  <label class="flex items-center cursor-pointer mr-5" v-for="(item, index) in bankTypeMap" :key="index">
                    <input type="radio" v-model="bankForm.type" :value="index" class="form-radio w-4 h-4 text-teal-500 focus:shadow-outline-teal" @change="selectBankType">
                    <span class="ml-1 leading-none">{{ item }}</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div class="mb-6">
            <div class="flex flex-wrap items-center -mx-3">
              <div class="w-1/6 px-3">
                <div class="leading-tight text-right">总分及限制时长</div>
              </div>
              <div class="w-5/6 px-3">
                <div class="flex items-center">
                  <input type="text" v-model="bankForm.total_score" class="form-input max-w-lg text-sm focus:shadow-outline-teal rounded-tr-none rounded-br-none" :class="[!isConfigInput ? 'opacity-50 cursor-not-allowed': '']" :disabled="!isConfigInput" placeholder="总分">
                  <input type="text" v-model="bankForm.time_limit" class="form-input max-w-lg text-sm focus:shadow-outline-teal rounded-tl-none rounded-bl-none border-l-0" :class="[!isConfigInput ? 'opacity-50 cursor-not-allowed': '']" :disabled="!isConfigInput" placeholder="时间">
                </div>
              </div>
            </div>
          </div>
          <div class="mb-6">
            <div class="flex flex-wrap items-center -mx-3">
              <div class="w-1/6 px-3">
                <div class="leading-tight text-right">付费设置</div>
              </div>
              <div class="w-5/6 px-3">
                <div class="flex items-center">
                  <label class="flex items-center">
                    <div class="relative w-8 h-3 bg-gray-200 rounded-full shadow-inner">
                      <input v-model="bankForm.is_free" :value="true" type="checkbox" class="appearance-none absolute w-5 h-5 bg-white rounded-full shadow-md inset-y-0 left-0 -mt-1 -ml-1 focus:outline-none transform checked:bg-teal-500 checked:translate-x-full transition-all duration-300 ease-in-out" @change="toggleIsFree">
                    </div>
                    <div class="ml-3 text-gray-700 font-medium">
                      是否免费
                    </div>
                  </label>
                  <template v-if="!bankForm.is_free">
                    <div class="ml-5 relative rounded-md shadow-sm">
                      <div class="absolute inset-y-0 left-0 px-3 flex items-center pointer-events-none">
                        <span class="text-gray-500">
                          ￥
                        </span>
                      </div>
                      <input type="text" v-model="bankForm.price" class="flex-1 form-input pl-7 leading-tight max-w-lg text-sm focus:shadow-outline-teal" placeholder="0.00">
                    </div>
                  </template>
                </div>
              </div>
            </div>
          </div>
          <div class="mb-6">
            <div class="flex flex-wrap items-center -mx-3">
              <div class="w-1/6 px-3">
                <div class="leading-tight text-right text-gray-900">来源</div>
              </div>
              <div class="w-5/6 px-3">
                <input type="text" v-model="bankForm.source" class="form-input w-full max-w-lg text-sm focus:shadow-outline-teal" placeholder="请输入来源">
              </div>
            </div>
          </div>
          <div>
            <div class="flex flex-wrap items-start -mx-3">
              <div class="w-1/6 px-3">
                <div class="leading-tight text-right text-gray-900">备注</div>
              </div>
              <div class="w-5/6 px-3">
                <textarea v-model="bankForm.remark" rows="4" class="form-input w-full max-w-lg text-sm focus:shadow-outline-teal" placeholder="请输入备注"></textarea>
              </div>
            </div>
          </div>
        </div>
        <div class="p-6">
          <div class="flex items-center justify-between pb-4 mb-8 border-b border-dashed border-gray-200">
            <div class="text-2xl text-gray-900 font-semibold">试题管理</div>
            <div class="inline-flex flex-wrap rounded-md shadow">
              <button type="button" class="inline-flex items-center justify-center font-medium focus:outline-none rounded-l-md px-3 py-1 border" :class="[mode === 'normal' ? 'bg-teal-500 border-teal-500 text-white' : 'bg-white border-r-0']" @click="mode = 'normal'">标准模式</button>
              <button type="button" class="inline-flex items-center justify-center font-medium focus:outline-none rounded-r-md px-3 py-1 bg-white border" :class="[mode === 'group' ? 'bg-teal-500 border-teal-500 text-white' : 'bg-white border-l-0']" @click="mode = 'group'">分组模式</button>
            </div>
          </div>
          <div class="flex flex-col">
            <div class="flex flex-col border border-teal-200 rounded-md mb-5">
              <div class="flex items-center justify-between bg-teal-50 text-teal-500 border-b border-teal-200 px-3 py-2 rounded-t-md">
                <div class="flex-1 flex items-center">
                  <div class="cursor-pointer mr-3">
                    <svg class="w-6 h-6 stroke-current" fill="none" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </div>
                  <span class="text-xl leading-snug">单项选择</span>
                </div>
                <div class="flex flex-wrap items-center -mx-1 leading-none">
                  <div class="px-1">
                    <button type="button" class="text-teal-500 focus:outline-none" title="向前移动">
                      <svg class="w-5 h-5 stroke-current" fill="none" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 11l7-7 7 7M5 19l7-7 7 7"></path>
                      </svg>
                    </button>
                  </div>
                  <div class="px-1">
                    <button type="button" class="text-teal-500 focus:outline-none" title="向后移动">
                      <svg class="w-5 h-5 stroke-current" fill="none" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 13l-7 7-7-7m14-8l-7 7-7-7"></path>
                      </svg>
                    </button>
                  </div>
                  <div class="px-1">
                    <button type="button" class="text-teal-500 focus:outline-none" title="编辑分组">
                      <svg class="w-5 h-5 stroke-current" fill="none" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                      </svg>
                    </button>
                  </div>
                  <div class="px-1">
                    <button type="button" class="text-teal-500 focus:outline-none" title="删除分组">
                      <svg class="w-5 h-5 stroke-current" fill="none" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
              <div class="w-full">
                <div class="flex items-center justify-center py-20">
                  <button type="button" class="inline-flex items-center justify-center font-medium leading-none border border-teal-500 focus:outline-none focus:shadow-outline-teal rounded-md px-5 py-2 text-teal-500">
                    <svg class="w-6 h-6 stroke-current -ml-1" fill="none" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                    </svg>
                    <span class="ml-1 text-base">添加试题</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="px-6 py-3 flex justify-center items-center bg-gray-50">
          <button type="button" class="inline-flex items-center justify-center font-medium leading-snug border border-teal-500 focus:outline-none focus:shadow-outline-teal rounded-md px-6 py-2 bg-teal-500 text-white mr-5" @click="handleSubmit">确定</button>
          <button type="button" class="inline-flex items-center justify-center font-medium leading-snug border focus:outline-none focus:shadow-outline-gray rounded-md px-6 py-2 bg-white" @click="$router.go(-1)">返回</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { getSubjectsTree, showSubjects } from "@/admin/api/subject"
  import { showBanks, storeBanks, updateBanks } from "@/admin/api/bank"
  import Bank from "@/admin/mixins/Bank"

  export default {
    name: "admin.bank.form",
    mixins: [Bank],
    data () {
      return {
        id: this.$route.params.id || 0,
        bankForm: {
          title: "",
          subject_pid: "",
          subject_id: "",
          type: 1,
          is_free: true,
          price: null,
          total_score: 0,
          time_limit: 0,
          source: '',
          remark: ''
        },
        mode: 'normal',
        subjectTree: [],
        activeSubject: {},
      }
    },
    computed: {
      isCreate() {
        return this.id === 0
      },
      isConfigInput() {
        return [2, 3].indexOf(parseInt(this.bankForm.type)) > -1
      },
      subjectSelected() {
        return this.bankForm.subject_pid != ""
      }
    },
    mounted() {
      this.getSubjectsTree()
    },
    created() {
      if (!this.isCreate) this.showBanks()
    },
    watch: {
      'bankForm.subject_pid': {
        handler(newValue) {
          this.showSubjects(newValue)
        },
        deep: true
      }
    },
    methods: {
      getSubjectsTree() {
        getSubjectsTree()
          .then((res) => {
            this.subjectTree = res
          })
      },
      showSubjects(id) {
        showSubjects(id)
          .then((res) => {
            this.activeSubject = res
          })
      },
      showBanks() {
        showBanks(this.id)
          .then((res) => {
            this.bankForm = res
          })
      },
      selectSubjectParent() {
        this.bankForm.subject_id = ""
      },
      selectBankType() {
        this.bankForm.total_score = 0
        this.bankForm.time_limit = 0
      },
      toggleIsFree() {
        this.bankForm.price = null
      },
      handleSubmit() {
        let request = this.isCreate ? storeBanks(this.bankForm) : updateBanks(this.id, this.bankForm)

        request.then(_ => {
          this.$router.push({name: 'admin.bank.index'})
          this.$Message.success('保存成功')
        })
      }
    }
  }
</script>
