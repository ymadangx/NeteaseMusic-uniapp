<template>
	<!-- 我的页面 -->
	<view class="content flex-center harf-px">
		<scroll-view class="grace-scroll-x" scroll-x="true">
			<view class="item flex-center" v-for="(item, index) in items" :key="index">
				<view class="item-icon flex-center"><i class="iconfont" :class="item.icon"></i></view>
				<view class="text font26  flex-center">{{ item.name }}</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			items: [
				{ name: '私藏推荐', icon: 'icon-ziyuan' },
				{ name: '私人FM', icon: 'icon-ziyuan' },
				{ name: '最嗨电音', icon: 'icon-ziyuan' },
				{ name: '古典专区', icon: 'icon-ziyuan' }
			]
		};
	}
};
</script>

<style scoped>
.content {
	height: 180rpx;
}
.grace-scroll-x {
	white-space: nowrap;
}
.item {
	display: inline-block;
	width: 22%;
}

.item .item-icon {
	margin: 0 auto;
	width: 70rpx;
	height: 70rpx;
	border-radius: 50%;
	margin-bottom: 10rpx;
	background: red;
}

.item-icon .iconfont {
	color: #ffffff;
}

.item .text {
	color: #a4a4a4;
}
</style>
