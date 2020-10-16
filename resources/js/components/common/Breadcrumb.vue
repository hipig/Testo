<template>
  <div class="text-sm" v-if="list.length > 0">
    <template v-for="(item, index) in breadcrumbList">
      <template v-if="index !== breadcrumbList.length-1">
        <router-link :to="{path: item.path}">{{ item.title }}</router-link>
        <span> / </span>
      </template>
      <span class="text-gray-400" v-else>{{ item.title }}</span>
    </template>
  </div>
</template>

<script>
  export default {
    name: "Breadcrumb",
    props: {
      list: {
        type: Array,
        default: () => {
          return []
        }
      }
    },
    computed: {
      breadcrumbList() {
        let breadcrumbList = [{
          title: '首页',
          href: '/'
        }]

        this.list.forEach((item) => {
          let i = {
            title: item.title,
            href: item.level == 0 ? '/subjects' : ''
          }
          breadcrumbList.push(i)
        })

        return breadcrumbList
      }
    }
  }
</script>
