<template>
  <div class="relative inline-block" v-clickoutside="handleClose">
    <div @click="show = !show">
      <slot></slot>
    </div>
    <transition
      enter-class="transform opacity-0 scale-95"
      enter-active-class="transition ease-out duration-100"
      enter-to-class="transform opacity-100 scale-100"
      leave-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-to-class="transform opacity-0 scale-95"
    >
      <div class="origin-top-right absolute right-0 mt-2" v-show="show">
        <slot name="dropdown-menu"></slot>
      </div>
    </transition>
  </div>
</template>

<script>
  import Clickoutside from '@/directives/clickoutside'

  export default {
    name: 'Dropdown',
    directives: { Clickoutside },
    data () {
      return {
        show: false
      }
    },
    methods: {
      handleClose() {
        this.show = false
      }
    }
  }
</script>
