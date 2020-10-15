<template>
  <div class="z-10">
    <transition
      enter-class="opacity-0"
      enter-active-class="ease-out duration-300"
      enter-to-class="opacity-100"
      leave-class="opacity-100"
      leave-active-class="ease-in duration-200"
      leave-to-class="opacity-0"
    >
      <div class="fixed inset-0 transition-opacity bg-black bg-opacity-25 z-40" v-show="visible" @click="handleMaskClick"></div>
    </transition>
    <div class="fixed bottom-0 inset-x-0 px-4 pb-4 sm:inset-0 sm:flex sm:items-center sm:justify-center z-50" v-show="wrapShow" @click.self="handleWrapperClick">
      <transition
        enter-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        enter-active-class="ease-out duration-300"
        enter-to-class="opacity-100 translate-y-0 sm:scale-100"
        leave-class="opacity-100 translate-y-0 sm:scale-100"
        leave-active-class="ease-in duration-200"
        leave-to-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
      >
        <div class="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:w-full relative" :class="[size || 'sm:max-w-md']" v-show="visible">
          <div class="absolute top-0 right-0 mt-4 mr-4" v-if="showClose"  @click="handleAction('cancel')">
            <svg class="w-6 h-6 stroke-current text-gray-500 cursor-pointer" fill="none" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </div>
          <div class="px-4 py-4 sm:px-6 flex items-center justify-center sm:justify-between" v-if="showHead && ($slots.header || this.title) && !isIconType">
            <slot name="header">
              <h3 class="text-lg leading-6 font-medium text-gray-900">
                {{ title }}
              </h3>
            </slot>
          </div>
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <slot>
              <div class="sm:flex sm:items-start" v-if="isIconType">
                <div class="mx-auto sm:mx-0 flex-shrink-0 flex items-center justify-center">
                  <svg class="h-12 w-12 sm:h-10 sm:w-10 stroke-current text-teal-500" fill="none" viewBox="0 0 24 24" v-if="type === 'info'">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <svg class="h-12 w-12 sm:h-10 sm:w-10 stroke-current text-green-500" fill="none" viewBox="0 0 24 24" v-if="type === 'success'">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <svg class="h-12 w-12 sm:h-10 sm:w-10 stroke-current text-yellow-500" fill="none" viewBox="0 0 24 24" v-if="type === 'warning'">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <svg class="h-12 w-12 sm:h-10 sm:w-10 stroke-current text-red-500" fill="none" viewBox="0 0 24 24" v-if="type === 'error'">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3 class="text-lg leading-6 font-medium text-gray-900">
                    {{ title }}
                  </h3>
                  <div class="mt-2">
                    <p class="text-sm leading-5 text-gray-500">
                      {{ content }}
                    </p>
                  </div>
                </div>
              </div>
              <div v-else>
                <p class="text-sm leading-5 text-gray-500">
                  {{ content }}
                </p>
                <div v-if="showInput">
                  <input v-model="inputValue" :placeholder="inputPlaceholder" @keyup.enter="handleAction('confirm')" ref="input"/>
                </div>
              </div>
            </slot>
          </div>
          <div class="px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse" v-if="showFooter">
            <slot name="footer">
              <span class="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto" v-show="showConfirmButton">
              <button  @click="handleAction('confirm')" type="button" class="inline-flex items-center justify-center px-6 py-2 rounded-md shadow-md leading-tight text-white bg-teal-500 w-full transition ease-in-out duration-150 focus:outline-none">
                {{ localeOKText }}
              </button>
              </span>
              <span class="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto" v-show="showCancelButton">
                <button @click="handleAction('cancel')" type="button" class="inline-flex items-center justify-center px-6 py-2 rounded-md shadow-md leading-tight w-full transition ease-in-out duration-150 focus:outline-none">
                  {{ localeCancelText }}
                </button>
              </span>
            </slot>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TDialog',
  props: {
    title: String,
    content: String,
    value: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: 'sm:max-w-md'
    },
    cancelText: {
      type: String
    },
    okText: {
      type: String
    },
    maskClosable: {
      type: Boolean,
      default: true
    },
    showHead: {
      type: Boolean,
      default: true
    },
    showClose: {
      type: Boolean,
      default: true
    },
    showFooter: {
      type: Boolean,
      default: true
    },
    showInput: {
      type: Boolean,
      default: false
    },
    closeOnPressEsc: {
      type: Boolean,
      default: true
    },
    styles: {
      type: Object,
      default () {
        return {}
      }
    },
    type: String
  },
  data () {
    return {
      wrapShow: false,
      showCancelButton: true,
      showConfirmButton: true,
      action: '',
      visible: this.value,
      inputValue: null,
      inputPlaceholder: '',
      callback: null
    }
  },
  computed: {
    iconName() {
      const nameArr = {
        'success': 'check-circle',
        'error': 'x-circle',
        'warning': 'exclamation-circle',
        'info': 'information-circle'
      }

      return nameArr[this.type] || ''
    },
    iconClass () {
      const classArr = {
        'success': 'text-green-600',
        'error': 'text-red-600',
        'warning': 'text-yellow-600',
        'info': 'text-blue-600'
      }

      return classArr[this.type] || ''
    },

    isIconType () {
      return ['success', 'error', 'warning', 'info'].indexOf(this.type) > -1
    },
    localeOKText () {
      return (typeof this.okText === 'undefined') ? '确认' : this.okText
    },
    localeCancelText () {
      return (typeof this.cancelText === 'undefined') ? '取消' : this.cancelText
    }
  },
  watch: {
    value (val) {
      this.visible = val
    },
    visible (val) {
      if (val) {
        if (this.timer) {
          clearTimeout(this.timer)
        }
        this.wrapShow = true
      } else {
        this.timer = setTimeout(() => {
          this.wrapShow = false
        }, 300)
      }
    }
  },
  methods: {
    doClose () {
      this.visible = false
      this.$emit('input', false)
      this.$emit('on-cancel')

      if (this.action && this.callback) {
        this.callback(this.action, this)
      }
    },
    handleMaskClick () {
      if (this.maskClosable) {
        this.doClose()
      }
    },
    handleWrapperClick () {
      if (this.maskClosable) {
        this.doClose()
      }
    },
    handleAction (action) {
      this.action = action

      if (action === 'confirm') {
        this.$emit('input', false)
        this.$emit('on-confirm')
      }

      this.doClose()
    },
    handleKeyCode (evt) {
      if (this.visible && this.showClose) {
        if (evt.keyCode === 27) { // Escape
          this.doClose()
        }
      }
    }
  },
  mounted () {
    if (this.visible) {
      this.wrapShow = true
    }

    document.addEventListener('keydown', this.handleKeyCode)
  },
  beforeDestory () {
    document.removeEventListener('keydown', this.handleKeyCode)
  }
}
</script>
