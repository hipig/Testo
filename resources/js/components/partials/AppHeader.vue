<template>
  <div class="bg-white px-4 relative z-30" :class="{'shadow-sm': currentMenu !== 'home'}">
    <div class="flex items-center justify-between mx-auto max-w-6xl">
      <a href="/" class="flex items-center py-2">
        <span class="text-2xl text-teal-500">魔方题库</span>
      </a>
      <div class="flex-1 flex items-center justify-between ml-12 py-4">
        <div class="text-sm">
          <a href="/" class="mr-8 py-2 inline-block font-medium hover:text-teal-600 text-gray-600" :class="{'menu-active text-teal-500': currentMenu === 'home'}">首页</a>
          <a href="/subjects" class="mr-8 py-2 inline-block font-medium hover:text-teal-600 text-gray-600" :class="{'menu-active text-teal-500': currentMenu === 'subjects'}">题库</a>
          <a href="#" class="mr-8 py-2 inline-block font-medium hover:text-teal-500 text-gray-600">资讯</a>
          <a href="#" class="py-2 inline-block font-medium hover:text-teal-500 text-gray-600">关于我们</a>
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
        currentMenu: '',
        routerList: {
          home: ['home'],
          subjects: ['subjects', 'subjects.show', 'models.exercise', 'models.exam']
        }
      }
    },
    watch: {
      $route: {
        handler: function(route) {
          let routerList = this.routerList
          Object.keys(routerList).forEach(key => {
            if (routerList[key].indexOf(route.name) > -1) {
              this.currentMenu = key
              return true
            }
          })
        },
        immediate: true
      }
    },
  }
</script>
