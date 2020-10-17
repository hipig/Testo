<template>
  <transition name="viewer-fade">
    <div tabindex="-1" ref="el-image-viewer__wrapper" class="fixed inset-0 flex items-center" :style="{ 'z-index': zIndex }">
      <div class="absolute inset-0 transition-opacity bg-black bg-opacity-50"></div>
      <!-- CLOSE -->
      <div class="absolute top-0 right-0 h-20 w-20 flex items-center justify-center text-gray-300 hover:text-white cursor-pointer" :style="{ 'z-index': zIndex+1 }" @click="hide">
        <svg class="w-8 h-8 stroke-current cursor-pointer" fill="none" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </div>
      <!-- ARROW -->
      <template v-if="!isSingle">
        <div class="absolute left-0 top-0 bottom-0 flex items-center">
          <div
            class="ml-5 h-10 w-10 flex items-center justify-center text-white bg-black bg-opacity-50 rounded-full cursor-pointer"
            :class="{ 'cursor-not-allowed': !infinite && isFirst }"
            @click="prev">
            <svg class="w-6 h-6 stroke-current cursor-pointer" fill="none" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
            </svg>
          </div>
        </div>
        <div class="absolute right-0 top-0 bottom-0 flex items-center">
          <div
            class="mr-5 h-10 w-10 flex items-center justify-center text-white bg-black bg-opacity-50 rounded-full cursor-pointer"
            :class="{ 'cursor-not-allowed': !infinite && isLast }"
            @click="next">
            <svg class="w-6 h-6 stroke-current cursor-pointer" fill="none" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </div>
        </div>
      </template>
      <!-- ACTIONS -->
      <div class="absolute left-0 right-0 bottom-0 mb-6 flex justify-center" :style="{ 'z-index': zIndex+1 }">
        <div class="flex items-center w-64 h-10 px-6 text-white bg-black bg-opacity-50 rounded-full">
          <div class="w-full flex items-center justify-around">
            <svg class="w-6 h-6 stroke-current cursor-pointer" fill="none" viewBox="0 0 24 24" @click="handleActions('zoomOut')">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H7"></path>
            </svg>
            <svg class="w-6 h-6 stroke-current cursor-pointer" fill="none" viewBox="0 0 24 24" @click="handleActions('zoomIn')">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"></path>
            </svg>
            <svg class="w-6 h-6 stroke-current cursor-pointer" fill="none" viewBox="0 0 24 24" v-if="mode === 'contain'" @click="toggleMode">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"></path>
            </svg>
            <svg class="w-6 h-6 stroke-current cursor-pointer" fill="none" viewBox="0 0 24 24" v-if="mode === 'original'" @click="toggleMode">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2"></path>
            </svg>
            <svg class="w-6 h-6 stroke-current cursor-pointer" fill="none" viewBox="0 0 24 24" @click="handleActions('anticlocelise')">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z"></path>
            </svg>
            <svg class="w-6 h-6 stroke-current cursor-pointer" fill="none" viewBox="0 0 24 24" @click="handleActions('clocelise')">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
        </div>
      </div>
      <!-- CANVAS -->
      <div class="w-full h-full flex items-center justify-center">
        <template v-for="(url, i) in urlList">
          <img
            v-if="i === index"
            ref="img"
            :key="url"
            :src="currentImg"
            :style="imgStyle"
            @load="handleImgLoad"
            @error="handleImgError"
            @mousedown="handleMouseDown">
        </template>

      </div>
    </div>
  </transition>
</template>

