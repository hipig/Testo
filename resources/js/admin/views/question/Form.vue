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
          <div class="mb-6">
            <div class="flex flex-wrap items-center -mx-3">
              <div class="w-1/6 px-3">
                <div class="leading-tight text-right text-gray-900">标题</div>
              </div>
              <div class="w-5/6 px-3">
                <input type="text" v-model="questionForm.title" class="form-input w-full max-w-lg text-sm focus:shadow-outline-teal" placeholder="请输入名称">
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
        }
      }
    },
    computed: {
      isCreate() {
        return this.id === 0
      }
    },
    methods: {

      selectQuestionType() {

      },
      handleSubmit() {

      }
    }
  }
</script>
