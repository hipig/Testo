<template>
  <div class="w-full">
    <div class="ml-5 pr-5 py-4 flex items-center border-b border-gray-100">
      <div class="w-2/3 flex items-center">
        <div class="mr-4 cursor-pointer" @click="toggle">
          <svg class="w-6 h-6 stroke-current text-teal-500" fill="none" viewBox="0 0 24 24" v-if="isActive">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <svg class="w-6 h-6 stroke-current text-teal-500" fill="none" viewBox="0 0 24 24" v-else>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        </div>
        <div class="text-base">{{ title }}</div>
      </div>
      <div class="w-1/3 flex items-center justify-between">
        <div class="text-gray-400"><span class="text-teal-500">{{ number[0]||0 }}</span>/{{ number[1]||0 }}</div>
        <button type="button" class="px-3 h-8 flex items-center justify-center border-2 border-teal-500 text-teal-500 bg-teal-50 rounded focus:outline-none" @click="handle">马上练习</button>
      </div>
    </div>
    <div class="ml-5" v-show="isActive">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: "ChapterItem",
    props: {
      name: {
        type: String | Number | Object,
        default: ''
      },
      title: {
        type: String,
        default: ''
      },
      number: {
        type: Array,
        default: [0, 0]
      },
      disabled: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        isActive: false
      }
    },
    methods: {
      toggle() {
        if (this.disabled) return false
        this.isActive = !this.isActive
      },
      handle() {
        this.$emit('btnClick', this.name)
      }
    }
  }
</script>
