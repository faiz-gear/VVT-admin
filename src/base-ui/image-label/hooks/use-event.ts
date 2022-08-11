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
interface IActionRecord {
  recordType: SHAPE_TYPE | ACTION_TYPE
  shape: fabric.Object
  from?: IMovingRecord // 移动图形前的坐标
  to?: IMovingRecord // 移动完毕后图形的坐标
}

export function useEvent(canvasRef: Ref<fabric.Canvas | undefined>) {
  const ShapeMap = useShape(canvasRef)

  const activeShapeRef = ref<fabric.Object>() // 正在操作的图形
  const shapeActionRecord: IActionRecord[] = [] // 图形操作记录

  let createShapeFn: typeof ShapeMap[keyof typeof ShapeMap] | null = null // 绘图函数
  let currentShapeType: SHAPE_TYPE | null = null // 当前绘图类型
  let currentShape: ReturnType<typeof ShapeMap[keyof typeof ShapeMap]> | null = null

  // 改变图形类型
  const changeShapeType = (type: SHAPE_TYPE | null) => {
    const canvas = toRaw(canvasRef.value!)

    currentShapeType = type
    switch (currentShapeType) {
      case SHAPE_TYPE.LINE:
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
  // 处理鼠标按下
  const rightClickMenuRef = ref<InstanceType<typeof RightClickMenu>>()
  const menuLeft = ref(0)
  const menuTop = ref(0)
  const mouseDownPageXRef = ref(0)
  const mouseDownPageYRef = ref(0)
  const handleMouseDown = (e: IEvent<MouseEvent>) => {
    const button = e.button
    const originEvent = e.e
    const downPointer = e.absolutePointer
    const rightClickMenu = rightClickMenuRef.value
    const canvas = canvasRef.value

    // 记录当前操作的图形对象
    activeShapeRef.value = canvas?.getActiveObject()
    // 记录当前鼠标按下的位置
    const { pageX, pageY } = originEvent
    mouseDownPageXRef.value = pageX
    mouseDownPageYRef.value = pageY

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
            currentShape = createShapeFn([downPointer!.x, downPointer!.y])
            break
          default:
            break
        }
      }
    }
  }

  // 处理图形移动
  let isShapeMoving = false
  const handleShapeMoving = (e: IEvent) => {
    if (activeShapeRef.value) {
      isShapeMoving = true
    }
  }

  // 处理鼠标移动
  const handleMouseMove = (e: IEvent<MouseEvent>) => {
    const canvas = toRaw(canvasRef.value!)
    if (createShapeFn && currentShape) {
      const movingPoint = e.absolutePointer

      switch (currentShapeType) {
        case SHAPE_TYPE.LINE:
          const currentLine: fabric.Line = currentShape as fabric.Line // eslint-disable-line
          currentLine.set('x2', movingPoint?.x)
          currentLine.set('y2', movingPoint?.y)
          canvas.requestRenderAll()
          break
        default:
          break
      }
    }
  }

  // 处理鼠标弹起
  const handleMouseUp = (e: IEvent<MouseEvent>) => {
    const canvas = toRaw(canvasRef.value!)
    // 记录图形移动操作
    const activeShape = toRaw(activeShapeRef.value) as fabric.Object
    if (activeShape && isShapeMoving) {
      const originEvent = e.e
      const mouseDownPageX = mouseDownPageXRef.value
      const mouseDownPageY = mouseDownPageYRef.value
      const { pageX: mouseUpPageX, pageY: mouseUpPageY } = originEvent
      const movingDistanceX = mouseUpPageX - mouseDownPageX
      const movingDistanceY = mouseUpPageY - mouseDownPageY

      const { left, top } = activeShape
      const leftBeforeMoving = left! - movingDistanceX
      const topBeforeMoving = top! - movingDistanceY
      shapeActionRecord.push({
        recordType: ACTION_TYPE.MOVE,
        shape: activeShape,
        from: {
          left: leftBeforeMoving,
          top: topBeforeMoving
        },
        to: {
          left: left!,
          top: top!
        }
      })
      console.log('🚀 ~ file: use-event.ts ~ line 92 ~ handleMouseUp ~ shapeActionRecord', shapeActionRecord)
    } else if (createShapeFn && currentShape && currentShapeType) {
      const upPoint = e.absolutePointer

      switch (currentShapeType) {
        case SHAPE_TYPE.LINE:
          const currentLine: fabric.Line = currentShape as fabric.Line // eslint-disable-line
          console.log('🚀 ~ file: use-event.ts ~ line 115 ~ handleMouseUp ~ currentLine', currentLine)
          currentLine.set('x2', upPoint?.x)
          currentLine.set('y2', upPoint?.y)
          currentLine.set('stroke', CANVAS_COLOR.STROKE_DEEP_COLOR)
          canvas.requestRenderAll()
          break
        default:
          break
      }

      shapeActionRecord.push({
        recordType: currentShapeType,
        shape: currentShape
      })
      console.log('🚀 ~ file: use-event.ts ~ line 169 ~ handleMouseUp ~ shapeActionRecord', shapeActionRecord)

      // 清空
      currentShapeType = null
      currentShape = null
      changeShapeType(null)
    }
  }

  // 处理右键菜单点击创建形状按钮
  const createShape = (type: SHAPE_TYPE) => {
    createShapeFn = ShapeMap[type]
    changeShapeType(type)
    // const shape = createShapeFn(canvas)
    // shapeActionRecord.push({
    //   recordType: type,
    //   shape
    // })
  }

  // 处理右键菜单点击操作形状按钮或者快捷键操作形状
  const handleAction = (type: ACTION_TYPE) => {
    const canvas = toRaw(canvasRef.value!)
    const activeShape = toRaw(activeShapeRef.value)
    if (type === ACTION_TYPE.DELETE && activeShape) {
      canvas?.remove(activeShape)
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
      const { recordType, shape, from } = shapeActionRecord.pop()!

      if (Object.values(SHAPE_TYPE).includes(recordType as SHAPE_TYPE)) {
        canvas?.remove(shape)
        canvas?.requestRenderAll()
      } else if (recordType === ACTION_TYPE.MOVE) {
        shape.left = from?.left
        shape.top = from?.top
        canvas?.renderAll()
      } else if (recordType === ACTION_TYPE.DELETE) {
        canvas?.add(shape)
      }
    }

    console.log('🚀 ~ file: use-event.ts ~ line 74 ~ handleAction ~ shapeActionRecord', shapeActionRecord)
  }

  return {
    rightClickMenuRef,
    activeShapeRef,
    menuLeft,
    menuTop,

    handleMouseDown,
    handleShapeMoving,
    handleMouseMove,
    handleMouseUp,
    createShape,
    handleAction
  }
}
