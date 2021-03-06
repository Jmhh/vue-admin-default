<template>
	<div class="basic-table" :style="{ width: cWidth, height: cHeight }">
		<div class="btn-box">
			<slot name="btn-box"></slot>
		</div>
		<el-table
			v-bind="$attrs"
			v-on="$listeners"
			ref="table"
			v-loading="loading"
			:data="tableData"
			header-row-class-name="table_header"
		>
			<slot name="first-col"></slot>
			<el-table-column
				v-for="(col, index) in tableColumns"
				:key="index"
				v-bind="col"
			>
				<template slot-scope="scope">
					<slot v-if="col.slots" :scope="scope" :name="col.prop"></slot>
					<template v-else>
						{{ scope.row[col.prop] }}
					</template>
				</template>
			</el-table-column>
			<slot></slot>
		</el-table>
		<div class="table_footer" v-if="withPagi">
			<el-pagination
				@size-change="bindSizeChange"
				@current-change="bindCurrentChange"
				:current-page="page"
				:page-sizes="[10, 20, 50, 100]"
				:page-size="rows"
				:total="total"
				layout="total, prev, pager, next, sizes, jumper"
			>
			</el-pagination>
		</div>
	</div>
</template>

<script>
export default {
	name: 'basic-table',
	inheritAttrs: false,
	props: {
		cWidth: {
			type: [Number, String],
			default: '100%'
		},
		cHeight: {
			type: [Number, String],
			default: 'auto'
		},
		loading: {
			type: Boolean,
			default: false
		},
		tableData: {
			type: Array,
			default: () => []
		},
		tableColumns: {
			type: Array,
			default: () => []
		},
		withPagi: {
			type: Boolean,
			default: true
		},
		page: {
			type: Number,
			default: 1
		},
		rows: {
			type: Number,
			default: 10
		},
		total: {
			type: Number,
			default: 0
		}
	},
	methods: {
		bindSizeChange(rows) {
			this.$emit('load', { rows, page: 1 })
		},
		bindCurrentChange(page) {
			this.$emit('load', { page })
		}
	}
}
</script>

<style lang="scss">
.basic-table {
	display: flex;
	flex-direction: column;
	overflow-x: auto;
	.total_box {
		padding: 10px 0;
	}
	.total_box-num {
		margin: 0 5px;
	}
	.btn-box {
		padding: 5px 0 15px 0;
		display: flex;
	}
	.table_header {
		font-weight: 200;
		color: #656565;
		height: 56px;
		border-top: 1px solid rgba(235, 235, 235, 1);
		border-bottom: 1px solid rgba(235, 235, 235, 1);
		th {
			background: rgba(243, 243, 243, 1);
			.cell {
				font-weight: 200;
			}
		}
	}

	.el-pager li {
		border: 1px solid #ddd;
		margin: 0 3px;
		border-radius: 5px;
		font-weight: 200;
		&.active {
			background: #177dff;
			color: #fff;
			border: none;
		}
	}
	.el-pager li.active + li {
		border-left: 1px solid #ddd;
	}
	.table_footer {
		padding: 10px 0;
		align-self: flex-end;
	}
}
</style>
