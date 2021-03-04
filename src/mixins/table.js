export default {
	data() {
		return {
			tableHead: [],
			tableData: [],
			editStatus: false
		}
	},

	created() {},

	methods: {
		handleStatus() {
			if (this.editStatus) {
				this.editStatus = false
			} else {
				this.editStatus = true
			}
		},
		tableRowClassName({ row, rowIndex }) {
			if (row.send_status === 3) {
				return 'warning-row'
			} else if (rowIndex === 3) {
				return 'success-row'
			}
			return ''
		},
		addList() {
			this.editStatus = true
			let obj = {
				send_status: undefined,
				work_date: undefined,
				begin_date: undefined,
				end_date: undefined,
				work_id: undefined,
				is_point: undefined,
				work_status: undefined
			}
			this.tableData.push(obj)
		},
		resultText(val, arr) {
			let map = {}
			arr.forEach(e => {
				let obj = {
					[e.value]: e.name
				}
				Object.assign(map, obj)
			})
			return map[val]
		}
	}
}
