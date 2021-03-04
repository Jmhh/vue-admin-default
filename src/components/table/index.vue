<template>
	<div>
		<div class="classTabl">
			<div class="control" v-if="timeStatus === 'edit'">
				<el-button
					:type="editStatus ? 'danger' : 'info'"
					size="mini"
					@click="handleStatus"
					>{{ editStatus ? '正在编辑' : '编辑' }}</el-button
				>
			</div>
			<el-table
				:data="tableData"
				align="center"
				border
				:row-class-name="tableRowClassName"
				style="width: 98%"
			>
				<el-table-column type="selection" width="55"></el-table-column>
				<template v-for="(item, index) in tableHead">
					<el-table-column
						:prop="item.value"
						:label="item.name"
						:key="index"
						align="center"
					>
						<template slot-scope="scope">
							<div class="table-item" v-if="!editStatus">
								<div v-if="item.type === 2">
									<div class="cell">
										{{ resultText(scope.row[item.value], item.typeValue) }}
									</div>
								</div>
								<div v-else>
									<div class="cell">{{ scope.row[item.value] }}</div>
								</div>
							</div>
							<div class="table-item" v-else>
								<div v-if="item.type === 2">
									<el-select
										v-model="scope.row[item.value]"
										placeholder="请选择"
										:disabled="scope.row.send_status === 3"
									>
										<el-option
											v-for="eitem in item.typeValue"
											:key="eitem.value"
											:label="eitem.name"
											:value="eitem.value"
										></el-option>
									</el-select>
								</div>
								<div v-if="item.type === 1">
									<el-input
										v-model="scope.row[item.value]"
										:disabled="scope.row.send_status === 3"
									></el-input>
								</div>
								<div v-if="item.type === 3">
									<el-date-picker
										v-model="scope.row[item.value]"
										type="date"
										format="yyyy-MM -dd"
										placeholder="选择日期"
										:disabled="scope.row.send_status === 3"
									></el-date-picker>
								</div>
							</div>
						</template>
					</el-table-column>
				</template>
				<el-table-column
					v-if="timeStatus === 'edit'"
					align="center"
					label="操作"
					width="200"
					class-name="small-padding fixed-width"
				>
					<template slot-scope="scope">
						<el-button
							v-if="status === 'next'"
							type="danger"
							size="mini"
							:disabled="scope.row.send_status === 3"
							>回退</el-button
						>
						<el-button
							type="warning"
							size="mini"
							:disabled="scope.row.send_status === 3"
							>删除</el-button
						>
					</template>
				</el-table-column>
			</el-table>
			<div style="margin:20px 0;" v-if="timeStatus === 'edit'">
				<el-button type="primary" size="mini" @click="addList()"
					>添加</el-button
				>
			</div>
		</div>
	</div>
</template>

<script>
import table from '@/mixins/table'
export default {
	name: '',
	props: {
		status: {
			type: String,
			required: true
		},
		timeStatus: {
			type: String,
			required: true
		}
	},
	mixins: [table],
	data() {
		return {}
	},
	components: {},
	created() {
		this.getData()
	},
	methods: {
		async getData() {
			let data
			if (this.status === 'this' && this.timeStatus === 'preview') {
				data = await this.$http.get('/thisPreTableList')
			} else if (this.status === 'this' && this.timeStatus === 'edit') {
				data = await this.$http.get('/thisEditTableList')
			} else if (this.status === 'next' && this.timeStatus === 'preview') {
				data = await this.$http.get('/nextPreTableList')
			} else {
				data = await this.$http.get('/nextEditTableList')
			}
			this.tableHead = data.data.titles
			this.tableData = data.data.result
		}
	}
}
</script>
<style lang="scss">
.el-table .warning-row {
	background: rgba(21, 116, 145, 0.11) !important;
}
.el-input__inner {
	text-align: center;
}
.el-date-editor.el-input {
	width: 100%;
}
.classTabl {
	background: #fff;
	padding: 20px 0;
	.control {
		text-align: right;
		padding: 20px;
	}
	.el-table__header-wrapper th {
		text-align: center;
	}
	.el-table__body-wrapper td {
		text-align: center;
	}
}
</style>
