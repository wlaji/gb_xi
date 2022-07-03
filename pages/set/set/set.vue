<template>
	<view>
		<u-cell-group :customStyle="{'backgroundColor':'#ffffff','marginBottom':'20rpx'}">
			<u-cell size="large"
				:iconStyle="{'width':'80rpx','height':'80rpx','borderRadius':'50%','marginRight':'20rpx'}"
				:title="userInfo.mobile" :label="userInfo.recommendCode">
				<view slot="icon">
					<Avatar :size="50" :src="userInfo.headImg"></Avatar>
				</view>
			</u-cell>
			<u-cell title="我的收货地址" isLink url="/pages/set/addressManage/addressManage"></u-cell>
		</u-cell-group>
		<u-cell-group :customStyle="{'backgroundColor':'#ffffff','marginBottom':'20rpx'}">
			<u-cell title="账户安全" isLink url="/pages/set/accountSecurity/accountSecurity"></u-cell>
			<!-- <u-cell title="支付设置" isLink url="/pages/set/paymentSetting/paymentSetting"></u-cell> -->
			<!-- <u-cell title="身份认证" isLink url="/pages/set/identityAuthentication /identityAuthentication "></u-cell> -->
		</u-cell-group>

		<u-cell-group :customStyle="{'backgroundColor':'#ffffff','marginBottom':'20rpx'}">
			<u-cell title="关于国本商城" isLink url="/pages/set/aboutStore/aboutStore"></u-cell>
		</u-cell-group>

		<view class="part">
			<u-button type="default" text="退出登录" @click="showModal1 = true"></u-button>
		</view>

		<u-modal :show="showModal1" :showCancelButton="true" closeOnClickOverlay content='确定要退出登陆吗?' @confirm="toLogOut"
			@cancel="showModal1 = false;" @close="showModal1=false"></u-modal>
	</view>
</template>

<script>
	import Avatar from '@/components/Avatar.vue'
	export default {
		data() {
			return {
				msgPushStatus: true,
				showModal1: false,
			};
		},
		computed: {
			userInfo() {
				return this.$store.state.userInfo || {}
			}
		},
		components: {
			Avatar
		},
		methods: {
			toLogOut() {
				this.showModal1 = false;
				this.$store.commit('logout');
				uni.reLaunch({
					url: '/pages/login/login'
				})
			},
			changeMsgPushStatus() {

			}
		}
	}
</script>

<style lang="scss" scoped>
	.part {
		overflow: hidden;
		background-color: #fff;
	}
</style>
