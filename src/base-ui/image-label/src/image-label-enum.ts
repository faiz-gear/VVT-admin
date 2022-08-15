// 填充颜色
export enum CANVAS_COLOR {
  FILL_COLOR = 'transparent',
  ACTIVE_FILL_COLOR = 'rgba(255, 0, 135, .5)',
  STROKE_SHALLOW_COLOR = '#000',
  STROKE_DEEP_COLOR = '#ff0087'
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
  POLYLINE = 'polyline',
  RECT = 'rect',
  POLYGON = 'polygon'
}

// 操作类型
export enum ACTION_TYPE {
  SELECT = 'select', // 选择图形
  UNDO = 'undo', // 撤回
  DELETE = 'delete', // 删除图形
  MOVE = 'move', // 移动图形
  ROTATE = 'rotate', // 旋转图形
  SCALE = 'scale', // 缩放图形
  PANNINING = 'panning' // 平移画布
}
