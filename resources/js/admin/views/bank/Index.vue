<template>
  <div class="flex flex-col">
    <div class="flex items-center mb-4">
      <h1 class="text-2xl font-semibold text-gray-900">题库 <span class="text-lg font-normal">列表</span></h1>
    </div>
    <div class="flex flex-col py-4">
      <div class="shadow rounded-md bg-white overflow-hidden">
        <div class="px-6 py-3 bg-gray-50">
          <div class="flex flex-col sm:flex-row items-center justify-between">
            <div class="flex flex-wrap w-full sm:w-1/2 mb-4 sm:mb-0 -mx-2">
              <div class="px-2">
                <button type="button" class="inline-flex items-center justify-center font-medium leading-tight shadow focus:outline-none focus:shadow-outline-teal rounded-md px-5 py-2 bg-teal-500 border border-teal-500 text-white" @click="handleCreate">添加题库</button>
              </div>
              <div class="px-2">
                <button type="button" class="inline-flex items-center justify-center font-medium leading-tight shadow focus:outline-none focus:shadow-outline-red rounded-md px-5 py-2 bg-white border border-red-500 text-red-500" :class="[!isSelected ? 'opacity-75 border-red-400 cursor-not-allowed': 'border-red-500']" :disabled="!isSelected" @click="handleBatchDelete">
                  <svg class="w-4 h-4 stroke-current -ml-1" fill="none" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                  </svg>
                  <span>批量删除</span>
                </button>
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
        </div>
        <div class="px-6">
          <t-table :columns="columns" :data="bankList" :loading="isLoading" @select="selectRow">
            <template #type="{row}">
              <span class="font-semibold">{{ bankTypeMap[row.type] }}</span>
            </template>
            <template #group="{row}">
              {{ row.is_group ? '是' : '否' }}
            </template>
            <template #status="{row}">
              <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800" v-if="row.is_free">免费</span>
              <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800" v-else>￥{{ row.price }}</span>
            </template>
            <template #action="{row}">
              <div class="flex flex-wrap items-center">
                <button type="button" class="pr-3 text-teal-500 hover:text-teal-700 focus:outline-none" @click="handleEdit(row)">编辑</button>
                <button type="button" class="pr-3 text-red-500 hover:text-red-700 focus:outline-none" @click="handleDelete(row)">删除</button>
                <button type="button" class="pr-3 text-yellow-500 hover:text-yellow-700 focus:outline-none" @click="handleEditItem(row)">管理试题</button>
                <button type="button" class="text-pink-500 hover:text-pink-700 focus:outline-none" @click="handleShowLearnRecord(row)">学习记录</button>
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
  import { getBanks, deleteBanks } from "@/admin/api/bank"
  import Bank from "@/admin/mixins/Bank"

  export default {
    name: "admin.subject.index",
    mixins: [Bank],
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
            label: '关联科目',
            prop: 'subject',
            render: (value) => {
              return value.title
            },
            width: 220
          },
          {
            label: '名称',
            prop: 'title',
            treeOpener: true
          },
          {
            label: '类型',
            prop: 'title',
            slot: 'type',
            width: 120
          },
          {
            label: '是否分组',
            prop: 'is_group',
            slot: 'group',
            width: 120
          },
          {
            label: '是否免费',
            prop: 'is_free',
            slot: 'status',
            width: 120
          },
          {
            label: '创建时间',
            prop: 'created_at',
            width: 190
          },
          {
            label: '操作',
            prop: 'action',
            slot: 'action',
            width: 280
          }
        ],
        bankList: [],
        checks: [],
        currentPage: this.$route.query.page || 1,
        pageSize: 10,
        total: 0,
        isLoading: null
      }
    },
    computed: {
      isSelected() {
        return this.checks.length !== 0
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
      selectRow(checks) {
        this.checks = checks
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
      handleEditItem(item) {
        this.$router.push({name: 'admin.bank.item.edit', params: {id: item.id}})
      },
      handleShowLearnRecord(row) {

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
      },
      handleBatchDelete() {

      },
    }
  }
</script>