<script>
  import { on, off, rafThrottle, isFirefox } from '@/utils/util'

  const mousewheelEventName = isFirefox() ? 'DOMMouseScroll' : 'mousewheel'

  export default {
    name: 'TImageViewer',

    props: {
      urlList: {
        type: Array,
        default: () => []
      },
      zIndex: {
        type: Number,
        default: 2000
      },
      onSwitch: {
        type: Function,
        default: () => {}
      },
      onClose: {
        type: Function,
        default: () => {}
      },
      initialIndex: {
        type: Number,
        default: 0
      }
    },

    data() {
      return {
        index: this.initialIndex,
        isShow: false,
        infinite: true,
        loading: false,
        mode: 'contain',
        transform: {
          scale: 1,
          deg: 0,
          offsetX: 0,
          offsetY: 0,
          enableTransition: false
        }
      }
    },
    computed: {
      isSingle() {
        return this.urlList.length <= 1
      },
      isFirst() {
        return this.index === 0
      },
      isLast() {
        return this.index === this.urlList.length - 1
      },
      currentImg() {
        return this.urlList[this.index]
      },
      imgStyle() {
        const { scale, deg, offsetX, offsetY, enableTransition } = this.transform
        const style = {
          transform: `scale(${scale}) rotate(${deg}deg)`,
          transition: enableTransition ? 'transform .3s' : '',
          'margin-left': `${offsetX}px`,
          'margin-top': `${offsetY}px`
        }
        if (this.mode === 'contain') {
          style.maxWidth = style.maxHeight = '100%'
        }
        return style
      }
    },
    watch: {
      index: {
        handler: function(val) {
          this.reset()
          this.onSwitch(val)
        }
      },
      currentImg(val) {
        this.$nextTick(_ => {
          const $img = this.$refs.img[0]
          if (!$img.complete) {
            this.loading = true
          }
        })
      }
    },
    methods: {
      hide() {
        this.deviceSupportUninstall()
        this.onClose()
      },
      deviceSupportInstall() {
        this._keyDownHandler = rafThrottle(e => {
          const keyCode = e.keyCode
          switch (keyCode) {
            // ESC
            case 27:
              this.hide()
              break
            // SPACE
            case 32:
              this.toggleMode()
              break
            // LEFT_ARROW
            case 37:
              this.prev()
              break
            // UP_ARROW
            case 38:
              this.handleActions('zoomIn')
              break
            // RIGHT_ARROW
            case 39:
              this.next()
              break
            // DOWN_ARROW
            case 40:
              this.handleActions('zoomOut')
              break
          }
        })
        this._mouseWheelHandler = rafThrottle(e => {
          const delta = e.wheelDelta ? e.wheelDelta : -e.detail
          if (delta > 0) {
            this.handleActions('zoomIn', {
              zoomRate: 0.015,
              enableTransition: false
            })
          } else {
            this.handleActions('zoomOut', {
              zoomRate: 0.015,
              enableTransition: false
            })
          }
        })
        on(document, 'keydown', this._keyDownHandler)
        on(document, mousewheelEventName, this._mouseWheelHandler)
      },
      deviceSupportUninstall() {
        off(document, 'keydown', this._keyDownHandler)
        off(document, mousewheelEventName, this._mouseWheelHandler)
        this._keyDownHandler = null
        this._mouseWheelHandler = null
      },
      handleImgLoad(e) {
        this.loading = false
      },
      handleImgError(e) {
        this.loading = false
        e.target.alt = '加载失败'
      },
      handleMouseDown(e) {
        if (this.loading || e.button !== 0) return

        const { offsetX, offsetY } = this.transform
        const startX = e.pageX
        const startY = e.pageY
        this._dragHandler = rafThrottle(ev => {
          this.transform.offsetX = offsetX + ev.pageX - startX
          this.transform.offsetY = offsetY + ev.pageY - startY
        })
        on(document, 'mousemove', this._dragHandler)
        on(document, 'mouseup', ev => {
          off(document, 'mousemove', this._dragHandler)
        })

        e.preventDefault()
      },
      reset() {
        this.transform = {
          scale: 1,
          deg: 0,
          offsetX: 0,
          offsetY: 0,
          enableTransition: false
        }
      },
      toggleMode() {
        if (this.loading) return

        this.mode = this.mode === 'contain' ? 'original' : 'contain'
        this.reset()
      },
      prev() {
        if (this.isFirst && !this.infinite) return
        const len = this.urlList.length
        this.index = (this.index - 1 + len) % len
      },
      next() {
        if (this.isLast && !this.infinite) return
        const len = this.urlList.length
        this.index = (this.index + 1) % len
      },
      handleActions(action, options = {}) {
        if (this.loading) return
        const { zoomRate, rotateDeg, enableTransition } = {
          zoomRate: 0.2,
          rotateDeg: 90,
          enableTransition: true,
          ...options
        }
        const { transform } = this
        switch (action) {
          case 'zoomOut':
            if (transform.scale > 0.2) {
              transform.scale = parseFloat((transform.scale - zoomRate).toFixed(3))
            }
            break
          case 'zoomIn':
            transform.scale = parseFloat((transform.scale + zoomRate).toFixed(3))
            break
          case 'clocelise':
            transform.deg += rotateDeg
            break
          case 'anticlocelise':
            transform.deg -= rotateDeg
            break
        }
        transform.enableTransition = enableTransition
      }
    },
    mounted() {
      this.deviceSupportInstall()
      this.$refs['el-image-viewer__wrapper'].focus()
    }
  }
</script>
