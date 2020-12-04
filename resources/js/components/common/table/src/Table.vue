<template>
  <div v-loading="loading" loading-custom-class="h-56">
    <div>
      <table class="table-fixed w-full">
        <colgroup>
          <col v-if="selection !== false" :width="50" />
          <col v-for="(col, index) of computeColumns" :width="getWidth(col)" :key="index + update.columns" />
        </colgroup>
        <thead>
          <tr>
            <th class="px-2 py-3 text-gray-900 text-center font-semibold tracking-wider border-b border-gray-100" v-if="!selection || selection === 'checkbox'">
              <input type="checkbox" class="form-checkbox w-4 h-4 cursor-pointer text-teal-500 focus:shadow-outline-teal" :checked="checks.length > 0 && checks.length === checkableData.length" @change="checkAll">
            </th>
            <th class="px-6 py-3 text-gray-900 font-semibold tracking-wider border-b border-gray-100" :class="[getColumnClasses(col)]" v-for="(col, index) of computeColumns" :key="index + update.columns">{{ col.label }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, index) of computeData" :key="row._table_uuid" :class="[isChecked(row) ? 'bg-teal-50' : '']">
            <td class="py-3 border-b border-gray-100 text-center" v-if="!selection || selection === 'checkbox'">
              <input type="checkbox" v-model="checks" :value="row" class="form-checkbox w-4 h-4 cursor-pointer text-teal-500 focus:shadow-outline-teal">
            </td>
            <td class="px-6 py-3 border-b border-gray-100" :class="[getColumnClasses(col)]" v-for="(col, i) of computeColumns" :key="index+'-'+ i + update.columns">
              <template v-if="col.treeOpener">
                <div class="inline-flex items-center w-full">
                  <div v-for="l of row._level" :key="l" class="mr-4"></div>
                  <button type="button" class="focus:outline-none transition-all duration-300 ease-in-out" :class="[row._opened ? 'transform rotate-90' : '']" v-if="hasChildren(row)" @click="toggleTree(row)">
                    <svg class="w-4 h-4 stroke-current text-teal-500 mr-1" fill="none" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                  </button>
                  <div :class="{'w-4 h-4 mr-1': row._level > 0}" v-else></div>
                  <template>
                    <template v-if="col.slot">
                      <slot :name="col.slot" :row="row" :column="col" :index="index"></slot>
                    </template>
                    <template v-else>{{ getRowShow(row, col) }}</template>
                  </template>
                </div>
              </template>
              <template v-else>
                <template v-if="col.slot">
                  <slot :name="col.slot" :row="row" :column="col" :index="index"></slot>
                </template>
                <template v-else>{{ getRowShow(row, col) }}</template>
              </template>
            </td>
          </tr>
          <tr v-if="loading === false && computeData.length === 0">
            <td :colspan="computeColumns.length+1">
              <empty-data :class="['shadow-none']" :show="loading === false && computeData.length === 0"/>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
  import EmptyData from "@/components/common/EmptyData"
  import { isObject, uuid } from "@/utils/util"

  export default {
    name: 'TTable',
    components: {
      EmptyData
    },
    props: {
      columns: {
        type: Array,
        default: () => []
      },
      data: {
        type: Array,
        default: () => []
      },
      loading: {
        type: Boolean | NaN,
        default: null
      },
      childrenKey: {
        type: String | NaN,
        default: 'children'
      },
      selection: Boolean | String
    },
    data () {
      return {
        isMounted: false,
        update: {
          data: 0,
          columns: 0
        },
        computeColumns: [],
        backupData: [...this.data],
        computeData: [...this.data],
        checks: []
      }
    },
    computed: {
      checkableData() {
        return this.computeData.filter(item => item.checkable !== false);
      },
    },
    watch: {
      data: {
        handler() {
          let changed = this.backupData.length != this.data.length
          let n = 0;
          while (!changed && this.data.length > n) {
            changed = this.data[n] !== this.backupData[n]
            n += 1
          }
          if (changed) {
            this.labelData(this.data)
            this.update.data += 1
            this.checks.splice(0, this.checks.length)
            this.computeData = [...this.data]
          }
          this.backupData = [...this.data]
        },
        deep: true
      },
      columns: {
        handler() {
          this.initColumns()
          this.update.columns += 1
        },
        deep: true
      },
      checks: {
        handler() {
          this.$emit('select', this.checks)
        },
        deep: true
      },
    },
    beforeMount() {
      this.labelData(this.data)
    },
    mounted() {
      this.isMounted = true
      this.initColumns()
    },
    methods: {
      labelData(data) {
        for (let d of data) {
          if (!d._table_uuid) {
            this.$set(d, '_table_uuid', uuid())
          }
          if (!d._level) {
            this.$set(d, '_level', 0)
          }
        }
      },
      initColumns() {
        if (this.columns.length) {
          this.computeColumns = this.columns
          return
        }
        let columns = []
        if (this.$slots.default) {
          for (let slot of this.$slots.default) {
            let option = slot.componentOptions
            if (option && (option.tag == 'TableColumn' || option.tag == 't-table-column' || option.tag == 't-tablecolumn')) {
              columns.push(slot.componentOptions.propsData)
            }
          }
        }
        this.computeColumns = columns
      },
      toggleTree(row) {
        if (row._opened) {
          this.foldTree(row)
        } else {
          this.expandTree(row)
        }
      },
      foldAll() {
        this.computeData.forEach(item => {
          this.foldTree(item)
        })
      },
      expandAll() {
        this.computeData.forEach(item => {
          this.expandTree(item, { expandAll: true })
        })
      },
      expandTree(row, params = {}) {
        if (row._opened) return false
        if (this.hasChildren(row)) {
          this.labelData(this.getRowChildren(row))
          this.$set(row, '_opened', true)
          let index = this.computeData.indexOf(row)
          this.computeData.splice(index + 1, 0, ...this.getRowChildren(row))
          this.getRowChildren(row).forEach(item => {
            this.$set(item, '_level', (row._level || 0) + 1)
            if (params.expandAll) {
              this.expandTree(item)
            }
          })
        }
      },
      foldTree(row) {
        if (!row._opened) return false
        if (this.hasChildren(row)) {
          this.getRowChildren(row).forEach(item => {
            this.foldTree(item)
            let itemIndex = this.computeData.indexOf(item)
            let checkIndex = this.checks.indexOf(item)
            if (itemIndex > -1) {
              this.computeData.splice(itemIndex, 1)
            }
            if (checkIndex > -1) {
              this.checks.splice(checkIndex, 1)
            }
          });
          this.$set(row, '_opened', false)
        }
      },
      hasChildren(row) {
        return this.getRowChildren(row) && this.getRowChildren(row).length > 0
      },
      getRowChildren(row) {
        return row[this.childrenKey || 'children']
      },
      getWidth(column) {
        return isObject(column) && column.width ? column.width : ''
      },
      getColumnClasses(column) {
        let classes = {
          left: 'text-left',
          center: 'text-center',
          right: 'text-right'
        }
        return classes[column.align] || 'text-left'
      },
      getRowShow(row, column) {
        let value = row[column.prop]

        if (column.render) {
          return column.render.call(null, value)
        }
        if (column.unit) {
          return value === '' || value === null || value === undefined ? '' : `${value}${this.unit}`
        }
        if (column.format) {
          return column.format(value)
        }
        return value
      },
      checkAll() {
        if (this.checks.length === this.checkableData.length) {
          this.checks.splice(0, this.checkableData.length)
        } else {
          this.checks = Object.assign([], this.checkableData)
        }
        this.$emit('selectAll', this.checks)
      },
      isChecked(row) {
        return this.checks.indexOf(row) > -1
      },
    }
  }
</script>
