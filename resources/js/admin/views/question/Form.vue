<template>
  <div class="flex flex-col">
    <div class="flex items-center mb-4">
      <h1 class="text-2xl font-semibold text-gray-900">题目 <span class="text-lg font-normal">{{ isCreate ? '添加' : '编辑' }}</span></h1>
    </div>
    <div class="flex flex-col py-4">
      <div class="shadow rounded-md bg-white overflow-hidden">
        <div class="px-6 py-8">
          <div class="mb-6">
            <div class="flex flex-wrap items-center -mx-3">
              <div class="w-1/6 px-3">
                <div class="leading-tight text-right text-gray-900">标题</div>
              </div>
              <div class="w-5/6 px-3">
                <input type="text" v-model="questionForm.title" class="form-input w-full max-w-2xl text-sm focus:shadow-outline-teal" placeholder="请输入名称">
              </div>
            </div>
          </div>
          <div class="mb-6">
            <div class="flex flex-wrap items-start -mx-3">
              <div class="w-1/6 px-3">
                <div class="leading-tight text-right text-gray-900">背景材料</div>
              </div>
              <div class="w-5/6 px-3">
                <textarea v-model="questionForm.material" rows="4" class="form-input w-full max-w-2xl text-sm focus:shadow-outline-teal" placeholder="请输入备注"></textarea>
              </div>
            </div>
          </div>
          <div class="mb-6">
            <div class="flex flex-wrap items-center -mx-3">
              <div class="w-1/6 px-3">
                <div class="leading-tight text-right text-gray-900">类型</div>
              </div>
              <div class="w-5/6 px-3">
                <div class="flex items-center">
                  <label class="flex items-center cursor-pointer mr-5" v-for="(item, index) in questionTypes" :key="index">
                    <input type="radio" v-model="questionForm.type" :value="index" class="form-radio w-4 h-4 text-teal-500 focus:shadow-outline-teal" @change="selectQuestionType">
                    <span class="ml-1 leading-none">{{ item.name }}</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div class="mb-6" v-if="hasOption">
            <div class="flex flex-wrap items-start -mx-3">
              <div class="w-1/6 px-3">
                <div class="leading-tight text-right text-gray-900">选项</div>
              </div>
              <div class="w-5/6 px-3">
                <div class="mb-1">
                  <button type="button" class="text-teal-500 focus:outline-none" @click="addOption">
                    <span>添加选项</span>
                  </button>
                </div>
                <div class="flex flex-col">
                  <div class="flex flex-wrap items-center w-full max-w-2xl py-2" v-for="(_, i) in optionValue" :key="i">
                    <div class="flex flex-1 rounded-md shadow-sm">
                      <span class="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                        <label class="cursor-pointer">
                          <input type="checkbox" v-model="questionForm.answer" :value="optionIndex[i]" class="form-checkbox w-4 h-4 text-teal-500 focus:shadow-outline-teal" v-if="isMultiple">
                          <input type="radio" v-model="questionForm.answer" :value="optionIndex[i]" class="form-radio w-4 h-4 text-teal-500 focus:shadow-outline-teal" v-else>
                        </label>
                      </span>
                      <div class="flex-1 relative rounded-r-md shadow-sm">
                        <div class="absolute inset-y-0 left-0 px-3 flex items-center pointer-events-none">
                          <span class="text-gray-500">
                            {{ optionIndex[i] }}
                          </span>
                        </div>
                        <input type="text" v-model="optionValue[i]" class="form-input w-full pl-7 text-sm rounded-none rounded-r-md focus:shadow-outline-teal" placeholder="请输入选项值">
                      </div>
                    </div>
                    <button type="button" class="inline-flex items-center text-red-500 focus:outline-none px-3" :class="[i < 2 ? 'invisible': '']" :disabled="i < 2" @click="removeOption(i)" title="移除">
                      <svg class="w-5 h-5 stroke-current" fill="none" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="mb-6" v-if="parseInt(questionForm.type) === 4">
            <div class="flex flex-wrap items-start -mx-3">
              <div class="w-1/6 px-3">
                <div class="leading-tight text-right text-gray-900">正确答案</div>
              </div>
              <div class="w-5/6 px-3">
                <div class="mb-1">
                  <button type="button" class="text-teal-500 focus:outline-none" @click="addOption">
                    <span>添加答案</span>
                  </button>
                </div>
                <div class="flex flex-col">
                  <div class="flex flex-wrap items-center w-full max-w-2xl py-2" v-for="(_, i) in optionValue" :key="i">
                    <div class="flex-1">
                      <input type="text" v-model="optionValue[i]" class="form-input w-full text-sm focus:shadow-outline-teal" placeholder="请输入答案">
                    </div>
                    <button type="button" class="inline-flex items-center text-red-500 focus:outline-none px-3" :class="[i < 1 ? 'invisible': '']" :disabled="i < 1" @click="removeOption(i)" title="移除">
                      <svg class="w-5 h-5 stroke-current" fill="none" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div class="flex flex-wrap items-start -mx-3">
              <div class="w-1/6 px-3">
                <div class="leading-tight text-right text-gray-900">答案解析</div>
              </div>
              <div class="w-5/6 px-3">
                <textarea v-model="questionForm.parse" rows="4" class="form-input w-full max-w-2xl text-sm focus:shadow-outline-teal" placeholder="请输入备注"></textarea>
              </div>
            </div>
          </div>
        </div>
        <div class="px-6 py-3 flex justify-center items-center bg-gray-50">
          <button type="button" class="inline-flex items-center justify-center font-medium leading-tight border border-teal-500 focus:outline-none focus:shadow-outline-teal rounded-md px-6 py-2 bg-teal-500 text-white mr-5" @click="handleSubmit">确定</button>
          <button type="button" class="inline-flex items-center justify-center font-medium leading-tight border focus:outline-none focus:shadow-outline-gray rounded-md px-6 py-2 bg-white" @click="$router.go(-1)">返回</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { showQuestions, storeQuestions, updateQuestions } from "@/admin/api/question"
  import QuestionType from "@/mixins/QuestionType"

  export default {
    name: "admin.question.form",
    mixins: [QuestionType],
    data () {
      return {
        id: this.$route.params.id || 0,
        questionForm: {
          title: '',
          type: 1,
          option: {},
          answer: '',
          material: '',
          parse: ''
        },
        optionValue: [],
        optionDefaultCount: {
          1: 4,
          2: 4,
          3: 2,
          4: 1
        },
        optionIndex: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L']
      }
    },
    computed: {
      isCreate() {
        return this.id === 0
      },
      hasOption() {
        return [1, 2, 3].indexOf(parseInt(this.questionForm.type)) > -1
      },
      isMultiple() {
        return [2, 4].indexOf(parseInt(this.questionForm.type)) > -1
      }
    },
    watch: {
      optionValue(newValue) {
        newValue.forEach((item, index) => {
          let key = this.optionIndex[index]
          this.questionForm.option[key] = item
        })
      },
    },
    created() {
      if (this.isCreate) {
        this.initOption()
        this.initAnswer()
      } else {
        this.showQuestions()
      }
    },
    methods: {
      showQuestions() {
        showQuestions(this.id)
          .then((res) => {
            this.questionForm = res
            this.optionValue = Object.values(res.option)
          })
      },
      selectQuestionType() {
        this.initOption()
        this.initAnswer()
      },
      initOption() {
        let count = this.optionDefaultCount[this.questionForm.type] || 4
        let optionValue = []
        for (let i = 0; i < count; i++) {
          optionValue.push("")
        }
        this.optionValue = optionValue
      },
      initAnswer() {
        this.questionForm.answer = this.isMultiple ? [] : ""
      },
      addOption() {
        if (this.optionValue.length >= this.optionIndex.length) {
          this.$Message.warning('选项个数不能超过 12 个')
          return false
        }
        this.optionValue.push("")
      },
      removeOption(index) {
        this.optionValue.splice(index, 1)
      },

      handleSubmit() {
        let request = this.isCreate ? storeQuestions(this.questionForm) : updateQuestions(this.id, this.questionForm)

        request.then(_ => {
          this.$router.push({name: 'admin.question.index'})
          this.$Message.success('保存成功')
        })
      }
    }
  }
</script>
