<template>
	<el-row :gutter="40" class="panel-group">
		<el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
			<div
				class="card-panel icon-people"
				@click="handleSetLineChartData('newVisitis')"
			>
				<div class="card-panel-icon-wrapper">
					<span class="el-icon-document-copy"></span>
				</div>
				<div class="card-panel-description">
					<div class="card-panel-text">
						New Visits
					</div>
				</div>
			</div>
		</el-col>
		<el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
			<div
				class="card-panel icon-message"
				@click="handleSetLineChartData('messages')"
			>
				<div class="card-panel-icon-wrapper">
					<span class="el-icon-user"></span>
				</div>
				<div class="card-panel-description">
					<div class="card-panel-text">
						Messages
					</div>
				</div>
			</div>
		</el-col>
		<el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
			<div
				class="card-panel icon-money"
				@click="handleSetLineChartData('purchases')"
			>
				<div class="card-panel-icon-wrapper">
					<span class="el-icon-date"></span>
				</div>
				<div class="card-panel-description">
					<div class="card-panel-text">
						Purchases
					</div>
				</div>
			</div>
		</el-col>
		<el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
			<div
				class="card-panel icon-shopping"
				@click="handleSetLineChartData('shoppings')"
			>
				<div class="card-panel-icon-wrapper">
					<span class="el-icon-picture-outline"></span>
				</div>
				<div class="card-panel-description">
					<div class="card-panel-text">
						Shoppings
					</div>
				</div>
			</div>
		</el-col>
	</el-row>
</template>

<script>
export default {
	methods: {
		handleSetLineChartData(type) {
			this.$emit('handleSetLineChartData', type)
		}
	}
}
</script>

<style lang="scss" scoped>
.panel-group {
	margin-top: 18px;

	.card-panel-col {
		margin-bottom: 32px;
		.icon-people {
			background: #177dff;
		}

		.icon-message {
			background: #05b4d8;
		}

		.icon-money {
			background: #35cd3a;
		}

		.icon-shopping {
			background: #716aca;
		}
	}

	.card-panel {
		height: 108px;
		cursor: pointer;
		font-size: 12px;
		position: relative;
		overflow: hidden;
		color: #fff;
		background: #fff;
		border-color: rgba(0, 0, 0, 0.05);

		.card-panel-icon-wrapper {
			float: left;
			margin: 14px 0 0 14px;
			padding: 16px;
			transition: all 0.38s ease-out;
			border-radius: 6px;
			span {
				font-size: 45px;
			}
		}

		.card-panel-icon {
			float: left;
			font-size: 48px;
		}

		.card-panel-description {
			float: right;
			font-weight: bold;
			margin: 26px;
			margin-left: 0px;

			.card-panel-text {
				line-height: 18px;
				color: #fff;
				font-size: 16px;
				margin-bottom: 12px;
			}

			.card-panel-num {
				font-size: 20px;
			}
		}
	}
}

@media (max-width: 550px) {
	.card-panel-description {
		display: none;
	}

	.card-panel-icon-wrapper {
		float: none !important;
		width: 100%;
		height: 100%;
		margin: 0 !important;

		.svg-icon {
			display: block;
			margin: 14px auto !important;
			float: none !important;
		}
	}
}
</style>
