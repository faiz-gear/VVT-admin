import { Ref, ref, toRaw } from 'vue'
import { fabric } from 'fabric'
import RightClickMenu from '../src/RightClickMenu.vue'
import { useShape } from './use-shape'

import type { IEvent } from 'fabric/fabric-impl'
import { ACTION_TYPE, MOUSE_DOWN_EVENT_BUTTON, SHAPE_TYPE, CANVAS_COLOR } from '../src/image-label-enum'

interface IMovingRecord {
  left: number
  top: number
}

interface IScalingRecord {
  scaleX: number
  scaleY: number
}

interface IActionRecord {
  recordType: SHAPE_TYPE | ACTION_TYPE
  shape: fabric.Object | fabric.Object[]
  from?: IMovingRecord // 移动图形前的坐标
  to?: IMovingRecord // 移动完毕后图形的坐标
  fromAngle?: number // 旋转前的角度
  toAngle?: number // 旋转后的角度
  fromScale?: IScalingRecord // 缩放前的scale
  toScale?: IScalingRecord // 缩放后的scale
}

export function useEvent(canvasRef: Ref<fabric.Canvas | undefined>) {
  const ShapeMap = useShape(canvasRef)

  const activeShapeRef = ref<fabric.Object | fabric.Object[]>() // 正在操作的图形
  const shapeActionRecord: IActionRecord[] = [] // 图形操作记录

  let currentAction: ACTION_TYPE | null = ACTION_TYPE.SELECT
  let createShapeFn: typeof ShapeMap[keyof typeof ShapeMap] | null = null // 绘图函数
  let currentShapeType: SHAPE_TYPE | null = null // 当前绘图类型
  let currentShape: ReturnType<typeof ShapeMap[keyof typeof ShapeMap]> | null = null

  // 改变图形类型
  const _changeShapeType = (type: SHAPE_TYPE | null) => {
    const canvas = toRaw(canvasRef.value)
    if (!canvas) {
      throw new Error('Canvas element is required')
    }

    currentShapeType = type
    switch (currentShapeType) {
      case SHAPE_TYPE.LINE:
        canvas.selectionColor = 'transparent'
        canvas.selectionBorderColor = 'transparent'
        canvas.skipTargetFind = true

        break
      case SHAPE_TYPE.POLYLINE:
        canvas.selectionColor = 'transparent'
        canvas.selectionBorderColor = 'transparent'
        canvas.skipTargetFind = true
        break
      case SHAPE_TYPE.RECT:
        canvas.selectionColor = 'transparent'
        canvas.selectionBorderColor = CANVAS_COLOR.STROKE_SHALLOW_COLOR
        canvas.skipTargetFind = true // 禁止选中
        break
      case SHAPE_TYPE.POLYGON:
        canvas.selectionColor = 'transparent'
        canvas.selectionBorderColor = 'transparent'
        canvas.skipTargetFind = true
        break
      default:
        canvas.selection = true
        canvas.selectionColor = 'rgba(100, 100, 255, 0.3)'
        canvas.selectionBorderColor = 'rgba(255, 255, 255, 0.3)'
        canvas.skipTargetFind = false
        break
    }
  }

  // 清理数据
  const _clearShapeData = () => {
    createShapeFn = null
    currentShape = null
    _changeShapeType(null)
  }

  // 记录操作并清空数据
  const _recordActionAndClear = () => {
    if (currentShapeType && currentShape) {
      shapeActionRecord.push({
        recordType: currentShapeType,
        shape: currentShape
      })
      _clearShapeData()
      console.log('🚀 ~ file: use-event.ts ~ line 169 ~ handleMouseUp ~ shapeActionRecord', shapeActionRecord)
    } else {
      console.warn('No action occurs')
    }
  }

  // 注册图形事件
  const _registerShapeEvent = (shape: typeof currentShape) => {
    shape?.on('selected', (e: IEvent) => {
      activeShapeRef.value = e.target?.group?._objects || e.target
      const selectShapeType = e.target?.type
      const isFillShape = selectShapeType === SHAPE_TYPE.RECT || selectShapeType === SHAPE_TYPE.POLYGON
      isFillShape && e.target?.set('fill', CANVAS_COLOR.ACTIVE_FILL_COLOR)
    })
    shape?.on('deselected', (e: IEvent) => {
      const selectShapeType = e.target?.type
      const isFillShape = selectShapeType === SHAPE_TYPE.RECT || selectShapeType === SHAPE_TYPE.POLYGON
      isFillShape && e.target?.set('fill', CANVAS_COLOR.FILL_COLOR)
    })
  }

  // 处理鼠标按下
  const rightClickMenuRef = ref<InstanceType<typeof RightClickMenu>>()
  const menuLeft = ref(0)
  const menuTop = ref(0)
  const mouseDownPointerXRef = ref(0) // 鼠标按下在画布内的x坐标
  const mouseDownPointerYRef = ref(0) // 鼠标按下在画布内的y坐标
  const mouseDownShapeLeftRef = ref(0) // 鼠标按下时图形在画布内的left值
  const mouseDownShapeTopRef = ref(0) // 鼠标按下时图形在画布内的top值
  const mouseDownShapeAngleRef = ref(0) // 鼠标按下时图形在画布内的angle值
  const mouseDownShapeScaleXRef = ref(1) // 鼠标按下时图形在画布内的angle值
  const mouseDownShapeScaleYRef = ref(1) // 鼠标按下时图形在画布内的angle值
  let isCanvasPanning = false // 画布是否在移动
  const handleMouseDown = (e: IEvent<MouseEvent>) => {
    const button = e.button
    const rightClickMenu = rightClickMenuRef.value
    const canvas = toRaw(canvasRef.value)!

    // 记录当前操作的图形对象
    const activeObject = canvas?.getActiveObject()
    activeShapeRef.value = activeObject
    if (activeObject) {
      mouseDownShapeLeftRef.value = activeObject.left || 0
      mouseDownShapeTopRef.value = activeObject.top || 0
      mouseDownShapeAngleRef.value = activeObject.angle || 0
      mouseDownShapeScaleXRef.value = activeObject.scaleX || 1
      mouseDownShapeScaleYRef.value = activeObject.scaleY || 1
    }

    // 记录当前鼠标按下的位置
    const mouseDownPointerX = (mouseDownPointerXRef.value = e.absolutePointer?.x || 0)
    const mouseDownPointerY = (mouseDownPointerYRef.value = e.absolutePointer?.y || 0)

    rightClickMenu?.isVisible && rightClickMenu.closeMenu()
    if (button === MOUSE_DOWN_EVENT_BUTTON.RIGHT_CLICK) {
      // 右键点击事件
      setTimeout(() => {
        // 等到rightClickMenu transition-end再重新显示
        const { x, y } = e.pointer!
        menuLeft.value = x
        menuTop.value = y
        rightClickMenu?.openMenu()
      }, 300)
    } else if (button === MOUSE_DOWN_EVENT_BUTTON.LEFT_CLICK) {
      if (createShapeFn) {
        // 开始画图
        switch (currentShapeType) {
          case SHAPE_TYPE.LINE:
            // 生成线段
            currentShape = (createShapeFn as typeof ShapeMap[SHAPE_TYPE.LINE])(
              [mouseDownPointerX, mouseDownPointerY],
              _registerShapeEvent
            )
            break
          case SHAPE_TYPE.POLYLINE:
            if (!currentShape) {
              // 生成折线
              currentShape = (createShapeFn as typeof ShapeMap[SHAPE_TYPE.POLYLINE])(
                [
                  {
                    x: mouseDownPointerX,
                    y: mouseDownPointerY
                  },
                  {
                    x: mouseDownPointerX,
                    y: mouseDownPointerY
                  }
                ],
                { stroke: CANVAS_COLOR.STROKE_SHALLOW_COLOR, fill: 'transparent' },
                _registerShapeEvent
              )
            } else {
              // 继续添加折线点位
              const point = new fabric.Point(mouseDownPointerX, mouseDownPointerY)
              const polylinePoints = (currentShape as fabric.Polyline).points
              polylinePoints?.push(point)
              canvas?.requestRenderAll()
            }
            break
          case SHAPE_TYPE.RECT:
            currentShape = new fabric.Rect()
            break
          case SHAPE_TYPE.POLYGON:
            if (!currentShape) {
              // 生成多边形
              currentShape = (createShapeFn as typeof ShapeMap[SHAPE_TYPE.POLYGON])(
                [
                  {
                    x: mouseDownPointerX,
                    y: mouseDownPointerY
                  },
                  {
                    x: mouseDownPointerX,
                    y: mouseDownPointerY
                  }
                ],
                { stroke: CANVAS_COLOR.STROKE_SHALLOW_COLOR, fill: 'transparent' },
                _registerShapeEvent
              )
            } else {
              // 继续添加多边形
              const point = new fabric.Point(mouseDownPointerX, mouseDownPointerY)
              const polygonPoints = (currentShape as fabric.Polygon).points
              polygonPoints?.push(point)
              canvas?.requestRenderAll()
            }
            break
          default:
            break
        }
      } else if (currentAction === ACTION_TYPE.PANNINING) {
        // 平移画布
        isCanvasPanning = true // isDragging 是自定义的
      }
    }
  }

  // 处理图形移动
  let isShapeMoving = false
  const handleShapeMoving = () => {
    if (activeShapeRef.value) {
      isShapeMoving = true
    }
  }

  // 处理图形旋转
  let isShapeRotating = false
  const handleShapeRotating = () => {
    if (activeShapeRef.value) {
      isShapeRotating = true
    }
  }

  // 处理图形缩放
  let isShapeScaling = false
  const handleShapeScaling = () => {
    if (activeShapeRef.value) {
      isShapeScaling = true
    }
  }

  // 处理鼠标移动
  const handleMouseMove = (e: IEvent<MouseEvent>) => {
    const canvas = toRaw(canvasRef.value)!
    const { x: mouseMovingPointerX, y: mouseMovingPointerY } = e.absolutePointer!
    const mouseDownPointerX = mouseDownPointerXRef.value
    const mouseDownPointerY = mouseDownPointerYRef.value
    if (!canvas) {
      throw new Error('Canvas element is required')
    }
    if (createShapeFn && currentShape) {
      // 移动绘制

      switch (currentShapeType) {
        case SHAPE_TYPE.LINE:
          // 动态移动线段
          const currentLine = currentShape as fabric.Line // eslint-disable-line
          currentLine.set('x2', mouseMovingPointerX)
          currentLine.set('y2', mouseMovingPointerY)
          canvas.requestRenderAll()
          break
        case SHAPE_TYPE.POLYLINE:
          const currentPolyline = currentShape as fabric.Polyline // eslint-disable-line
          const polylinePoints = currentPolyline.points // eslint-disable-line
          if (polylinePoints) {
            // 动态移动折线
            const lastPoint = polylinePoints[polylinePoints.length - 1] // eslint-disable-line
            lastPoint.x = mouseMovingPointerX
            lastPoint.y = mouseMovingPointerY
            currentPolyline.set('points', polylinePoints)
            canvas.requestRenderAll()
          }
          break
        case SHAPE_TYPE.RECT:
          break
        case SHAPE_TYPE.POLYGON:
            const currentPolygon = currentShape as fabric.Polygon // eslint-disable-line
            const polygonPoints = currentPolygon.points // eslint-disable-line
          if (polygonPoints) {
            // 动态移动折线
              const lastPoint = polygonPoints[polygonPoints.length - 1] // eslint-disable-line
            lastPoint.x = mouseMovingPointerX
            lastPoint.y = mouseMovingPointerY
            currentPolygon.set('points', polygonPoints)
            canvas.requestRenderAll()
          }
          break
        default:
          break
      }
    } else if (currentAction === ACTION_TYPE.PANNINING && isCanvasPanning) {
      // 平移画布
      const vpt = canvas.viewportTransform! // 聚焦视图的转换
      vpt[4] += mouseMovingPointerX - mouseDownPointerX
      vpt[5] += mouseMovingPointerY - mouseDownPointerY
      canvas.requestRenderAll()
    }
  }

  // 处理鼠标弹起
  const handleMouseUp = (e: IEvent<MouseEvent>) => {
    const canvas = toRaw(canvasRef.value)
    if (!canvas) {
      throw new Error('Canvas element is required')
    }
    const mouseDownPointerX = mouseDownPointerXRef.value
    const mouseDownPointerY = mouseDownPointerYRef.value
    const upPointer = e.absolutePointer
    const { x: mouseUpPointerX, y: mouseUpPointerY } = upPointer!
    const activeShape = toRaw(activeShapeRef.value) as fabric.Object

    if (createShapeFn && currentShape && currentShapeType) {
      switch (currentShapeType) {
        case SHAPE_TYPE.LINE:
          // 点击事件,不创建线段
          if (mouseDownPointerX === mouseUpPointerX && mouseDownPointerY === mouseUpPointerY) {
            return _clearShapeData()
          }
          // 完成线段绘制
          const currentLine = currentShape as fabric.Line // eslint-disable-line
          currentLine.set('x2', mouseUpPointerX)
          currentLine.set('y2', mouseUpPointerY)
          currentLine.set('stroke', CANVAS_COLOR.STROKE_DEEP_COLOR)
          canvas.requestRenderAll()
          _recordActionAndClear()
          break
        case SHAPE_TYPE.POLYLINE:
          break
        case SHAPE_TYPE.RECT:
          const top = Math.min(mouseDownPointerY, mouseUpPointerY) // eslint-disable-line
          const left = Math.min(mouseDownPointerX, mouseUpPointerX) // eslint-disable-line
          const width = Math.abs(mouseDownPointerX - mouseUpPointerX) // eslint-disable-line
          const height = Math.abs(mouseDownPointerY - mouseUpPointerY) // eslint-disable-line
          // eslint-disable-next-line
          const rect = (createShapeFn as typeof ShapeMap[SHAPE_TYPE.RECT])(
            {
              top,
              left,
              width,
              height,
              stroke: CANVAS_COLOR.STROKE_DEEP_COLOR
            },
            _registerShapeEvent
          )
          currentShape = rect
          canvas.requestRenderAll()
          _recordActionAndClear()
          break
        case SHAPE_TYPE.POLYGON:
          break
        default:
          break
      }
    } else if (activeShape) {
      if (isShapeMoving) {
        // 记录图形移动操作
        const mouseDownShapeLeft = mouseDownShapeLeftRef.value
        const mouseDownShapeTop = mouseDownShapeTopRef.value

        const { left, top } = activeShape
        shapeActionRecord.push({
          recordType: ACTION_TYPE.MOVE,
          shape: activeShape,
          from: {
            left: mouseDownShapeLeft,
            top: mouseDownShapeTop
          },
          to: {
            left: left!,
            top: top!
          }
        })
        isShapeMoving = false
      } else if (isShapeRotating) {
        // 记录图形旋转操作
        const mouseDownShapeAngle = mouseDownShapeAngleRef.value

        const { angle } = activeShape
        shapeActionRecord.push({
          recordType: ACTION_TYPE.ROTATE,
          shape: activeShape,
          fromAngle: mouseDownShapeAngle,
          toAngle: angle
        })
        isShapeRotating = false
      } else if (isShapeScaling) {
        // 记录图形缩放操作
        const mouseDownShapeScaleX = mouseDownShapeScaleXRef.value
        const mouseDownShapeScaleY = mouseDownShapeScaleYRef.value

        const { scaleX, scaleY } = activeShape
        shapeActionRecord.push({
          recordType: ACTION_TYPE.SCALE,
          shape: activeShape,
          fromScale: {
            scaleX: mouseDownShapeScaleX,
            scaleY: mouseDownShapeScaleY
          },
          toScale: {
            scaleX: scaleX!,
            scaleY: scaleY!
          }
        })
        isShapeScaling = false
      }
      console.log('🚀 ~ file: use-event.ts ~ line 92 ~ handleMouseUp ~ shapeActionRecord', shapeActionRecord)
    } else if (currentAction === ACTION_TYPE.PANNINING && isCanvasPanning) {
      // 结束本次画布平移
      canvas.setViewportTransform(canvas.viewportTransform!) // 设置此画布实例的视口转换
      isCanvasPanning = false
    }
  }

  // 处理鼠标双击
  const handleDblClick = (e: IEvent<MouseEvent>) => {
    const canvas = toRaw(canvasRef.value)
    if (!canvas) {
      throw new Error('Canvas element is required')
    }

    if (createShapeFn && currentShape && currentShapeType) {
      const upPoint = e.absolutePointer!

      switch (currentShapeType) {
        case SHAPE_TYPE.LINE:
          break
        case SHAPE_TYPE.POLYLINE:
          // 完成折线绘制
          const currentPolyline = currentShape as fabric.Polyline // eslint-disable-line
          const polylinePoints = currentPolyline.points // eslint-disable-line
          if (polylinePoints) {
            // 动态移动折线
            polylinePoints.pop()
            polylinePoints.pop()
            const lastPoint = polylinePoints[polylinePoints.length - 1] // eslint-disable-line
            lastPoint.x = upPoint.x
            lastPoint.y = upPoint.y
            canvas.remove(currentPolyline)
            const polyline = (createShapeFn as typeof ShapeMap[SHAPE_TYPE.POLYLINE])(
              polylinePoints,
              {
                stroke: CANVAS_COLOR.STROKE_DEEP_COLOR,
                objectCaching: true
              },
              _registerShapeEvent
            )
            currentShape = polyline
            canvas.requestRenderAll()
          }
          _recordActionAndClear()
          break
        case SHAPE_TYPE.POLYGON:
          // 完成折线绘制
          const currentPolygon = currentShape as fabric.Polyline // eslint-disable-line
          const polygonPoints = currentPolygon.points // eslint-disable-line
          if (polygonPoints) {
            // 动态移动折线
            polygonPoints.pop()
            polygonPoints.pop()
            const lastPoint = polygonPoints[polygonPoints.length - 1] // eslint-disable-line
            lastPoint.x = upPoint.x
            lastPoint.y = upPoint.y
            canvas.remove(currentPolygon)
            const polygon = (createShapeFn as typeof ShapeMap[SHAPE_TYPE.POLYLINE])(
              polygonPoints,
              {
                stroke: CANVAS_COLOR.STROKE_DEEP_COLOR,
                objectCaching: true
              },
              _registerShapeEvent
            )
            currentShape = polygon
            canvas.requestRenderAll()
          }
          _recordActionAndClear()
          break
        default:
          break
      }
    } else {
      const { left, top } = canvas.getCenter()
      canvas.zoomToPoint({ x: left, y: top }, 1)
      const vpt = canvas.viewportTransform! // 聚焦视图的转换
      vpt[4] = 0
      vpt[5] = 0
      canvas.requestRenderAll()
    }
  }

  // 处理鼠标滚动
  const handleMouseWheel = (e: IEvent<WheelEvent>) => {
    const canvas = toRaw(canvasRef.value)!
    const wheelEvent = e.e

    const { left, top } = canvas.getCenter() // 获取当前画布中心位置
    let zoom = canvas.getZoom() // 获取画布当前缩放值
    const delta = wheelEvent.deltaY
    zoom *= 0.999 ** delta
    if (zoom > 20) {
      zoom = 20
    }
    if (zoom < 0.01) {
      zoom = 0.01
    }
    canvas.zoomToPoint({ x: left, y: top }, zoom)
    canvas.requestRenderAll()
    wheelEvent.preventDefault()
    wheelEvent.stopPropagation()
  }

  // 处理右键菜单点击创建形状按钮
  const createShape = (type: SHAPE_TYPE) => {
    createShapeFn = ShapeMap[type]
    _changeShapeType(type)
    currentAction = null
  }

  // 处理右键菜单点击操作形状按钮或者快捷键操作形状
  const handleAction = (type: ACTION_TYPE) => {
    const canvas = toRaw(canvasRef.value)
    if (!canvas) {
      throw new Error('Canvas element is required')
    }
    const activeShape = toRaw(activeShapeRef.value)
    currentAction = type
    if (type === ACTION_TYPE.DELETE && activeShape) {
      Array.isArray(activeShape) ? canvas.remove(...activeShape) : canvas?.remove(activeShape)
      canvas?.requestRenderAll()
      // 记录图形删除操作
      shapeActionRecord.push({
        recordType: type,
        shape: activeShape
      })
    } else if (type === ACTION_TYPE.UNDO) {
      if (shapeActionRecord.length === 0) {
        return
      }
      const { recordType, shape, from, fromAngle, fromScale } = shapeActionRecord.pop()!
      if (Object.values(SHAPE_TYPE).includes(recordType as SHAPE_TYPE)) {
        const recordShape = shape as fabric.Object
        canvas?.remove(recordShape)
        canvas?.requestRenderAll()
      } else if (recordType === ACTION_TYPE.MOVE) {
        const recordShape = shape as fabric.Object
        recordShape.left = from?.left
        recordShape.top = from?.top
        canvas?.renderAll()
      } else if (recordType === ACTION_TYPE.ROTATE) {
        const recordShape = shape as fabric.Object
        recordShape.rotate(fromAngle!)
        canvas?.renderAll()
      } else if (recordType === ACTION_TYPE.SCALE) {
        const recordShape = shape as fabric.Object
        recordShape.scaleX = fromScale?.scaleX || 1
        recordShape.scaleY = fromScale?.scaleY || 1
        canvas?.renderAll()
      } else if (recordType === ACTION_TYPE.DELETE) {
        Array.isArray(shape) ? canvas.add(...shape) : canvas.add(shape)
      }
    } else if (type === ACTION_TYPE.SELECT) {
      _changeShapeType(null)
    }

    console.log('🚀 ~ file: use-event.ts ~ line 74 ~ handleAction ~ shapeActionRecord', shapeActionRecord)
  }

  return {
    rightClickMenuRef,
    activeShapeRef: activeShapeRef as Ref<fabric.Object>,
    menuLeft,
    menuTop,

    handleMouseDown,
    handleShapeMoving,
    handleShapeRotating,
    handleShapeScaling,
    handleMouseMove,
    handleMouseUp,
    handleDblClick,
    handleMouseWheel,
    createShape,
    handleAction
  }
}
