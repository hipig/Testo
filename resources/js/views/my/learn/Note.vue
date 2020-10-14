<template>
  <div class="bg-white shadow rounded-lg">
    <learn-tab active="note"/>
    <div class="p-5">
      <t-upload
        class="flex items-center"
        action="https://jsonplaceholder.typicode.com/posts/"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :before-remove="beforeRemove"
        multiple
        :limit="3"
        :on-exceed="handleExceed"
        :file-list="fileList"
        list-type="picture-card">
        <div class="w-24 h-24 bg-gray-100 inline-flex items-center justify-center rounded-sm cursor-pointer">
          <svg fill="none" viewBox="0 0 24 24" class="w-7 h-7 stroke-current text-gray-400">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
          </svg>
        </div>
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
        this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
      },
      beforeRemove(file, fileList) {
        return alert(`确定移除 ${ file.name }？`)
      }
    }
  }
</script>
