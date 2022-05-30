<template>
  <div class="vvt-breadcrumbs">
    <el-breadcrumb :separator="separator">
      <template v-for="breadcrumb in breadcrumbs" :key="breadcrumb.name">
        <el-breadcrumb-item
          >{{ breadcrumb.name }}
          <el-dropdown v-if="breadcrumb.children && breadcrumb.children.length > 0">
            <span class="el-dropdown-link">
              <el-icon class="el-icon--right">
                <arrow-down />
              </el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item
                  v-for="item in breadcrumb.children"
                  :key="item.name"
                  @click="router.push(item.path)"
                  >{{ item.name }}</el-dropdown-item
                >
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </el-breadcrumb-item>
      </template>
    </el-breadcrumb>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { IBreadcrumb } from './breadcrumbs-type'
const props = withDefaults(
  defineProps<{
    breadcrumbs: IBreadcrumb[]
    separator?: string
  }>(),
  {
    separator: '/'
  }
)

const router = useRouter()
</script>

<style scoped></style>
