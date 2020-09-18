<template>
  <div class="py-5 px-4">
    <div class="max-w-6xl mx-auto">
      <div class="text-sm">
        <a href="/">首页</a>
        <span>/</span>
        <a href="/subjects">会计</a>
        <span>/</span>
        <span class="text-gray-400">初级经济师</span>
      </div>
      <div class="mt-2 shadow rounded-lg w-full bg-white overflow-hidden w-full block relative px-5">
        <div class="my-5 flex justify-between items-center">
          <div class="flex items-center">
            <div class="flex items-center mr-5">
              <svg class="w-8 h-8 stroke-current text-teal-500 mr-2" fill="none" viewBox="0 0 24 24">
                <path d="M12 14l9-5-9-5-9 5 9 5z"></path>
                <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"></path>
              </svg>
              <h3 class="text-xl">初级经济师</h3>
            </div>
            <button type="button" class="border border-teal-200 text-teal-500 rounded-full px-2 flex items-center text-sm focus:outline-none">
              <span class="mr-1">切换考试</span>
              <svg class="w-4 h-4 stroke-current -mr-1" fill="none" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
          </div>
          <div class="flex">
            <a href="#" class="flex items-center text-teal-500">
              <svg class="w-5 h-5 stroke-current" fill="none" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path>
              </svg>
              <span class="ml-1">题目收藏</span>
            </a>
            <a href="#" class="ml-10 flex items-center text-teal-500">
              <svg class="w-5 h-5 stroke-current" fill="none" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
              </svg>
              <span class="ml-1">错题练习</span>
            </a>
          </div>
        </div>
        <div class="flex">
          <div class="mr-5 text-gray-400 h-8 flex items-center">专业科目</div>
          <div class="flex-1 flex flex-wrap">
            <a href="#" v-for="(value, key) in subjects.special" :key="key" class="flex items-center h-8 px-5 mr-2 mb-5 rounded-full" :class="{'text-white bg-teal-500': key === 0}">{{ value.name }}</a>
          </div>
        </div>
        <div class="flex justify-center">
          <div class="flex flex-wrap">
            <div class="flex items-center h-16 mr-24 text-lg cursor-pointer text-teal-500 border-teal-500 border-b-2 tab-active">章节练习</div>
            <div class="flex items-center h-16 mr-24 text-lg cursor-pointer">模拟考试</div>
            <div class="flex items-center h-16 mr-24 text-lg cursor-pointer">历年真题</div>
            <div class="flex items-center h-16 text-lg cursor-pointer">每日一练</div>
          </div>
        </div>
      </div>
      <div class="mt-5 flex">
        <div class="w-36 max-h-screen bg-white shadow rounded-lg mr-5">
          <div class="pb-5">
            <div class="mt-5 pl-5 pr-2 truncate cursor-pointer text-teal-500 sidebar-active">第一章 社会经济制度</div>
            <div class="mt-5 pl-5 pr-2 truncate cursor-pointer">第一章 社会经济制度</div>
            <div class="mt-5 pl-5 pr-2 truncate cursor-pointer">第一章 社会经济制度</div>
            <div class="mt-5 pl-5 pr-2 truncate cursor-pointer">第一章 社会经济制度</div>
            <div class="mt-5 pl-5 pr-2 truncate cursor-pointer">第一章 社会经济制度</div>
          </div>
        </div>
        <div class="flex-1 bg-white shadow rounded-lg">
          <div class="px-5 py-2 text-base text-gray-400 flex border-b border-gray-100">
            <div class="w-2/3 pl-10">名称</div>
            <div class="w-1/3">做题进度</div>
          </div>
          <div class="flex flex-wrap">
            <div class="w-full">
              <div class="px-5 py-4 flex items-center border-b border-gray-100">
                <div class="w-2/3 flex items-center">
                  <svg class="w-6 h-6 stroke-current text-teal-500 mr-4" fill="none" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <div class="text-base">第一章 社会经济制度</div>
                </div>
                <div class="w-1/3 flex items-center justify-between">
                  <div class="text-gray-400"><span class="text-teal-500">0</span>/158</div>
                  <button type="button" class="px-3 h-8 flex items-center justify-center border-2 border-teal-500 text-teal-500 bg-teal-50 rounded focus:outline-none">马上练习</button>
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
export default {
  name: "subjects.show",
  data () {
    return {
      subjects: {
        special: [
          {
            id: 100,
            name: '初级经济基础知识',
          },
          {
            id: 101,
            name: '初级财政税收',
          },
          {
            id: 102,
            name: '初级金融',
          },
          {
            id: 103,
            name: '初级人力资源',
          },
          {
            id: 104,
            name: '初级工商管理',
          },
          {
            id: 105,
            name: '初级建筑经济',
          },
        ]
      }
    }
  }
}
</script>
