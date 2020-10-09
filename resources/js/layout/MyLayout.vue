<template>
  <div class="py-5 px-4">
    <div class="max-w-6xl mx-auto">
      <div class="text-sm">
        <a href="/">首页</a>
        <span> / </span>
        <span class="text-gray-400">个人中心</span>
      </div>
      <div class="pt-5 pb-20">
        <div class="flex flex-wrap">
          <div class="w-56 max-h-screen mr-5">
            <div class="bg-white py-5 shadow rounded-lg">
              <div class="flex flex-col">
                <div class="flex items-center py-2 px-10 cursor-pointer" :class="[currentMenu === 'learn' ? 'bg-gray-100' : '']" @click="toRouter('my.learn')">
                  <svg class="w-7 h-7 stroke-current mr-2" :class="[currentMenu === 'learn' ? '' : 'text-gray-400']" fill="none" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 4v12l-4-2-4 2V4M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                  <span class="leading-none">学习记录</span>
                </div>
                <div class="flex items-center py-2 px-10 cursor-pointer" :class="[currentMenu === 'info' ? 'bg-gray-100' : '']" @click="toRouter('my.index')">
                  <svg class="w-7 h-7 stroke-current mr-2" :class="[currentMenu === 'info' ? '' : 'text-gray-400']" fill="none" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"></path>
                  </svg>
                  <span class="leading-none">基本资料</span>
                </div>
                <div class="flex items-center py-2 px-10 cursor-pointer">
                  <svg class="w-7 h-7 stroke-current text-gray-400 mr-2" fill="none" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                  </svg>
                  <span class="leading-none">退出</span>
                </div>
              </div>
            </div>
          </div>
          <div class="flex-1">
            <router-view/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MyLayout",
  data () {
    return {
      currentMenu: '',
      routerList: {
        learn: ['my.learn', 'my.exam', 'my.collect', 'my.error'],
        info: ['my.index', 'my.change.password']
      }
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        let routerKeys = Object.keys(this.routerList)
        let keyIndex = routerKeys.findIndex(key => this.routerList[key].indexOf(route.name) > -1)
        this.currentMenu = routerKeys[keyIndex]
      },
      immediate: true
    }
  },
  methods: {
    toRouter(name) {
      this.$router.push({name: name})
    }
  }
}
</script>
