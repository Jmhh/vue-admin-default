<template>
	<div class="main-content">
		<div class="default-table">
			<basic-table
				stripe
				:tableData="tableData"
				:tableColumns="defaulTableColumn"
				:page="page"
				:rows="rows"
				:total="total"
				:loading="dataLoading"
				@load="pageLoad"
			>
			</basic-table>
		</div>
	</div>
</template>

<script>
import { defaulTableColumn } from '../constant'
import { getTableData } from '@/api/data'
import { formatDate } from '@/utils'
export default {
	name: 'default-table',
	data() {
		return {
			defaulTableColumn,
			tableData: [],
			page: 0,
			rows: 10,
			total: 0,
			dataLoading: false
		}
	},
	mounted() {
		this.pageLoad()
		formatDate(new Date())
	},

	methods: {
		pageLoad() {
			this.dataLoading = true
			getTableData().then(res => {
				this.dataLoading = false
				if (res.code === 0) {
					const { list, page, rows, total } = res.data
					this.tableData = list
					this.page = page
					this.rows = rows
					this.total = total
				} else {
					this.$message.error(res.desc)
				}
			})
		}
	}
}
</script>
<style lang="scss" scoped></style>
