<template>
  <div class="px-5 border-b border-gray-100 flex flex-wrap leading-tight">
    <router-link :to="{name: 'my'}" class="py-3 mx-5 text-base border-b-2 border-transparent cursor-pointer" :class="[active === 'index' ? 'text-gray-900 text-lg border-teal-500' : 'text-gray-500 border-transparent']">基本资料</router-link>
    <router-link :to="{name: 'my.change.password'}" class="py-3 mx-5 text-base border-b-2 border-transparent cursor-pointer" :class="[active === 'change.password' ? 'text-gray-900 text-lg border-teal-500' : 'text-gray-500 border-transparent']">修改密码</router-link>
  </div>
</template>

<script>
  export default {
    name: "InfoTab",
    props: {
      active: {
        type: String,
        default: 'index'
      }
    }
  }
</script>
