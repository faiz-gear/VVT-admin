import { Ref, ref } from 'vue'
import RightClickMenu from '../src/RightClickMenu.vue'
import { useShape } from './use-shape'

import type { IEvent } from 'fabric/fabric-impl'
import { HANDLER_TYPE, MOUSE_DOWN_EVENT_BUTTON, SHAPE_TYPE } from '../src/image-label-enum'

interface IHandlerHistory {
  type: SHAPE_TYPE | HANDLER_TYPE
  shape: fabric.Object
}

export function useEvent(canvasRef: Ref<fabric.Canvas | undefined>) {
  const ShapeMap = useShape(canvasRef)

  const activeShapeRef = ref<fabric.Object>()
  const shapeHandlerHistoryStack: IHandlerHistory[] = []
  // 处理鼠标按下
  const rightClickMenuRef = ref<InstanceType<typeof RightClickMenu>>()
  const menuLeft = ref(0)
  const menuTop = ref(0)
  const handleMouseDown = (e: IEvent) => {
    const button = e.button
    const rightClickMenu = rightClickMenuRef.value

    // 记录当前操作的图形对象
    activeShapeRef.value = e.target

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
    }
  }
  // 处理右键菜单点击创建形状按钮
  const handleShapeClick = (type: SHAPE_TYPE) => {
    const addShapeFn = ShapeMap[type]
    const shape = addShapeFn()
    shapeHandlerHistoryStack.push({
      type,
      shape
    })
    console.log(
      '🚀 ~ file: use-event.ts ~ line 50 ~ handleShapeClick ~ shapeHandlerHistoryStack',
      shapeHandlerHistoryStack
    )
  }
  // 处理右键菜单点击操作形状按钮或者快捷键操作形状
  const handleHandlerClick = (type: HANDLER_TYPE) => {
    const canvas = canvasRef.value
    const activeShape = activeShapeRef.value
    if (type === HANDLER_TYPE.DELETE && activeShape) {
      canvas?.remove(activeShape)
      shapeHandlerHistoryStack.push({
        type,
        shape: activeShape
      })
    } else if (type === HANDLER_TYPE.UNDO) {
      if (shapeHandlerHistoryStack.length === 0) {
        return
      }
      const { type, shape } = shapeHandlerHistoryStack[shapeHandlerHistoryStack.length - 1]
      shapeHandlerHistoryStack.pop()
      if (Object.values(SHAPE_TYPE).includes(type as SHAPE_TYPE)) {
        canvas?.remove(shape)
      } else {
        canvas?.add(shape)
      }
    }

    console.log(
      '🚀 ~ file: use-event.ts ~ line 74 ~ handleHandlerClick ~ shapeHandlerHistoryStack',
      shapeHandlerHistoryStack
    )
  }

  return {
    rightClickMenuRef,
    activeShapeRef,
    menuLeft,
    menuTop,

    handleMouseDown,
    handleShapeClick,
    handleHandlerClick
  }
}
