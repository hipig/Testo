<template>
  <div class="bg-white px-4 relative" :class="{'shadow-sm': currentMenu !== 'home'}">
    <div class="flex items-center justify-between mx-auto max-w-6xl">
      <a href="/" class="flex items-center py-2">
        <span class="text-2xl text-teal-500 font-semibold">Testo</span>
      </a>
      <div class="flex-1 flex items-center justify-between ml-12 py-4">
        <div class="text-sm">
          <router-link :to="{name: 'home'}" class="mr-8 py-2 inline-block font-medium hover:text-teal-500" :class="{'menu-active text-teal-500': currentMenu === 'home'}">首页</router-link>
          <router-link :to="{name: 'subjects.index'}" class="mr-8 py-2 inline-block font-medium hover:text-teal-500" :class="{'menu-active text-teal-500': currentMenu === 'subjects'}">题库</router-link>
          <router-link :to="{name: 'articles.index'}" class="mr-8 py-2 inline-block font-medium hover:text-teal-500" :class="{'menu-active text-teal-500': currentMenu === 'articles'}">资讯</router-link>
          <router-link :to="{name: 'about.index'}" class="py-2 inline-block font-medium hover:text-teal-500" :class="{'menu-active text-teal-500': currentMenu === 'about'}">关于我们</router-link>
        </div>
        <template v-if="isLogin">
          <dropdown>
            <div class="flex items-center cursor-pointer">
              <img class="w-7 h-7 rounded-full border border-gray-200" :src="userInfo.avatar_url" alt="userInfo.name" v-if="userInfo.avatar_url">
              <span class="inline-flex items-center justify-center h-6 w-6 rounded-full overflow-hidden bg-gray-100" v-else>
                <svg class="w-full h-full fill-current text-gray-300" viewBox="0 0 24 24">
                  <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </span>
              <span class="ml-1 leading-none">{{ userInfo.name }}</span>
            </div>
            <div slot="dropdown-menu" class="w-48 rounded-lg shadow-lg bg-white border-t border-gray-100">
              <div class="py-1">
                <router-link :to="{name: 'my.learn'}" class="block px-4 py-2 text-sm leading-5 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900">学习记录</router-link>
                <router-link :to="{name: 'my'}" class="block px-4 py-2 text-sm leading-5 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900">修改资料</router-link>
              </div>
              <div class="border-t border-gray-100"></div>
              <div class="py-1">
                <div class="block px-4 py-2 text-sm leading-5 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900" @click="handleLogout">退出</div>
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
          subjects: ['subjects.index', 'subjects.show', 'mode.exercise', 'mode.test', 'mode.exam', 'quiz.result', 'quiz.result.detail'],
          articles: ['articles.index', 'articles.show'],
          about: ['about.index']
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
        this.$Dialog.confirm('是否退出登录？', '温馨提示')
          .then(_ => {
            this.logout()
              .then(() => {
                this.$router.go(0)
              })
          })
          .catch(_ => {})
      },
    }
  }
</script>
