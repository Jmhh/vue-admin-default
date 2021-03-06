<template>
	<div class="main-content">
		<div class="complex-table">
			<basic-table
				stripe
				:tableData="tableData"
				:tableColumns="defaulTableColumn"
				:loading="dataLoading"
				@load="pageLoad"
			>
			</basic-table>
		</div>
	</div>
</template>

<script>
import { defaulTableColumn } from '../constant'
import { getMultiTableData } from '@/api/data'
export default {
	name: 'complex-table',
	props: [''],
	data() {
		return {
			defaulTableColumn,
			tableData: [],
			dataLoading: false
		}
	},

	components: {},

	mounted() {
		this.pageLoad()
	},

	methods: {
		pageLoad() {
			this.dataLoading = true
			getMultiTableData().then(res => {
				this.dataLoading = false
				if (res.code === 0) {
					const { list } = res.data
					this.tableData = list
				} else {
					this.$message.error(res.desc)
				}
			})
		}
	}
}
</script>
<style lang="scss" scoped></style>
