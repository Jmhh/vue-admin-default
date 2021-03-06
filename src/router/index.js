import Vue from 'vue'
import Router from 'vue-router'
import guards from './guards'

Vue.use(Router)

import Layout from '@/views/layout'

/*通用routers*/
export const defaultRoutes = [
	{
		path: '/login',
		name: 'Login',
		component: () => import('@/views/page/login'),
		meta: { title: '登录页' },
		hidden: true
	},
	{
		path: '/',
		name: 'Home',
		component: Layout,
		redirect: '/dashbord',
		children: [
			{
				path: 'dashbord',
				name: 'Dashbord',
				component: () => import('@/views/business/dashboard'),
				meta: { title: '首页', icon: 'el-icon-s-home' }
			}
		]
	}
]
/*业务routers*/
export const asyncRoutes = [
	{
		path: '/table',
		name: 'Table',
		redirect: '/table/default-table',
		component: Layout,
		meta: {
			title: '表格',
			icon: 'el-icon-s-tools'
		},
		children: [
			{
				path: 'default-table',
				name: 'BaseTable',
				component: () => import('@/views/business/table/default'),
				meta: { title: '普通表格' }
			},
			{
				path: 'complex-table',
				name: 'ComplexTable',
				component: () => import('@/views/business/table/complex'),
				meta: { title: '复杂表格' }
			},
			{
				path: 'multiData-table',
				name: 'MultiDataTable',
				component: () => import('@/views/business/table/multiData'),
				meta: { title: '长列表表格' }
			}
		]
	},
	{
		path: '/chart',
		name: 'Chart',
		component: Layout,
		redirect: '/chart/index',
		children: [
			{
				path: 'index',
				name: 'ChartIndex',
				component: () => import('@/views/business/chart'),
				meta: { title: '图表', icon: 'el-icon-s-data' }
			}
		]
	},
	{
		path: '/form',
		name: 'Form',
		component: Layout,
		redirect: '/form/index',
		children: [
			{
				path: 'index',
				name: 'FormIndex',
				component: () => import('@/views/business/form'),
				meta: { title: '表单', icon: 'el-icon-notebook-2' }
			}
		]
	}
]

const creatRouter = () => {
	return new Router({
		routes: defaultRoutes,
		scrollBehavior() {
			return { x: 0, y: 0 }
		}
	})
}

// 解决addRoute不能删除动态路由问题
export function resetRouter() {
	const reset = creatRouter()
	router.matcher = reset.matcher
}

const router = creatRouter()
guards(router)
export default router
