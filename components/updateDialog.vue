<template>
	<view>
		<u-modal :show="showModal" :showCancelButton="true" title="发现新版本!" confirmText="更新" cancelText="取消"
			@confirm="confirmUpdate" @cancel="closeModal" :asyncClose="true">
			<view class="slot-content">
				<rich-text :nodes="appUpdateInfo?appUpdateInfo.description:defaultText"></rich-text>
			</view>
		</u-modal>
		<u-notify ref="uNotify"></u-notify>
	</view>
</template>

<script>
	export default {
		name: "updateDialog",
		props: {
			showModal: {
				type: Boolean,
				default: false,
			}
		},
		data() {
			return {
				defaultText: '<p>发现了新版本!</p><p>需要更新吗</p>'
			};
		},
		computed: {
			appUpdateInfo() {
				return this.$store.state.appUpdateInfo
			}
		},
		methods: {
			closeModal() {
				if (this.isUpdate) {
					this.$refs.uNotify.show({
						top: 10,
						type: 'warning',
						message: '正在更新中',
						duration: 1000,
						safeAreaInsetTop: true
					})
					return false;
				}
				this.$emit('update:showModal', false)
			},
			confirmUpdate() {
				//更新操作
				this.isUpdate = true;
				setTimeout(() => {
					this.isUpdate = false;
					this.closeModal()
				}, 3000)
			}
		}

	}
</script>

<style lang="scss" scoped>

</style>
