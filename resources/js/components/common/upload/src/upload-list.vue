<template>
  <transition-group
    tag="ul"
    class=""
    :class="[
      'el-upload-list',
      'el-upload-list--' + listType,
      { 'is-disabled': disabled },
      {'inline-flex': listType === 'picture-card'}
    ]"
    name="el-list"
  >
    <li
      v-for="file in files"
      class="relative items-center rounded group cursor-pointer focus:outline-none transition-all ease-slide duration-50"
      :class="[itemClasses, 'is-' + file.status, focusing ? 'focusing' : '']"
      :key="file.uid"
      tabindex="0"
      @keydown.delete="!disabled && $emit('remove', file)"
      @focus="focusing = true"
      @blur="focusing = false"
      @click="focusing = false"
    >
      <slot :file="file">
        <img
          :class="[listType === 'picture' ? 'w-16 h-16 absolute left-0 top-0 pt-3 pl-3' : 'w-24 h-24']"
          v-if="file.status !== 'uploading' && ['picture-card', 'picture'].indexOf(listType) > -1"
          :title="file.name"
          :src="file.url" alt=""
        >
        <div class="transition ease-in duration-30 cursor-pointer" :class="[itemFileClasses]" @click="handleClick(file)">
          <svg class="w-4 h-4 stroke-current text-gray-400 mr-1" fill="none" viewBox="0 0 24 24" v-if="listType === 'text'">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
          </svg>
          <div>{{file.name}}</div>
        </div>
        <template v-if="listType === 'text'">
          <div class="absolute right-0 top-0 h-7 flex items-center pr-1" v-if="file.status === 'success'">
            <div class="inline-flex text-green-500 group-hover:hidden">
              <svg class="w-4 h-4 stroke-current" fill="none" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <div class="inline-flex hidden group-hover:block" v-if="!disabled" title="按 delete 键可删除" @click="$emit('remove', file)">
              <svg class="w-4 h-4 stroke-current" fill="none" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </div>
          </div>
        </template>
        <template v-if="listType === 'picture'">
          <div class="absolute right-0 top-0" v-if="file.status === 'success'">
            <div class="absolute right-0 top-0 w-0 h-0 border-green-500 group-hover:hidden" style="border-top-width: 35px;border-top-style: solid;border-left: 35px solid transparent;"></div>
            <div class="absolute right-0 top-0 p-1 inline-flex text-white group-hover:hidden">
              <svg class="w-4 h-4 stroke-current" fill="none" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <div class="absolute right-0 top-0 p-1 inline-flex hidden group-hover:block" v-if="!disabled" title="按 delete 键可删除" @click="$emit('remove', file)">
              <svg class="w-4 h-4 stroke-current" fill="none" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </div>
          </div>
        </template>

        <div class="w-full" :class="[itemProgressClasses]">
          <t-progress
            :width="96"
            :type="listType === 'picture-card' ? 'circle' : 'line'"
            :stroke-width="listType === 'picture-card' ? 6 : 2"
            v-if="file.status === 'uploading'"
            :percentage="parsePercentage(file.percentage)">
          </t-progress>
        </div>
        <div class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white hidden group-hover:flex" v-if="listType === 'picture-card'">
          <div
            class="px-1 cursor-pointer"
            v-if="handlePreview && listType === 'picture-card'"
            @click="handlePreview(file)"
          >
            <svg class="w-5 h-5 stroke-current" fill="none" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
            </svg>
          </div>
          <div
            v-if="!disabled"
            class="px-1 cursor-pointer"
            @click="$emit('remove', file)"
          >
            <svg class="w-5 h-5 stroke-current" fill="none" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
            </svg>
          </div>
        </div>
      </slot>
    </li>
  </transition-group>
</template>
<script>
  import TProgress from '../../progress'

  export default {
    name: 'TUploadList',
    data() {
      return {
        focusing: false
      }
    },
    components: { TProgress },

    props: {
      files: {
        type: Array,
        default() {
          return []
        }
      },
      disabled: {
        type: Boolean,
        default: false
      },
      handlePreview: Function,
      listType: String
    },
    computed: {
      itemClasses() {
        let classes = {
          'text': 'flex flex-col mt-2 justify-between',
          'picture': 'flex flex-col justify-center overflow-hidden mt-3 py-3 pl-20 pr-3 h-20 border border-gray-100',
          'picture-card': 'inline-flex mr-2 w-24'
        }
        return classes[this.listType] || ''
      },
      itemFileClasses() {
        let classes = {
          'text': 'truncate w-full pl-1 pr-10 h-7 flex items-center group-hover:bg-gray-100 group-hover:text-teal-500',
          'picture': 'truncate w-full pl-1 pr-10 h-7 flex items-center group-hover:text-teal-500',
          'picture-card': 'hidden'
        }
        return classes[this.listType] || ''
      },
      itemProgressClasses() {
        let classes = {
          'text': 'absolute left-0 top-0 mt-6',
          'picture': 'absolute left-0 top-0 pt-12 pl-20',
          'picture-card': ''
        }
        return classes[this.listType] || ''
      }
    },
    methods: {
      parsePercentage(val) {
        return parseInt(val, 10) || 0
      },
      handleClick(file) {
        this.handlePreview && this.handlePreview(file)
      }
    }
  }
</script>
