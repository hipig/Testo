<template>
  <div class="pt-36 pb-5 px-4">
    <div class="max-w-6xl mx-auto">
      <div class="flex justify-center">
        <div class="max-w-md w-full">
          <div class="shadow w-full rounded-lg bg-white overflow-hidden w-full block">
            <div class="p-8">
              <p class="mb-1 text-center text-xl md:text-2xl font-bold leading-tight tracking-tight">欢迎登录</p>
              <p class="mb-6 text-center text-sm text-gray-500 leading-normal">请输入您的手机号码和密码</p>
              <div>
                <div class="mb-4 relative">
                  <label>
                    <input type="text" v-model="loginForm.phone" placeholder="手机号码" class="pr-4 py-3 leading-normal block w-full bg-gray-100 rounded-lg text-left appearance-none outline-none pl-12">
                  </label>
                  <div class="absolute left-0 top-0 bottom-0 w-12 flex items-center justify-center text-gray-400">
                    <svg fill="none" class="stroke-current w-6 h-6" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                    </svg>
                  </div>
                </div>
                <div class="mb-4 relative">
                  <label>
                    <input type="password" v-model="loginForm.password" placeholder="密码" class="pr-4 py-3 leading-normal block w-full bg-gray-100 rounded-lg text-left appearance-none outline-none pl-12" @keyup.enter="submitLogin">
                  </label>
                  <div class="absolute left-0 top-0 bottom-0 w-12 flex items-center justify-center text-gray-400">
                    <svg fill="none" class="stroke-current w-6 h-6" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                    </svg>
                  </div>
                </div>
                <div class="mb-4 flex items-center justify-end">
                  <a href="#" class="text-sm inline-flex text-teal-500">忘记密码？</a>
                </div>
                <button type="button" class="w-full inline-flex items-center justify-center font-medium focus:outline-none rounded-lg px-6 py-2 bg-teal-500 text-white text-base" @click="submitLogin">登录</button>
              </div>
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
    name: "auth.login",
    data () {
      return {
        loginForm: {
          phone: '',
          password: ''
        }
      }
    },
    methods: {
      ...mapActions({
        'login': 'user/login',
        'getUserInfo': 'user/getUserInfo',
      }),
      submitLogin() {
        this.login(this.loginForm)
          .then(() => {
            this.$Message.success('登录成功')
            this.getUserInfo()
            this.$router.push({path: '/', replace: true})
          })
      }
    }
  }
</script>
