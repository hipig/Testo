<template>
  <div class="px-5 border-b border-gray-100 flex flex-wrap leading-tight">
    <a href="/my/learn" class="py-3 mx-5 text-base border-b-2 border-transparent cursor-pointer" :class="[active === 'index' ? 'text-gray-900 text-lg border-teal-500' : 'text-gray-500 border-transparent']">最近学习</a>
    <a href="/my/exam" class="py-3 mx-5 text-base border-b-2 border-transparent cursor-pointer" :class="[active === 'exam' ? 'text-gray-900 text-lg border-teal-500' : 'text-gray-500 border-transparent']">我的考试</a>
    <a href="/my/note" class="py-3 mx-5 text-base border-b-2 border-transparent cursor-pointer" :class="[active === 'note' ? 'text-gray-900 text-lg border-teal-500' : 'text-gray-500 border-transparent']">笔记</a>
    <a href="/my/collect" class="py-3 mx-5 text-base border-b-2 border-transparent cursor-pointer" :class="[active === 'collect' ? 'text-gray-900 text-lg border-teal-500' : 'text-gray-500 border-transparent']">收藏</a>
  </div>
</template>

<script>
  export default {
    name: "LearnTab",
    props: {
      active: {
        type: String,
        default: 'index'
      }
    }
  }
</script>
