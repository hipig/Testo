<template>
  <div class="bg-white px-4 relative z-30" :class="{'shadow-sm': currentRouteName !== 'home'}">
    <div class="flex items-center justify-between mx-auto max-w-6xl">
      <a href="/" class="flex items-center py-2">
        <span class="text-2xl text-teal-600">魔方题库</span>
      </a>
      <div class="flex-1 flex items-center justify-between ml-12 py-4">
        <div class="text-sm">
          <a href="/" class="mr-8 py-2 inline-block font-medium hover:text-teal-600 text-gray-600" :class="{'menu-active text-teal-600': currentRouteName === 'home'}">首页</a>
          <a href="/subjects" class="mr-8 py-2 inline-block font-medium hover:text-teal-600 text-gray-600" :class="{'menu-active text-teal-600': currentRouteName === 'subjects'}">题库</a>
          <a href="#" class="mr-8 py-2 inline-block font-medium hover:text-teal-600 text-gray-600">资讯</a>
          <a href="#" class="py-2 inline-block font-medium hover:text-teal-600 text-gray-600">关于我们</a>
        </div>
        <div class="text-sm">
          <a href="#" class="px-6 py-1 mr-1 inline-block font-medium text-gray-600 hover:text-teal-600">登录</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "AppHeader",
    data () {
      return {
        currentRouteName: '',
      }
    },
    watch: {
      $route: {
        handler: function(route) {
          this.currentRouteName = route.name
        },
        immediate: true
      }
    },
  }
</script>
