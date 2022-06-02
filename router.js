import {
	RouterMount,
	createRouter,
	runtimeQuit
} from 'uni-simple-router';
const router = createRouter({
	platform: process.env.VUE_APP_PLATFORM,
	routes: [...ROUTES],
	routerErrorEach: ({
		type,
		level,
		...args
	}) => {
		// #ifdef APP-PLUS
		if (type === 3) {
			router.$lockStatus = false;
			runtimeQuit();
		}
		// #endif
	},
});
const whiteList = ['login'];
//全局路由前置守卫
router.beforeEach((to, from, next) => {
	const isLogin = uni.getStorageSync('token') ;
	if (isLogin) {
		if (to.name === 'login') {
			next({
				name: 'home',
				NAVTYPE: 'pushTab'
			})
		}else{
			next()
		}
	} else {
		if (to.meta.loginAuth) {
			next({
				name: 'login',
				NAVTYPE: 'replaceAll'
			})
		} else {
			next()
		}
	}
});

export {
	router,
	RouterMount
}
