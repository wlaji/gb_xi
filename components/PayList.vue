<template>
	<u-cell-group>
		<u-cell :title="item.title" :icon="item.icon" :iconStyle="item.iconStyle" v-for="item in payList"
			:key="item.name">
			<view slot="value">
				<u-radio-group v-model="payMentMethod" iconPlacement="right">
					<u-radio :name="item.name" activeColor="red" @change="changeMethod"></u-radio>
				</u-radio-group>
			</view>
			<view slot="label" v-if="item.name==='Balance'">
				<text>(￥{{userInfo.funds}})</text>
			</view>
		</u-cell>
	</u-cell-group>
</template>

<script>
	export default {
		name: "PayList",
		data() {
			return {
				payList: [
					{
						name: 'WxPay',
						title: '微信支付',
						icon: 'weixin-circle-fill',
						iconStyle: {
							'color': '#19be6b',
							'font-size': '20px'
						}
					},
					{
						name: 'Balance',
						title: '余额支付',
						icon: 'rmb-circle',
						iconStyle: {
							'color': 'red',
							'font-size': '20px'
						}
					},
					// {
					// 	name: 'Mix',
					// 	title: '混合支付',
					// 	icon: 'rmb-circle',
					// 	iconStyle: {
					// 		'color': '#adbe5e',
					// 		'font-size': '20px'
					// 	}
					// },
				],
				payMentMethod: 'WxPay',
			};
		},
		computed: {
			userInfo() {
				return this.$store.state.userInfo || {}
			}
		},
		methods:{
			changeMethod(item){
				this.$emit('changeMethod',item)
			}
		}
	}
</script>

<style lang="scss">

</style>
