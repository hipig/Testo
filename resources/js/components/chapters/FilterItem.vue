<template>
  <div class="mb-5">
    <h3 class="text-gray-400 mb-2">{{ title }}</h3>
    <div class="flex flex-wrap -mx-3">
      <div class="w-1/6 px-3" v-for="(item, index) in options" :key="index">
        <div class="flex items-center justify-center py-2 mb-3 rounded text-base cursor-pointer" :class="[selectValue == item.key ? 'bg-teal-500 text-white' : 'bg-gray-100']" @click="handle(item.key)">{{ item.value }}</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "FilterItem",
    props: {
      value: {
        type: String | Number,
        default: ''
      },
      title: {
        type: String,
        default: ''
      },
      name: {
        type: String,
        default: ''
      },
      options: {
        type: Array,
        default: []
      },
      selected: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        selectValue: this.value
      }
    },
    watch: {
      value(val) {
        this.selectValue = val
      }
    },
    methods: {
      handle(key) {
        this.selectValue = key
        this.$emit('on-change', this.selectValue, this.name)
      }
    }
  }
</script>
