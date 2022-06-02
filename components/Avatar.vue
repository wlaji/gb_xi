<template>
	<view>
		<template v-if="src">
			<u-avatar :src="src" :size="size" random-bg-color></u-avatar>
		</template>
		<template v-else>
			<u-avatar :size="size" random-bg-color text="用户" fontSize="14"></u-avatar>
		</template>
	</view>
</template>

<script>
	export default {
		name:"Avatar",
		props:{
			size:{
				type:[String,Number],
				default:80
			},
			src:{
				type:[Object,String]
			}
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">

</style>
