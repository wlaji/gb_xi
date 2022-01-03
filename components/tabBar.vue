<template>
	<u-tabbar
		:value="currentValue"
		@change="name => currentValue = name"
		:fixed="true"
		:placeholder="false"
		:safeAreaInsetBottom="true"
	>
		<u-tabbar-item v-for="(item,index) in list" :key="item.name" :text="item.text" :icon="item.icon" :name="item.name" @click="goPage(item.name)"></u-tabbar-item>
	</u-tabbar>
</template>

<script>
	export default {
		data() {
			return{
				currentValue:'home',
				list:[
					{
						text:'首页',
						icon:'home',
						name:'home'
					},
					{
						text:'分类',
						icon:'photo',
						name:'productCategory'
					},
					{
						text:'购物车',
						icon:'play-right',
						name:'cart'
					},
					{
						text:'我的',
						icon:'account',
						name:'my'
					},
				]
			}
		},
		methods:{
			goPage(name){
				this.$Router.push({ name: name})
			}
		}
	}
</script>

<style lang="scss" scoped>
</style>
