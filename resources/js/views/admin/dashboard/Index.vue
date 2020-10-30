<template>
  <div class="flex flex-col">
    <div class="flex items-center mb-4">
      <h1 class="text-2xl font-semibold text-gray-900">仪表盘</h1>
    </div>
    <div class="flex flex-col py-4">
      <div class="flex flex-wrap -mx-3">
        <div class="w-1/4 px-3">
          <div class="bg-white shadow rounded-lg">
            <div class="flex items-center px-4 py-5 sm:p-6">
              <div class="flex-shrink-0 bg-teal-500 rounded-md text-white p-3">
                <svg class="w-8 h-8 stroke-current" fill="none" viewBox="0 0 24 24">
                  <path d="M12 14l9-5-9-5-9 5 9 5z"></path>
                  <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"></path>
                </svg>
              </div>
              <div class="ml-5 w-0 flex-1">
                <div class="text-sm leading-5 font-medium text-gray-500 truncate">科目总数</div>
                <div class="flex items-baseline">
                  <div class="text-2xl leading-8 font-semibold text-gray-900">76</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="w-1/4 px-3">
          <div class="bg-white shadow rounded-lg">
            <div class="flex items-center px-4 py-5 sm:p-6">
              <div class="flex-shrink-0 bg-teal-500 rounded-md text-white p-3">
                <svg class="w-8 h-8 stroke-current" fill="none" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
                </svg>
              </div>
              <div class="ml-5 w-0 flex-1">
                <div class="text-sm leading-5 font-medium text-gray-500 truncate">题库总数</div>
                <div class="flex items-baseline">
                  <div class="text-2xl leading-8 font-semibold text-gray-900">210</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="w-1/4 px-3">
          <div class="bg-white shadow rounded-lg">
            <div class="flex items-center px-4 py-5 sm:p-6">
              <div class="flex-shrink-0 bg-teal-500 rounded-md text-white p-3">
                <svg class="w-8 h-8 stroke-current" fill="none" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                </svg>
              </div>
              <div class="ml-5 w-0 flex-1">
                <div class="text-sm leading-5 font-medium text-gray-500 truncate">题目总数</div>
                <div class="flex items-baseline">
                  <div class="text-2xl leading-8 font-semibold text-gray-900">1506</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="w-1/4 px-3">
          <div class="bg-white shadow rounded-lg">
            <div class="flex items-center px-4 py-5 sm:p-6">
              <div class="flex-shrink-0 bg-teal-500 rounded-md text-white p-3">
                <svg class="w-8 h-8 stroke-current" fill="none" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                </svg>
              </div>
              <div class="ml-5 w-0 flex-1">
                <div class="text-sm leading-5 font-medium text-gray-500 truncate">用户总数</div>
                <div class="flex items-baseline">
                  <div class="text-2xl leading-8 font-semibold text-gray-900">102</div>
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
    name: "admin.dashboard"
  }
</script>
