// 填充颜色
export enum CANVAS_COLOR {
  FILL_COLOR = 'rgba(255,255,255,0.5)',
  ACTIVE_FILL_COLOR = 'rgba(255,0, 0, .5)',
  STROKE_SHALLOW_COLOR = 'rgba(0, 0, 0, 0.2)',
  STROKE_DEEP_COLOR = '#000'
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

// 操作类型
export enum ACTION_TYPE {
  UNDO = 'undo',
  DELETE = 'delete',
  MOVE = 'move'
}
