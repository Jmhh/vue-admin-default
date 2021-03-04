<template>
	<div class="topbar">
		<div :class="[isCollapse ? 'topbar-custom isCollapse' : 'topbar-custom ']">
			<div class="topbar-left">
				<span class="collapse" @click="handleCollapse">
					<i class="iconfont icondaohang"></i>
				</span>
			</div>

			<div class="topbar-righ">
				<div class="badge">
					<el-badge is-dot class="item">
						<i class="iconfont iconicon_notice"></i>
					</el-badge>
				</div>
				<div class="info">
					<i class="iconfont iconbangzhu"></i>
				</div>
				<div class="user">
					<i class="iconfont iconyonghufangkeshu"></i>
					<div>
						<el-dropdown>
							<span>{{ userName ? userName : 'admin' }}</span>
							<span>
								<i class="iconfont iconxiajiantou"></i>
							</span>
							<el-dropdown-menu slot="dropdown">
								<el-dropdown-item>
									<i class="iconfont icongerenzhongxin"></i> 个人中心
								</el-dropdown-item>
								<el-dropdown-item>
									<i class="iconfont iconxinxizhongxin"></i> 我的信息
								</el-dropdown-item>
								<el-dropdown-item>
									<i class="iconfont iconsettings"></i> 个人设置
								</el-dropdown-item>
								<el-dropdown-item divided @click.native="handleLoginOut">
									<i class="iconfont icondengchu"></i>
									登出
								</el-dropdown-item>
							</el-dropdown-menu>
						</el-dropdown>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: '',
	props: [''],
	data() {
		return {
			routeItems: []
		}
	},

	components: {},

	computed: {
		isCollapse() {
			return this.$store.getters.isCollapse
		},
		userName() {
			return this.$store.getters.userName
		}
	},

	created() {},
	watch: {},
	methods: {
		handleCollapse() {
			this.$store.dispatch('toggleSideBar')
		},
		handleLoginOut() {
			this.$store.dispatch('setUserName')
			this.$store.commit('SET_USERTOKEN')
			this.$router.replace({
				path: '/login'
			})
			setTimeout(() => {
				this.$message({
					message: `退出登录成功`,
					type: 'warning'
				})
			}, 500)
		}
	}
}
</script>
<style lang="scss" scoped>
.topbar {
	left: 0;
	position: fixed;
	right: 0;
	top: 0;
	z-index: 99;
	.topbar-custom {
		display: flex;
		justify-content: space-between;
		padding-left: 160px;
		min-height: 50px;
		background: #fff;
	}
	span.collapse {
		cursor: pointer;
	}
	.topbar-custom.isCollapse {
		padding-left: 80px;
	}
	.topbar-left {
		line-height: 50px;
		i {
			font-size: 22px;
		}
	}
	.topbar-righ {
		display: flex;
		padding: 0 20px;
		line-height: 50px;
		font-size: 12px;
		i {
			font-size: 22px;
			margin-left: 20px;
			cursor: pointer;
		}
		.badge i {
			color: #b8bac3;
			font-size: 16px;
		}
		.user i.iconfont.iconyonghufangkeshu {
			color: #22b9ff;
		}
		.user i.iconfont.iconxiajiantou {
			margin-top: 2px;
			font-size: 12px;
			margin-left: 3px;
			color: #999;
		}
		.info i {
			color: #fbce44;
		}
		.user {
			display: flex;
			position: relative;
			span {
				margin-left: 5px;
				cursor: pointer;
				color: #b8bac3;
				font-size: 14px;
			}
			.userLisst {
				width: 120px;
				position: absolute;
				right: -10px;
				top: 55px;
				text-align: left;
				list-style: none;
				background-color: #fff;
				border: 1px solid rgba(0, 0, 0, 0.15);
				li {
					padding: 3px 5px;
					line-height: 35px;
					font-weight: 400;
					color: #a4abc5;
					cursor: pointer;
					&:hover {
						font-weight: 600;
					}
					&:nth-child(4) {
						border-top: 1px solid rgba(0, 0, 0, 0.15);
					}
					i {
						margin-right: 5px;
						font-size: 16px;
					}
				}
			}
		}
	}
}
</style>
