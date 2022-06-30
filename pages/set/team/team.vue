<template>
	<view class="container">
		<template v-if="team.children.length">
			<view class="teamWrap" v-for="(item,index) in team.children" :key="index">
				<view class="team-item">
					<view class="left">
						<Avatar :src="item.headImg" size="50"></Avatar>
						<view style="margin-left: 20rpx;">
							<view class="name">{{item.nickName||item.userName}}</view>
							<view class="date">
								<u-text mode="date" :text="item.fuStarDate" color="#666" size="12"></u-text>
							</view>
						</view>
					</view>
					<view class="right">
						<template v-if="item.isFuStar">
							<u-text text="福星" size="14" color="#fdb44d"></u-text>
						</template>
						<template v-if="item.isJoin">
							<u-text text="合伙人" size="14" color="#fdb44d"></u-text>
						</template>
					</view>
				</view>
				<view class="team-item-children" v-if="item.children.length">
					<view class="team-item" v-for="(citem,cindex) in item.children" :key="cindex">
						<view class="left">
							<Avatar :src="citem.headImg" size="50"></Avatar>
							<view style="margin-left: 20rpx;">
								<view class="name">{{citem.nickName}}</view>
								<view class="date">
									<u-text mode="date" :text="citem.fuStarDate" color="#666" size="12"></u-text>
								</view>
							</view>
						</view>
						<view class="right">
							<template v-if="citem.isFuStar">
								<u-text text="福星" size="14" color="#fdb44d"></u-text>
							</template>
							<template v-if="citem.isJoin">
								<u-text text="合伙人" size="14" color="#fdb44d"></u-text>
							</template>
						</view>
					</view>
				</view>
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
		getMyTeam
	} from '@/api/public.js'
	export default {
		data() {
			return {
				team:{
					children:[]
				}
			};
		},
		components: {
			Avatar
		},
		methods: {

		},
		onLoad() {
			getMyTeam().then(res => {
				this.team = res.data;
			})
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		position: relative;
	}

	.teamWrap {
		padding-top: 20rpx;

		.team-item {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 10rpx;
			background-color: #fff;

			.left {
				display: flex;
				align-items: center;

				.name {
					margin-bottom: 10rpx;
				}
			}
			.right{
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
			}
		}
	}

	.team-item-children {
		.team-item {
			padding-left: 50rpx;
		}
	}
</style>
