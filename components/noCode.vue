<template>
	<view>
		<u-modal :show="showModal2" title="收不到验证码?" closeOnClickOverlay confirmText="知道了" @confirm="showModal2=false"
			@close="showModa2=false">
			<view class="modal2Con" slot="default">
				<view>1.请检查是否输入正确的手机号码</view>
				<view>2.请检查手机是否停机</view>
				<view>3.请使用其他账号登录</view>
				<view>4.请联系官方客服</view>
			</view>
		</u-modal>
		<text class="t2" @click="showModal2=true">收不到验证码?</text>
	</view>
</template>

<script>
	export default {
		name: "noCode",
		data() {
			return {
				showModal2: false,
			};
		},
	}
</script>

<style lang="scss" scoped>
	.t2 {
		color: $u-tips-color;
	}
</style>
