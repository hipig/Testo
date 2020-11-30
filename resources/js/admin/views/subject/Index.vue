<template>
  <div class="flex flex-col">
    <div class="flex items-center mb-4">
      <h1 class="text-2xl font-semibold text-gray-900">科目分类 <span class="text-lg font-normal">列表</span></h1>
    </div>
    <div class="flex flex-col py-4">
      <div class="flex flex-col sm:flex-row items-center justify-between mb-5">
        <div class="w-full sm:w-1/2 mb-4 sm:mb-0 -mx-2">
          <div class="px-0 sm:px-2">
            <button type="button" class="inline-flex items-center justify-center font-medium leading-tight shadow focus:outline-none focus:shadow-outline-teal rounded-md px-5 py-2 bg-teal-500 border border-teal-500 text-white" @click="handleCreate">添加科目</button>
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
      <div class="shadow rounded-md bg-white overflow-hidden px-5">
        <t-table :columns="columns" :data="subjectList" :loading="isLoading">
          <template #directory="{row}">
            <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800" v-if="row.is_directory">是</span>
            <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800" v-else>否</span>
          </template>
          <template #action="{row}">
            <div class="flex flex-wrap items-center">
              <button type="button" class="pr-3 text-teal-500 hover:text-teal-700 focus:outline-none" @click="handleEdit(row)">编辑</button>
              <button type="button" class="pr-3 text-red-500 hover:text-red-700 focus:outline-none" @click="handleDelete(row)">删除</button>
            </div>
          </template>
        </t-table>
        <div class="py-5" v-if="total > 0">
          <t-pagination :total="total" :page-size="pageSize" :current="currentPage" @page-change="changePage" @pagesize-change="changePageSize" show-total show-sizer show-quickjump/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { getSubjects, deleteSubjects } from "@/admin/api/subject"

  export default {
    name: "admin.subject.index",
    data () {
      return {
        filterForm: {},
        columns: [
          {
            label: 'ID',
            prop: 'id'
          },
          {
            label: '名称',
            prop: 'title',
            treeOpener: true
          },
          {
            label: '标识',
            prop: 'name'
          },
          {
            label: '层级',
            prop: 'level'
          },
          {
            label: '是否为目录',
            prop: 'is_directory',
            slot: 'directory'
          },
          {
            label: '创建时间',
            prop: 'created_at'
          },
          {
            label: '操作',
            prop: 'action',
            slot: 'action'
          }
        ],
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
