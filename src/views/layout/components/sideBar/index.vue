<template>
	<div class="sideBar" id="domSideBar">
		<el-scrollbar>
			<el-menu
				:default-active="activeMenu"
				class="el-menu-vertical-demo"
				mode="vertical"
				:collapse-transition="false"
				:collapse="opened"
			>
				<sidebar-item
					v-for="item in routes"
					:key="item.path"
					:item="item"
					:basePath="item.path"
				></sidebar-item>
			</el-menu>
		</el-scrollbar>
	</div>
</template>

<script>
import SidebarItem from './SideBarItem'
import { mapGetters } from 'vuex'
export default {
	components: { SidebarItem },
	computed: {
		...mapGetters(['routes', 'opened']),
		// booleanOpen() {
		//   return this.opened === 'true' ? true : false
		// },
		activeMenu() {
			return this.$route.path
		}
	}
}
</script>
