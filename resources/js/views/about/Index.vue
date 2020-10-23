<template>
  <div class="py-5 px-4">
    <div class="max-w-6xl mx-auto">
      <div class="text-sm">
        <a href="/">首页</a>
        <span> / </span>
        <span class="text-gray-400">关于我们</span>
      </div>
      <div class="mt-2 pb-20">
        <div class="flex flex-wrap -mx-3">
          <div class="w-1/4 px-3">
            <div class="shadow rounded-lg w-full bg-white">
              <div class="flex flex-col">
                <router-link :to="{name: 'about.index', params: {name: item.name}}" class="block py-3 border-b border-gray-100 flex items-center cursor-pointer" v-for="(item, index) in aboutList" :key="index">
                  <div class="h-6 w-1" :class="[currentName === item.name ? 'bg-teal-500' : 'bg-transparent']"></div>
                  <div class="pl-5 text-base">{{ item.title }}</div>
                </router-link>
              </div>
            </div>
          </div>
          <div class="w-3/4 px-3">
            <div class="shadow rounded-lg w-full bg-white">
              <div class="px-5 py-3 border-b border-gray-100 text-gray-900 text-xl">{{ about.title }}</div>
              <div class="px-5 py-6 text-base" v-loading="isLoading" loading-custom-class="h-56">
                <div v-html="about.content"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { getAbouts, getAboutsShow } from "@/api/about"

  export default {
    name: "about.index",
    data () {
      return {
        about: {},
        aboutList: [],
        currentName: '',
        isLoading: null
      }
    },
    mounted() {
      this.getAboutList()
    },
    watch: {
      $route(to,from){
        this.currentName = to.params.name
        this.getAbout()
      }
    },
    methods: {
      getAboutList() {
        getAbouts()
          .then((res) => {
            this.aboutList = res
            this.currentName = this.$route.params.name || res[0].name
            this.getAbout()
          })
      },
      getAbout() {
        this.isLoading = true

        getAboutsShow(this.currentName)
          .then((res) => {
            this.about = res
          })
        .finally(_ => {
          this.isLoading = false
        })
      }
    }
  }
</script>
