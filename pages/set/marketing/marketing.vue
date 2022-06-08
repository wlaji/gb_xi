<template>
	<view class="container">
		<u-datetime-picker :show="show" :maxDate="time" v-model="selectDate" closeOnClickOverlay mode="year-month" @close="show = false"
			@confirm="changeTime"></u-datetime-picker>
		<view class="topBar">
			<view @click="show = true" class="time">
				<text>{{showDate}}</text>
				<u-icon :name="!show?'arrow-down':'arrow-up'"></u-icon>
			</view>
			<view>
				返佣(元)
			</view>
		</view>
		<view class="content">
			<template v-if="marketData.length">
				<view class="team-item" v-for="(item,index) in marketData" :key="index">
					<view class="left">
						<Avatar :src="item.fromUser.headImg" size="50"></Avatar>
						<view style="margin-left: 20rpx;">
							<view class="name">{{item.fromUser.nickName}}</view>
							<view class="date">
								<text>{{$u.timeFormat(item.createTime, 'mm月dd日 hh时MM分')}}</text>
							</view>
						</view>
					</view>
					<view class="right">
						<u-text :text="item.rebatFunds" size="14" mode="price" bold color="#000"></u-text>
					</view>
				</view>
			</template>
			<template v-else>
				<view class="no-result">
					<u-empty mode="data"></u-empty>
				</view>
			</template>
		</view>
	</view>
</template>

<script>
	import Avatar from '@/components/Avatar.vue';
	import {
		getMyPerformance
	} from '@/api/public.js'
	export default {
		data() {
			return {
				show: false,
				selectDate: '',
				time:Number(new Date()),
				marketData: []
			};
		},
		components: {
			Avatar
		},
		computed: {
			showDate() {
				return this.$u.timeFormat(this.selectDate, 'yyyy年mm月')
			},
			postDate() {
				return this.$u.timeFormat(this.selectDate, 'yyyy-mm')
			}
		},
		methods: {
			bindDateChange(e) {
				this.data1 = e.detail.value;
			},
			changeTime() {
				this.show = false;
				this.$nextTick(()=>{
					getMyPerformance({
						createTimeStr:this.postDate
					}).then(res => {
						this.marketData = res.data;
					})
				})
			},
		},
		onLoad() {
			console.log(this.postDate)
			getMyPerformance({
				createTimeStr:this.postDate
			}).then(res => {
				this.marketData = res.data;
			})
		}
	}
</script>

<style lang="scss" scoped>
	@include container-100();

	.content {
		height: calc(100% - 40px);
		padding: 10rpx;
		background-color: #fff;
	}

	.topBar {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 40px;
		padding: 10rpx;

		.time {
			display: flex;
			justify-content: space-between;
			align-items: center;
		}
	}

	.chartsWrap {
		height: 400rpx;
	}
	
	.team-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 10rpx;
		padding-left: 30px;
		background-color: #fff;
	
		.left {
			display: flex;
			align-items: center;
	
			.name {
				margin-bottom: 10rpx;
			}
			
			.date{
				font-size: 12px;
				color:#666;
			}
		}
	}
</style>
