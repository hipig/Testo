<template>
  <div>
    <div>
      <table class="w-full border-b border-gray-200">
        <colgroup>
          <col v-if="selection !== false" :width="50" />
          <col v-for="(col, index) of computeColumns" :width="getWidth(col)" :key="index" />
        </colgroup>
        <thead>
          <tr>
            <th class="px-2 py-3 text-gray-900 text-center font-semibold tracking-wider" v-if="!selection || selection === 'checkbox'">
              <input type="checkbox" class="form-checkbox w-4 h-4 cursor-pointer text-teal-500 focus:shadow-outline-teal" :checked="checks.length > 0" @change="checkAll">
            </th>
            <th class="px-6 py-3 text-gray-900 font-semibold tracking-wider" :class="[getColumnClasses(col)]" v-for="(col, index) of computeColumns" :key="index">{{ col.label }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, index) of computeData" :key="index">
            <td class="py-3 border-t border-gray-200 text-center" v-if="!selection || selection === 'checkbox'">
              <input type="checkbox" v-model="checks" :value="row" class="form-checkbox w-4 h-4 cursor-pointer text-teal-500 focus:shadow-outline-teal">
            </td>
            <td class="px-6 py-3 border-t border-gray-200" v-for="(col, i) of computeColumns" :key="index+i">
              <template v-if="col.slot">
                <slot :name="col.slot" :row="row" :column="col" :index="index"></slot>
              </template>
              <template v-else>{{ getRowShow(row, col) }}</template>
            </td>
          </tr>
          <tr>
            <td :colspan="computeColumns.length+1">
              <empty-data :class="['shadow-none']" :show="isMounted && computeData.length === 0"/>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
  import EmptyData from "@/components/common/EmptyData"
  import { isObject } from "@/utils/util"

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
      selection: Boolean | String
    },
    data () {
      return {
        isMounted: false,
        computeColumns: [],
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
          this.checks.splice(0, this.checks.length)
          this.computeData = [...this.data]
        },
        deep: true
      },
      columns: {
        handler() {
          this.initColumns()
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
    mounted() {
      this.isMounted = true
      this.initColumns()
    },
    methods: {
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
      getWidth(column) {
        return isObject(column) && column.width ? column.width : ''
      },
      getColumnClasses(column) {
        let classes = {
          left: 'text-left',
          center: 'text-center',
          right: 'text-right'
        }
        return classes[column] || 'text-left'
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
    }
  }
</script>
