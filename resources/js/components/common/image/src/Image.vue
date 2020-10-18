<template>
  <div class="relative inline-flex overflow-hidden" :class="[alignCenter ? 'items-center' : '']">
    <slot v-if="loading" name="placeholder">
      <div class="h-full w-full bg-gray-100"></div>
    </slot>
    <slot v-else-if="error" name="error">
      <div class="h-full w-full bg-gray-100 flex items-center justify-center text-gray-400">
        <div class="flex flex-col items-center">
          <svg class="w-8 h-8 stroke-current mb-1" fill="none" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
          </svg>
          <span>{{ loadErrText || '加载失败' }}</span>
        </div>
      </div>
    </slot>
    <img
      v-else
      class="h-full w-full align-top"
      v-bind="$attrs"
      v-on="$listeners"
      @click="clickHandler"
      :src="src"
      :style="imageStyle"
      :class="{'cursor-pointer': preview }">
    <template v-if="preview">
      <image-viewer :z-index="zIndex" :initial-index="imageIndex" v-if="showViewer" :on-close="closeViewer" :url-list="previewSrcList"/>
    </template>
  </div>
</template>

<script>
  import ImageViewer from './ImageViewer'
  import { on, off, getScrollContainer, isInContainer, isString, isHtmlElement } from '@/utils/util'
  import { throttle } from 'throttle-debounce'

  const isSupportObjectFit = () => document.documentElement.style.objectFit !== undefined

  const ObjectFit = {
    NONE: 'none',
    CONTAIN: 'contain',
    COVER: 'cover',
    FILL: 'fill',
    SCALE_DOWN: 'scale-down'
  }

  let prevOverflow = ''

  export default {
    name: 'TImage',
    inheritAttrs: false,

    components: {
      ImageViewer
    },

    props: {
      src: String,
      fit: String,
      lazy: Boolean,
      scrollContainer: {},
      previewSrcList: {
        type: Array,
        default: () => []
      },
      zIndex: {
        type: Number,
        default: 2000
      },
      loadErrText: {
        type: String,
        default: ''
      }
    },

    data() {
      return {
        loading: true,
        error: false,
        show: !this.lazy,
        imageWidth: 0,
        imageHeight: 0,
        showViewer: false
      }
    },

    computed: {
      imageStyle() {
        const { fit } = this
        if (!this.$isServer && fit) {
          return isSupportObjectFit()
            ? { 'object-fit': fit }
            : this.getImageStyle(fit)
        }
        return {}
      },
      alignCenter() {
        return !this.$isServer && !isSupportObjectFit() && this.fit !== ObjectFit.FILL
      },
      preview() {
        const { previewSrcList } = this
        return Array.isArray(previewSrcList) && previewSrcList.length > 0
      },
      imageIndex() {
        let previewIndex = 0
        const srcIndex = this.previewSrcList.indexOf(this.src)
        if (srcIndex >= 0) {
          previewIndex = srcIndex
        }
        return previewIndex
      }
    },

    watch: {
      src(val) {
        this.show && this.loadImage()
      },
      show(val) {
        val && this.loadImage()
      }
    },

    mounted() {
      if (this.lazy) {
        this.addLazyLoadListener()
      } else {
        this.loadImage()
      }
    },

    beforeDestroy() {
      this.lazy && this.removeLazyLoadListener()
    },

    methods: {
      loadImage() {
        if (this.$isServer) return

        // reset status
        this.loading = true
        this.error = false

        const img = new Image()
        img.onload = e => this.handleLoad(e, img)
        img.onerror = this.handleError.bind(this)

        // bind html attrs
        // so it can behave consistently
        Object.keys(this.$attrs)
          .forEach((key) => {
            const value = this.$attrs[key]
            img.setAttribute(key, value)
          })
        img.src = this.src
      },
      handleLoad(e, img) {
        this.imageWidth = img.width
        this.imageHeight = img.height
        this.loading = false
        this.error = false
      },
      handleError(e) {
        this.loading = false
        this.error = true
        this.$emit('error', e)
      },
      handleLazyLoad() {
        if (isInContainer(this.$el, this._scrollContainer)) {
          this.show = true
          this.removeLazyLoadListener()
        }
      },
      addLazyLoadListener() {
        if (this.$isServer) return

        const { scrollContainer } = this
        let _scrollContainer = null

        if (isHtmlElement(scrollContainer)) {
          _scrollContainer = scrollContainer
        } else if (isString(scrollContainer)) {
          _scrollContainer = document.querySelector(scrollContainer)
        } else {
          _scrollContainer = getScrollContainer(this.$el)
        }

        if (_scrollContainer) {
          this._scrollContainer = _scrollContainer
          this._lazyLoadHandler = throttle(200, this.handleLazyLoad)
          on(_scrollContainer, 'scroll', this._lazyLoadHandler)
          this.handleLazyLoad()
        }
      },
      removeLazyLoadListener() {
        const { _scrollContainer, _lazyLoadHandler } = this

        if (this.$isServer || !_scrollContainer || !_lazyLoadHandler) return

        off(_scrollContainer, 'scroll', _lazyLoadHandler)
        this._scrollContainer = null
        this._lazyLoadHandler = null
      },
      /**
       * simulate object-fit behavior to compatible with IE11 and other browsers which not support object-fit
       */
      getImageStyle(fit) {
        const { imageWidth, imageHeight } = this
        const {
          clientWidth: containerWidth,
          clientHeight: containerHeight
        } = this.$el

        if (!imageWidth || !imageHeight || !containerWidth || !containerHeight) return {}

        const vertical = imageWidth / imageHeight < 1

        if (fit === ObjectFit.SCALE_DOWN) {
          const isSmaller = imageWidth < containerWidth && imageHeight < containerHeight
          fit = isSmaller ? ObjectFit.NONE : ObjectFit.CONTAIN
        }

        switch (fit) {
          case ObjectFit.NONE:
            return { width: 'auto', height: 'auto' }
          case ObjectFit.CONTAIN:
            return vertical ? { width: 'auto' } : { height: 'auto' }
          case ObjectFit.COVER:
            return vertical ? { height: 'auto' } : { width: 'auto' }
          default:
            return {}
        }
      },
      clickHandler() {
        // don't show viewer when preview is false
        if (!this.preview) {
          return
        }
        // prevent body scroll
        prevOverflow = document.body.style.overflow
        document.body.style.overflow = 'hidden'
        this.showViewer = true
      },
      closeViewer() {
        document.body.style.overflow = prevOverflow
        this.showViewer = false
      }
    }
  }
</script>
