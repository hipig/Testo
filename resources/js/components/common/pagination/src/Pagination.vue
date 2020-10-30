<template>
  <!-- S 极简分页 -->
  <ul
    v-if="simple"
    class="flex flex-wrap items-center text-xs"
    >
    <li
      title="上一页"
      class="w-7 h-7 flex items-center justify-center cursor-pointer"
      :class="{
        'cursor-not-allowed opacity-50': this.currentPage === 1
      }"
      @click="handlePrev">
      <svg class="w-3 h-3 stroke-current" fill="none" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
      </svg>
    </li>
    <div class="flex flex-wrap items-center">
      <input type="text" class="w-7 h-7 mx-1 bg-gray-100 flex items-center text-center rounded focus:outline-none" :value="currentPage" @keydown="handleKeydown" @keyup="handleKeyup" @change="handleKeyup">
      <span class="mx-1">/</span>
      <span class="mx-1">{{ totalPage }}</span>
    </div>
    <li
      title="下一页"
      class="w-7 h-7 flex items-center justify-center cursor-pointer"
      :class="{
        'cursor-not-allowed opacity-50': this.currentPage === this.totalPage
      }"
      @click="handleNext">
      <svg class="w-3 h-3 stroke-current" fill="none" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
      </svg>
    </li>
  </ul>
  <!-- E 极简分页 -->
  <!-- S 基础分页 -->
  <ul
    v-else
    class="flex flex-wrap items-center text-xs"
    >
    <li class="mr-2" v-show="showTotal">
      <slot name="total">{{ `共 ${total} 条` }}</slot>
    </li>
    <li
      title="上一页"
      class="w-7 h-7 flex items-center justify-center rounded-md border border-gray-200 cursor-pointer mr-1"
      :class="{
        'cursor-not-allowed opacity-50': this.currentPage === 1
      }"
      @click="handlePrev">
      <svg class="w-3 h-3 stroke-current" fill="none" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
      </svg>
    </li>
    <template v-if="totalPage < 9">
      <li
        v-for="num in pageRange"
        class="w-7 h-7 flex items-center justify-center rounded-md border cursor-pointer mr-1"
        :class="[currentPage === num ? 'border-teal-500 bg-teal-500 text-white' : 'border-gray-200']"
        @click="changePage(num)">{{ num }}</li>
    </template>
    <template v-else>
      <li class="w-7 h-7 flex items-center justify-center rounded-md border cursor-pointer mr-1" :class="[currentPage === 1 ? 'border-teal-500 bg-teal-500 text-white' : 'border-gray-200']" @click="changePage(1)">1</li>
      <li class="w-7 h-7 flex items-center justify-center rounded-md border border-gray-200 cursor-pointer mr-1 " title="向后5页" v-if="currentPage > 4" @click="handleJumpPrev">
        <svg class="w-3 h-3 stroke-current" fill="none" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path>
        </svg>
      </li>
      <li class="w-7 h-7 flex items-center justify-center rounded-md border border-gray-200 cursor-pointer mr-1" v-if="currentPage > 3" @click="changePage(currentPage - 2)">{{ currentPage - 2 }}</li>
      <li class="w-7 h-7 flex items-center justify-center rounded-md border border-gray-200 cursor-pointer mr-1" v-if="currentPage > 2" @click="changePage(currentPage - 1)">{{ currentPage - 1 }}</li>
      <li class="w-7 h-7 flex items-center justify-center rounded-md border border-teal-500 bg-teal-500 text-white cursor-pointer mr-1" v-if="currentPage !== 1 && currentPage !== totalPage">{{ currentPage }}</li>
      <li class="w-7 h-7 flex items-center justify-center rounded-md border border-gray-200 cursor-pointer mr-1" v-if="currentPage < totalPage - 1" @click="changePage(currentPage + 1)">{{ currentPage + 1 }}</li>
      <li class="w-7 h-7 flex items-center justify-center rounded-md border border-gray-200 cursor-pointer mr-1" v-if="currentPage < totalPage - 2" @click="changePage(currentPage + 2)">{{ currentPage + 2 }}</li>
      <li class="w-7 h-7 flex items-center justify-center rounded-md border border-gray-200 cursor-pointer mr-1" title="向后5页" v-if="currentPage < totalPage - 3" @click="handleJumpNext">
        <svg class="w-3 h-3 stroke-current" fill="none" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path>
        </svg>
      </li>
      <li class="w-7 h-7 flex items-center justify-center rounded-md border cursor-pointer mr-1" v-if="totalPage > 1" :class="[currentPage === totalPage ? 'border-teal-500 bg-teal-500 text-white' : 'border-gray-200']" @click="changePage(totalPage)">{{ totalPage }}</li>
    </template>
    <li
      title="下一页"
      class="w-7 h-7 flex items-center justify-center rounded-md border border-gray-200 cursor-pointer mr-1"
      :class="{
        'cursor-not-allowed opacity-50': this.currentPage === this.totalPage
      }"
      @click="handleNext">
      <svg class="w-3 h-3 stroke-current" fill="none" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
      </svg>
    </li>
    <div v-if="showSizer" class="mr-2">
      <select class="form-select border border-gray-200 py-0 pr-7 h-7 text-xs focus:border-gray-200 focus:shadow-none" v-model="currentPageSize" @change="changeSize">
        <option v-for="item in pageSizeOpts" :key="item" :value="item">{{ `${item} 条/页` }}</option>
      </select>
    </div>
    <div class="flex flex-wrap items-center leading-none" v-if="showQuickjump">
      <div>前往</div>
      <input type="text" class="w-8 h-7 mx-2 border border-gray-200 flex items-center text-center rounded focus:outline-none" v-model="jumpPageNum" @keydown="handleKeydown" @keyup.enter="changePage()">
      <div>页</div>
    </div>
  </ul>
  <!-- E 基础分页 -->
