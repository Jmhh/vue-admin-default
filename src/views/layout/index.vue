<template>
	<div class="layout">
		<div class="content-left">
			<Navbar />
		</div>
		<div class="content-right">
			<Topbar />
			<div>
				<div class="top-breadcrumb">
					<div class="router-control">
						<div
							v-for="item in routeItems"
							:key="item.name"
							class="router-item"
						>
							<span @click="handleFatherRoute(item)">{{
								item.meta.title
							}}</span>
						</div>
					</div>
				</div>
			</div>
			<div v-loading="loading">
				<div v-if="routeLength > 2">
					<h3>3级路由</h3>
				</div>
				<transition name="fade-transform" mode="out-in">
					<keep-alive>
						<router-view :key="key" />
					</keep-alive>
				</transition>
			</div>
		</div>
	</div>
</template>

<script>
// @ is an alias to /src
import Navbar from '@/components/Navbar.vue'
import Topbar from '@/components/Topbar.vue'

export default {
	name: 'home',
	data() {
		return {
			screenWidth: document.body.clientWidth
		}
	},
	mounted() {
		const that = this
		window.onresize = () => {
			return (() => {
				window.screenWidth = document.body.clientWidth
				that.screenWidth = window.screenWidth
			})()
		}
	},
	watch: {
		$route: {
			handler(route) {
				let curName = route.matched[0].name
				const routes = [...this.addRoutes.filter(e => e.name === curName)]
				this.routeItems = routes[0].children
				console.log(this.routeItems)
			},
			immediate: true
		},
		screenWidth(val) {
			// 为了避免频繁触发resize函数导致页面卡顿，使用定时器
			if (!this.timer) {
				// 一旦监听到的screenWidth值改变，就将其重新赋给data里的screenWidth
				this.screenWidth = val
				this.timer = true
				let that = this
				setTimeout(function() {
					// 打印screenWidth变化的值
					if (that.screenWidth < 1120) {
						console.log(that.screenWidth)
						that.$store.dispatch('setSideBar')
					}
					that.timer = false
				}, 400)
			}
		}
	},
	components: {
		Navbar,
		Topbar
	},
	computed: {
		key() {
			return this.$route.path
		},
		loading() {
			return this.$store.getters.loading
		},
		addRoutes() {
			return this.$store.getters.addRoutes
		},
		routeLength() {
			return this.$route.matched.length
		}
	},
	methods: {
		handleFatherRoute(item) {
			//console.log(item.redirect);
			this.$router.push({ path: `${item.redirect}` })
		}
	}
}
</script>
<style lang="scss" scoped>
.layout {
	display: flex;
	min-height: 100vh;
	.content-left {
		background: #4d79f6;
		z-index: 999;
	}
	.content-right {
		flex: 1;
		padding: 60px 20px 20px 20px;
		background: #eaf0f7;
	}
	.top-breadcrumb {
		background: #fff;
		border-bottom: 1px solid #ddd;
	}
	.router-control {
		height: 100%;
		display: flex;
		align-items: center;
		.router-item {
			span {
				display: inline-block;
				line-height: 35px;
				margin: 0 10px;
				cursor: pointer;
			}
		}
	}
}
</style>
