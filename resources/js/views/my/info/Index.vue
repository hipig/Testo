<template>
  <div class="bg-white shadow rounded-lg">
    <info-tab/>
    <div class="p-5">
      <div class="mb-10 flex items-center">
        <div class="w-16 text-right mr-3">头像</div>
        <div class="flex-1">
          <t-upload
            name="avatar"
            accept="image/*"
            :action="uploadAvatarUrl"
            :headers="{'Authorization': 'Bearer ' + $store.getters['user/token']}"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :on-error="handleAvatarError"
            :before-upload="beforeAvatarUpload">
            <div class="w-24 h-24 relative group rounded-full">
              <img class="w-full rounded-full" :src="user.avatar_url" alt="">
              <div class="absolute inset-0 flex items-center justify-center rounded-full" :class="[user.avatar_url ? 'hidden group-hover:flex bg-black bg-opacity-25' : 'border-2 border-dashed border-gray-200']">
                <svg class="w-8 h-8 stroke-current text-gray-100" v-if="user.avatar_url" fill="none" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                </svg>
                <svg class="w-10 h-10 stroke-current text-gray-200" v-else fill="none" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
              </div>
            </div>
          </t-upload>
        </div>
      </div>
      <div class="mb-10 flex items-center">
        <div class="w-16 text-right mr-3">昵称</div>
        <div class="flex-1">
          <div class="flex items-center">
            <template v-if="infoFormShow">
              <div class="flex items-center">
                <label>
                  <input type="text" v-model="infoForm.name" class="inline-flex px-4 py-2 leading-tight bg-gray-100 rounded-lg text-left appearance-none outline-none">
                </label>
                <button type="button" class="ml-2 px-4 py-2 leading-tight bg-teal-500 text-white rounded-lg focus:outline-none" @click="saveName">保存</button>
                <button type="button" class="ml-2 px-4 py-2 leading-tight bg-gray-100 rounded-lg focus:outline-none" @click="infoFormShow = false">取消</button>
              </div>
            </template>
            <template v-else>
              <div class="text-base mr-1">{{ user.name }}</div>
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
            <div class="text-base">{{ user.phone }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import InfoTab from "./InfoTab"
  import { mapActions } from "vuex"
  import { user, updateName } from "@/api/user"

  export default {
    name: "my.index",
    components: {
      InfoTab
    },
    data () {
      return {
        uploadAvatarUrl: window.config.api_url + "/user/update-avatar",
        infoFormShow: false,
        user: {
          avatar_url: '',
          name: ''
        },
        infoForm: {
          name: ''
        }
      }
    },
    mounted() {
      this.getUser()
    },
    methods: {
      ...mapActions({
        'setUserInfo': 'user/setUserInfo'
      }),
      handleAvatarSuccess(res, file) {
        this.user = res
        this.setUserInfo(res)
      },
      handleAvatarError(err, file) {
        console.log(err)
      },
      beforeAvatarUpload(file) {
        const isImage = ['image/jpeg', 'image/png', 'image/gif'].indexOf(file.type) > -1
        const isLt2M = file.size / 1024 / 1024 < 2

        if (!isImage) {
          this.$Message.error('上传头像图片格式不正确!')
        }
        if (!isLt2M) {
          this.$Message.error('上传头像图片大小不能超过 2MB!')
        }
        return isImage && isLt2M
      },
      getUser() {
        user()
          .then((res) => {
            this.user = res
          })
      },
      showInfoForm() {
        this.infoFormShow = true
        this.infoForm.name = this.user.name
      },
      saveName() {
        updateName(this.infoForm)
          .then((res) => {
            this.user = res
            this.setUserInfo(res)
            this.$Message.success('保存成功！')
            this.infoFormShow = false
          })
      }
    }
  }
</script>