</template>

<script>
  export default {
    name: 'TPagination',
    props: {
      current: {
        type: Number,
        default: 1
      },
      total: {
        type: Number,
        required: true,
        default: 0
      },
      pageSize: {
        type: Number,
        default: 10
      },
      simple: {
        type: Boolean,
        default: false
      },
      showTotal: {
        type: Boolean,
        default: false
      },
      showQuickjump: {
        type: Boolean,
        default: false
      },
      showSizer: {
        type: Boolean,
        default: false
      },
      pageSizeOpts: {
        type: Array,
        default () {
          return [10, 20, 30, 40]
        }
      }
    },
    data () {
      return {
        currentPage: this.current,
        currentPageSize: this.pageSize,
        jumpPageNum: this.current
      }
    },
    watch: {
      current (val) {
        this.currentPage = val
      },
      pageSize (val) {
        this.currentPageSize = val
      }
    },
    computed: {
      totalPage () {
        const num = Math.ceil(this.total / this.currentPageSize)
        return (num === 0) ? 1 : num
      },
      visiblePage () {
        return this.totalPage >= 5 ? 5 : this.totalPage
      },
      pageRange () {
        const range = []
        let start = 1
        if (this.currentPage + (this.visiblePage / 2) > this.totalPage) {
          start = this.totalPage - this.visiblePage + 1
          start = start > 0 ? start : 1
        } else if (this.currentPage - (this.visiblePage / 2) > 0) {
          start = Math.ceil(this.currentPage - (this.visiblePage / 2))
        }
        for (let i = 0; i < this.visiblePage && i < this.totalPage; i++) {
          range.push(start + i)
        }
        return range
      }
    },
    methods: {
      changePage (page) {
        let num = (page || this.jumpPageNum || 1) | 0
        num = num > this.totalPage ? this.totalPage : num
        num = num < 1 ? 1 : num
        if (this.currentPage !== num) {
          this.jumpPageNum = num
          this.currentPage = num
          this.$emit('page-change', num)
        }
      },
      handlePrev () {
        const page = this.currentPage
        if (page <= 1) return false
        this.changePage(page - 1)
      },
      handleNext () {
        const page = this.currentPage
        if (page >= this.totalPage) return false
        this.changePage(page + 1)
      },
      handleJumpPrev () {
        const page = this.currentPage - 5
        page ? this.changePage(page) : this.changePage(1)
      },
      handleJumpNext () {
        const page = this.currentPage + 5
        page > this.totalPage ? this.changePage(this.totalPage) : this.changePage(page)
      },
      handleKeydown (evt) {
        const key = evt.keyCode
        // 按键 0~9，空格，左右方向键
        if (!((key >= 48 && key <= 57) || (key >= 96 && key <= 105) || key === 8 || key === 37 || key === 39)) {
          evt.preventDefault()
        }
      },
      handleKeyup (evt) {
        const key = evt.keyCode
        const numVal = evt.target.value | 0
        if (key === 40) { // Up Arrow
          this.handlePrev()
        } else if (key === 38) { // Down Arrow
          this.handleNext()
        } else if (key === 13) { // Return
          let page = 1
          page = (numVal > this.totalPage) ? this.totalPage : numVal
          page = (numVal <= 0) ? 1 : numVal
          evt.target.value = page
          this.changePage(page)
        }
      },
      changeSize () {
        this.changePage(1)
        this.$emit('pagesize-change', this.currentPageSize)
      }
    }
  }
</script>
