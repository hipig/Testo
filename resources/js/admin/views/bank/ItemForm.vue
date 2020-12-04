<template>
  <div class="flex flex-col">
    <div class="flex items-center mb-4">
      <h1 class="text-2xl font-semibold text-gray-900">题库试题 <span class="text-lg font-normal">管理</span></h1>
    </div>
    <div class="flex flex-col py-4">
      <div class="shadow rounded-md bg-white overflow-hidden">
        <div class="px-6 py-3 bg-gray-50">
          <div class="flex flex-col sm:flex-row items-center justify-between">
            <div class="flex flex-wrap w-full sm:w-1/2 mb-4 sm:mb-0 -mx-2">
              <template v-if="bank.is_group">
                <div class="px-2">
                  <button type="button" class="inline-flex items-center justify-center font-medium leading-tight shadow focus:outline-none focus:shadow-outline-teal rounded-md px-5 py-2 bg-teal-500 border border-teal-500 text-white">
                    <svg class="w-4 h-4 stroke-current -ml-1" fill="none" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                    </svg>
                    <span>添加分组</span>
                  </button>
                </div>
                <div class="px-2">
                  <button type="button" class="inline-flex items-center justify-center font-medium leading-tight shadow focus:outline-none focus:shadow-outline-teal rounded-md px-5 py-2 bg-white border border-teal-500 text-teal-500">
                    <span>试题去重</span>
                  </button>
                </div>
              </template>
              <template v-else>
                <div class="px-2">
                  <button type="button" class="inline-flex items-center justify-center font-medium leading-tight shadow focus:outline-none focus:shadow-outline-teal rounded-md px-5 py-2 bg-teal-500 border border-teal-500 text-white">
                    <svg class="w-4 h-4 stroke-current -ml-1" fill="none" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                    </svg>
                    <span>添加试题</span>
                  </button>
                </div>
                <div class="px-2">
                  <button type="button" class="inline-flex items-center justify-center font-medium leading-tight shadow focus:outline-none focus:shadow-outline-teal rounded-md px-5 py-2 bg-white border border-teal-500 text-teal-500">
                    <span>试题去重</span>
                  </button>
                </div>
                <div class="px-2">
                  <button type="button" class="inline-flex items-center justify-center font-medium leading-tight shadow focus:outline-none focus:shadow-outline-red rounded-md px-5 py-2 bg-white border border-red-500 text-red-500">
                    <svg class="w-4 h-4 stroke-current -ml-1" fill="none" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                    </svg>
                    <span>批量移除</span>
                  </button>
                </div>
                <div class="px-2">
                  <button type="button" class="inline-flex items-center justify-center font-medium leading-tight shadow focus:outline-none focus:shadow-outline-teal rounded-md px-5 py-2 bg-white border border-teal-500 text-teal-500">
                    <span>修改分数</span>
                  </button>
                </div>
              </template>
            </div>
            <div class="w-full sm:w-1/2 flex items-center justify-end">
              <div class="inline-flex flex-wrap rounded-md shadow">
                <button type="button" class="inline-flex items-center justify-center font-medium leading-snug focus:outline-none rounded-l-md px-3 py-1 border" :class="[!bank.is_group ? 'bg-teal-500 border-teal-500 text-white' : 'bg-white border-r-0']" @click="bank.is_group = false">标准模式</button>
                <button type="button" class="inline-flex items-center justify-center font-medium leading-snug focus:outline-none rounded-r-md px-3 py-1 bg-white border" :class="[bank.is_group ? 'bg-teal-500 border-teal-500 text-white' : 'bg-white border-l-0']" @click="bank.is_group = true">分组模式</button>
              </div>
            </div>
          </div>
        </div>
        <div class="px-6">
          <template v-if="bank.is_group">
            <t-table :columns="groupColumns" :data="bankItemList" children-key="items" :loading="isLoading">
              <template #title="{row}">
                <span v-if="row._level === 0">{{ row.title }}</span>
                <span class="truncate" v-else>{{ row.question.title }}</span>
              </template>
              <template #action="{row}">
                <div class="flex flex-wrap items-center">
                  <template v-if="row._level === 0">
                    <button type="button" class="pr-3 text-teal-500 hover:text-teal-700 focus:outline-none" @click="handleAddItem(row)">添加题目</button>
                    <button type="button" class="pr-3 text-teal-500 hover:text-teal-700 focus:outline-none" @click="handleBatchUpdateScore(row)">修改分数</button>
                    <button type="button" class="text-red-500 hover:text-red-700 focus:outline-none" @click="handleRemoveGroup(row)">移除分组</button>
                  </template>
                  <template v-else>
                    <button type="button" class="pr-3 text-teal-500 hover:text-teal-700 focus:outline-none" @click="handleUpdateScore(row)">修改分数</button>
                    <button type="button" class="text-red-500 hover:text-red-700 focus:outline-none" @click="handleRemove(row)">移除题目</button>
                  </template>
                </div>
              </template>
            </t-table>
          </template>
          <template v-else>
            <t-table :columns="itemColumns" :data="bankItemList" :loading="isLoading">
              <template #title="{row}">
                <div class="flex items-start">
                  <span class="border text-center px-2 rounded mr-2" :class="[getQuestionTypeClasses(row.question_type)]">{{ questionTypes[row.question_type].name }}</span>
                  <span class="flex-1 min-w-0 truncate">{{ row.question.title }}</span>
                </div>
              </template>
              <template #action="{row}">
                <div class="flex flex-wrap items-center">
                  <button type="button" class="pr-3 text-teal-500 hover:text-teal-700 focus:outline-none" @click="handleEditScore(row)">修改分数</button>
                  <button type="button" class="text-red-500 hover:text-red-700 focus:outline-none" @click="handleRemove(row)">移除</button>
                </div>
              </template>
            </t-table>
          </template>
          <div class="py-5" v-if="total > 0">
            <t-pagination :total="total" :page-size="pageSize" :current="currentPage" @page-change="changePage" @pagesize-change="changePageSize" show-total show-sizer show-quickjump/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { showBanks, showBankItems } from "@/admin/api/bank"
  import QuestionType from "@/mixins/QuestionType"

  export default {
    name: "admin.bank.item.form",
    mixins: [QuestionType],
    data () {
      return {
        id: this.$route.params.id || 0,
        bank: {},
        bankItemList: [],
        groupColumns: [
          {
            label: 'ID',
            prop: 'id',
            width: 80
          },
          {
            label: '标题',
            prop: 'title',
            slot: 'title',
            treeOpener: true
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
            width: 250
          }
        ],
        itemColumns: [
          {
            label: 'ID',
            prop: 'id',
            width: 80
          },
          {
            label: '标题',
            prop: 'title',
            slot: 'title'
          },
          {
            label: '分数',
            prop: 'score',
            align: 'center',
            width: 80
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
            width: 160
          }
        ],
        currentPage: 1,
        pageSize: 10,
        total: 0,
        isLoading: null
      }
    },
    mounted() {
      this.showBanks()
      this.showBankItems()
    },
    methods: {
      showBanks() {
        showBanks(this.id)
          .then((res) => {
            this.bank = res
          })
      },
      showBankItems() {
        this.isLoading = true

        showBankItems(this.id, {page: this.currentPage, page_size: this.pageSize})
          .then((res) => {
            this.bankItemList = res.data
            this.total = res.meta.total
          })
          .finally(_ => {
            this.isLoading = false
          })
      },
      changePage(page) {
        this.currentPage = page
        this.showBankItems()
      },
      changePageSize(size) {
        this.pageSize = size
        this.showBankItems()
      },
      handleUpdateScore(item) {

      },
      handleBatchUpdateScore(item) {

      },
      handleAddItem(item) {

      },
      handleRemoveGroup(item) {

      },
      handleRemove(item) {

      }
    }
  }
</script>
