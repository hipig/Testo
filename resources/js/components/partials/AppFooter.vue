<template>
  <footer class="bg-gray-800 border-t border-gray-100" v-if="!($route.meta.showFooter && $route.meta.showFooter === false)">
    <div class="max-w-6xl w-full mx-auto p-6">
      <div class="flex items-center justify-between">
        <div>
          <div class="flex flex-wrap items-center -mx-2">
            <div class="inline-flex px-2">
              <a href="#" class="text-gray-200">关于我们</a>
            </div>
            <div class="hidden sm:inline-flex px-1">
              <span class="select-none text-gray-200">-</span>
            </div>
            <div class="inline-flex px-2">
              <a href="#" class="text-gray-200">联系我们</a>
            </div>
          </div>
        </div>

        <div class="text-gray-400">
          Copyright © Testo. All Rights Reserved
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
