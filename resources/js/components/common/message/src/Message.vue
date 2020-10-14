<template>
  <div
    class="fixed top-0 left-0 w-full text-center pointer-events-none z-50"
    :style="{
      top: top ? `${top}px` : 'auto',
      transition: 'opacity .3s, transform .3s, top .4s'
    }"
  >

    <transition
      enter-class="-translate-y-full opacity-0"
      enter-active-class="transform origin-center ease-in-out duration-300"
      enter-to-class="translate-y-0 opacity-100"
      leave-class="translate-y-0 opacity-100"
      leave-active-class="transform origin-center ease-in-out duration-300"
      leave-to-class="-translate-y-full opacity-0"
      @after-leave="handleAfterLeave"
    >
      <div class="inline-flex items-center px-4 py-2 text-sm rounded-lg bg-white shadow border border-gray-50 leading-none" v-show="visible">
        <svg class="w-5 h-5 stroke-current text-teal-500" fill="none" viewBox="0 0 24 24" v-if="type === 'info'">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <svg class="w-5 h-5 stroke-current text-green-500" fill="none" viewBox="0 0 24 24" v-if="type === 'success'">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <svg class="w-5 h-5 stroke-current text-yellow-500" fill="none" viewBox="0 0 24 24" v-if="type === 'warning'">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <svg class="w-5 h-5 stroke-current text-red-500" fill="none" viewBox="0 0 24 24" v-if="type === 'error'">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <svg class="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" v-if="type === 'loading'">
          <circle class="opacity-25 stroke-current" cx="12" cy="12" r="10" stroke-width="4"></circle>
          <path class="opacity-75 stroke-current" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <span class="ml-2">{{ message }}</span>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'TMessage',
  data () {
    return {
      message: '',
      duration: 3000,
      type: 'info',
      icon: '',
      visible: false,
      timer: null,
      closed: false,
      onClose: null,
      top: null
    }
  },
  watch: {
    closed (val) {
      if (val) {
        this.visible = false
      }
    }
  },
  methods: {
    handleAfterLeave () {
      this.$destroy(true)
      this.$el.parentNode.removeChild(this.$el)
    },
    close () {
      this.closed = true
      if (typeof this.onClose === 'function') {
        this.onClose(this)
      }
    },
    startTimer () {
      if (this.duration) {
        this.timer = setTimeout(() => {
          !this.closed && this.close()
        }, this.duration)
      }
    },
    clearTimer () {
      this.timer && clearTimeout(this.timer)
    }
  },
  mounted () {
    this.startTimer()
  }
}
</script>
