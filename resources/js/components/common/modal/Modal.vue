<template>
  <div>
    <transition
      enter-class="opacity-0"
      enter-active-class="ease-out duration-300"
      enter-to-class="opacity-100"
      leave-class="opacity-100"
      leave-active-class="ease-in duration-200"
      leave-to-class="opacity-0"
    >
      <div class="fixed inset-0 transition-opacity bg-black bg-opacity-25" v-show="visible" @click="handleMaskClick"></div>
    </transition>
    <div class="fixed bottom-0 inset-x-0 px-4 pb-4 sm:inset-0 sm:flex sm:items-center sm:justify-center" v-show="wrapShow" @click.self="handleWrapperClick">
      <transition
        enter-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        enter-active-class="ease-out duration-300"
        enter-to-class="opacity-100 translate-y-0 sm:scale-100"
        leave-class="opacity-100 translate-y-0 sm:scale-100"
        leave-active-class="ease-in duration-200"
        leave-to-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
      >
        <div class="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all w-full relative" :class="modalClasses" v-show="visible">
          <div class="absolute top-0 right-0 mt-8 mr-8 cursor-pointer" v-if="showClose"  @click="handleAction('cancel')">
            <svg class="w-5 h-5 stroke-current" fill="none" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </div>
          <div class="px-8 pt-8 pb-4 flex items-center justify-center sm:justify-between" v-if="showHead && ($slots.header || this.title)">
            <slot name="header">
              <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-headline">
                {{ title }}
              </h3>
            </slot>
          </div>
          <div class="bg-white px-8">
            <slot></slot>
          </div>
          <div class="py-6 px-8 sm:flex sm:flex-row-reverse" v-if="showFooter">
            <slot name="footer">
              <span class="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto" v-show="showConfirmButton">
              <button  @click="handleAction('confirm')" type="button" class="w-full transition ease-in-out duration-150">
                {{ localeOKText }}
              </button>
              </span>
              <span class="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto" v-show="showCancelButton">
                <button @click="handleAction('cancel')" type="button" class="w-full transition ease-in-out duration-150">
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
  name: 'Modal',
  props: {
    title: String,
    content: String,
    value: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: 'lg'
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
    }
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
    modalClasses () {
      let widthClasses = 'max-w-' + this.size || 'lg'
      return {[widthClasses]: true}
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
