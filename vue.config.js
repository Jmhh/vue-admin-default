const path = require('path')
const resolve = function(dir) {
	return path.join(__dirname, dir)
}

module.exports = {
	productionSourceMap: true, // 是否在构建生产包时生成sourcdeMap
	chainWebpack: config => {
		config.resolve.alias
			.set('@', resolve('src'))
			.set('views', resolve('src/views'))
		config.optimization.runtimeChunk('single')
	},
	devServer: {
		// proxy: {
		// 	'/api': {
		// 		target: process.env.VUE_APP_URL, //请求后台的地址
		// 		ws: true,
		// 		pathRewrite: {
		// 			'^/api': ''
		// 		}
		// 	}
		// }
		//contentBase: path.join(__dirname, 'mock'),
		// compress: true,
		// overlay: {
		// 	warnings: false,
		// 	errors: true
		// }
		//before: require('./mock')
	}
}
