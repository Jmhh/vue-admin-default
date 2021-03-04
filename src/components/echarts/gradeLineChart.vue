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
						type: 'cross',
						label: {
							backgroundColor: '#6a7985'
						}
					}
				},
				color: ['#0080ff', '#4cd5ce'],
				toolbox: {
					// feature: {
					//     saveAsImage: {}
					// }
				},
				grid: {
					left: '5%',
					right: '5%',
					top: '10%',
					bottom: '5%',
					containLabel: true
				},
				xAxis: [
					{
						type: 'category',
						boundaryGap: false,
						data: [
							'2019 05/20  ',
							'2019 05/24',
							'2019 05/27',
							'2019 05/29 ',
							'2019 05/02 ',
							'2019 05/08'
						],
						axisLabel: {
							show: true,
							textStyle: {
								color: '#6ba1bb',
								fontSize: 12
							},
							formatter: function(value) {
								//debugger
								var ret = '' //拼接加\n返回的类目项
								var maxLength = 5 //每项显示文字个数
								var valLength = value.length //X轴类目项的文字个数
								var rowN = Math.ceil(valLength / maxLength) //类目项需要换行的行数
								if (rowN > 1) {
									//如果类目项的文字大于3,
									for (var i = 0; i < rowN; i++) {
										var temp = '' //每次截取的字符串
										var start = i * maxLength //开始截取的位置
										var end = start + maxLength //结束截取的位置
										//这里也可以加一个是否是最后一行的判断，但是不加也没有影响，那就不加吧
										temp = value.substring(start, end) + '\n'
										ret += temp //凭借最终的字符串
									}
									return ret
								} else {
									return value
								}
							}
						},
						axisTick: {
							show: false
						},
						axisLine: {
							lineStyle: {
								type: 'dashed',
								color: '#0a2b52',
								width: 0.5 //这里是为了突出显示加上的
							}
						}
					}
				],
				yAxis: [
					{
						type: 'value',
						axisLine: {
							onZero: false,
							lineStyle: {
								type: 'dashed',
								color: '#0a2b52',
								width: 1 //这里是为了突出显示加上的
							}
						},

						axisLabel: {
							formatter: function(val) {
								return val + ''
							},
							show: true,
							textStyle: {
								color: '#6ba1bb' //字体颜色
							}
						},
						axisTick: {
							show: false
						},
						splitLine: {
							show: true,
							lineStyle: {
								type: 'dashed'
							}
						}
					}
				],
				series: [
					{
						name: '最高水量',
						type: 'line',
						smooth: true,
						//  symbol: "none", //去掉折线点
						stack: 100,
						itemStyle: {
							normal: {
								//颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
								color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
									{
										offset: 0,
										color: '#CB8993' // 0% 处的颜色
									},
									{
										offset: 0.5,
										color: '#CB8993' // 100% 处的颜色
									},
									{
										offset: 1,
										color: '#CC56CB' // 100% 处的颜色
									}
								]), //背景渐变色
								lineStyle: {
									// 系列级个性化折线样式
									width: 0.5,
									type: 'solid',
									color: '#CC56CB'
								}
							},
							emphasis: {
								color: '#02675f',
								lineStyle: {
									// 系列级个性化折线样式
									width: 0.5,
									type: 'dotted',
									color: '#02675f' //折线的颜色
								}
							}
						}, //线条样式
						symbolSize: 5, //折线点的大小
						areaStyle: {
							normal: {}
						},
						data: [20, 60, 50, 80, 120, 100]
					},

					{
						name: '最低水量',
						type: 'line',
						smooth: true,
						//  symbol: "none", //去掉折线点
						stack: 100,
						itemStyle: {
							normal: {
								//颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
								color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
									{
										offset: 0,
										color: '#64CAFA' // 0% 处的颜色
									},
									{
										offset: 0.5,
										color: '#64CAFA' // 100% 处的颜色
									},
									{
										offset: 1,
										color: '#0078D7' // 100% 处的颜色
									}
								]), //背景渐变色
								lineStyle: {
									// 系列级个性化折线样式
									width: 0.5,
									type: 'solid',
									color: '#0078D7'
								}
							},
							emphasis: {
								color: '#02675f',
								lineStyle: {
									// 系列级个性化折线样式
									width: 0.5,
									type: 'dotted',
									color: '#02675f' //折线的颜色
								}
							}
						}, //线条样式
						symbolSize: 5, //折线点的大小
						areaStyle: {
							normal: {}
						},
						data: [20, 70, 60, 80, 100, 90]
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
