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
				meta: { title: '首页', icon: 'el-icon-s-data' }
			}
		]
	}
]
/*业务routers*/
export const asyncRoutes = [
	{
		path: '/table',
		name: 'Table',
		redirect: '/table/index',
		component: Layout,
		meta: {
			title: 'Table',
			icon: 'el-icon-table iconfont'
		},
		children: [
			{
				path: 'index',
				name: 'BaseTable',
				component: () => import('@/views/business/table'),
				meta: { title: '普通表格' }
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

const router = creatRouter()
console.log(router)
guards(router)
export default router
