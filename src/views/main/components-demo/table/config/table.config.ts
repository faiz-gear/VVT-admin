/*
 * @Author       : 卢瑶
 * @Date         : 2022-04-25 16:32:13
 * @LastEditTime : 2022-04-28 19:31:41
 * @LastEditors  : 卢瑶
 * @Description  :
 * @FilePath     : /vite-vue3-ts-ly/src/views/main/components-demo/table/config/table.config.ts
 */
import { ref } from 'vue'
import type { ISpanMethodProps, ITable } from '../../../../../components/table/src/table-type'

interface ITableData {
  id: string
  name: string
  amount1: string
  amount2: string
  amount3: number
}
const tableConfig = ref<ITable<ITableData>>({
  tableColumns: [
    {
      prop: 'selection',
      type: 'selection'
    },
    {
      prop: 'id',
      label: 'id',
      width: 400,
      slotName: 'id',
      sortable: true,
      fixed: 'left'
    },
    {
      prop: 'name',
      label: 'name',
      width: 400
    },
    {
      prop: 'amount1',
      label: 'amount1',
      width: 400,
      showOverflowTooltip: true
    },
    {
      prop: 'amount2',
      label: 'amount2',
      width: 400
    },
    {
      prop: 'amount3',
      label: 'amount3',
      width: 400
    },
    {
      prop: 'handler',
      label: '操作',
      slotName: 'handler',
      width: 200
    }
  ],
  tableProp: {
    stripe: false,
    border: false,
    size: 'large',
    tooltipEffect: 'dark',
    defaultSort: { prop: 'date', order: 'ascending' },
    emptyText: '暂无数据',
    showSummary: true,
    sumText: '合计',
    spanMethod: ({ row, column, rowIndex, columnIndex }: ISpanMethodProps<ITableData>) => {
      if (columnIndex === 1) {
        if (rowIndex % 3 === 0) {
          return [2, 1]
        }
        return [0, 0]
      }
    }
  },
  paginationProp: {
    small: true,
    background: true,
    pageSize: 5,
    pageSizes: [5, 10, 15],
    layout: 'prev, pager, next, jumper, ->, total, sizes',
    pagerCount: 5
  }
})

export default tableConfig
