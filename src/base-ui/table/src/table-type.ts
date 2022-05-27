/*
 * @Author       : 卢瑶
 * @Date         : 2022-04-15 10:53:52
 * @LastEditTime : 2022-05-27 15:15:27
 * @LastEditors  : 卢瑶
 * @Description  : Table组件类型声明
 * @FilePath     : /vvt-admin/src/base-ui/table/src/table-type.ts
 */
import { LoadingOptions } from 'element-plus'
import type { TableColumnCtx } from 'element-plus/es/components/table/src/table-column/defaults'

export type AlignType = 'left' | 'center' | 'right' // 对齐方式
interface IDefaultSort {
  prop: string
  order: 'descending' | 'ascending'
}
type ToolTipEffectType = 'light' | 'dark'
export interface ISummaryMethodProp<T> {
  columns: TableColumnCtx<T>
  data: T[]
}
export interface ISpanMethodProps<T> {
  row: T
  column: TableColumnCtx<T>
  rowIndex: number
  columnIndex: number
}

// Table column属性
export interface ITableColumn {
  prop: string // 字段名称
  label?: string // column的标签
  width?: number | string // 对应列的宽度
  minWidth?: number | string // 对应列的最小宽度
  align?: AlignType // 列对齐方式
  type?: 'selection' | 'index' | 'expand' // 列的类型 selection / index / expand
  slotName?: string // 插槽
  fixed?: true | 'left' | 'right' // 固定列
  showOverflowTooltip?: boolean // 内容显示过长被隐藏时显示tooltip
  sortable?: boolean // true / false / 'custom'
}

// Table 属性
export interface ITableProp<T = any> {
  stripe?: boolean // 是否为斑马纹table
  border?: boolean // 是否带有纵向边框
  size?: 'large' | 'default' | 'small' // Table的尺寸
  highCurrentRow?: boolean // 是否高亮当前行
  tooltipEffect?: ToolTipEffectType // tooltip 主题
  defaultSort?: IDefaultSort // 默认排序方式
  emptyText?: string // 数据为空时显示的文字
  showSummary?: boolean // 是否在表尾显示合计行, 并对每一列的数字进行求和
  sumText?: string // 合计行第一列的文本
  summaryMethod?: (param: ISummaryMethodProp<T>) => void // 自定义求和逻辑,返回求和的结果数组
  spanMethod?: (param: ISpanMethodProps<T>) => void // 合并行或列,返回[rowSpan, colSpan]数组或者{ rowSpan, colSpan}对象
  maxHeight?: string | number // Table的最大高度
}

// pagination 属性
export interface IPaginationProp {
  layout?: string // 组件布局,详见https://element-plus.org/zh-CN/component/pagination.html#%E5%B1%9E%E6%80%A7
  small?: boolean // 是否使用小型分页样式
  background?: boolean // 是否为分页按钮添加背景色
  pageSize?: number // 每页显示个数
  pageSizes?: number[] // 每页显示个数选择器的选项设置
  pagerCount?: number // 最大页码按钮数  5 <= x <= 21的奇数
}

export type PaginationJustifyType = 'flex-start' | 'center' | 'flex-end'

export interface ITable<T> {
  tableColumns: ITableColumn[]
  tableProp: ITableProp<T>
  showPagination?: boolean
  paginationProp: IPaginationProp
  paginationJustify?: PaginationJustifyType
  loadingOptions?: LoadingOptions
  tableTitle?: string
  tableTips?: string
  showTableTitle?: boolean
  showTableTips?: boolean
}
