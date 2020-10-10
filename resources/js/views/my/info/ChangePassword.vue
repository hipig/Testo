<template>
  <div class="bg-white shadow rounded-lg">
    <info-tab active="change.password"/>
    <div class="p-5">
      <div class="mb-5 flex items-center">
        <div class="w-20 text-right mr-3">旧密码</div>
        <div class="flex-1">
          <label>
            <input type="password" v-model="passwordForm.password_old" placeholder="输入旧密码" class="inline-flex w-64 px-4 py-2 bg-gray-100 rounded-lg text-left appearance-none outline-none">
          </label>
        </div>
      </div>
      <div class="mb-5 flex items-center">
        <div class="w-20 text-right mr-3">新密码</div>
        <div class="flex-1">
          <label>
            <input type="password" v-model="passwordForm.password" placeholder="输入新密码" class="inline-flex w-64 px-4 py-2 bg-gray-100 rounded-lg text-left appearance-none outline-none">
          </label>
        </div>
      </div>
      <div class="mb-5 flex items-center">
        <div class="w-20 text-right mr-3">确认新密码</div>
        <div class="flex-1">
          <label>
            <input type="password" v-model="passwordForm.password_confirmation" placeholder="输入确认新密码" class="inline-flex w-64 px-4 py-2 bg-gray-100 rounded-lg text-left appearance-none outline-none">
          </label>
        </div>
      </div>
      <div class="flex ml-20">
        <button type="button" class="ml-3 px-10 py-2 bg-teal-500 text-white rounded-lg focus:outline-none" @click="submit">提交</button>
      </div>
    </div>
  </div>
</template>

<script>
  import InfoTab from "./InfoTab"
  import { changePassword } from "@/api/user"

  export default {
    name: "my.change.password",
    components: {
      InfoTab
    },
    data () {
      return {
        passwordForm: {
          password_old: '',
          password: '',
          password_confirmation: ''
        }
      }
    },
    methods: {
      submit() {
        changePassword(this.passwordForm)
          .then((res) => {
            this.$router.go(0)
            this.$Message.success('密码修改成功')
          })
      }
    }
  }
</script>
