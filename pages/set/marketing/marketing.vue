<template>
	<view class="container">
		<view class="chartsWrap">
			<view style="padding:20rpx;display: flex;align-items: center;justify-content: space-between">
				<picker mode="date" :value="data1" fields="year" @change="bindDateChange">
					<view>
						<u-icon name="arrow-down" :label="data1+'年'" labelPos="left" size="14px" labelSize="14px" labelColor="#303133" color="#303133"></u-icon>
					</view>
				</picker>
				<view>
					返佣(元)
				</view>
			</view>
			<qiun-data-charts type="line" :chartData="chartData" />
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				data1:'2022',
				chartData: {
					categories: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
					series: [{
						name: "返佣",
						data: [18, 27, 21, 24, 6, 28, 18, 27, 21, 24, 6, 900]
					}]
				}
			};
		},
		methods: {
			bindDateChange(e){
				this.data1 = e.detail.value;
			}
		}
	}
</script>

<style lang="scss" scoped>
	.chartsWrap {
		height: 400rpx;
	}
</style>
