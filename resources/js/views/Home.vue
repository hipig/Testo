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
    <div class="py-5 px-4">
      <div class="flex flex-col py-20">
        <div class="max-w-6xl w-full mx-auto">
          <div class="text-center mb-10">
            <h3 class="mt-2 text-3xl leading-8 tracking-tight text-teal-500 sm:text-4xl sm:leading-10">题库分类</h3>
            <p class="mt-4 max-w-2xl text-lg leading-7 text-gray-400 lg:mx-auto">151个科目满足您的不同需求</p>
          </div>
          <div class="flex flex-wrap -mx-3">
            <div class="w-1/3 px-3">
              <div class="shadow rounded-lg w-full bg-white p-5">
                <div class="flex flex-wrap">
                  <div class="flex flex-col items-center mr-5 text-base">
                    <svg class="w-12 h-12 stroke-current text-teal-500" fill="none" viewBox="0 0 24 24">
                      <path d="M12 14l9-5-9-5-9 5 9 5z"></path>
                      <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"></path>
                    </svg>
                    <span>自考</span>
                  </div>
                  <div class="flex-1 min-w-0 flex flex-wrap -mx-2 leading-tight">
                    <div class="w-1/2 px-2 py-2 truncate">
                      <a href="#">行政管理专科</a>
                    </div>
                    <div class="w-1/2 px-2 py-2 truncate">
                      <a href="#">行政管理本科</a>
                    </div>
                    <div class="w-1/2 px-2 py-2 truncate">
                      <a href="#">行政管理专科</a>
                    </div>
                    <div class="w-1/2 px-2 py-2 truncate">
                      <a href="#">行政管理本科</a>
                    </div>
                    <div class="w-1/2 px-2 py-2 truncate">
                      <a href="#">行政管理专科</a>
                    </div>
                    <div class="w-1/2 px-2 py-2 truncate">
                      <a href="#">行政管理本科</a>
                    </div>
                    <div class="w-1/2 px-2 py-2 truncate">
                      <a href="#">行政管理专科</a>
                    </div>
                    <div class="w-1/2 px-2 py-2 truncate">
                      <a href="#">行政管理本科</a>
                    </div>

                  </div>
                </div>
              </div>
            </div>
            <div class="w-1/3 px-3">
              <div class="shadow rounded-lg w-full bg-white p-5">
                <div class="flex flex-wrap">
                  <div class="flex flex-col items-center mr-5 text-base">
                    <svg class="w-12 h-12 stroke-current text-teal-500" fill="none" viewBox="0 0 24 24">
                      <path d="M12 14l9-5-9-5-9 5 9 5z"></path>
                      <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"></path>
                    </svg>
                    <span>自考</span>
                  </div>
                  <div class="flex-1 min-w-0 flex flex-wrap -mx-2 leading-tight">
                    <div class="w-1/2 px-2 py-2 truncate">
                      <a href="#">行政管理专科</a>
                    </div>
                    <div class="w-1/2 px-2 py-2 truncate">
                      <a href="#">行政管理本科</a>
                    </div>
                    <div class="w-1/2 px-2 py-2 truncate">
                      <a href="#">行政管理专科</a>
                    </div>
                    <div class="w-1/2 px-2 py-2 truncate">
                      <a href="#">行政管理本科</a>
                    </div>
                    <div class="w-1/2 px-2 py-2 truncate">
                      <a href="#">行政管理专科</a>
                    </div>
                    <div class="w-1/2 px-2 py-2 truncate">
                      <a href="#">行政管理本科</a>
                    </div>
                    <div class="w-1/2 px-2 py-2 truncate">
                      <a href="#">行政管理专科</a>
                    </div>
                    <div class="w-1/2 px-2 py-2 truncate">
                      <a href="#">行政管理本科</a>
                    </div>

                  </div>
                </div>
              </div>
            </div>
            <div class="w-1/3 px-3">
              <div class="shadow rounded-lg w-full bg-white p-5">
                <div class="flex flex-wrap">
                  <div class="flex flex-col items-center mr-5 text-base">
                    <svg class="w-12 h-12 stroke-current text-teal-500" fill="none" viewBox="0 0 24 24">
                      <path d="M12 14l9-5-9-5-9 5 9 5z"></path>
                      <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"></path>
                    </svg>
                    <span>自考</span>
                  </div>
                  <div class="flex-1 min-w-0 flex flex-wrap -mx-2 leading-tight">
                    <div class="w-1/2 px-2 py-2 truncate">
                      <a href="#">行政管理专科</a>
                    </div>
                    <div class="w-1/2 px-2 py-2 truncate">
                      <a href="#">行政管理本科</a>
                    </div>
                    <div class="w-1/2 px-2 py-2 truncate">
                      <a href="#">行政管理专科</a>
                    </div>
                    <div class="w-1/2 px-2 py-2 truncate">
                      <a href="#">行政管理本科</a>
                    </div>
                    <div class="w-1/2 px-2 py-2 truncate">
                      <a href="#">行政管理专科</a>
                    </div>
                    <div class="w-1/2 px-2 py-2 truncate">
                      <a href="#">行政管理本科</a>
                    </div>
                    <div class="w-1/2 px-2 py-2 truncate">
                      <a href="#">行政管理专科</a>
                    </div>
                    <div class="w-1/2 px-2 py-2 truncate">
                      <a href="#">行政管理本科</a>
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
            <h3 class="mt-2 text-3xl leading-8 tracking-tight text-teal-500 sm:text-4xl sm:leading-10">题库特色</h3>
            <p class="mt-4 max-w-2xl text-lg leading-7 text-gray-400 lg:mx-auto">5大特色，为考试保驾护航</p>
          </div>
          <div class="flex flex-wrap">
            <div class="w-1/3 flex">
              <div class="flex-1 border-l border-dashed border-transparent">
                <div class="flex flex-col pb-20 pr-20">
                  <div class="mb-3 flex flex-wrap items-center">
                    <div class="w-12 h-12 flex items-center justify-center bg-green-500 text-white rounded-full">
                      <svg class="w-6 h-6 stroke-current" fill="none" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                      </svg>
                    </div>
                    <div class="flex-1 text-xl ml-3">全真机考</div>
                  </div>
                  <div class="text-gray-400">依据无纸化考试准确信息，紧跟考试形式，全面模拟无纸化考试流程</div>
                </div>
              </div>
            </div>
            <div class="w-1/3 flex">
              <div class="flex-1 border-l border-dashed border-gray-100">
                <div class="flex flex-col pb-20 px-20">
                  <div class="mb-3 flex flex-wrap items-center">
                    <div class="w-12 h-12 flex items-center justify-center bg-teal-500 text-white rounded-full">
                      <span class="text-xl">模</span>
                    </div>
                    <div class="flex-1 text-xl ml-3">模拟考试</div>
                  </div>
                  <div class="text-gray-400">依托行业最先进智能算法，配合行业最全面考题，全真模拟实战现场</div>
                </div>
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
