<script>
	import Vue from 'vue';
	import store from './store';
	import {getUserInfo} from '@/api/auth.js'
	import checkUpdateApp from '@/utils/appUpdate.js';
	export default {
		onLaunch: function(options) {
			let token = uni.getStorageSync('token') // 判断有没有token，有则说明登录过了，重新把缓存存进vuex
			if (token) {
				store.dispatch('updateUserInfo')
			}
			uni.getSystemInfo({
				success: function(e) {
					Vue.prototype.statusBar = e.statusBarHeight
					// #ifndef MP
					if (e.platform == 'android') {
						Vue.prototype.customBar = e.statusBarHeight + 48
					} else {
						Vue.prototype.customBar = e.statusBarHeight + 44
					}
					// #endif

					// #ifdef MP-WEIXIN
					let custom = wx.getMenuButtonBoundingClientRect()
					Vue.prototype.customBar = custom.top + custom.height + 8
					// #endif

					// #ifdef MP-ALIPAY
					Vue.prototype.customBar = e.statusBarHeight + e.titleBarHeight
					// #endif
				}
			})

			// #ifdef APP-PLUS
			plus.runtime.getProperty(plus.runtime.appid, (widgetInfo) => {
				store.commit('version', widgetInfo)
				checkUpdateApp();
			})
			// #endif
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import "uview-ui/index.scss";
	@import "./icon.scss";

	.input-content {
		/deep/ .u-line {
			margin: 0 !important;
		}
	}

	page {
		background-color: #f6f7fb;
		color: $u-main-color;
		font-size: 14px;
		font-family: 'Source Han Sans', 'Sans Francisco', '微软雅黑';
	}

	view,
	scroll-view,
	swiper,
	swiper-item,
	cover-view,
	cover-image,
	icon,
	text,
	rich-text,
	progress,
	button,
	checkbox,
	form,
	input,
	label,
	radio,
	slider,
	switch,
	textarea,
	navigator,
	audio,
	camera,
	image,
	video {
		box-sizing: border-box;
	}

	.u-nav-slot {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		border-radius: 100px;
		border: .5px solid #dadbde;
		padding: 3px 7px;
		opacity: .8;
	}

	/* #ifdef H5 */
	.u-navbar__content__title,
	.uni-page-head__title {
		font-size: 16px !important;
		color: #000000 !important;
		font-weight: 400 !important;
	}

	/* #endif */
	/* #ifdef MP */
	.u-navbar__content__title,
	.uni-page-head__title {
		font-size: 14px !important;
		color: #000000 !important;
		font-weight: 400 !important;
	}

	/* #endif */
	/* #ifdef APP-PLUS */
	.u-navbar__content__title {
		font-size: 16px !important;
		color: #000000 !important;
	}

	/* #endif */

	.no-result {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		min-height: 800rpx;
	}
</style>
