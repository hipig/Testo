<template>
  <footer class="bg-gray-900" v-if="!($route.meta.showFooter && $route.meta.showFooter === false)">
    <div class="max-w-4xl w-full mx-auto py-16">
      <div class="flex">
        <div class="flex-1 mr-10">
          <a href="/" class="flex items-center text-gray-300">
            <span class="text-2xl font-semibold font-mono leading-none">Testo</span>
          </a>
          <div class="mt-3 text-sm text-gray-400">
            Copyright ©2020 Testo. All rights reserved.
          </div>
        </div>
        <div class="flex flex-wrap -mx-5">
          <div class="w/1/2 px-5">
            <div class="flex flex-col">
              <h4 class="text-sm font-semibold leading-5 tracking-wider text-gray-400">关于我们</h4>
              <ul class="mt-4">
                <li>
                  <a class="text-base leading-6 text-gray-300 hover:text-white" href="#">用户协议</a>
                </li>
                <li class="mt-4">
                  <a class="text-base leading-6 text-gray-300 hover:text-white" href="#">隐私政策</a>
                </li>
                <li class="mt-4">
                  <a class="text-base leading-6 text-gray-300 hover:text-white" href="#">帮助中心</a>
                </li>
                <li class="mt-4">
                  <a class="text-base leading-6 text-gray-300 hover:text-white" href="#">联系我们</a>
                </li>
              </ul>
            </div>
          </div>
          <div class="w/1/2 px-5">
            <div class="flex flex-col">
              <h4 class="text-sm font-semibold leading-5 tracking-wider text-gray-400">产品与服务</h4>
              <ul class="mt-4">
                <li>
                  <a class="text-base leading-6 text-gray-300 hover:text-white" href="#">报考指南</a>
                </li>
                <li class="mt-4">
                  <a class="text-base leading-6 text-gray-300 hover:text-white" href="#">会员服务</a>
                </li>
                <li class="mt-4">
                  <a class="text-base leading-6 text-gray-300 hover:text-white" href="#">最近公告</a>
                </li>
                <li class="mt-4">
                  <a class="text-base leading-6 text-gray-300 hover:text-white" href="#">学习计划</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
  export default {
    name: "AppFooter"
  }
</script>
