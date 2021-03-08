import axios from 'axios'
import router from '@/router'
import store from '@/store/index.js'
import { Message } from 'element-ui'

const $axios = axios.create({
	timeout: 10000, // 设置超时时间
	// 状态码返回范围
	validateStatus: status => {
		return status >= 200 && status <= 500 // 默认的
	}
})

//请求拦截
$axios.interceptors.request.use(
	config => {
		const meta = config.meta || {}
		const isToken = meta.isToken === false
		const token = store.state.user.token
		if (token && !isToken) {
			config.headers.Authorization = token // 添加自定义请求头
		}
		return config
	},
	error => {
		return Promise.reject(error)
	}
)
//响应拦截
$axios.interceptors.response.use(
	res => {
		const status = res.status
		if (status >= 200 && status < 300) {
			const dataCode = res.data && res.data.code
			if (dataCode == '2002') {
				Message({
					message: res.data.message,
					type: 'error'
				})
				router.push('/login')
				return
			}
			//只返回数据，不返回其他信息
			return res.data
		} else {
			const message = getErrorMsgByCode(status)
			if (status === '403') {
				router.push('/403')
				return
			}
			if (status === '401') {
				Message({
					message,
					type: 'error'
				})
				router.push('/login')
				return
			}
			Message({
				message,
				type: 'error'
			})
			return Promise.reject(new Error(message))
		}
	},
	error => {
		if (error.message.indexOf('timeout') != -1) {
			Message({
				message: '请求超时，请重试',
				type: 'error'
			})
		}
		return Promise.reject(new Error(error))
	}
)
/**
 * 返回状态码对应的提示信息
 * @param {number} code
 */
const getErrorMsgByCode = code => {
	let result = '未知错误'
	if (code >= 400 && code < 500) {
		switch (code) {
			case 401:
				result = '登录超时，请重新登录'
				break
			case 403:
				result = '您所请求的资源被禁止访问'
				break
			case 404:
				result = '您所请求的资源不存在'
				break
			default:
				result = `抱歉，程序出了问题~~`
		}
	} else if (code >= 500 && code < 600) {
		result = '服务器出错啦'
	}
	return result
}
export default $axios
