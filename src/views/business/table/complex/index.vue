<template>
	<div class="main-content">
		<div class="complex-table">
			<basic-table
				border
				:tableData="tableData"
				:tableColumns="complexTableColumn"
				:page="page"
				:rows="rows"
				:total="total"
				@load="pageLoad"
			>
				<template v-slot:position="{ scope }">
					<div v-if="scope.row.edit !== false">
						<el-input v-model="scope.row.position"></el-input>
					</div>
					<div v-else>
						<span>{{ scope.row.position }}</span>
					</div>
				</template>
				<template slot="default">
					<el-table-column label="操作" width="200">
						<template slot-scope="scope">
							<el-button
								type="primary"
								size="mini"
								v-if="!scope.row.edit"
								@click="editRow(scope.row)"
								>编辑</el-button
							>
							<el-button
								type="info"
								size="mini"
								v-else
								@click="saveRow(scope.row)"
								>保存</el-button
							>
							<el-button type="danger" size="mini" @click="deleteRow(scope.row)"
								>删除</el-button
							>
						</template>
					</el-table-column>
				</template>
			</basic-table>
		</div>
	</div>
</template>

<script>
import { complexTableColumn } from '../constant'
import { getTableData } from '@/api/data'
export default {
	name: 'complex-table',
	props: [''],
	data() {
		return {
			complexTableColumn,
			tableData: [],
			page: 0,
			rows: 10,
			total: 0
		}
	},

	components: {},

	mounted() {
		this.pageLoad()
	},

	methods: {
		//请求数据
		pageLoad() {
			getTableData().then(res => {
				if (res.code === 0) {
					const { list, page, rows, total } = res.data
					this.tableData = list.map(item => ({
						...item,
						edit: false
					}))
					this.page = page
					this.rows = rows
					this.total = total
				} else {
					this.$message.error(res.desc)
				}
			})
		},
		//编辑
		editRow(row) {
			row.edit = true
		},
		//保存
		saveRow(row) {
			row.edit = false
		},
		//删除
		deleteRow() {}
	}
}
</script>
<style lang="scss" scoped></style>
