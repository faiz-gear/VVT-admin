/*
 * @Author       : 卢瑶
 * @Date         : 2022-04-25 16:32:13
 * @LastEditTime : 2022-06-25 15:25:07
 * @LastEditors  : 卢瑶
 * @Description  :
 * @FilePath     : /vvt-admin/src/views/main/components-demo/table/basic/config/table.config.ts
 */
import { ref } from 'vue'
import type { ITable } from '@/base-ui/table/src/table-type'

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
    sumText: '合计'
  },
  paginationProp: {
    small: true,
    background: true,
    pageSize: 5,
    pageSizes: [5, 10, 15],
    layout: 'prev, pager, next, jumper, ->, total, sizes',
    pagerCount: 5
  },
  paginationJustify: 'flex-start'
})

export default tableConfig
