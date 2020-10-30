<template>
  <div class="min-h-screen flex">
    <div class="hidden md:flex md:flex-shrink-0">
      <div class="bg-teal-800 w-64 flex flex-col">
        <div class="flex-1 flex flex-col pb-4">
          <div class="flex items-center flex-shrink-0 bg-teal-500 py-4 px-4 mb-4">
            <a href="/admin" class="text-white">
              <span class="text-xl font-semibold font-mono">Testo</span>
              <span class="text-lg ml-1">后台管理</span>
            </a>
          </div>
          <div class="flex-shrink-0 flex px-6 pt-1">
            <a href="#" class="flex-shrink-0 block focus:outline-none">
              <div class="flex items-center">
                <img class="w-9 h-9 rounded-full" :src="userInfo.avatar_url" alt="userInfo.name" v-if="userInfo.avatar_url">
                <div class="inline-flex items-center justify-center h-9 w-9 rounded-full bg-gray-100" v-else>
                  <svg class="w-6 h-6 fill-current text-gray-300" viewBox="0 0 24 24">
                    <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <div class="ml-3">
                  <p class="text-sm leading-5 font-medium text-white">{{ userInfo.name }}</p>
                  <p class="text-xs leading-4 font-medium text-teal-300 transition ease-in-out duration-150">修改资料</p>
                </div>
              </div>
            </a>
          </div>
          <nav class="flex-1 mt-5 bg-teal-800">
            <router-link :to="{name: 'admin.dashboard'}" class="group mb-1 flex items-center px-6 py-2 text-sm leading-6 focus:outline-none transition ease-in-out duration-150" :class="[currentMenu === 'dashboard' ? 'bg-teal-700 text-white' : 'text-teal-100 hover:text-white hover:bg-teal-700 focus:bg-teal-700']">
              <svg class="w-6 h-6 stroke-current" fill="none" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
              </svg>
              <span class="ml-2 leading-none">仪表盘</span>
            </router-link>
            <router-link :to="{name: 'admin.subject.index'}" class="group mb-1 flex items-center px-6 py-2 text-sm leading-6 focus:outline-none transition ease-in-out duration-150" :class="[currentMenu === 'subject' ? 'bg-teal-700 text-white' : 'text-teal-100 hover:text-white hover:bg-teal-700 focus:bg-teal-700']">
              <svg class="w-6 h-6 stroke-current" fill="none" viewBox="0 0 24 24">
                <path d="M12 14l9-5-9-5-9 5 9 5z"></path>
                <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"></path>
              </svg>
              <span class="ml-2 leading-none">科目分类</span>
            </router-link>
            <a href="#" class="group mb-1 flex items-center px-6 py-2 text-sm leading-6 focus:outline-none transition ease-in-out duration-150" :class="[currentMenu === 'bank' ? 'bg-teal-700 text-white' : 'text-teal-100 hover:text-white hover:bg-teal-700 focus:bg-teal-700']">
              <svg class="w-6 h-6 stroke-current" fill="none" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
              </svg>
              <span class="ml-2 leading-none">题库管理</span>
            </a>
            <a href="#" class="group mb-1 flex items-center px-6 py-2 text-sm leading-6 focus:outline-none transition ease-in-out duration-150" :class="[currentMenu === 'question' ? 'bg-teal-700 text-white' : 'text-teal-100 hover:text-white hover:bg-teal-700 focus:bg-teal-700']">
              <svg class="w-6 h-6 stroke-current" fill="none" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
              </svg>
              <span class="ml-2 leading-none">题目列表</span>
            </a>
            <a href="#" class="group mb-1 flex items-center px-6 py-2 text-sm leading-6 focus:outline-none transition ease-in-out duration-150" :class="[currentMenu === 'user' ? 'bg-teal-700 text-white' : 'text-teal-100 hover:text-white hover:bg-teal-700 focus:bg-teal-700']">
              <svg class="w-6 h-6 stroke-current" fill="none" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
              </svg>
              <span class="ml-2 leading-none">用户管理</span>
            </a>
            <a href="#" class="group mb-1 flex items-center px-6 py-2 text-sm leading-6 focus:outline-none transition ease-in-out duration-150" :class="[currentMenu === 'article' ? 'bg-teal-700 text-white' : 'text-teal-100 hover:text-white hover:bg-teal-700 focus:bg-teal-700']">
              <svg class="w-6 h-6 stroke-current" fill="none" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"></path>
              </svg>
              <span class="ml-2 leading-none">资讯公告</span>
            </a>
            <a href="#" class="group mb-1 flex items-center px-6 py-2 text-sm leading-6 focus:outline-none transition ease-in-out duration-150" :class="[currentMenu === 'about' ? 'bg-teal-700 text-white' : 'text-teal-100 hover:text-white hover:bg-teal-700 focus:bg-teal-700']">
              <svg class="w-6 h-6 stroke-current" fill="none" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
              <span class="ml-2 leading-none">关于我们</span>
            </a>
          </nav>
          <nav>
            <a href="#" class="group mb-1 flex items-center px-6 py-2 text-sm leading-6 focus:outline-none text-teal-100 hover:text-white hover:bg-teal-700 focus:bg-teal-700 transition ease-in-out duration-150">
              <svg class="w-6 h-6 stroke-current" fill="none" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
              <span class="ml-2 leading-none">个人设置</span>
            </a>
            <a href="#" class="group mb-1 flex items-center px-6 py-2 text-sm leading-6 focus:outline-none text-teal-100 hover:text-white hover:bg-teal-700 focus:bg-teal-700 transition ease-in-out duration-150">
              <svg class="w-6 h-6 stroke-current" fill="none" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
              </svg>
              <span class="ml-2 leading-none">退出登录</span>
            </a>
          </nav>
        </div>
      </div>
    </div>
    <div class="flex-1 min-w-0 flex flex-col">
      <div class="pt-3 sm:pt-4 lg:pt-6 px-4 sm:px-6 lg:px-8">
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "AdminLayout",
    data () {
      return {
        userInfo: this.$store.getters['adminUser/userInfo'],
        currentMenu: '',
        routerList: {
          dashboard : ['admin.dashboard'],
          subject : ['admin.subject.index', 'admin.subject.create', 'admin.subject.edit', 'admin.subject.show'],
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
  }
</script>
