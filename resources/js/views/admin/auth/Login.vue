<template>
  <div class="min-h-screen bg-gray-50 flex items-center py-12 px-8">
    <div class="max-w-md w-full mx-auto">
      <div class="flex flex-col">
        <a href="#" class="block text-teal-500 text-xl font-extrabold text-center">Testo 后台管理</a>
        <p class="mt-5 text-center text-3xl text-gray-900 text-center">登录你的账户</p>
        <div class="mt-8">
          <div class="bg-white py-8 px-10 shadow rounded-lg">
            <div class="flex flex-col">
              <div class="block w-full mb-6">
                <span class="block mb-1 leading-tight">用户名</span>
                <input type="text" class="form-input w-full text-sm" placeholder="请输入用户名">
              </div>
              <div class="block w-full mb-6">
                <span class="block mb-1 leading-tight">密码</span>
                <input type="password" class="form-input w-full text-sm" placeholder="请输入密码">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "admin.login"
  }
</script>
