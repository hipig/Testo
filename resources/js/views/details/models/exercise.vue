<template>
  <div class="pt-5 pb-12 px-4">
    <div class="max-w-6xl mx-auto">
      <div class="text-sm">
        <a href="/">首页</a>
        <span>/</span>
        <a href="/subjects">会计</a>
        <span>/</span>
        <span class="text-gray-400">初级经济师</span>
      </div>
      <div class="mt-5 flex flex-wrap -mx-3">
        <div class="w-2/3 px-3">
          <div class="bg-white shadow rounded-lg p-5">
            <div class="flex items-center mb-4">
              <div class="text-2xl text-gray-900 mr-3 leading-none">第一章　市场需求、供给与均衡价格</div>
              <div class="text-base text-teal-500 border border-teal-500 rounded-sm px-1">刷题练习</div>
            </div>
            <div class="text-base">
              <label class="flex items-center">
                <input type="checkbox" class="form-checkbox w-5 h-5 border-2 text-teal-500 focus:shadow-outline-teal">
                <span class="ml-2">做对自动下一题</span>
              </label>
            </div>
          </div>
          <div class="bg-white shadow rounded-lg px-10 py-5 mt-5">
            <div class="flex items-center justify-between mb-5">
              <div class="flex items-start">
                <div class="text-gray-400 text-2xl font-semibold">27</div>
                <div class="text-teal-500 text-lg ml-3">[单选题]</div>
              </div>
              <div class="flex flex-wrap">
                <div class="flex items-center cursor-pointer mr-8">
                  <svg class="w-6 h-6 stroke-current text-gray-400 mr-1" fill="none" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
                  </svg>
                  <span class="text-base text-gray-900">纠错</span>
                </div>
                <div class="flex items-center cursor-pointer mr-8">
                  <svg class="w-6 h-6 stroke-current text-gray-400 mr-1" fill="none" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                  </svg>
                  <span class="text-base text-gray-900">写笔记</span>
                </div>
                <div class="flex items-center cursor-pointer">
                  <svg class="w-6 h-6 stroke-current text-gray-400 mr-1" fill="none" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path>
                  </svg>
                  <span class="text-base text-gray-900">收藏</span>
                </div>
              </div>
            </div>
            <div class="text-gray-900 text-lg mb-5">政府为了保护农业生产者利益，在必要时对某些农产品可以采取的价格干预措施是()。</div>
            <div class="flex flex-col mb-5">
              <div class="mb-2 text-base">
                <label class="inline-flex items-center">
                  <input type="radio" class="form-radio w-5 h-5 border-2 text-teal-500 focus:shadow-outline-teal">
                  <span class="ml-3">A、规定保护价格</span>
                </label>
              </div>
              <div class="mb-2 text-base">
                <label class="inline-flex items-center">
                  <input type="radio" class="form-radio w-5 h-5 border-2 text-teal-500 focus:shadow-outline-teal">
                  <span class="ml-3">B、调整均衡价格</span>
                </label>
              </div>
              <div class="mb-2 text-base">
                <label class="inline-flex items-center">
                  <input type="radio" class="form-radio w-5 h-5 border-2 text-teal-500 focus:shadow-outline-teal">
                  <span class="ml-3">规定最高限价</span>
                </label>
              </div>
              <div class="mb-2 text-base">
                <label class="inline-flex items-center">
                  <input type="radio" class="form-radio w-5 h-5 border-2 text-teal-500 focus:shadow-outline-teal">
                  <span class="ml-3">D、降低农业生产资料价格</span>
                </label>
              </div>
            </div>
            <div class="mb-3">
              <div class="flex items-center cursor-pointer py-1 mb-2" @click="showAnswer = !showAnswer">
                <svg class="w-5 h-5 stroke-current text-gray-400 mr-1" fill="none" viewBox="0 0 24 24" v-if="showAnswer">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"></path>
                </svg>
                <svg class="w-5 h-5 stroke-current text-gray-400 mr-1" fill="none" viewBox="0 0 24 24" v-else>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 21h7a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v11m0 5l4.879-4.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242z"></path>
                </svg>
                <span class="text-gray-900 leading-none">{{ showAnswer ? '隐藏答案' : '查看答案' }}</span>
              </div>
              <div v-show="showAnswer">
                <div class="py-3 px-5 bg-gray-100 flex flex-wrap items-center leading-tight rounded">
                  <div class="text-green-500">回答正确</div>
                  <div class="ml-10 flex items-center">
                    <span>答案：</span>
                    <span class="text-green-500 text-base font-semibold">B,C,E</span>
                  </div>
                  <div class="ml-10 flex items-center">
                    <span>你的选择：</span>
                    <span class="text-base font-semibold">A,B</span>
                  </div>
                </div>
                <div class="px-5 mt-5">
                  <div class="flex flex-wrap text-base text-gray-500">
                    <div>解析：</div>
                    <div class="flex-1">
                      <p><span>影响供给的因素主要有：(1)产品价格。在其他条件不变的情况下，某种产品自身的价格和其供给的变动成正方向变化。(2)生产成本。在其他条件不变的情况下，某种产品自身的成本和其供给的变动成反方向变化。(3)生产技术。技术水平在一定程度上决定着生产成本并进而影响供给(4)预期。(5)相关产品的价格。(6)其他因素。包括生产要素的价格以及国家政策等。</span></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="w-1/3 px-3">
          <div class="bg-white shadow rounded-lg mb-5">
            <div class="px-5 py-3 border-b border-gray-100 text-base text-gray-900 font-semibold">答题卡</div>
            <div class="px-5 py-4 h-36 overflow-auto scrollbar-hover">
              <div class="flex flex-wrap -mx-1">
                <div class="w-6 h-6 mx-1 mb-2 leading-none flex items-center justify-center border text-gray-500 text-xs hover:border-teal-500 rounded-sm cursor-pointer" v-for="(item, index) in 68" :key="index" :class="{'border-gray-100': activeIndex !== index, 'border-teal-500': activeIndex === index}">{{ item }}</div>
              </div>
            </div>
            <div class="mt-1 px-8 py-3 flex justify-between border-t border-gray-100">
              <div class="flex items-center text-gray-900">
                <div class="bg-green-500 w-4 h-4 mr-1"></div>
                <div class="leading-none">正确0</div>
              </div>
              <div class="flex items-center text-gray-900">
                <div class="bg-red-500 w-4 h-4 mr-1"></div>
                <div class="leading-none">错误1</div>
              </div>
              <div class="flex items-center text-gray-900 leading-none">
                <div class="mr-1">正确率</div>
                <div class="text-green-500">0%</div>
              </div>
            </div>
          </div>
          <div class="bg-white shadow rounded-lg py-3 mb-5">
            <div class="flex justify-center">
              <button type="button" class="px-3 h-8 flex items-center justify-center border border-teal-500 text-teal-500 bg-white rounded focus:outline-none">返回章节练习</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="fixed bottom-0 left-0 right-0 px-4">
      <div class="max-w-6xl mx-auto">
        <div class="flex">
          <div class="w-2/3 px-8">
            <div class="flex justify-between py-3 px-10 bg-white rounded-lg shadow-lg mb-5">
              <button type="button" class="inline-flex items-center px-8 py-2 text-white bg-gray-400 rounded opacity-50 cursor-not-allowed focus:outline-none">上一题</button>
              <button type="button" class="inline-flex items-center px-8 py-2 text-white bg-teal-500 rounded focus:outline-none">下一题</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "models.exercise",
    data () {
      return {
        activeIndex: 0,
        showAnswer: false
      }
    }
  }
</script>
