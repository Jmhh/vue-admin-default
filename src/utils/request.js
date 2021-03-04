import axios from 'axios'
import Store from '@/store'
import router from '@/router'

const http = axios.create({
	timeout: 10000
})

http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
http.defaults.headers.post['X-Requested-With'] = 'XMLHttpRequest'

http.interceptors.request.use(
	config => {
		if (Store.state.app.token) {
			config.headers.Authorization = Store.state.app.token
		} else {
			router.replace({
				path: '/login'
			})
		}
		Store.state.app.loading = true
		return config
	},
	error => {
		return Promise.reject(error)
	}
)

http.interceptors.response.use(
	response => {
		setTimeout(() => {
			Store.state.app.loading = false
		}, 1000)

		return response
	},
	error => {
		return Promise.reject(error)
	}
)

export default http
