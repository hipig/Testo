<template>
  <div class="z-50 inset-0">
    <transition
      enter-class="opacity-0"
      enter-active-class="ease-out duration-300"
      enter-to-class="opacity-100"
      leave-class="opacity-100"
      leave-active-class="ease-in duration-200"
      leave-to-class="opacity-0"
      @after-leave="handleAfterLeave"
    >
      <div class="absolute inset-0 transition-opacity" :class="[customClass, background || 'bg-transparent']" v-show="visible">
        <div class="flex items-center justify-center w-full h-full">
          <svg v-if="!spinner" class="animate-spin w-12 h-12 fill-current text-teal-500" viewBox="0 0 50 50">
            <circle cx="25" cy="2.4" r="2.4" />
            <circle opacity="0.55" cx="25" cy="47.6" r="2.4" />
            <circle opacity="0.9" cx="13.7" cy="5.4" r="2.4" />
            <path d="M38.4,43.4 C39,44.5 38.6,46 37.5,46.7 C36.4,47.3 34.9,46.9 34.2,45.8 C33.6,44.7 34,43.2 35.1,42.5 C36.2,41.9 37.7,42.3 38.4,43.4 Z" opacity="0.45" />
            <path d="M6.6,11.6 C7.7,12.2 8.1,13.7 7.5,14.9 C6.9,16 5.4,16.4 4.2,15.8 C3.1,15.2 2.7,13.7 3.3,12.5 C4,11.3 5.5,11 6.6,11.6 Z" opacity="0.8" />
            <path d="M45.8,34.2 C46.9,34.8 47.3,36.3 46.7,37.5 C46.1,38.6 44.6,39 43.4,38.4 C42.3,37.8 41.9,36.3 42.5,35.1 C43.1,34 44.6,33.5 45.8,34.2 Z" opacity="0.35" />
            <circle opacity="0.7" cx="2.4" cy="25" r="2.4" />
            <circle opacity="0.2" cx="47.6" cy="25" r="2.4" />
            <path d="M4.2,34.2 C5.3,33.6 6.8,34 7.5,35.1 C8.1,36.2 7.7,37.7 6.6,38.4 C5.5,39 4,38.6 3.3,37.5 C2.6,36.4 3.1,34.9 4.2,34.2 Z" opacity="0.65" />
            <path d="M43.4,11.6 C44.5,11 46,11.4 46.7,12.5 C47.3,13.6 46.9,15.1 45.8,15.8 C44.7,16.4 43.2,16 42.5,14.9 C41.9,13.8 42.3,12.3 43.4,11.6 Z" opacity="0.1" />
            <path d="M11.6,43.4 C12.2,42.3 13.7,41.9 14.9,42.5 C16,43.1 16.4,44.6 15.8,45.8 C15.2,46.9 13.7,47.3 12.5,46.7 C11.4,46 11,44.5 11.6,43.4 Z" opacity="0.6" />
            <path d="M34.2,4.2 C34.8,3.1 36.3,2.7 37.5,3.3 C38.6,3.9 39,5.4 38.4,6.6 C37.8,7.7 36.3,8.1 35.1,7.5 C34,6.9 33.5,5.4 34.2,4.2 Z" />
          </svg>
          <i v-else :class="spinner"></i>
          <div class="text-gray-400 mt-2" v-if="text">{{ text }}</div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  export default {
    name: "Loading",
    data() {
      return {
        text: null,
        spinner: null,
        background: null,
        visible: false,
        fullscreen: true,
        customClass: ""
      }
    },
    methods: {
      handleAfterLeave() {
        this.$emit('after-leave')
      },
      setText(text) {
        this.text = text
      }
    }
  }
</script>
