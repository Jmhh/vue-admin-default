<!-- 折线图 -->
<template>
	<div class="lineChart" :style="{ height: height, width: width }" />
</template>

<script>
import echarts from 'echarts'
import { debounce } from '@/utils'
require('echarts/theme/macarons') // echarts theme
export default {
	props: {
		testData: {
			type: Array
		},
		className: {
			type: String,
			default: 'chart'
		},
		width: {
			type: String,
			default: '100%'
		},
		height: {
			type: String,
			default: '300px'
		}
	},
	data() {
		return {
			option: {
				tooltip: {
					trigger: 'axis',
					axisPointer: {
						lineStyle: {
							color: '#57617B'
						}
					}
				},
				legend: {
					icon: 'rect',
					itemWidth: 14,
					itemHeight: 5,
					itemGap: 13,
					data: ['环比(%)', '同比(%)'],
					right: '4%',
					textStyle: {
						fontSize: 12,
						color: '#666'
					}
				},
				grid: {
					left: '3%',
					right: '4%',
					bottom: '3%',
					containLabel: true
				},
				xAxis: [
					{
						type: 'category',
						boundaryGap: false,
						axisTick: {
							show: false
						},
						axisLine: {
							//show: false,
							lineStyle: {
								type: 'dashed',
								color: '#999'
							}
						},
						data: [
							'1月',
							'2月',
							'3月',
							'4月',
							'5月',
							'6月',
							'7月',
							'8月',
							'9月'
						]
					}
				],
				yAxis: [
					{
						type: 'value',
						axisTick: {
							show: false
						},
						axisLine: {
							//show: false,
							lineStyle: {
								type: 'dashed',
								color: '#999'
							}
						},
						axisLabel: {
							margin: 10,
							textStyle: {
								fontSize: 14
							}
						},
						splitLine: {
							lineStyle: {
								// color: "#57617B",

								type: 'dashed'
							},
							show: false
						},
						splitArea: { show: false } //保留网格区域
					}
				],
				series: [
					{
						name: '环比(%)',
						label: {
							normal: {
								show: true,
								position: 'top'
							}
						},
						type: 'line',
						smooth: true,
						lineStyle: {
							normal: {
								width: 1
							}
						},
						areaStyle: {
							normal: {
								color: new echarts.graphic.LinearGradient(
									0,
									0,
									0,
									1,
									[
										{
											offset: 0,
											color: 'rgba(137, 189, 27, 0.3)'
										},
										{
											offset: 0.8,
											color: 'rgba(137, 189, 27, 0)'
										}
									],
									false
								),
								shadowColor: 'rgba(0, 0, 0, 0.1)',
								shadowBlur: 10
							}
						},
						itemStyle: {
							normal: {
								color: 'rgb(137,189,27)'
							}
						},
						data: [-1, 0.3, 1.2, 1.6, -0.3, 3.6, 7.8, 23, 19.7]
					},
					{
						name: '同比(%)',
						label: {
							normal: {
								show: true,
								position: 'top'
							}
						},
						type: 'line',
						smooth: true,
						lineStyle: {
							normal: {
								width: 1
							}
						},
						areaStyle: {
							normal: {
								color: new echarts.graphic.LinearGradient(
									0,
									0,
									0,
									1,
									[
										{
											offset: 0,
											color: 'rgba(0, 136, 212, 0.3)'
										},
										{
											offset: 0.8,
											color: 'rgba(0, 136, 212, 0)'
										}
									],
									false
								),
								shadowColor: 'rgba(0, 0, 0, 0.1)',
								shadowBlur: 10
							}
						},
						itemStyle: {
							normal: {
								color: 'rgb(0,136,212)'
							}
						},
						data: [-3.2, -4.8, 5.1, 14.4, 18.2, 21.1, 27, 46.7, 69.3]
					}
				]
			}
		}
	},
	mounted() {
		this.initChart(this.chartData)
		this.__resizeHandler = debounce(() => {
			if (this.chart) {
				this.chart.resize()
			}
		}, 100)
		window.addEventListener('resize', this.__resizeHandler)
	},
	beforeDestroy() {
		if (!this.chart) {
			return
		}
		window.removeEventListener('resize', this.__resizeHandler)
		this.chart.dispose()
		this.chart = null
	},
	methods: {
		initChart() {
			this.chart = echarts.init(this.$el, 'macarons')
			this.chart.setOption(this.option, true)
		}
	}
}
</script>
