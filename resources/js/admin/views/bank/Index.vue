<template>
  <div class="flex flex-col">
    <div class="flex items-center mb-4">
      <h1 class="text-2xl font-semibold text-gray-900">题库 <span class="text-lg font-normal">列表</span></h1>
    </div>
    <div class="flex flex-col py-4">
      <div class="flex flex-col sm:flex-row items-center justify-between mb-5">
        <div class="w-full sm:w-1/2 mb-4 sm:mb-0 -mx-2">
          <div class="px-0 sm:px-2">
            <button type="button" class="inline-flex items-center justify-center font-medium leading-snug shadow focus:outline-none focus:shadow-outline-teal rounded-md px-5 py-2 bg-teal-500 text-white" @click="handleCreate">添加题库</button>
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
                关联科目
              </th>
              <th class="px-6 py-3 text-gray-900 text-left font-semibold tracking-wider">
                名称
              </th>
              <th class="px-6 py-3 text-gray-900 text-left font-semibold tracking-wider">
                类型
              </th>
              <th class="px-6 py-3 text-gray-900 text-left font-semibold tracking-wider">
                是否免费
              </th>
              <th class="px-6 py-3 text-gray-900 text-left font-semibold tracking-wider">
                总分
              </th>
              <th class="px-6 py-3 text-gray-900 text-left font-semibold tracking-wider">
                时间限制（分）
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
            <tr v-for="(item, index) in bankList" :key="index">
              <td class="px-2 py-3 border-t border-gray-200 whitespace-no-wrap">
                <input type="checkbox" v-model="checks" :value="item" class="form-checkbox w-4 h-4 cursor-pointer text-teal-500 focus:shadow-outline-teal">
              </td>
              <td class="px-6 py-3 border-t border-gray-200 whitespace-no-wrap">{{ item.id }}</td>
              <td class="px-6 py-3 border-t border-gray-200 whitespace-no-wrap">{{ item.subject.title }}</td>
              <td class="px-6 py-3 border-t border-gray-200 whitespace-no-wrap">{{ item.title }}</td>
              <td class="px-6 py-3 border-t border-gray-200 whitespace-no-wrap font-semibold">{{ bankTypeMap[item.type] }}</td>
              <td class="px-6 py-3 border-t border-gray-200 whitespace-no-wrap">
                <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800" v-if="item.is_free">免费</span>
                <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800" v-else>￥{{ item.price }}</span>
              </td>
              <td class="px-6 py-3 border-t border-gray-200 whitespace-no-wrap">{{ item.total_score }}</td>
              <td class="px-6 py-3 border-t border-gray-200 whitespace-no-wrap">{{ item.time_limit }}</td>
              <td class="px-6 py-3 border-t border-gray-200 whitespace-no-wrap">{{ item.created_at }}</td>
              <td class="px-6 py-3 border-t border-gray-200 whitespace-no-wrap text-center leading-5">
                <div class="flex flex-wrap items-center -mx-1">
                  <button type="button" class="px-1 text-teal-500 hover:text-teal-700 focus:outline-none" @click="handleEdit(item)">编辑</button>
                  <button type="button" class="px-1 text-yellow-500 hover:text-yellow-700 focus:outline-none" @click="handleUpdateItem(item)">更新题目</button>
                  <button type="button" class="px-1 text-red-500 hover:text-red-700 focus:outline-none" @click="handleDelete(item)">删除</button>
                </div>
              </td>
            </tr>
            <tr>
              <td colspan="10">
                <empty-data :class="['shadow-none']" :show="isLoading === false && bankList.length === 0"/>
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
  import { getBanks, deleteBanks } from "@/admin/api/bank"
  import Bank from "@/admin/mixins/Bank"

  export default {
    name: "admin.subject.index",
    components: {
      EmptyData
    },
    mixins: [Bank],
    data () {
      return {
        filterForm: {},
        bankList: [],
        checks: [],
        currentPage: 1,
        pageSize: 10,
        total: 0,
        isLoading: null
      }
    },
    mounted() {
      this.getBankList()
    },
    methods: {
      getBankList() {
        this.isLoading = true

        let params = this.filterForm
        params.page = this.currentPage
        params.page_size = this.pageSize

        getBanks(params)
          .then((res) => {
            this.bankList = res.data
            this.total = res.meta.total
          })
          .finally(_ => {
            this.isLoading = false
          })
      },
      checkAll() {
        if (this.checks.length == this.bankList.length) {
          this.checks.splice(0, this.bankList.length)
        } else {
          this.checks = Object.assign([], this.bankList)
        }
      },
      changePage(page) {
        this.currentPage = page
        this.getBankList()
      },
      changePageSize(size) {
        this.pageSize = size
        this.getBankList()
      },
      handleCreate() {
        this.$router.push({name: 'admin.bank.create'})
      },
      handleEdit(item) {
        this.$router.push({name: 'admin.bank.edit', params: {id: item.id}})
      },
      handleDelete(item) {
        this.$Dialog.confirm('是否确认删除？', '温馨提示')
          .then(_ => {
            deleteBanks(item.id)
              .then(_ => {
                this.$Message.success('操作成功')
                this.getBankList()
              })
          })
          .catch(_ => {})

      }
    }
  }
</script>
