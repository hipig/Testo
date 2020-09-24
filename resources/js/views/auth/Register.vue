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
              <form action="#">
                <div class="mb-4">
                  <label class="flex flex-col">
                    <span class="mb-1 text-base font-semibold">手机号码</span>
                    <input type="text" placeholder="输入手机号码" class="px-5 p-3 leading-tight block w-full bg-gray-100 rounded-lg text-left appearance-none outline-none">
                  </label>
                </div>
                <div class="mb-4">
                  <label class="flex flex-col">
                    <span class="mb-1 text-base font-semibold">验证码</span>
                    <span class="flex items-center">
                      <input type="text" placeholder="输入验证码" class="flex-1 mr-4 px-5 p-3 leading-tight bg-gray-100 rounded-lg text-left appearance-none outline-none">
                      <button type="button" class="inline-flex items-center justify-center font-medium focus:outline-none rounded-lg w-28 p-3 leading-tight bg-gray-700 text-white">发送验证码</button>
                    </span>
                  </label>
                </div>
                <div class="mb-4">
                  <label class="flex flex-col">
                    <span class="mb-1 text-base font-semibold">密码</span>
                    <input type="password" placeholder="输入密码" class="px-5 p-3 leading-tight block w-full bg-gray-100 rounded-lg text-left appearance-none outline-none">
                  </label>
                </div>
                <div class="mb-4">
                  <label class="flex flex-col">
                    <span class="mb-1 text-base font-semibold">重复密码</span>
                    <input type="password" placeholder="输入重复密码" class="px-5 p-3 leading-tight block w-full bg-gray-100 rounded-lg text-left appearance-none outline-none">
                  </label>
                </div>
                <button type="submit" class="inline-flex items-center justify-center font-medium focus:outline-none rounded-lg px-9 py-3 leading-tight bg-teal-500 text-white">立即注册</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "auth.register"
}
</script>
