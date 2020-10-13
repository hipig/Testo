<template>
  <div class="flex flex-wrap">
    <div class="flex items-center cursor-pointer mr-8" v-if="showReport" @click="handleReport">
      <svg class="w-6 h-6 stroke-current text-gray-400 mr-1" fill="none" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
      </svg>
      <span class="text-base text-gray-900">纠错</span>
    </div>
    <div class="flex items-center cursor-pointer mr-8" v-if="showNote" @click="handleNote">
      <svg class="w-6 h-6 stroke-current text-gray-400 mr-1" fill="none" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
      </svg>
      <span class="text-base text-gray-900">写笔记</span>
    </div>
    <div class="flex items-center cursor-pointer" v-if="showCollect" @click="handleCollect">
      <svg class="w-6 h-6 mr-1" fill="none" viewBox="0 0 24 24" :class="[isCollect ? 'fill-current text-teal-500' : 'stroke-current text-gray-400']">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path>
      </svg>
      <span class="text-base text-gray-900">收藏</span>
    </div>
    <t-modal title="纠错" v-model="reportModalVisible" size="3xl" :mask-closable="false" @close="closeReportModal">
      <div class="flex flex-col">
        <div class="mb-5">
          <div class="flex flex-wrap -mx-3">
            <div class="w-1/6 px-3" v-for="(item, key) in reportTypes" :key="key">
              <div class="flex items-center justify-center py-2 rounded-sm cursor-pointer" :class="[reportForm.type == key ? 'text-white bg-teal-500' : 'bg-gray-100']" @click="changeReportType(key)">{{ item }}</div>
            </div>
          </div>
        </div>
        <div class="mb-5">
          <label class="flex w-full">
            <textarea v-model="reportForm.content" class="h-36 w-full px-4 py-3 bg-gray-100 rounded resize-none focus:outline-none" placeholder="请详细描述错误，以便我们尽快排查问题（必填项）"></textarea>
          </label>
        </div>
        <div class="mb-5">
          <div class="flex items-end">
            <div class="w-24 h-24 bg-gray-100 flex items-center justify-center rounded-sm cursor-pointer">
              <svg class="w-7 h-7 stroke-current text-gray-400" fill="none" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg>
            </div>
            <div class="text-gray-400 leading-none ml-4">最多上传3张图片</div>
          </div>
        </div>
      </div>
      <div slot="footer">
        <div class="flex items-center justify-end">
          <button type="button" class="inline-flex py-2 px-12 text-base rounded text-white bg-gradient-to-r from-teal-400 to-teal-500 focus:outline-none" @click="submitReport">提交</button>
        </div>
      </div>
    </t-modal>
    <t-modal title="写笔记" v-model="noteModalVisible" size="3xl" :mask-closable="false" @close="closeNoteModal">
      <div class="flex flex-col">
        <div class="mb-5">
          <label class="flex w-full relative">
            <textarea v-model="noteForm.content" class="h-36 w-full px-4 pt-3 pb-8 bg-gray-100 rounded resize-none focus:outline-none" placeholder="请输入笔记"></textarea>
            <span class="absolute bottom-0 right-0 pr-3 h-8 flex items-center text-gray-400">0/200</span>
          </label>
        </div>
        <div class="mb-5">
          <div class="flex items-end">
            <div class="w-24 h-24 bg-gray-100 flex items-center justify-center rounded-sm cursor-pointer">
              <svg class="w-7 h-7 stroke-current text-gray-400" fill="none" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg>
            </div>
            <div class="text-gray-400 leading-none ml-4">最多上传3张图片</div>
          </div>
        </div>
      </div>
      <div slot="footer">
        <div class="flex items-center justify-end">
          <button type="button" class="inline-flex py-2 px-12 text-base rounded text-white bg-gradient-to-r from-teal-400 to-teal-500 focus:outline-none" @click="submitNote">提交</button>
        </div>
      </div>
    </t-modal>
  </div>
</template>

<script>
  import TModal from "@/components/common/modal/Modal"

  export default {
    name: "QuestionTool",
    components: {
      TModal
    },
    props: {
      bankItemId: Number,
      questionId: Number,
      showReport: {
        type: Boolean,
        default: true
      },
      showNote: {
        type: Boolean,
        default: true
      },
      showCollect: {
        type: Boolean,
        default: true
      }
    },
    data () {
      return {
        reportModalVisible: false,
        noteModalVisible: false,
        isCollect: false,
        reportTypes: {
          1: '错别字',
          2: '答案有误',
          3: '排版错误',
          4: '图片模糊',
          5: '答案有异议',
          6: '其他错误',
        },
        reportForm: {
          type: 1,
          content: '',
          images: []
        },
        noteForm: {
          content: '',
          images: []
        }
      }
    },
    methods: {
      handleReport() {
        this.reportModalVisible = true
      },
      handleNote() {
        this.remarkModalVisible = true
      },
      handleCollect() {
        this.isCollect = !this.isCollect
      },
      closeReportModal() {
        this.reportModalVisible = false
      },
      closeNoteModal() {
        this.noteModalVisible = false
      },
      changeReportType(type) {
        this.reportForm.type = type
      },
      submitReport() {
        let params = this.reportForm
        params.bank_item_id = this.bankItemId
      },
      submitNote() {
        let params = this.noteForm
        params.bank_item_id = this.bankItemId
      }
    }
  }
</script>
