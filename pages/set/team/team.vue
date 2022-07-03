<template>
	<view class="container">
		<template v-if="team.length">
			<view class="content" style="padding:0;">
				<view class="small-title">
					<text style="width: 30%;text-align: center;">日期</text>
					<text style="width: 30%;text-align: center;">金额</text>
					<text style="width: 30%;text-align: center;">用途</text>
				</view>
				<div class="jf-wrap">
					<view class="jf-item" v-for="item in team" :key="item.id">
						<text style="width: 30%;text-align: center;">
							<u-text mode="date" :text="item.create_time" block size="12"></u-text>
						</text>
						<text style="width: 30%;text-align: center;">{{item.type===1?'+':'-'}}{{item.num}}</text>
						<text style="width: 30%;text-align: center;">{{item.name}}</text>
					</view>
				</div>
			</view>
		</template>
		<template v-else>
			<view class="no-result">
				<u-empty mode="data"></u-empty>
			</view>
		</template>
	</view>
</template>

<script>
	import Avatar from '@/components/Avatar.vue';
	import {
		myCpLog
	} from '@/api/newApi.js'
	export default {
		data() {
			return {
				team: []
			};
		},
		components: {
			Avatar
		},
		methods: {

		},
		onLoad() {
			myCpLog({
				page: 1,
				size: 100000
			}).then(res => {
				this.team = res.data[0].data;
			})
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		font-size: 12px;
	
		.title {
			font-size: 16px;
			margin-bottom: 40rpx;
		}
	}
	
	.small-title {
		display: flex;
		justify-content: space-between;
		color: $u-tips-color;
		padding: 20rpx;
	}
	
	.jf-wrap {
		overflow: auto;
		flex: 1;
	
		.jf-item {
			display: flex;
			justify-content: space-between;
			color: $u-content-color;
			padding: 10rpx 20rpx;
		}
	}
</style>
