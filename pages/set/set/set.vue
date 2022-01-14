<template>
	<view>
		<u-cell-group :customStyle="{'backgroundColor':'#ffffff','marginBottom':'20rpx'}">
			<u-cell size="large" icon="https://cdn.uviewui.com/uview/album/1.jpg"
				:iconStyle="{'width':'80rpx','height':'80rpx','borderRadius':'50%','marginRight':'20rpx'}" title="小鱼人"
				label="编号:1527" isLink url="/pages/set/infoSet/infoSet"></u-cell>
			<u-cell title="我的收货地址" isLink url="/pages/set/addressManage/addressManage"></u-cell>
		</u-cell-group>
		<u-cell-group :customStyle="{'backgroundColor':'#ffffff','marginBottom':'20rpx'}">
			<u-cell title="账户安全" isLink url="/pages/set/accountSecurity/accountSecurity"></u-cell>
			<u-cell title="支付设置" isLink url="/pages/set/paymentSetting/paymentSetting"></u-cell>
			<u-cell title="身份认证" isLink url="/pages/set/identityAuthentication /identityAuthentication "></u-cell>
			<!-- #ifdef APP-PLUS -->
			<u-cell title="消息推送">
				<view slot="value">
					<u-switch v-model="msgPushStatus" @change="changeMsgPushStatus"></u-switch>
				</view>
			</u-cell>
			<u-cell title="检查更新" isLink>
				<view style="display: flex;align-items: center;" slot="value">
					<text style="color:#909399;margin-right: 10rpx;">当前版本{{$store.state.currentVersionCode}}</text>
					<u-badge isDot v-if="$store.getters.hasNewVersion"></u-badge>
				</view>
			</u-cell>
			<!-- #endif -->
		</u-cell-group>
		
		<u-cell-group :customStyle="{'backgroundColor':'#ffffff','marginBottom':'20rpx'}">
			<u-cell title="关于国本商城" isLink url="/pages/set/aboutStore/aboutStore"></u-cell>
		</u-cell-group>

		<u-cell-group :customStyle="{'backgroundColor':'#ffffff','marginBottom':'20rpx'}">
			<u-cell title="我要加盟" isLink url="/pages/set/joinUs/joinUs"></u-cell>
		</u-cell-group>

		<view class="part">
			<u-button type="default" text="退出登录" @click="showModal1 = true"></u-button>
		</view>

		<u-modal :show="showModal1" :showCancelButton="true" closeOnClickOverlay content='确定要退出登陆吗?' @confirm="toLogOut"
			@cancel="showModal1 = false;" @close="showModal1=false"></u-modal>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				msgPushStatus: true,
				showModal1: false,
			};
		},
		methods: {
			toLogOut() {
				this.showModal1 = false;
				this.$store.commit('logout');
				uni.switchTab({
					url: '/pages/index/index'
				});
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
