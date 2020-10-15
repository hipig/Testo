<template>
  <div class="bg-white shadow rounded-lg">
    <learn-tab active="note"/>
    <div class="p-5">
      <t-upload
        class="w-64"
        :headers="{'Authorization': 'Bearer ' + $store.getters['user/token']}"
        :action="uploadUrl"
        :data="{type: 'image'}"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :before-remove="beforeRemove"
        multiple
        :limit="3"
        :on-exceed="handleExceed"
        :file-list="fileList"
        list-type="picture-card">
        <div class="flex flex-col items-center justify-center">
          <svg class="w-12 h-12 stroke-current text-gray-400" fill="none" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
          </svg>
          <div class="mt-1">将文件拖到此处，或点击上传</div>
        </div>
        <div class="mt-2 text-xs" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
      </t-upload>
    </div>
  </div>

</template>

<script>
import LearnTab from "./LearnTab"

export default {
    name: "my.note",
    components: {
      LearnTab
    },
    data() {
      return {
        uploadUrl: window.config.api_url + '/uploads',
        fileList: [
          {
            name: 'food.jpeg',
            url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
          },
          {
            name: 'food2.jpeg',
            url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
          }
        ]
      }
    },
    methods: {
      handleRemove(file, fileList) {
        console.log(file, fileList)
      },
      handlePreview(file) {
        console.log(file)
      },
      handleExceed(files, fileList) {
        this.$Message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
      },
      beforeRemove(file, fileList) {
        return this.$Dialog.confirm({
          title: '提示',
          content: `确定移除 ${file.name}？`
        })
      }
    }
  }
</script>
