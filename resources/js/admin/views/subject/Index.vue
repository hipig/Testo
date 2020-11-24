<template>
  <div class="flex flex-col">
    <div class="flex items-center mb-4">
      <h1 class="text-2xl font-semibold text-gray-900">科目分类 <span class="text-lg font-normal">列表</span></h1>
    </div>
    <div class="flex flex-col py-4">
      <div class="flex flex-col sm:flex-row items-center justify-between mb-5">
        <div class="w-full sm:w-1/2 mb-4 sm:mb-0 -mx-2">
          <div class="px-0 sm:px-2">
            <button type="button" class="inline-flex items-center justify-center font-medium leading-snug shadow focus:outline-none focus:shadow-outline-teal rounded-md px-5 py-2 bg-teal-500 text-white" @click="handleCreate">添加科目</button>
          </div>
        </div>
        <div class="w-full sm:w-1/2 flex items-center justify-end">
          <div class="relative w-full sm:w-auto">
            <div class="absolute inset-y-0 left-0 w-10 flex items-center justify-center pointer-events-none">
              <svg class="w-5 h-5 stroke-current" fill="none" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
            <input placeholder="请输入.." class="form-input block w-full sm:w-64 pl-10 shadow-sm transition ease-in-out duration-150 sm:text-sm sm:leading-5 focus:shadow-outline-teal">
          </div>
        </div>
      </div>
      <div class="shadow rounded-md bg-white overflow-hidden px-5" v-loading="isLoading" loading-custom-class="h-56">
        <table class="w-full border-b border-gray-200">
          <thead>
            <tr>
              <th class="px-2 py-3 text-gray-900 text-left font-semibold tracking-wider w-6">
                <input type="checkbox" class="form-checkbox w-4 h-4 cursor-pointer text-teal-500 focus:shadow-outline-teal" @change="checkAll">
              </th>
              <th class="px-6 py-3 text-gray-900 text-left font-semibold tracking-wider w-10">
                ID
              </th>
              <th class="px-6 py-3 text-gray-900 text-left font-semibold tracking-wider">
                名称
              </th>
              <th class="px-6 py-3 text-gray-900 text-left font-semibold tracking-wider">
                标识
              </th>
              <th class="px-6 py-3 text-gray-900 text-left font-semibold tracking-wider">
                层级
              </th>
              <th class="px-6 py-3 text-gray-900 text-left font-semibold tracking-wider">
                是否有子类目
              </th>
              <th class="px-6 py-3 text-gray-900 text-left font-semibold tracking-wider">
                创建时间
              </th>
              <th class="px-6 py-3 text-gray-900 text-center font-semibold tracking-wider">
                操作
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in subjectList" :key="index">
              <td class="px-2 py-3 border-t border-gray-200 whitespace-no-wrap">
                <input type="checkbox" v-model="checks" :value="item" class="form-checkbox w-4 h-4 cursor-pointer text-teal-500 focus:shadow-outline-teal">
              </td>
              <td class="px-6 py-3 border-t border-gray-200 whitespace-no-wrap">{{ item.id }}</td>
              <td class="px-6 py-3 border-t border-gray-200 whitespace-no-wrap">{{ item.title }}</td>
              <td class="px-6 py-3 border-t border-gray-200 whitespace-no-wrap">{{ item.name }}</td>
              <td class="px-6 py-3 border-t border-gray-200 whitespace-no-wrap">{{ item.level }}</td>
              <td class="px-6 py-3 border-t border-gray-200 whitespace-no-wrap">
                <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-teal-100 text-teal-800" v-if="item.is_directory">是</span>
                <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800" v-else>否</span>
              </td>
              <td class="px-6 py-3 border-t border-gray-200 whitespace-no-wrap">{{ item.created_at }}</td>
              <td class="px-6 py-3 border-t border-gray-200 whitespace-no-wrap text-center leading-5">
                <div class="-mx-1">
                  <button type="button" class="px-1 text-teal-500 hover:text-teal-700 focus:outline-none" @click="handleEdit(item)">编辑</button>
                  <button type="button" class="px-1 text-red-500 hover:text-red-700 focus:outline-none" @click="handleDelete(item)">删除</button>
                </div>
              </td>
            </tr>
            <tr>
              <td colspan="7">
                <empty-data :class="['shadow-none']" :show="isLoading === false && subjectList.length === 0"/>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="py-5" v-if="total > 0">
          <t-pagination :total="total" :page-size="pageSize" :current="currentPage" @page-change="changePage" @pagesize-change="changePageSize" show-total show-sizer show-quickjump/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import EmptyData from "@/components/common/EmptyData"
  import { getSubjects, deleteSubjects } from "@/admin/api/subject"

  export default {
    name: "admin.subject.index",
    components: {
      EmptyData
    },
    data () {
      return {
        filterForm: {},
        subjectList: [],
        checks: [],
        currentPage: 1,
        pageSize: 10,
        total: 0,
        isLoading: null
      }
    },
    mounted() {
      this.getSubjectList()
    },
    methods: {
      getSubjectList() {
        this.isLoading = true

        let params = this.filterForm
        params.page = this.currentPage
        params.page_size = this.pageSize

        getSubjects(params)
          .then((res) => {
            this.subjectList = res.data
            this.total = res.meta.total
          })
          .finally(_ => {
            this.isLoading = false
          })
      },
      checkAll() {
        if (this.checks.length == this.subjectList.length) {
          this.checks.splice(0, this.subjectList.length)
        } else {
          this.checks = Object.assign([], this.subjectList)
        }
      },
      changePage(page) {
        this.currentPage = page
        this.getSubjectList()
      },
      changePageSize(size) {
        this.pageSize = size
        this.getSubjectList()
      },
      handleCreate() {
        this.$router.push({name: 'admin.subject.create'})
      },
      handleEdit(item) {
        this.$router.push({name: 'admin.subject.edit', params: {id: item.id}})
      },
      handleDelete(item) {
        this.$Dialog.confirm('是否确认删除？', '温馨提示')
          .then(_ => {
            deleteSubjects(item.id)
              .then(_ => {
                this.$Message.success('操作成功')
                this.getSubjectList()
              })
          })
          .catch(_ => {})

      }
    }
  }
</script>
