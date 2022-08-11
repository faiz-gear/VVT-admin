<template>
  <div class="image-label">
    <canvas id="c"></canvas>
    <RightClickMenu
      ref="rightClickMenuRef"
      :active-shape="activeShapeRef"
      :left="menuLeft"
      :top="menuTop"
      @create-shape="createShape"
      @action-click="handleAction"
    ></RightClickMenu>
  </div>
</template>

<script setup lang="ts">
/**
 * TODO: 1.右键选择形状类型 ✅
 * TODO: 2.图形选中激活状态 ✅
 * TODO: 3.对已绘制的图形删除功能✅
 * TODO: 4.对创建\删除操作撤回功能✅
 * TODO: 5.鼠标移动创建图形(直线、折线、矩形、多边形)
 * TODO: 6.画布缩放、图形缩放功能
 * TODO: 7.对已绘制的图形(折线\多边形\直线)的点位控制功能
 * TODO: 8.输出绘制图形的点位置坐标和图像类型
 * TODO: 9.图形绘制完成后生成需要输入或者选择已经存在的对应的标签(弹窗输入或者下拉框选择)
 * TODO: 10.图形标签列表展示, 选中图形时联动选中对应标签项
 */
import { ref, onMounted } from 'vue'
import { fabric } from 'fabric'
import RightClickMenu from './RightClickMenu.vue'
import { useEvent } from '../hooks/use-event'

enum CANVAS_ENUM {
  CANVAS_WIDTH = 1000,
  CANVAS_HEIGHT = 700
}
const canvasRef = ref<fabric.Canvas>()
const {
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
} = useEvent(canvasRef)

// 初始化
const init = () => {
  const canvas = (canvasRef.value = new fabric.Canvas('c', {
    width: CANVAS_ENUM.CANVAS_WIDTH,
    height: CANVAS_ENUM.CANVAS_HEIGHT,
    fireRightClick: true, // 开启画布右键事件
    stopContextMenu: true // 禁止默认右键菜单
  }))
  loadImage(canvas)

  // 事件处理
  canvas.on('mouse:down', handleMouseDown)
  canvas.on('object:moving', handleShapeMoving)
  canvas.on('mouse:move', handleMouseMove)
  canvas.on('mouse:up', handleMouseUp)
}

// 加载图片
const loadImage = (canvas: fabric.Canvas) => {
  fabric.Image.fromURL('https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg', (img) => {
    const options = {
      scaleX: canvas.width! / img.width!,
      scaleY: canvas.width! / img.width!
    }
    canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), options)
  })
}

onMounted(() => {
  init()
})
</script>

<style scoped>
.image-label {
  position: relative;
}
</style>
