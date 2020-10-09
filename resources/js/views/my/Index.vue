<template>
  <div class="bg-white shadow rounded-lg">
    <div class="px-5 border-b border-gray-100 flex flex-wrap leading-tight">
      <a href="/my/" class="py-3 mx-5 text-base border-b-2 border-transparent cursor-pointer text-gray-900 text-lg border-teal-500">基本资料</a>
      <a href="/my/change-password" class="py-3 mx-5 text-base border-b-2 border-transparent cursor-pointer text-gray-500 border-transparent">修改密码</a>
    </div>
    <div class="p-5">
      <div class="mb-10 flex items-center">
        <div class="w-16 text-right mr-3">头像</div>
        <div class="flex-1">
          <div class="w-24 h-24">
            <img class="w-full rounded-full" src="https://thirdwx.qlogo.cn/mmopen/vi_32/Omgr0ibW11H2wPkRFz6VuQMfmwws5N9cjUcPuxWC4B4nYDtsqwxiaQYa6rYEnE24yIIick631bZj3h6Df05hty4Tw/132" alt="">
          </div>
        </div>
      </div>
      <div class="mb-10 flex items-center">
        <div class="w-16 text-right mr-3">昵称</div>
        <div class="flex-1">
          <div class="flex items-center">
            <template v-if="infoFormShow">
              <div class="flex items-center">
                <label>
                  <input type="text" v-model="infoForm.name" class="inline-flex px-4 py-2 leading-tight bg-gray-200 rounded-lg text-left appearance-none outline-none">
                </label>
                <button type="button" class="ml-2 px-4 py-2 leading-tight bg-teal-500 text-white rounded-lg focus:outline-none" @click="saveName">保存</button>
                <button type="button" class="ml-2 px-4 py-2 leading-tight bg-gray-200 rounded-lg focus:outline-none" @click="infoFormShow = false">取消</button>
              </div>
            </template>
            <template v-else>
              <div class="text-base mr-1">151****5678</div>
              <div class="cursor-pointer" @click="showInfoForm">
                <svg class="w-6 h-6 stroke-current text-teal-500" fill="none" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                </svg>
              </div>
            </template>
          </div>
        </div>
      </div>
      <div class="mb-10 flex items-center">
        <div class="w-16 text-right mr-3">手机号码</div>
        <div class="flex-1">
          <div class="flex items-center">
            <div class="text-base">15112345678</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "my.index",
    data () {
      return {
        infoFormShow: false,
        user: {
          name: '151****5678',
          phone: '15112345678'
        },
        infoForm: {
          name: ''
        }
      }
    },
    methods: {
      showInfoForm() {
        this.infoFormShow = true
        this.infoForm.name = this.user.name
      },
      saveName() {
        this.$Message.success('保存成功！')
        this.infoFormShow = false
      }
    }
  }
</script>
