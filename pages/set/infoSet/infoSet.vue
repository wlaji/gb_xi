<template>
	<view class="container">
		<view class="top">
			<Avatar :src="form.headImg"></Avatar>
			<text class="changeAvatar" @click="uploadAvatar">更改头像</text>
		</view>
		<view class="content">
			<u-form labelPosition="left" :model="form" ref="form" labelWidth="70px" errorType="toast">
				<u-form-item label="昵称" prop="nickName" borderBottom>
					<u-input type="text" placeholder="填写您的昵称" v-model="form.nickName" border="none"></u-input>
				</u-form-item>
			</u-form>
			<view class="add-address-btn">
				<u-button type="primary" text="保存" @click="save"></u-button>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		ossUtils
	} from "@/utils/oss";
	import {
		editMember
	} from '@/api/auth.js';
	import Avatar from '@/components/Avatar.vue'
	export default {
		data() {
			return {
				show: false,
				form: {
					nickName: '',
					headImg: ''
				},
				rules: {
					'nickName': [{
						required: true,
						message: '请输入昵称',
						trigger: ['blur'],
					}]
				},
			};
		},
		components: {
			Avatar
		},
		methods: {
			uploadAvatar() {
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album', 'camera'], //从相册选择、摄像头
					success: (res) => {
						uni.showLoading({
							title: '上传中...'
						});
						ossUtils.uploadFile(res).then(url => {
							this.form.headImg = url;
						}).finally(() => {
							uni.hideLoading()
						})
					}
				});
			},
			save() {
				this.$refs.form.validate().then(() => {
					editMember(this.form).then(res => {
						this.$store.commit('updateUserInfo', res.data);
						uni.$u.toast('修改成功');
						uni.navigateBack()
					})
				}).catch(err => {
					console.log(err)
				})
			}
		},
		onLoad() {
			let userInfo = uni.getStorageSync('userInfo')
			this.form.nickName = userInfo.nickName;
			this.form.headImg = userInfo.headImg
		},
		onReady() {
			this.$refs.form.setRules(this.rules);
		},
	}
</script>

<style lang="scss" scoped>
	.container {
		background-color: #fff;
		padding: 20rpx;

		/deep/ .u-line {
			margin: 0 !important;
		}

		.top {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			height: 300rpx;

			.changeAvatar {
				margin-top: 20rpx;
			}
		}
	}

	.add-address-btn {
		display: flex;
		align-items: center;
		padding: 20rpx 0;
		margin-top: 20rpx;
	}
</style>
