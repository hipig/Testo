<template>
  <div class="flex flex-col">
    <div class="bg-white border-t md:border-0 border-gray-200 overflow-hidden px-4 relative md:pt-5">
      <div class="hidden md:block absolute top-0 right-0 mt-6 bg-teal-50" style="height: 100%; width: 45%; border-top-left-radius: 150px;"></div>
      <div class="md:flex relative max-w-6xl mx-auto">
        <div class="lg:w-3/5 md:flex mx-auto">
          <div class="py-10 md:pt-16 mb:pb-32 text-center md:text-left">
            <p class="mb-1 text-teal-500 text-xl md:text-2xl text-base leading-normal">专注为考生提供全面、免费的在线练习题库</p>
            <h1 class="mb-8 text-3xl md:text-5xl leading-tight font-bold">
              <span class="block">科学通关，自考必备</span> 祝您的考试之路畅通无阻！
            </h1>
            <div class="mt-4 md:mt-0 w-64 md:w-auto mx-auto">
              <router-link :to="{name: 'subjects.index'}" class="block w-full md:w-auto mx-auto shadow-md inline-flex items-center justify-center leading-none focus:outline-none rounded-md text-base px-7 py-3 border-2 border-teal-500 bg-teal-500 text-white">开始刷题</router-link>
              <div class="mt-4 hidden md:block md:inline-block md:ml-4">
                <a href="#" class="block w-full md:w-auto shadow-md inline-flex items-center justify-center leading-none focus:outline-none rounded-md text-base px-7 py-3 border-2 border-teal-500 bg-transparent text-teal-500">制定计划</a>
              </div>
            </div>
          </div>
        </div>
        <div class="lg:w-2/5 relative">
          <lottie :options="lottieOptions" :height="400" class="mx-auto hidden md:block"></lottie>
        </div>
      </div>
    </div>
    <div class="flex flex-col">
      <div class="flex flex-col py-20">
        <div class="max-w-6xl w-full mx-auto">
          <div class="text-center mb-10">
            <h3 class="mt-2 tracking-tight font-semibold text-gray-900 text-4xl leading-8">题库更新</h3>
            <p class="mt-4 max-w-2xl text-lg leading-7 text-gray-600 lg:mx-auto">新鲜试题，实时放送</p>
          </div>
          <div class="shadow rounded-lg w-full bg-white p-8">
            <div class="flex flex-wrap">
              <div class="w-56 pr-8 border-r border-dashed border-gray-200">
                <div class="flex flex-col -mb-1">
                  <div class="py-1">
                    <div class="h-12 flex items-center justify-center rounded-sm text-xl text-white bg-gradient-to-r from-teal-500 to-teal-400 cursor-pointer">会计</div>
                  </div>
                  <div class="py-1">
                    <div class="h-12 flex items-center justify-center rounded-sm text-xl cursor-pointer">建筑类</div>
                  </div>
                  <div class="py-1">
                    <div class="h-12 flex items-center justify-center rounded-sm text-xl cursor-pointer">金融</div>
                  </div>
                  <div class="py-1">
                    <div class="h-12 flex items-center justify-center rounded-sm text-xl cursor-pointer">公务员</div>
                  </div>
                  <div class="py-1">
                    <div class="h-12 flex items-center justify-center rounded-sm text-xl cursor-pointer">职业资格</div>
                  </div>
                  <div class="py-1">
                    <div class="h-12 flex items-center justify-center rounded-sm text-xl cursor-pointer">医学类</div>
                  </div>
                </div>
              </div>
              <div class="flex-1 min-w-0 pl-6">
                <div class="flex flex-col">
                  <div class="flex items-center justify-between py-3 border-b border-teal-500 text-gray-500">
                    <div class="flex flex-wrap">
                      <a href="#" class="mr-8">初级经济师</a>
                      <a href="#" class="mr-8">中级经济师</a>
                      <a href="#" class="mr-8">初级会计师</a>
                      <a href="#" class="mr-8">中级会计师</a>
                      <a href="#" class="mr-8">初级统计师</a>
                      <a href="#" class="mr-8">中级统计师</a>
                    </div>
                    <a href="#" class="text-teal-500">更多>></a>
                  </div>
                  <div class="flex flex-wrap -mx-5 mt-5">
                    <div class="w-1/2 px-5">
                      <div class="flex flex-col py-3 border-b border-dashed border-gray-200" v-for="i in 4" :key="i">
                        <div class="flex flex-wrap">
                          <div class="flex-1 min-w-0 flex flex-col">
                            <div class="leading-tight truncate">2016中级经济师考试《中级经济基础》精选试题及解析</div>
                            <div class="text-xs text-gray-400 mt-1">
                              <span class="mr-3">2015-05-25</span>
                              <span>总分：100</span>
                            </div>
                          </div>
                          <div class="flex items-center ml-5">
                            <a href="#" class="inline-flex items-center h-6 px-4 border border-teal-500 text-teal-500 rounded-full">做题</a>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="w-1/2 px-5">
                      <div class="flex flex-col py-3 border-b border-dashed border-gray-200" v-for="i in 4" :key="i">
                        <div class="flex flex-wrap">
                          <div class="flex-1 min-w-0 flex flex-col">
                            <div class="leading-tight truncate">2016中级经济师考试《中级经济基础》精选试题及解析</div>
                            <div class="text-xs text-gray-400 mt-1">
                              <span class="mr-3">2015-05-25</span>
                              <span>总分：100</span>
                            </div>
                          </div>
                          <div class="flex items-center ml-5">
                            <a href="#" class="inline-flex items-center h-6 px-4 border border-teal-500 text-teal-500 rounded-full">做题</a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="flex flex-col py-20 bg-white">
        <div class="max-w-6xl w-full mx-auto">
          <div class="text-center mb-10">
            <h3 class="mt-2 tracking-tight font-semibold text-gray-900 text-4xl leading-8">平台特色</h3>
            <p class="mt-4 max-w-2xl text-lg leading-7 text-gray-600 lg:mx-auto">5大特色，为考试保驾护航</p>
          </div>
          <div class="flex flex-wrap">
            <div class="w-1/3 border-b border-dashed border-gray-200">
              <div class="flex flex-col py-10 pr-20">
                <div class="mb-3 flex flex-wrap items-center">
                  <div class="w-12 h-12 flex items-center justify-center bg-green-200 text-green-500 rounded-full">
                    <svg class="w-6 h-6 stroke-current" fill="none" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                    </svg>
                  </div>
                  <div class="flex-1 text-xl ml-5">全真机考</div>
                </div>
                <div class="text-gray-400">依据无纸化考试准确信息，紧跟考试形式，全面模拟无纸化考试流程</div>
              </div>
            </div>
            <div class="flex-1 border-l border-r border-b border-dashed border-gray-200">
              <div class="flex flex-col py-10 px-20">
                <div class="mb-3 flex flex-wrap items-center">
                  <div class="w-12 h-12 flex items-center justify-center bg-purple-200 text-purple-500 rounded-full">
                    <span class="text-xl">模</span>
                  </div>
                  <div class="flex-1 text-xl ml-5">模拟考试</div>
                </div>
                <div class="text-gray-400">依托行业最先进智能算法，配合行业最全面考题，全真模拟实战现场</div>
              </div>
            </div>
            <div class="w-1/3 border-b border-dashed border-gray-200">
              <div class="flex flex-col py-10 pl-20">
                <div class="mb-3 flex flex-wrap items-center">
                  <div class="w-12 h-12 flex items-center justify-center bg-teal-200 text-teal-500 rounded-full">
                    <svg class="w-6 h-6 stroke-current" fill="none" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7"></path>
                    </svg>
                  </div>
                  <div class="flex-1 text-xl ml-5">章节练习</div>
                </div>
                <div class="text-gray-400">紧跟考试大纲，海量试题综合演练，哪里不会练哪里，让你的水平提示更容易</div>
              </div>
            </div>
            <div class="w-1/3">
              <div class="flex flex-col py-10 pr-20">
                <div class="mb-3 flex flex-wrap items-center">
                  <div class="w-12 h-12 flex items-center justify-center bg-indigo-200 text-indigo-500 rounded-full">
                    <span class="text-xl">真</span>
                  </div>
                  <div class="flex-1 text-xl ml-5">历年真题</div>
                </div>
                <div class="text-gray-400">囊括近10年真题，让你了解和掌握考试常出题型，有效掌握考试节奏，合理分配做题时间</div>
              </div>
            </div>
            <div class="w-1/3 border-l border-r border-dashed border-gray-200">
              <div class="flex flex-col py-10 px-20">
                <div class="mb-3 flex flex-wrap items-center">
                  <div class="w-12 h-12 flex items-center justify-center bg-blue-200 text-blue-500 rounded-full">
                    <svg class="w-6 h-6 stroke-current" fill="none" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                    </svg>
                  </div>
                  <div class="flex-1 text-xl ml-5">每日一练</div>
                </div>
                <div class="text-gray-400">每日一练，温习巩固考试加分必做项目，每天迈进一小步</div>
              </div>
            </div>
            <div class="w-1/3">
              <div class="flex flex-col items-center justify-center py-10 cursor-pointer">
                <div class="w-12 h-12 flex items-center justify-center bg-gray-100 text-gray-400 rounded-full">
                  <svg class="w-6 h-6 stroke-current" fill="none" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5l7 7-7 7M5 5l7 7-7 7"></path>
                  </svg>
                </div>
                <div class="flex-1 text-lg text-gray-400 mt-3">查看更多</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import animationData from "@/assets/lottie/banner.json"
  import Lottie from 'vue-lottie'

  export default {
    name: "home",
    components: {
      Lottie
    },
    data () {
      return {
        lottieOptions: {
          animationData,
          loop: true,
          autoplay: true
        }
      }
    }
  }
</script>
