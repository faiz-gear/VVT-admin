// 填充颜色
export enum CANVAS_COLOR {
  FILL_COLOR = 'rgba(255,255,255,0.5)',
  ACTIVE_FILL_COLOR = 'rgba(255,0, 0, .5)'
}

// 鼠标按下事件的button值
export enum MOUSE_DOWN_EVENT_BUTTON {
  LEFT_CLICK = 1,
  MIDDLE_CLICK = 2,
  RIGHT_CLICK = 3
}

// 图形形状类型
export enum SHAPE_TYPE {
  LINE = 'line',
  POLY_LINE = 'polyline',
  RECT = 'rect',
  POLYGON = 'polygon'
}

// 右键操作类型
export enum HANDLER_TYPE {
  UNDO = 'undo',
  DELETE = 'delete'
}
