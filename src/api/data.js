import axios from './axios.js'

//普通表格数据
export const getTableData = () => {
	return axios.get('/api/tableData')
}

//长列表表格数据
export const getMultiTableData = () => {
	return axios.get('/api/multiTableData')
}
