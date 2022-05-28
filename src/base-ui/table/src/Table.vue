<template>
  <div class="vvt-table">
    <div class="vvt-table-header">
      <div class="vvt-table-header-left">
        <slot name="header-left">
          <div v-if="showTableTitle" class="vvt-table-header-left-title">{{ tableTitle }}</div>
          <el-tooltip v-if="showTableTips" class="box-item" effect="dark" :content="tableTips" placement="right">
            <el-icon
              :color="color"
              class="vvt-table-header-left-icon"
              @mouseenter="color = '#1a9df9'"
              @mouseleave="color = 'black'"
              ><info-filled
            /></el-icon>
          </el-tooltip>
        </slot>
      </div>
      <div class="vvt-table-header-right">
        <slot name="header-right"></slot>
      </div>
    </div>
    <el-table
      style="width: 100%"
      v-bind="tableProp"
      :data="tableData"
      @selection-change="emits('selection-change', $event)"
    >
      <template v-for="tableColumn in tableColumns" :key="tableColumn.prop">
        <el-table-column
          v-slot="{ row }"
          v-bind="tableColumn"
          :align="tableColumn.align || 'center'"
          :type="tableColumn.type || ''"
        >
          <slot v-if="!filterSlotType.includes(tableColumn.type!)" :name="tableColumn.slotName" :row="row">
            {{ row[tableColumn.prop] }}
          </slot>
        </el-table-column>
      </template>
    </el-table>
    <template v-if="showPagination">
      <el-pagination
        v-bind="paginationProp"
        :total="total"
        :style="{ justifyContent: paginationJustify }"
        @size-change="handlePageSizeChange"
        @current-change="emits('current-change', $event)"
      />
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { ITableColumn, ITableProp, IPaginationProp, PaginationJustifyType } from './table-type'
import { ElLoading } from 'element-plus'
import type { LoadingOptions } from 'element-plus'
import { LoadingInstance } from 'element-plus/es/components/loading/src/loading'

const props = withDefaults(
  defineProps<{
    tableData: any[]
    tableColumns: ITableColumn[]
    tableProp: ITableProp
    showPagination?: boolean
    paginationProp?: IPaginationProp
    paginationJustify?: PaginationJustifyType
    total?: number
    loadingOptions?: LoadingOptions
    tableTitle?: string
    tableTips?: string
    showTableTitle?: boolean
    showTableTips?: boolean
  }>(),
  {
    showPagination: true,
    paginationProp: () => ({
      layout: 'prev, pager, next, jumper, ->, total',
      small: false,
      background: false
    }),
    paginationJustify: 'center',
    total: 1,
    loadingOptions: () => ({
      target: '.el-table',
      fullscreen: false,
      svgViewBox: '0 0 100 100',
      text: 'loading...'
    }),
    tableTitle: '基础表格',
    tableTips: '温馨提醒',
    showTableTitle: true,
    showTableTips: true
  }
)

const emits = defineEmits<{
  (e: 'selection-change', selection: any[]): void
  (e: 'size-change', size: number): void
  (e: 'current-change', size: number): void
}>()

const filterSlotType = ['selection', 'index']

const pageSize = ref(props.paginationProp!.pageSize)
const handlePageSizeChange = (size: number) => {
  pageSize.value = size
  emits('size-change', size)
}

const svg = `
<text x="50" y="50" text-anchor="middle" dy="0.38em" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke="#009ef7" stroke-width="0.6000000000000001" font-size="20" font-family="arial">
  ${props.loadingOptions.text}
  <animate attributeName="stroke-dasharray" repeatCount="indefinite" calcMode="spline" dur="2.4925373134328357s" values="0 100;100 100;0 100" keyTimes="0;0.5;1" keySplines="0.3 0 0.7 1;0.3 0 0.7 1"></animate>
  <animate attributeName="stroke-dashoffset" repeatCount="indefinite" dur="2.4925373134328357s" values="0;0;-100" keyTimes="0;0.5;1"></animate>
</text>
`
const loadingInstance = ref<LoadingInstance>()
const startLoading = () => {
  loadingInstance.value = ElLoading.service({ ...props.loadingOptions, svg })
}
const endLoading = () => {
  loadingInstance.value?.close()
}

defineExpose({
  startLoading,
  endLoading
})

const color = ref('black')
</script>

<style scoped lang="scss">
.vvt-table {
  &-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
    &-left {
      display: flex;
      align-items: center;
      &-title {
        margin-right: 4px;
        font-size: 14px;
      }
      &-icon {
        cursor: pointer;
      }
    }
  }
  :deep(.el-pagination) {
    margin-top: 15px;
    .el-pagination__rightwrapper {
      flex: unset;
    }
  }
  :deep(.el-loading-spinner) {
    .circular {
      width: 200px;
      height: 100px;
      animation: none;
    }
    .el-loading-text {
      display: none;
    }
  }
}
</style>
