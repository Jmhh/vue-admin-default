<template>
	<div class="dashboard-editor-container">
		<panel-group @handleSetLineChartData="handleSetLineChartData" />
		<el-row :gutter="20">
			<el-col :xs="24" :sm="16" :lg="16">
				<div class="chart-wrapper">
					<h3 class="chart-wrapper-title">Users Statistics</h3>
					<line-chart :chart-data="lineChartData" />
				</div>
			</el-col>
			<el-col :xs="24" :sm="8" :lg="8">
				<div class="chart-wrapper">
					<h3 class="chart-wrapper-title">Users Percentage</h3>
					<pie-chart />
				</div>
			</el-col>
		</el-row>
	</div>
</template>

<script>
const PanelGroup = () => import('./components/PanelGroup')
const LineChart = () => import('./components/LineChart')
const PieChart = () => import('./components/PieChart')

const lineChartData = {
	newVisitis: {
		expectedData: [100, 120, 161, 134, 105, 160, 165],
		actualData: [120, 82, 91, 154, 162, 140, 145]
	},
	messages: {
		expectedData: [200, 192, 120, 144, 160, 130, 140],
		actualData: [180, 160, 151, 106, 145, 150, 130]
	},
	purchases: {
		expectedData: [80, 100, 121, 104, 105, 90, 100],
		actualData: [120, 90, 100, 138, 142, 130, 130]
	},
	shoppings: {
		expectedData: [130, 140, 141, 142, 145, 150, 160],
		actualData: [120, 82, 91, 154, 162, 140, 130]
	}
}

export default {
	name: 'DashboardAdmin',
	components: {
		PanelGroup,
		LineChart,
		PieChart
	},
	data() {
		return {
			lineChartData: lineChartData.newVisitis
		}
	},
	methods: {
		handleSetLineChartData(type) {
			this.lineChartData = lineChartData[type]
		}
	}
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
	padding: 32px;
	background-color: rgb(240, 242, 245);
	position: relative;

	.github-corner {
		position: absolute;
		top: 0px;
		border: 0;
		right: 0;
	}

	.chart-wrapper {
		background: #fff;
		margin-bottom: 32px;
		.chart-wrapper-title {
			margin-bottom: 20px;
			padding: 16px 16px;
			font-size: 18px;
			color: #575962;
			border-bottom: 1px solid #ebedf2 !important;
		}
	}
}

@media (max-width: 1024px) {
	.chart-wrapper {
		padding: 8px;
	}
}
</style>
