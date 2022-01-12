<script>
	import Vue from 'vue';
	export default {
		onLaunch: function(options) {
			uni.getSystemInfo({
				success: function(e) {
					Vue.prototype.statusBar = e.statusBarHeight
					// #ifndef MP
					if (e.platform == 'android') {
						Vue.prototype.customBar = e.statusBarHeight + 44
					} else {
						Vue.prototype.customBar = e.statusBarHeight + 48
					}
					// #endif

					// #ifdef MP-WEIXIN
					let custom = wx.getMenuButtonBoundingClientRect()
					console.log(custom)
					Vue.prototype.customBar = custom.bottom + custom.top - e.statusBarHeight
					// #endif

					// #ifdef MP-ALIPAY
					Vue.prototype.customBar = e.statusBarHeight + e.titleBarHeight
					// #endif
				}
			})
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

	page {
		background-color: $u-bg-color;
		color: $u-main-color;
		font-size: 14px;
		font-family: '微软雅黑';
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
</style>
