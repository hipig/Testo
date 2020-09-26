<template>
  <div class="flex flex-col">
    <template v-if="list.length > 0">
      <div class="mb-3" v-for="(item, index) in list" :key="index">
        <div class="bg-white shadow rounded-lg">
          <div class="py-5 pl-32 pr-5 flex items-center border-b border-gray-100">
            <div class="flex-1 mr-5 relative">
              <div class="text-gray-900 text-base">{{ item.title }}</div>
              <div class="text-gray-400 mb-1">共{{ item.total_count }}题</div>
              <div class="absolute top-0 left-0 -ml-32 py-2 leading-none w-28 flex items-center justify-center rounded-tr-full rounded-br-full text-base" :class="{'text-white bg-teal-500': index === 0, 'bg-gray-200': index !== 0}">{{ dayjs(item.created_at).format('YYYY-MM-DD') }}</div>
            </div>
            <button type="button" class="px-4 h-8 flex items-center justify-center text-white bg-gradient-to-r from-teal-400 to-teal-500 rounded focus:outline-none" @click="handle(item.id)">马上练习</button>
          </div>
          <div class="pl-32 py-5 pr-5">
            <div class="-mb-5">
              <div class="mb-5 flex flex-wrap items-baseline" v-for="(v, k) in item.items" :key="k">
                <div class="text-teal-500 flex mr-2">[{{ types[v.question.type] }}]</div>
                <div class="text-gray-400 flex-1 flex">{{ v.question.title }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
    <div class="flex items-center justify-center text-gray-400 py-20 bg-white shadow rounded-lg text-base" v-else>还没有数据哦~</div>
  </div>
</template>

<script>
  import dayjs from 'dayjs'
  import { getDailyTests } from "@/api/bank"

  export default {
    name: "DailyList",
    props: {
      subjectId: {
        type: Number | String,
        default: 0
      }
    },
    data () {
      return {
        list: [],
        dayjs: dayjs,
        types: {
          1: '单选题',
          2: '多选题',
          3: '判断题',
          4: '填空题',
          5: '问答题'
        }
      }
    },
    created() {
      this.getDailyTestList()
    },
    methods: {
      getDailyTestList() {
        getDailyTests(this.subjectId)
          .then((res) => {
            this.list = res
          })
      },
      handle(id) {
        console.log(id)
      }
    }
  }
</script>
