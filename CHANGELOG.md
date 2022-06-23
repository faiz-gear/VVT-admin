## 1.0.0-beta.4(2022-06-23)

### ✨ Features

- 增加 useStorage hooks

## 1.0.0-beta.3(2022-06-15 ~ 2022-06-21)

### ✨ Features

- 引入 windicss, Login 页面样式使用 windicss 样式重构
- Form 组件增加 slot 和 textarea 类型

### 🎫 chore

- 移除 node-sass 依赖

## 1.0.0-beta.2(2022-06-14)

### ✨ Features

- 增加 SvgIcon 雪碧图组件

## 1.0.0-beta.1(2022-06-09 ~ 2022-06-011)

### 更新说明

- 包管理器由 npm 改为 pnpm

### ✨ Features

- transition 组件增加 appear 配置
- 主题全局并持久化存储
- 新增主题换肤功能(暗黑\亮白)
- 表单更换多层级目录结构
- 面包屑组件支持多层级
- 优化 Form 和 Table 配置项;调整部分参数命名
- table、form、breadcrumb、transition 等基础组件

### 🐛 Bug Fixes

- 修复 Table 组件样式覆盖问题
- 修改 dev 环境下 rollup 资源导入问题

### 🎫 Chore

- 增加 staging 预发布模式和打包脚本
- 增加 BASE_URL\API_URL\UPLOAD_URL 等环境变量
- 增加生产环境打包脚本：生成可动态修改配置 JS 文件
- 修复打包类型检测问题
