<template>
  <div class="flex flex-wrap -mx-3">
    <div class="w-1/2 px-3 mb-5" v-for="(item, index) in list" :key="index">
      <div class="bg-white shadow rounded-lg p-5">
        <div class="mb-8 flex justify-between">
          <div class="text-base text-gray-900">{{ item.title }}</div>
          <div class="text-gray-400"><span class="text-teal-500">{{ item.learned_num }}</span>/{{ item.total }}</div>
        </div>
        <div class="flex items-center justify-between">
          <div class="text-gray-400">
            <span class="mr-5">总分： {{ item.score }}分</span>
            <span>时间：{{ item.minutes }}分</span>
          </div>
          <button type="button" class="px-3 h-8 flex items-center justify-center border-2 border-yellow-500 text-yellow-500 bg-yellow-50 rounded focus:outline-none" @click="handle(item.id)">开始考试</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "ExamList",
    props: {
      list: {
        type: Array,
        default: []
      }
    },
    methods: {
      handle(id) {
        console.log(id)
        this.$router.push({name: 'models.exam', params: {id: 1}})
      }
    }
  }
</script>
