const path = require('path')
const resolve = function(dir) {
	return path.join(__dirname, dir)
}
const CompressionWebpackPlugin = require('compression-webpack-plugin')

module.exports = {
	publicPath: './',
	lintOnSave: true,
	productionSourceMap: false, // 是否在构建生产包时生成sourcdeMap
	chainWebpack: config => {
		config.resolve.alias
			.set('@', resolve('src'))
			.set('views', resolve('src/views'))
		//压缩图片
		config.module
			.rule('images')
			.use('imageWebpackLoader')
			.loader('image-webpack-loader')
			.options({
				disable: process.env.NODE_ENV === 'development'
			})
	},
	configureWebpack: config => {
		if (process.env.NODE_ENV === 'production') {
			// 生产环境配置
			//利用SplitChunks插件提取公共js代码和分割js代码
			config.optimization.splitChunks = {
				chunks: 'all',
				// 缓存分组
				cacheGroups: {
					// 第三方模块
					vendor: {
						name: 'vendor', // chunk 名称
						test: /[\\/]node_modules[\\/]/,
						minSize: 0, // 大小限制
						priority: 0, // 权限更高，优先抽离，重要！！！
						minChunks: 1 // 最少复用过几次
					},
					echarts: {
						name: 'echarts',
						test: /[\\/]node_modules[\\/]echarts[\\/]/,
						minSize: 0,
						minChunks: 1,
						priority: 1,
						reuseExistingChunk: true
					},
					'element-ui': {
						name: 'element-ui',
						test: /[\\/]node_modules[\\/]element-ui[\\/]/,
						minSize: 0,
						minChunks: 1,
						priority: 1,
						reuseExistingChunk: true
					},
					// 公共的模块
					common: {
						name: 'common',
						test: resolve('src/utils'),
						priority: 0,
						minSize: 0,
						minChunks: 1
					}
				}
			}
			// 配置 gzip 压缩
			config.plugins.push(
				...[
					new CompressionWebpackPlugin({
						filename: '[path].gz[query]',
						algorithm: 'gzip',
						test: /\.(js|css|html|svg)$/i,
						threshold: 2048,
						minRatio: 0.8
					})
				]
			)
		} else {
			//开发环境配置...
		}
	},
	devServer: {
		proxy: {
			'/api': {
				target: process.env.VUE_APP_BASE_API, //请求后台的地址
				ws: true,
				pathRewrite: {
					'^/api': ''
				}
			}
		},
		compress: true,
		overlay: {
			warnings: false,
			errors: true
		}
	}
}
