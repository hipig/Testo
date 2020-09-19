<template>
  <div class="flex flex-col">
    <div class="mb-3" v-for="(item, index) in list" :key="index">
      <div class="bg-white shadow rounded-lg">
        <div class="py-5 pl-32 pr-5 flex items-center border-b border-gray-100">
          <div class="flex-1 mr-5 relative">
            <div class="text-gray-900 text-base">{{ item.title }}</div>
            <div class="text-gray-400 mb-1">共{{ item.total }}题</div>
            <div class="absolute top-0 left-0 -ml-32 py-2 w-28 flex items-center justify-center rounded-tr-full rounded-br-full text-base" :class="{'text-white bg-teal-500': index === 0, 'bg-gray-100': index !== 0}">{{ item.date }}</div>
          </div>
          <button type="button" class="px-3 h-8 flex items-center justify-center text-white bg-gradient-to-r from-teal-400 to-teal-500 rounded focus:outline-none" @click="handle(item.id)">马上练习</button>
        </div>
        <div class="pl-32 py-5 pr-5">
          <div class="-mb-5">
            <div class="mb-5 flex items-center" v-for="(v, k) in item.questions" :key="k">
              <div class="text-teal-500 mr-1">[{{ types[v.type] }}]</div>
              <div class="text-gray-400">{{ v.title }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "DailyList",
    props: {
      list: {
        type: Array,
        default: []
      }
    },
    data () {
      return {
        types: {
          1: '单选题',
          2: '多选题',
          3: '判断题',
          4: '填空题',
          5: '问答题'
        }
      }
    },
    methods: {
      handle(id) {
        console.log(id)
      }
    }
  }
</script>
