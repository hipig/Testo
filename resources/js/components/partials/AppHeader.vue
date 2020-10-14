<template>
  <div class="bg-white px-4 relative" :class="{'shadow-sm': currentMenu !== 'home'}">
    <div class="flex items-center justify-between mx-auto max-w-6xl">
      <a href="/" class="flex items-center py-2">
        <span class="text-2xl text-teal-500 font-semibold">Testo</span>
      </a>
      <div class="flex-1 flex items-center justify-between ml-12 py-4">
        <div class="text-sm">
          <router-link :to="{name: 'home'}" class="mr-8 py-2 inline-block font-medium hover:text-teal-500" :class="{'menu-active text-teal-500': currentMenu === 'home'}">首页</router-link>
          <router-link :to="{name: 'subjects'}" class="mr-8 py-2 inline-block font-medium hover:text-teal-500" :class="{'menu-active text-teal-500': currentMenu === 'subjects'}">题库</router-link>
          <router-link to="#" class="mr-8 py-2 inline-block font-medium hover:text-teal-500">资讯</router-link>
          <router-link to="#" class="py-2 inline-block font-medium hover:text-teal-500">关于我们</router-link>
        </div>
        <template v-if="isLogin">
          <dropdown>
            <div class="flex items-center cursor-pointer">
              <svg class="w-6 h-6 fill-current text-gray-500" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clip-rule="evenodd"></path>
              </svg>
              <span class="ml-1 leading-none">{{ userInfo.name }}</span>
            </div>
            <div slot="dropdown-menu" class="w-48 rounded-lg shadow-lg bg-white border-t border-gray-100">
              <div class="py-1">
                <router-link :to="{name: 'my.learn'}" class="block px-4 py-2 text-sm leading-5 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900">学习记录</router-link>
                <router-link :to="{name: 'my'}" class="block px-4 py-2 text-sm leading-5 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900">修改资料</router-link>
              </div>
              <div class="border-t border-gray-100"></div>
              <div class="py-1">
                <a href="javascript:;" class="block px-4 py-2 text-sm leading-5 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900" @click="handleLogout">退出</a>
              </div>
            </div>
          </dropdown>
        </template>
        <template v-else>
          <div class="text-sm">
            <router-link :to="{name: 'auth.login'}" class="px-6 py-1 mr-1 inline-block font-medium hover:text-teal-500">登录</router-link>
            <router-link :to="{name: 'auth.register'}" class="px-6 py-1 mr-1 inline-block font-medium text-teal-500 border border-teal-500 rounded">注册</router-link>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import Dropdown from "../common/Dropdown"

  export default {
    name: "AppHeader",
    components: {
      Dropdown
    },
    data () {
      return {
        currentMenu: '',
        routerList: {
          home: ['home'],
          subjects: ['subjects', 'subjects.show', 'mode.exercise', 'mode.test', 'mode.exam', 'quiz.result', 'quiz.result.detail']
        }
      }
    },
    computed: {
      ...mapGetters({
        'token': 'user/token',
        'userInfo': 'user/userInfo'
      }),
      isLogin() {
        return this.token !== ''
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
      ...mapActions({
        'logout': 'user/logout'
      }),
      handleLogout() {
        this.logout()
          .then(() => {
            this.$router.go(0)
          })
      }
    }
  }
</script>
