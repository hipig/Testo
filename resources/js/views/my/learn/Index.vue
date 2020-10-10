<template>
  <div class="bg-white shadow rounded-lg">
    <learn-tab/>
    <div class="p-5">
      <div class="mb-5 flex items-center justify-between">
        <div class="flex items-center">
          <div class="mr-3">
            <select class="form-select bg-gray-100 border-0 rounded-lg w-48 text-sm py-3 leading-none focus:shadow-none" placeholder="请选择">
              <option value="">全部科目</option>
            </select>
          </div>
          <div>
            <select class="form-select bg-gray-100 border-0 rounded-lg w-48 text-sm py-3 leading-none focus:shadow-none text-sm" :class="[subjectSelected ? '' : 'text-gray-400 cursor-not-allowed']" :disabled="!subjectSelected" placeholder="请选择">
              <option value="">全部科目</option>
            </select>
          </div>
        </div>
        <div>
          <div class="relative">
            <label>
              <input type="text" placeholder="选择日期" class="pr-4 py-3 leading-none block w-full bg-gray-100 rounded-lg text-left appearance-none outline-none pl-12">
            </label>
            <div class="absolute left-0 top-0 bottom-0 w-12 flex items-center justify-center text-gray-400">
              <svg  class="stroke-current w-5 h-5" fill="none" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div>这是最近考试</div>
    </div>
  </div>
</template>

<script>
  import LearnTab from "./LearnTab"

export default {
  name: "my.learn.index",
  components: {
    LearnTab
  },
  data () {
    return {
      subjectSelected: false
    }
  }
}
</script>
