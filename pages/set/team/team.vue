<template>
	<view class="container">
		<template v-if="team.length">
			<view class="content" style="padding:0;">
				<view class="small-title">
					<text style="width: 30%;text-align: center;">电话</text>
					<text style="width: 30%;text-align: center;">注册时间</text>
					<text style="width: 30%;text-align: center;">会员级别</text>
				</view>
				<div class="jf-wrap">
					<view class="jf-item" v-for="item in team" :key="item.id">
						<view style="width: 30%;text-align: center;">
							{{item.mobile}}
						</view>
						<view style="width: 30%;text-align: center;">
							<u-text style="display: inline-block;" mode="date" :text="item.jointime" block size="12"></u-text>
						</view>
						<text style="width: 30%;text-align: center;">{{partnerLevel[item.partner_level]}}</text>
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
		myTeam
	} from '@/api/newApi.js'
	export default {
		data() {
			return {
				team: [{
					"mobile": "15526471745",
					"jointime": 1655863428,
					"partner_level": 1
				}],
				partnerLevel: {
					0: '游客',
					1: '普通会员',
					2: '合伙人'
				}
			};
		},
		components: {
			Avatar
		},
		methods: {

		},
		onLoad() {
			myTeam({
				page: 1,
				size: 100000
			}).then(res => {
				// this.team = res.data[0].data;
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
