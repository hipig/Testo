<template>
  <div class="flex flex-col">
    <div class="flex items-center mb-4">
      <h1 class="text-2xl font-semibold text-gray-900">科目分类 <span class="text-lg font-normal">{{ isCreate ? '添加' : '编辑' }}</span></h1>
    </div>
    <div class="flex flex-col py-4">
      <div class="shadow rounded-md bg-white overflow-hidden px-6 py-8">
        <div class="mb-6">
          <div class="flex flex-wrap items-center -mx-3">
            <div class="w-1/6 px-3">
              <div class="leading-tight text-right text-gray-900">名称</div>
            </div>
            <div class="w-5/6 px-3">
              <input type="text" v-model="subjectForm.title" class="form-input w-full max-w-lg text-sm focus:shadow-outline-teal" placeholder="请输入名称">
            </div>
          </div>
        </div>
        <div class="mb-6">
          <div class="flex flex-wrap items-center -mx-3">
            <div class="w-1/6 px-3">
              <div class="leading-tight text-right">标识</div>
            </div>
            <div class="w-5/6 px-3">
              <input type="text" v-model="subjectForm.name" class="form-input w-full max-w-lg text-sm focus:shadow-outline-teal" placeholder="请输入标识">
            </div>
          </div>
        </div>
        <div class="mb-6">
          <div class="flex flex-wrap items-center -mx-3">
            <div class="w-1/6 px-3">
              <div class="leading-tight text-right">是否目录</div>
            </div>
            <div class="w-5/6 px-3">
              <div class="flex items-center">
                <label :class="[isCreate ? 'cursor-pointer' : 'cursor-not-allowed opacity-50']">
                  <input type="radio" v-model="subjectForm.is_directory" :value="true" class="form-radio w-4 h-4 text-teal-500 focus:shadow-outline-teal" :disabled="!isCreate">
                  <span class="ml-1 leading-none">是</span>
                </label>
                <label class="ml-5" :class="[isCreate ? 'cursor-pointer' : 'cursor-not-allowed opacity-50']">
                  <input type="radio" v-model="subjectForm.is_directory" :value="false" class="form-radio w-4 h-4 text-teal-500 focus:shadow-outline-teal" :disabled="!isCreate">
                  <span class="ml-1 leading-none">否</span>
                </label>
              </div>
            </div>
          </div>
        </div>
        <div class="mb-6">
          <div class="flex flex-wrap items-center -mx-3">
            <div class="w-1/6 px-3">
              <div class="leading-tight text-right">上级科目</div>
            </div>
            <div class="w-5/6 px-3">
              <select class="form-select w-full max-w-lg text-sm focus:shadow-outline-teal" v-model="subjectForm.parent_id">
                <option value="">顶级科目</option>
                <template v-for="(item, index) in subjectTree">
                  <option :value="item.id" :key="index">{{ item.title }}</option>
                  <option :value="v.id" v-for="(v, i) in item.childrenList" :key="i" v-if="item.childrenList">﹂{{ v.title }}</option>
                </template>
              </select>
            </div>
          </div>
        </div>
        <div class="mb-6">
          <div class="flex flex-wrap items-center -mx-3">
            <div class="w-1/6 px-3">
              <div class="leading-tight text-right">专业科目</div>
            </div>
            <div class="w-5/6 px-3">
              <div class="flex items-center">
                <label class="cursor-pointer">
                  <input type="checkbox" v-model="subjectForm.is_special" :value="1" class="form-checkbox w-4 h-4 text-teal-500 focus:shadow-outline-teal">
                  <span class="ml-1 leading-none">是否为专业科目</span>
                </label>
              </div>
            </div>
          </div>
        </div>
        <div class="flex flex-wrap items-center -mx-3">
          <div class="w-1/6 px-3">
            <div class="leading-tight text-right" style="font-size: 0">操作</div>
          </div>
          <div class="w-5/6 px-3">
            <button type="button" class="inline-flex items-center justify-center font-medium border border-teal-500 focus:outline-none focus:shadow-outline-teal rounded-md px-6 py-2 bg-teal-500 text-white" @click="handleSubmit">确定</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { getSubjectsTree, showSubjects, storeSubjects, updateSubjects } from "@/api/admin/subject"

  export default {
    name: "admin.subject.form",
    data () {
      return {
        id: this.$route.params.id || 0,
        subjectForm: {
          title: '',
          name: '',
          parent_id: '',
          is_special: '',
          is_directory: null,
        },
        subjectTree: []
      }
    },
    computed: {
      isCreate() {
        return this.id === 0
      }
    },
    mounted() {
      this.getSubjectsTree()
    },
    created() {
      if (!this.isCreate) this.showSubjects()
    },
    methods: {
      getSubjectsTree() {
        getSubjectsTree()
          .then((res) => {
            this.subjectTree = res
          })
      },
      showSubjects() {
        showSubjects(this.id)
          .then((res) => {
            this.subjectForm = res
          })
      },
      handleSubmit() {
        let request = this.isCreate ? storeSubjects(this.subjectForm) : updateSubjects(this.id, this.subjectForm)

        request.then(_ => {
          this.$router.push({name: 'admin.subject.index'})
          this.$Message.success('保存成功')
        })
      }
    }
  }
</script>
