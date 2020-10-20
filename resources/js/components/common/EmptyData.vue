<template>
  <div class="flex flex-col items-center justify-center text-gray-400 bg-white shadow rounded-lg pt-8 pb-16" v-if="show">
    <embed class="w-48 h-48" :src="noData" type="image/svg+xml" />
    <div>{{ text }}</div>
  </div>
</template>

<script>
  import noData from "@/assets/images/no-data.svg"

  export default {
    name: "EmptyData",
    props: {
      show: {
        type: Boolean,
        default: true
      },
      text: {
        type: String,
        default: '还没有数据哦~'
      }
    },
    data () {
      return {
        noData
      }
    }
  }
</script>
