import axios from './axios.js'

//登录
export const Login = data => {
	return axios.post('/api/login', data)
}

//用户信息
export const UserInfo = data => {
	return axios.post('/api/roles', data)
}
