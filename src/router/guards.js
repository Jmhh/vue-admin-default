//路由守卫
import store from '@/store/index.js'
import { Message } from 'element-ui'

export default function(router) {
	//路由前置守卫
	router.beforeEach(async (to, from, next) => {
		if (to.path === '/login') {
			next()
		} else {
			if (store.getters.token) {
				const hasRoles = store.getters.roles.length > 0
				if (hasRoles) {
					next()
				} else {
					try {
						const { roles } = await store.dispatch('user/_getInfo', {
							token: store.getters.token
						})
						const addRoutes = await store.dispatch(
							'permission/getAsyncRoutes',
							roles
						)
						router.addRoutes(addRoutes)
						next({ ...to, replace: true })
					} catch (error) {
						Message.error(error)
					}
				}
			} else {
				next({
					path: '/login',
					query: {
						redirect: to.fullPath
					}
				})
			}
		}
	})
}
