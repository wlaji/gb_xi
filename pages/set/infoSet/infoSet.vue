<template>
	<view class="container">
		<view class="top">
			<u-avatar src="https://cdn.uviewui.com/uview/album/1.jpg" size="80px" @click="uploadAvatar"></u-avatar>
			<text class="changeAvatar" @click="uploadAvatar">更改头像</text>
		</view>
		<view class="content">
			<u-form labelPosition="left" :model="form" ref="form" labelWidth="70px" errorType="toast">
				<u-form-item label="昵称" prop="nickname" borderBottom>
					<u-input type="text" placeholder="填写您的昵称" v-model="form.nickname" border="none"></u-input>
				</u-form-item>
				<u-form-item label="性别" prop="sex" borderBottom @click="showAction">
					<u-input type="text" placeholder="选择性别" v-model="form.sex" border="none" disabled
						disabledColor="#ffffff">
						<template slot="suffix">
							<u-icon name="arrow-right"></u-icon>
						</template>
					</u-input>
				</u-form-item>
			</u-form>
			<view class="add-address-btn">
				<u-button type="primary" text="保存" color="#fa436a" @click="save"></u-button>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		ossUtils
	} from "@/utils/oss";
	export default {
		data() {
			return {
				show:false,
				form: {
					nickname: '小鱼人',
					sex: '女'
				},
				sexList:[
					[
						{
							label:'男',
							id:0
						},{
							label:'女',
							id:1
						}
					]
				]
			};
		},
		methods:{
			showAction(){
				let that = this;
				uni.showActionSheet({
				    itemList: ['男', '女'],
				    success: function (res) {
						console.log(res)
						if(res.tapIndex === 0){
							that.form.sex = '男'
						}else if(res.tapIndex === 1){
							that.form.sex = '女'
						}
				    },
				    fail: function (res) {
				        console.log(res.errMsg);
				    }
				});
			},
			uploadAvatar(){
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album', 'camera'], //从相册选择、摄像头
					success: (res) => {
						uni.showLoading({
							title: '上传中...'
						});
						ossUtils.uploadFile(res).then(url => {
							this.$emit('addImg', url);
						}).catch(err => {
							console.log(err)
						}).finally(() => {
							uni.hideLoading()
						})
					}
				});
			},
			save(){
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		background-color: #fff;
		padding: 10rpx;
		.top{
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			height:300rpx;
			.changeAvatar{
				margin-top:20rpx;
				color:$price-color;
			}
		}
	}

	.add-address-btn {
		display: flex;
		align-items: center;
		padding: 20rpx;
		margin-top: 20rpx;
	}
</style>
