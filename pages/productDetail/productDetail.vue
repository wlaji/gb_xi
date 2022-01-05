<template>
	<view class="container">
		<view class="carousel-section">
			<u-swiper :list="carouselList" keyName="url" :autoplay="false" indicator indicatorMode="dot" height="750rpx" radius="0"></u-swiper>
		</view>
		<view v-for="item in 1000">
			321321321
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				carouselList:[{
                    url: 'https://cdn.uviewui.com/uview/swiper/swiper2.png',
                    title: '身无彩凤双飞翼，心有灵犀一点通'
                },{
                    url: 'https://cdn.uviewui.com/uview/resources/video.mp4',
                    title: '昨夜星辰昨夜风，画楼西畔桂堂东',
                    poster: 'https://cdn.uviewui.com/uview/swiper/swiper1.png'
                },{
                    url: 'https://cdn.uviewui.com/uview/swiper/swiper3.png',
                    title: '谁念西风独自凉，萧萧黄叶闭疏窗，沉思往事立残阳'
                },],
			};
		},
		onLoad() {
			
		},
		methods: {

		},
	}
</script>

<style lang="scss" scoped>
.container{
	/* #ifdef APP-PLUS */
	padding-top:var(--status-bar-height);
	/* #endif */
}
</style>
