<template>
  <div
    class="login relative h-[100vh] text-center box-border bg-left bg-no-repeat bg-contain bg-center"
    vvt:sm="bg-bottom"
  >
    <!-- 基于可变修饰分组编程范式, 结合属性化模式 -->
    <h1
      class="rotate-90 absolute left-[5%] top-[5%] bg-gradient-to-r from-[#74b9ff] to-[#55efc4] bg-clip-text text-transparent text-[24px] font-medium font-mono animate-animated animate-rubberBand"
    >
      {{ VITE_GLOB_APP_NAME }}
    </h1>
    <div
      class="pt-[280px]"
      vvt:2xl="pl-[600px]"
      vvt:lg="pl-[300px]"
      vvt:sm="absolute left-1/2 transform -translate-x-1/2"
    >
      <h2 class="animate-animated animate-slideInDown *font-xl mb-[20px] font-medium">登录</h2>
      <el-card
        shadow="always"
        class="w-[400px] my-[0] mx-[auto] p-[20px] animate-animated animate-slideInLeft"
        vvt:sm="w-[350px]"
      >
        <el-form ref="formRef" :rules="rules" :model="loginInfo" label-width="auto" size="large">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="loginInfo.username" />
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="loginInfo.password" type="password" show-password @keyup.enter="handleLoginClick" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" class="w-[100%] mt-[18px]" @click="handleLoginClick">登录</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { useRouter } from 'vue-router'
import useMainStore from '../../store/main'
import { GLOBAL_VARIABLE_NAME } from '@/setting/variable-setting'
import { useGlobSetting } from '@/hooks/setting'
import useStorage from '@/hooks/storage'

const router = useRouter()
const mainStore = useMainStore()
const { setName, setToken } = mainStore
const storage = useStorage()

const { VITE_GLOB_APP_NAME } = useGlobSetting()

// TODO https://dribbble.com/shots/16705889-Login-Sign-up-AW-Universal-Page/attachments/11747461?mode=media

const formRef = ref<FormInstance>()
const rules = reactive<FormRules>({
  username: [
    {
      required: true,
      message: '用户名不能为空',
      trigger: 'blur'
    },
    {
      min: 3,
      max: 10,
      message: '用户名长度在3-10位',
      trigger: 'blur'
    }
  ],
  password: [
    {
      required: true,
      message: '密码不能为空',
      trigger: 'blur'
    },
    {
      min: 6,
      max: 12,
      message: '用户名长度在6-12位',
      trigger: 'blur'
    }
  ]
})

const loginInfo = ref({
  username: '',
  password: ''
})

const mockUserName = 'admin'
const mockPassword = '123456'
const mockAccessToken = 'token'
const handleLoginClick = () => {
  formRef.value?.validate((valid) => {
    if (valid) {
      if (loginInfo.value.username === mockUserName && loginInfo.value.password === mockPassword) {
        setName(loginInfo.value.username)
        setToken(mockAccessToken)
        storage.setItem(GLOBAL_VARIABLE_NAME.USERNAME, loginInfo.value.username)
        storage.setItem(GLOBAL_VARIABLE_NAME.TOKEN, mockAccessToken)
        router.push('/main')
      }
    }
  })
}
</script>

<style scoped lang="scss">
.login {
  background-image: url('@/assets/project.png');
}
</style>
