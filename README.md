
## 简介

Vue+Element+Mockjs 实现的前端中后台管理系统模板，实现了登录权限验证，动态路由生成，公共组件封装，webpack打包优化配置等功能。它可以帮你快速搭建后台管理系统模板，并根据实际的业务需求添加路由来实现企业级管理页面。

### 安装

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