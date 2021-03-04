<template>
	<div class="nav">
		<div class="logo"></div>
		<el-row class="tac">
			<el-col :span="24">
				<el-menu
					:default-active="active"
					background-color="#4d79f6"
					class="el-menu-vertical-demo"
					:collapse="isCollapse"
				>
					<el-menu-item
						v-for="item in addRoutes"
						:key="item.name"
						:index="item.name"
						@click="handleGo(item.path)"
					>
						<i :class="'iconfont ' + item.icon"></i>
						<span>{{ item.meta.title }}</span>
					</el-menu-item>
				</el-menu>
			</el-col>
		</el-row>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
	name: '',
	props: [''],
	data() {
		return {
			active: ''
		}
	},

	computed: {
		...mapGetters(['addRoutes', 'isCollapse'])
	},

	components: {},

	//   created() {
	//     console.log(this.$route.path);
	//   },

	watch: {
		$route() {
			this.active = this.fliterActive(this.$route.path)
		}
	},
	methods: {
		handleGo(data) {
			this.$router.push({ path: `${data}` })
		},
		fliterActive(data) {
			const map = {
				'/index': '1',
				'/analysis': '2',
				'/exam': '3',
				'/class': '4'
			}
			return map[data]
		}
	}
}
</script>
<style lang="scss" scoped>
.logo {
	height: 50px;
	background: #fbce44;
}
</style>
