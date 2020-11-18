<template>
  <div class="min-h-screen bg-gray-50 flex items-center py-12 px-8">
    <div class="max-w-md w-full mx-auto">
      <div class="flex flex-col">
        <a href="/" class="block text-teal-500 text-2xl font-extrabold font-mono leading-none text-center">Testo</a>
        <p class="mt-3 text-center text-3xl text-gray-900 text-center">登录你的账户</p>
        <div class="mt-8">
          <div class="bg-white py-8 px-10 shadow rounded-lg">
            <div class="flex flex-col">
              <div class="mb-6">
                <div class="mb-1 leading-tight">用户名</div>
                <input type="text" v-model="loginForm.username" class="form-input w-full text-sm focus:shadow-outline-teal" placeholder="请输入用户名">
              </div>
              <div class="mb-4">
                <div class="mb-1 leading-tight">密码</div>
                <input type="password" v-model="loginForm.password" class="form-input w-full text-sm focus:shadow-outline-teal" placeholder="请输入密码">
              </div>
              <div class="mb-3 flex items-center justify-between">
                <label class="flex items-center">
                  <input type="checkbox" class="form-checkbox w-4 h-4 text-teal-500 focus:shadow-outline-teal">
                  <span class="ml-1">记住我</span>
                </label>
                <a href="#" class="text-sm inline-flex text-teal-500">忘记密码？</a>
              </div>
              <button type="button" class="w-full inline-flex items-center justify-center font-medium focus:outline-none focus:shadow-outline-teal rounded-md px-6 py-2 bg-teal-500 text-white text-base" @click="submitLogin">登录</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapActions } from "vuex"

  export default {
    name: "admin.login",
    data () {
      return {
        loginForm: {
          username: '',
          password: ''
        }
      }
    },
    methods: {
      ...mapActions({
        'login': 'adminUser/login',
        'getUserInfo': 'adminUser/getUserInfo',
      }),
      submitLogin() {
        this.login(this.loginForm)
          .then(() => {
            this.$Message.success('登录成功')
            this.getUserInfo()
            this.$router.push({name: 'admin', replace: true})
          })
      }
    }
  }
</script>
