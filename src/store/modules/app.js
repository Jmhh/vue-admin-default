import http from '@/utils/request'
import { asyncRoutes, constantRoutes } from '@/router'

const state = {
	loading: false,
	isCollapse: false, //侧边栏导航收缩
	userName: localStorage.getItem('userName')
		? localStorage.getItem('userName')
		: 0,
	token: localStorage.getItem('token') ? localStorage.getItem('token') : 0,
	meuns: '',
	ids: '',
	routes: [],
	addRoutes: []
}

const mutations = {
	SET_SIDEBAR: state => {
		state.isCollapse = true
	},
	TOGGLE_SIDEBAR: state => {
		if (state.isCollapse) {
			state.isCollapse = false
		} else {
			state.isCollapse = true
		}
	},
	SET_USERNAME: (state, data) => {
		if (data) {
			localStorage.setItem('userName', data)
			state.userName = data
		} else {
			localStorage.removeItem('userName')
		}
	},
	SET_USERTOKEN: (state, data) => {
		if (data) {
			localStorage.setItem('token', data)
			state.token = data
		} else {
			localStorage.removeItem('token')
		}
	},
	SET_MEUNS: (state, data) => {
		state.meuns = data
	},
	SET_IDS: (state, data) => {
		state.ids = data
	},
	SET_ROUTES: (state, payload) => {
		state.routes = [...constantRoutes, ...payload]
		state.addRoutes = payload
	}
}

function filterRoutes(routes, ids) {
	let arr = []
	for (let item of routes) {
		let itemNew = {
			...item
		}
		if (ids.includes(itemNew.id)) {
			if (itemNew.children) {
				itemNew.children = filterRoutes(itemNew.children, ids)
			}
			arr.push(itemNew)
		}
	}
	return arr
}

const actions = {
	getRoles({ commit }) {
		return new Promise((resolve, reject) => {
			http
				.get('/roles')
				.then(res => {
					if (res) {
						const { ids, roles } = res.data
						commit('SET_MEUNS', roles)
						commit('SET_IDS', ids)
					}
					resolve(res.data)
				})
				.catch(error => {
					reject(error)
				})
		})
	},
	getAsyncRoutes({ commit }, ids) {
		return new Promise(resolve => {
			let routes = []
			routes = filterRoutes(asyncRoutes, ids)
			commit('SET_ROUTES', routes)
			resolve(routes)
		})
	},
	setSideBar({ commit }) {
		commit('SET_SIDEBAR')
	},
	toggleSideBar({ commit }) {
		commit('TOGGLE_SIDEBAR')
	},
	setUserName({ commit }, data) {
		commit('SET_USERNAME', data)
	},
	setUserToken({ commit }, data) {
		commit('SET_USERTOKEN', data)
	}
}

export default {
	state,
	mutations,
	actions
}
