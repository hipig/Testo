<template>
  <div class="pt-36 pb-5 px-4">
    <div class="max-w-6xl mx-auto">
      <div class="flex justify-center">
        <div class="max-w-lg w-full">
          <div class="shadow w-full rounded-lg bg-white overflow-hidden w-full block">
            <div class="p-8">
              <p class="mb-2 text-2xl md:text-3xl text-gray-700 font-bold leading-tight tracking-tight">用户注册</p>
              <p class="mb-6 text-base text-gray-600 leading-normal">
                <span>已有账号？</span>
                <a href="/auth/login" class="inline-flex text-teal-500 border-teal-200">去登录</a>
              </p>
              <div>
                <div class="mb-4">
                  <label class="flex flex-col">
                    <span class="mb-1 text-base font-semibold">手机号码</span>
                    <input type="text" v-model="captchaForm.phone" placeholder="输入手机号码" class="px-5 p-3 leading-tight block w-full bg-gray-100 rounded-lg text-left appearance-none outline-none">
                  </label>
                </div>
                <div class="mb-4">
                  <label class="flex flex-col">
                    <span class="mb-1 text-base font-semibold">验证码</span>
                    <span class="flex items-center">
                      <input type="text" v-model="userForm.verification_code" placeholder="输入验证码" class="flex-1 mr-4 px-5 p-3 leading-tight bg-gray-100 rounded-lg text-left appearance-none outline-none">
                      <button type="button" class="inline-flex items-center justify-center font-medium focus:outline-none rounded-lg px-4 p-3 leading-tight text-white" :class="[times === 0 ? 'bg-teal-500' : 'bg-gray-400 opacity-50 cursor-not-allowed']" @click="showCaptchaModal">{{ verificationBtnText }}</button>
                    </span>
                  </label>
                </div>
                <div class="mb-4">
                  <label class="flex flex-col">
                    <span class="mb-1 text-base font-semibold">密码</span>
                    <input type="password" v-model="userForm.password" placeholder="输入密码" class="px-5 p-3 leading-tight block w-full bg-gray-100 rounded-lg text-left appearance-none outline-none">
                  </label>
                </div>
                <div class="mb-4">
                  <label class="flex flex-col">
                    <span class="mb-1 text-base font-semibold">重复密码</span>
                    <input type="password" v-model="userForm.password_confirmation" placeholder="输入重复密码" class="px-5 p-3 leading-tight block w-full bg-gray-100 rounded-lg text-left appearance-none outline-none">
                  </label>
                </div>
                <button type="button" class="inline-flex items-center justify-center font-medium focus:outline-none rounded-lg px-9 py-3 leading-tight bg-teal-500 text-white" @click="submitRegister">立即注册</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <t-modal v-model="captchaModalVisible" :show-head="false" :show-footer="false" :show-close="false" :mask-closable="false" size="md" @close="closeCaptchaModal">
      <div class="w-full py-8">
        <div class="mb-2">
          <img class="cursor-pointer" :src="captchaImg" width="120" height="36" alt="captcha" @click="submitCaptchas">
        </div>
        <div class="mb-3">
          <label>
            <input type="text" v-model="verificationForm.captcha_code" placeholder="输入验证码" class="px-5 p-3 leading-tight block w-full bg-gray-100 rounded-lg text-left appearance-none outline-none">
          </label>
        </div>
        <button type="button" class="inline-flex items-center justify-center font-medium focus:outline-none rounded-lg w-24 py-2 leading-normal bg-teal-500 text-white" @click="submitVerificationForm">提交</button>
      </div>
    </t-modal>
  </div>
</template>

<script>
  import TModal from "@/components/common/modal/Modal"
  import { getCaptchas, getVerificationCodes, register } from "@/api/user"
  import { mapActions } from "vuex"

  export default {
    name: "auth.register",
    components: {
      TModal
    },
    data () {
      return {
        captchaForm: {
          phone: ''
        },
        verificationForm: {
          captcha_key: '',
          captcha_code: ''
        },
        userForm: {
          verification_key: '',
          verification_code: '',
          password: '',
          password_confirmation: ''
        },
        captchaImg: '',
        captchaModalVisible: false,
        timer: null,
        times: 0
      }
    },
    computed: {
      verificationBtnText() {
        return this.times <= 0 ? '发送验证码' : this.times + '秒后获取'
      }
    },
    methods: {
      ...mapActions({
        'register': 'user/register',
        'getUserInfo': 'user/getUserInfo',
      }),
      showCaptchaModal() {
        this.submitCaptchas()
      },
      closeCaptchaModal() {
        this.verificationForm.captcha_code = ''
      },
      submitCaptchas() {
        getCaptchas(this.captchaForm)
          .then((res) => {
            this.verificationForm.captcha_key = res.captcha_key
            this.captchaImg = res.captcha_image
            this.captchaModalVisible = true
          })
      },
      submitVerificationForm() {
        getVerificationCodes(this.verificationForm)
          .then((res) => {
            this.$Message.success('短信验证码发送成功')
            this.captchaModalVisible = false
            this.userForm.verification_key = res.verification_key
            this.times = 60
            this.timer = setInterval(this.startTimer, 1000)
          })
      },
      submitRegister() {
        this.register(this.userForm)
          .then((res) => {
            this.$Message({
              message: '注册成功',
              type: 'success',
              onClose: () => {
                this.getUserInfo()
                this.$router.push({path: '/', replace: true})
              }
            })
          })
      },
      startTimer() {
        this.times--
        if (this.times <= 0) clearInterval(this.timer)
      }
    }
  }
</script>
