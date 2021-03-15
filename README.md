
## 简介

Vue+Element+Mockjs 实现的前端中后台管理系统模板，实现了登录权限验证，动态路由生成，公共组件封装，webpack打包优化配置等功能。它可以帮你快速搭建后台管理系统模板，并根据实际的业务需求添加路由来实现企业级管理页面。

### 使用

```
# 克隆项目
git clone git@github.com:Jmhh/vue-admin-default.git

# 进入项目目录
cd vue-admin-default

# 安装依赖
yarn install

# 启动服务
yarn dev
```
#### 使用技术

- **UI 框架**: `vue`、`element-ui`
- **数据管理**：`vuex`
- **接口请求**：`axios`
- **语法检查**：`eslint`
- **CSS 规则**：`sass`
- **后端 API**：`mockjs`
### 功能

```
- 登录 / 退出
  - 前端路由权限

- 页面
  - 初次进入引导用户
  - sideBar收缩和展开
  - 全屏控制

- 侧边栏
  - 根据不同用户权限展示相应的动态左侧菜单

- 权限验证
  - 管理员页面
  - 权限设置

- 公共组件封装
  - 以表格组件为例

- Echarts
 - 滑动显示更多数据
 - 动态切换charts

- webpack&vue-cli 配置优化
 - 路由懒加载
 - 图片压缩
 - 开启gzip
 - 提取第三方依赖，分割js代码
 - element组件按需引入
```
#### 文件说明

```js
.
├── README.md
├── package.json
├── src
│   ├── api
│   │   ├── axios.js // Axios 请求统一封装
│   │   └── data.js // 请求数据 axios 实例
│   │   └── login.js // 登录相关 axios 实例
│   ├── assets //静态资源
│   ├── init //初始化项目
│   │   └── components.js // 全局公共组件导入
│   ├── components // 全局公共组件文件
│   │   └── Table // 自定义表格组件
│   │       └──basic-table.vue
│   ├── mixins // 公共mixins
│   ├── plugins // 插件
│   │   └── element.js // element组件按需导入
│   ├── router //路由
│   │   ├── guards.js // 路由导航守卫
│   │   └── index.js 
│   ├── store //store
│   ├── utils // 工具类方法
│   ├── App.vue 
│   ├── main.js 
│   └── views // 视图
│       ├── business //业务组件模块
│       │   ├── dashboard
│       │   ├── table
│       │   └── chart
│       ├── layout //layout组件模块
│       │   ├── components
│       │   │   ├── Header
│       │   │   ├── Main
│       │   │   └── SideBar
│       │   └── index.vue
│       ├── page //基础组件模块
│       │   ├── login
│       │   └── error-page
└── vue.config.js

```