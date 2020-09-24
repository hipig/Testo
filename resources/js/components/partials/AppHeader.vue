<template>
  <div class="bg-white px-4 relative" :class="{'shadow-sm': currentMenu !== 'home'}">
    <div class="flex items-center justify-between mx-auto max-w-6xl">
      <a href="/" class="flex items-center py-2">
        <span class="text-2xl text-teal-500 font-semibold">Testo</span>
      </a>
      <div class="flex-1 flex items-center justify-between ml-12 py-4">
        <div class="text-sm">
          <a href="/" class="mr-8 py-2 inline-block font-medium hover:text-teal-500" :class="{'menu-active text-teal-500': currentMenu === 'home'}">首页</a>
          <a href="/subjects" class="mr-8 py-2 inline-block font-medium hover:text-teal-500" :class="{'menu-active text-teal-500': currentMenu === 'subjects'}">题库</a>
          <a href="#" class="mr-8 py-2 inline-block font-medium hover:text-teal-500">资讯</a>
          <a href="#" class="py-2 inline-block font-medium hover:text-teal-500">关于我们</a>
        </div>
        <div class="text-sm">
          <a href="/auth/login" class="px-6 py-1 mr-1 inline-block font-medium hover:text-teal-500">登录</a>
          <a href="/auth/register" class="px-6 py-1 mr-1 inline-block font-medium text-teal-500 border border-teal-500 rounded">注册</a>
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
          subjects: ['subjects', 'subjects.show', 'models.exercise', 'models.test', 'models.exam']
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
