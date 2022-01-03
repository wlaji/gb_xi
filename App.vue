<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
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
	page {
		background-color: $u-bg-color;
		color:$u-main-color;
		font-size:14px;
		font-family: '微软雅黑';
	}
</style>
