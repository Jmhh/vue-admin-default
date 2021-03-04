const getters = {
	loading: state => state.app.loading,
	isCollapse: state => state.app.isCollapse,
	userName: state => state.app.userName,
	routes: state => state.app.routes,
	addRoutes: state => state.app.addRoutes
}

export default getters
