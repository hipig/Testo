<template>
  <div class="flex flex-col">
    <div class="flex items-center mb-4">
      <h1 class="text-2xl font-semibold text-gray-900">题库试题 <span class="text-lg font-normal">管理</span></h1>
    </div>
    <div class="flex flex-col py-4">
      <div class="shadow rounded-md bg-white overflow-hidden">
        <div class="px-6 pt-5 pb-1">
          <div class="flex flex-col sm:flex-row items-center justify-between">
            <div class="flex flex-wrap w-full sm:w-1/2 mb-4 sm:mb-0 -mx-2">
              <template v-if="bank.is_group">
                <div class="px-2">
                  <button type="button" class="inline-flex items-center justify-center font-medium leading-tight shadow focus:outline-none focus:shadow-outline-teal rounded-md px-5 py-2 bg-teal-500 border border-teal-500 text-white">
                    <svg class="w-4 h-4 stroke-current -ml-1 mr-1" fill="none" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <span>添加分组</span>
                  </button>
                </div>
              </template>
              <template v-else>
                <div class="px-2">
                  <button type="button" class="inline-flex items-center justify-center font-medium leading-tight shadow focus:outline-none focus:shadow-outline-teal rounded-md px-5 py-2 bg-teal-500 border border-teal-500 text-white">
                    <svg class="w-4 h-4 stroke-current -ml-1 mr-1" fill="none" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path>
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
                    <svg class="w-4 h-4 stroke-current -ml-1 mr-1" fill="none" viewBox="0 0 24 24">
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
              <div class="inline-flex flex-wrap rounded-md shadow" :class="[isCreate ? '' : 'opacity-75']">
                <button type="button" class="inline-flex items-center justify-center font-medium leading-snug focus:outline-none rounded-l-md px-3 py-1 border" :class="[!bank.is_group ? 'bg-teal-500 border-teal-500 text-white' : 'bg-white border-r-0', isCreate ? '' : 'cursor-not-allowed']" :disabled="!isCreate" @click="bank.is_group = false">标准模式</button>
                <button type="button" class="inline-flex items-center justify-center font-medium leading-snug focus:outline-none rounded-r-md px-3 py-1 bg-white border" :class="[bank.is_group ? 'bg-teal-500 border-teal-500 text-white' : 'bg-white border-l-0', isCreate ? '' : 'cursor-not-allowed']" :disabled="!isCreate" @click="bank.is_group = true">分组模式</button>
              </div>
            </div>
          </div>
        </div>
        <div class="px-6">
          <t-table :columns="itemColumns" :data="bankItemList" :loading="isLoading">
            <template #title="{row}">
              <div v-if="bank.is_group">测试标题</div>
              <div class="flex items-start" v-else>
                <span class="border border-green-500 text-green-500 text-center px-2 rounded mr-2">{{ questionTypes[row.question_type].name }}</span>
                <span class="flex-1 min-w-0 truncate">{{ row.question.title }}</span>
              </div>
            </template>
            <template #action="{row}">
              <div class="flex flex-wrap items-center">
                <button type="button" class="pr-3 text-teal-500 hover:text-teal-700 focus:outline-none" @click="handleEditScore(row)">修改分数</button>
                <button type="button" class="pr-3 text-red-500 hover:text-red-700 focus:outline-none" @click="handleRemove(row)">移除</button>
              </div>
            </template>
          </t-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { showBanks } from "@/admin/api/bank"
  import QuestionType from "@/mixins/QuestionType"

  export default {
    name: "admin.bank.item.form",
    mixins: [QuestionType],
    data () {
      return {
        id: this.$route.params.id || 0,
        bank: {},
        bankItemList: [],
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
            label: '操作',
            prop: 'action',
            slot: 'action',
            width: 160
          }
        ],
        isLoading: null
      }
    },
    computed: {
      isCreate() {
        return this.id === 0
      },
    },
    mounted() {
      this.showBanks()
    },
    methods: {
      showBanks() {
        showBanks(this.id)
          .then((res) => {
            this.bank = res
            this.bankItemList = res.items
          })
      },

      handleEditScore(item) {

      },
      handleRemove(item) {

      }
    }
  }
</script>
