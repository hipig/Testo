<template>
  <div class="z-50">
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
          <div class="absolute top-0 right-0 mt-8 mr-8 cursor-pointer" v-if="showClose"  @click="handleClose">
            <svg class="w-6 h-6 stroke-current" fill="none" viewBox="0 0 24 24">
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
          <div class="py-6 px-8" v-if="showFooter">
            <slot name="footer"></slot>
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
      visible: this.value
    }
  },
  computed: {
    modalClasses () {
      let widthClasses = 'max-w-' + this.size || 'lg'
      return {[widthClasses]: true}
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
      this.$emit('close')
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
    handleClose () {
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
