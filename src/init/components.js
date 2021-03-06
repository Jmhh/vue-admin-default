// //自动注册全局组价
// export function autoLoadingGlobalComponent () {

// }
import Vue from 'vue'
import { upperFirst, camelCase } from 'lodash'
const requireComponent = require.context(
	// 其组件目录的相对路径
	'../components',
	// 是否查询其子目录
	true,
	// 匹配basic-开头的.vue文件
	/basic(-\w+)+\.vue$/
)
// 遍历获取到的文件名，依次进行全局注册
requireComponent.keys().forEach(fileName => {
	// 获取组件配置(实例)
	const componentConfig = requireComponent(fileName)
	// 获取组件的 PascalCase 命名(eg: MYHeader)
	const componentName = upperFirst(
		// 获取驼峰式命名
		camelCase(
			// 剥去文件名开头的 `./` 和结尾的扩展名 eg: ./base/basic-header.vue -> basicHeader
			fileName.replace(/^\.\/(.*\/)?(.*)\.\w+$/, '$2')
		)
	)
	// 全局注册组件
	Vue.component(
		componentName,
		// 如果这个组件选项是通过 `export default` 导出的，
		// 那么就会优先使用 `.default`，
		// 否则回退到使用模块的根。
		componentConfig.default || componentConfig
	)
})
