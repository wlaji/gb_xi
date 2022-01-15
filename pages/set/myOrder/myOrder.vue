<template>
	<view class="container">
		<view class="tab">
			<view class="tab-left">
				<view :class="[{ active: activeIndex===0 }, 'tab-item']" v-for="(item,index) in tabList" @click="changeTab(index)">{{item.text}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				activeIndex:0,
				tabList:[
					{
						text:'全部'
					},
					{
						text:'待付款'
					},
					{
						text:'待发货'
					},
					{
						text:'待收货'
					},
					{
						text:'待评价'
					}
				]
			};
		}
	}
</script>

<style lang="scss">

</style>
