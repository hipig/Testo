<template>
  <div class="flex flex-col">
    <div class="flex items-center mb-4">
      <h1 class="text-2xl font-semibold text-gray-900">题库试题 <span class="text-lg font-normal">管理</span></h1>
    </div>
    <div class="flex flex-col py-4">
      <div class="flex flex-col sm:flex-row items-center justify-between mb-5">
        <div class="flex flex-wrap w-full sm:w-1/2 mb-4 sm:mb-0 -mx-2">
          <div class="px-2">
            <button type="button" class="inline-flex items-center justify-center font-medium leading-snug shadow focus:outline-none focus:shadow-outline-teal rounded-md px-5 py-2 bg-teal-500 border border-teal-500 text-white">添加试题</button>
          </div>
        </div>
        <div class="w-full sm:w-1/2 flex items-center justify-end">
          <div class="inline-flex flex-wrap rounded-md shadow">
            <button type="button" class="inline-flex items-center justify-center font-medium leading-snug focus:outline-none rounded-l-md px-3 py-1 border" :class="[mode === 'normal' ? 'bg-teal-500 border-teal-500 text-white' : 'bg-white border-r-0']" @click="mode = 'normal'">标准模式</button>
            <button type="button" class="inline-flex items-center justify-center font-medium leading-snug focus:outline-none rounded-r-md px-3 py-1 bg-white border" :class="[mode === 'group' ? 'bg-teal-500 border-teal-500 text-white' : 'bg-white border-l-0']" @click="mode = 'group'">分组模式</button>
          </div>
        </div>
      </div>
      <div class="shadow rounded-md bg-white overflow-hidden">
        <div class="px-6 py-8">

        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "admin.bank.item.form",
    data () {
      return {
        mode: 'normal'
      }
    }
  }
</script>
