<template>
	<view class="container">
		<view class="search-bar">
			<u-search placeholder="请输入搜索关键字" :focus="true" v-model="searchText" shape="round" margin="10px"
				bgColor="#ffffff" :showAction="true" actionText="搜索" @search="toSearch" @custom="toSearch"></u-search>
		</view>
		<view class="content">
			<view class="history" v-if="searchHistoryList.length">
				<view class="title">
					<text>历史记录</text>
					<u-icon name="trash" size="20px" @click="showDelModal = true"></u-icon>
				</view>
				<view class="con">
					<text class="his-item" v-for="(item,index) in searchHistoryList" :key="index" @click="toSearch2(item)">
						{{item}}
					</text>
				</view>
			</view>
		</view>
		<view>
			<u-toast ref="uToast"></u-toast>
			<u-modal :show="showDelModal" :showCancelButton="true" closeOnClickOverlay content='确认删除全部历史记录?'
				confirmText="确定" cancelText="取消" @confirm="confirmDel" @cancel="showDelModal = false;" @close="showDelModal=false"></u-modal>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				showDelModal:false,
				searchText: '',
				searchHistoryList: [

				]
			};
		},
		methods: {
			toSearch() {
				console.log(this.searchText)
				if (this.searchText == '') {
					this.$refs.uToast.show({message:'搜索的内容不能为空'})
				} else {
					if (!this.searchHistoryList.includes(this.searchText)) {
						this.searchHistoryList.unshift(this.searchText);
						uni.setStorageSync('searchList', JSON.stringify(this.searchHistoryList))
					} else {
						//有搜索记录，删除之前的旧记录，将新搜索值重新push到数组首位
						let i = this.searchHistoryList.indexOf(this.searchText);
						this.searchHistoryList.splice(i, 1);
						this.searchHistoryList.unshift(this.searchText);
						uni.setStorageSync('searchList', JSON.stringify(this.searchHistoryList))
					}
					uni.navigateTo({
						url:'/pages/searchResult/searchResult?keyword='+ this.searchText
					})
					this.searchText = ''
				}
			},
			toSearch2(item){
				uni.navigateTo({
					url:'/pages/searchResult/searchResult?keyword='+ item
				})
			},
			confirmDel(){
				uni.removeStorageSync('searchList');
				this.searchHistoryList = [];
				this.showDelModal = false;
			}
		},
		onLoad() {
			let list = uni.getStorageSync('searchList');
			if (list) {
				this.searchHistoryList = JSON.parse(list);
			}
		}
	}
</script>

<style lang="scss" scoped>
	/* #ifdef H5 */
	page {
		height: 100%;
	}

	.container {
		height: 100%
	}

	/* #endif */
	.container {
		display: flex;
		flex-direction: column;
		/* #ifndef H5 */
		height: 100vh;

		/* #endif */
		.content {
			overflow: auto;
			flex: 1;
			height: 0;
			padding:0 10px;
		}
		.history{
			.title{
				display: flex;
				justify-content: space-between;
				align-items: center;
				height:40px;
				font-weight: 700;
			}
			.con{
				display: flex;
				flex-wrap: wrap;
				.his-item{
					padding:10rpx;
					background-color:#E6E6E6;
					color: $u-content-color;
					white-space: nowrap;
					margin-right: 20rpx;
					margin-bottom: 20rpx;
					border-radius: 20px;
					min-width: 80px;
					text-align: center;
				}
			}
		}
	}
</style>
