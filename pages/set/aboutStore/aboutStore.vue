<template>
	<view class="container">
		<view class="top">
			<u-avatar src="/static/image/logo.png" size="80px" shape="square"></u-avatar>
		</view>
		<u-cell-group :customStyle="{'backgroundColor':'#ffffff','marginBottom':'20rpx'}">
			<u-cell title="用户协议" isLink url="/pages/userAgreement/userAgreement"></u-cell>
			<u-cell title="隐私政策" isLink url="/pages/privacyPolicy/privacyPolicy"></u-cell>
			<u-cell title="检查更新" isLink @click="checkUpdate">
				<view style="display: flex;align-items: center;" slot="value">
					<text style="color:#909399;margin-right: 10rpx;">当前版本{{$store.state.versionInfo.version}}</text>
					<u-badge isDot v-if="$store.getters.hasNewVersion"></u-badge>
				</view>
			</u-cell>
		</u-cell-group>
		<updateDialog :showModal.sync="showModal"></updateDialog>
	</view>
</template>

<script>
	import updateDialog from '@/components/updateDialog.vue';
	export default {
		data() {
			return {
				showModal:false,
			};
		},
		components:{
			updateDialog
		},
		methods: {
			checkUpdate(){
				this.showModal = true;
			}
		},
		onLoad() {

		}
	}
</script>

<style lang="scss" scoped>
	.container {
		background-color: #fff;
		padding: 10rpx;

		.top {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			height: 300rpx;
		}
	}
</style>
