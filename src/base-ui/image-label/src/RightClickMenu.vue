<template>
  <div class="right-click-menu">
    <el-dropdown ref="elDropdownRef" :placement="placement" @contextmenu.prevent>
      <span></span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item v-for="item in menuList" :key="item.label" @click="handleMenuItemClick(item.type)">
            <div style="display: flex; justify-content: space-between; align-items: center; min-width: 150px">
              <span style="margin-right: 24px">{{ item.label }}</span>
              <span v-if="item.shortcut">{{ item.shortcut }}</span>
            </div>
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { ElDropdown, Placement } from 'element-plus'
import { fabric } from 'fabric'

import { SHAPE_TYPE, ACTION_TYPE } from './image-label-enum'

const props = withDefaults(
  defineProps<{
    left: number
    top: number
    placement?: Placement
    activeShape?: fabric.Object
  }>(),
  {
    left: 0,
    top: 0,
    placement: 'bottom-start',
    activeShape: undefined
  }
)

const emits = defineEmits<{
  (e: 'create-shape', type: SHAPE_TYPE): void
  (e: 'action-click', type: ACTION_TYPE): void
}>()

const elDropdownRef = ref<InstanceType<typeof ElDropdown>>()

const isVisible = ref(false)
const openMenu = () => {
  const elDropdown = elDropdownRef.value
  elDropdown?.handleOpen()
  isVisible.value = true
}
const closeMenu = () => {
  const elDropdown = elDropdownRef.value
  elDropdown?.handleClose()
  isVisible.value = false
}
defineExpose({
  isVisible,
  openMenu,
  closeMenu
})

const left = computed(() => props.left + 'px')
const top = computed(() => props.top + 'px')

const menuList = computed(() => {
  return [
    {
      label: '创建线段',
      type: SHAPE_TYPE.LINE
    },
    {
      label: '创建折线',
      type: SHAPE_TYPE.POLY_LINE
    },
    {
      label: '创建矩形',
      type: SHAPE_TYPE.RECT
    },
    {
      label: '创建多边形',
      type: SHAPE_TYPE.POLYGON
    },
    {
      label: '撤销',
      shortcut: 'Ctrl + Z',
      type: ACTION_TYPE.UNDO
    },
    {
      label: '删除',
      shortcut: 'Del',
      type: ACTION_TYPE.DELETE
    }
  ].filter((item) => {
    if (item.type === ACTION_TYPE.DELETE) {
      return props.activeShape
    }
    return true
  })
})

const handleMenuItemClick = (type: SHAPE_TYPE | ACTION_TYPE) => {
  if (Object.values(SHAPE_TYPE).includes(type as SHAPE_TYPE)) {
    emits('create-shape', type as SHAPE_TYPE)
  } else {
    emits('action-click', type as ACTION_TYPE)
  }
}

let keyCodeGroup: number[] = []
const isCtrlButtonKeyDown = (keyCode: number) => keyCode === 17
const handleKeyDown = (e: KeyboardEvent) => {
  const keyCode = e.keyCode

  if (keyCodeGroup.length === 0) {
    // 1.已按下0个键
    keyCodeGroup.push(keyCode)
    // 1.1delete
    const isDeleteKeyDown = keyCodeGroup[0] === 8 || keyCodeGroup[0] === 46
    if (isDeleteKeyDown) {
      emits('action-click', ACTION_TYPE.DELETE)
      keyCodeGroup = []
    }
  } else if (keyCodeGroup.length === 1) {
    // 2.已按下1个键
    if (isCtrlButtonKeyDown(keyCodeGroup[0])) {
      // 2.1ctrl + 其他按键
      keyCodeGroup.push(keyCode)
      const [, secondKeyCode] = keyCodeGroup
      // 2.1.1ctrl + z
      secondKeyCode === 90 && emits('action-click', ACTION_TYPE.UNDO)

      keyCodeGroup.pop()
    } else {
      keyCodeGroup = []
    }
  }
}

const handleKeyUp = (e: KeyboardEvent) => {
  const keyCode = e.keyCode
  if (isCtrlButtonKeyDown(keyCode)) {
    keyCodeGroup.shift()
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown)
  window.addEventListener('keyup', handleKeyUp)
})
</script>

<style scoped lang="scss">
.right-click-menu {
  position: absolute;
  left: v-bind(left);
  top: v-bind(top);
  border-radius: 10px;
  background-color: #fff;
}
</style>
