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
		console.log({
			type,
			level,
			...args
		})
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
		next()
	} else {
		if (to.meta.loginAuth) {
			next({
				name: 'login',
				NAVTYPE: 'push'
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
