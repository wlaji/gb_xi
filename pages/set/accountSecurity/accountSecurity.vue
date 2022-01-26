<template>
	<view>
		<u-cell-group :customStyle="{'backgroundColor':'#ffffff','marginBottom':'20rpx'}">
			<u-cell title="实名认证" isLink value="未认证" url="/pages/set/realNameAuthentication/realNameAuthentication">
			</u-cell>
			<u-cell title="绑定手机" :label="phone" value="更换号码" isLink url="/pages/set/phoneNumberVerification/phoneNumberVerification"></u-cell>
			<u-cell title="设置登录密码" isLink url="/pages/set/setPwd/setPwd"></u-cell>
		</u-cell-group>
		<view class="title">
			社交账号绑定
		</view>
		<u-cell-group :customStyle="{'backgroundColor':'#ffffff','marginBottom':'20rpx'}">
			<u-cell title="微信" icon="weixin-fill">
				<u-button slot="value" type="primary" size="mini" text="绑定" :customStyle="{'width':'auto'}"
					@click="showModal = true"></u-button>
				<u-button slot="value" type="info" size="mini" text="解绑" :customStyle="{'width':'auto'}"
					@click="showModal2 = true"></u-button>
			</u-cell>
		</u-cell-group>
		<u-cell-group :customStyle="{'backgroundColor':'#ffffff','marginBottom':'20rpx'}">
			<u-cell title="账号注销" isLink url="/pages/set/closeAccount/closeAccount"></u-cell>
		</u-cell-group>
		<u-modal :show="showModal" :showCancelButton="true" closeOnClickOverlay content='确定绑定?' @confirm="bindWeiXin"
			@cancel="showModal = false;" @close="showModal=false"></u-modal>
		<u-modal :show="showModal2" :showCancelButton="true" closeOnClickOverlay title="确定解绑该账号?"
			content='解绑微信账号后将无法继续使用它登录该账号,并且会影响提现' @confirm="jieBang" @cancel="showModal2 = false;"
			@close="showModal2=false"></u-modal>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				phone: '',
				showModal: false,
				showModal2: false,
			};
		},
		methods: {
			formatPhone(phone) {
				return phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
			},
			bindWeiXin() {
				this.showModal = false;
				uni.getProvider({
					service: 'oauth',
					success: res=> {
						if (res.provider.indexOf('weixin') > -1) {
							uni.login({
								provider: 'weixin',
								success: loginRes => {
									const openId = loginRes.authResult.openid,
										unionId = loginRes.authResult.unionId;
									
								},
								fail: (err) => {
									uni.$u.toast('获取微信授权失败');
								}
							});
						}
					}
				})
			},
			jieBang() {
				this.showModal2 = false;
				uni.$u.toast('解绑成功');
			}
		},
		onLoad() {
			this.phone = this.formatPhone('15773003996')
		}
	}
</script>

<style lang="scss" scoped>
	.title {
		font-size: 12px;
		color: $u-tips-color;
		padding: 0 0 20rpx 30rpx;
	}
</style>
