<template>
  <div class="flex flex-col">
    <div class="flex items-center mb-4">
      <h1 class="text-2xl font-semibold text-gray-900">用户 <span class="text-lg font-normal">列表</span></h1>
    </div>
    <div class="flex flex-col py-4">
      <div class="shadow rounded-md bg-white overflow-hidden">
        <div class="px-6 py-3 bg-gray-50">
          <div class="flex flex-col sm:flex-row items-center justify-between">
            <div class="w-full sm:w-1/2 mb-4 sm:mb-0 -mx-2">

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
        </div>
        <div class="px-6">
          <t-table :columns="columns" :data="userList" :loading="isLoading">
            <template #action="{row}">
              <div class="flex flex-wrap items-center">
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
  </div>
</template>

<script>
import { getUsers, deleteUsers } from "@/admin/api/user"

export default {
  name: "admin.user.index",
  data () {
    return {
      filterForm: {},
      columns: [
        {
          label: 'ID',
          prop: 'id',
          width: 80
        },
        {
          label: '名称',
          prop: 'name'
        },
        {
          label: '邮箱地址',
          prop: 'email'
        },
        {
          label: '手机号码',
          prop: 'phone',
          width: 150
        },
        {
          label: '注册时间',
          prop: 'created_at',
          width: 190
        },
        {
          label: '操作',
          prop: 'action',
          slot: 'action',
          width: 100
        }
      ],
      userList: [],
      checks: [],
      currentPage: 1,
      pageSize: 10,
      total: 0,
      isLoading: null
    }
  },
  mounted() {
    this.getUserList()
  },
  methods: {
    getUserList() {
      this.isLoading = true

      let params = this.filterForm
      params.page = this.currentPage
      params.page_size = this.pageSize

      getUsers(params)
        .then((res) => {
          this.userList = res.data
          this.total = res.meta.total
        })
        .finally(_ => {
          this.isLoading = false
        })
    },
    changePage(page) {
      this.currentPage = page
      this.getUserList()
    },
    changePageSize(size) {
      this.pageSize = size
      this.getUserList()
    },
    handleDelete(item) {
      this.$Dialog.confirm('是否确认删除？', '温馨提示')
        .then(_ => {
          deleteUsers(item.id)
            .then(_ => {
              this.$Message.success('操作成功')
              this.getUserList()
            })
        })
        .catch(_ => {})
    }
  }
}
</script>
