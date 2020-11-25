<template>
	<tab-bar>
		<tab-bar-item path="/main">
			<template #item-text>
				<div>主页</div>
			</template>
		</tab-bar-item>
		<tab-bar-item path="/text">
			<template #item-text>
				<div>文档</div>
			</template>
		</tab-bar-item>
		<tab-bar-item path="/picture">
			<template #item-text>
				<div>图片</div>
			</template>
		</tab-bar-item>
		
	</tab-bar>
</template>

<script>
	import TabBar from '@/common/tabbar/TabBar'
	import TabBarItem from "@/common/tabbar/TabBarItem.vue"
	export default {
		name: 'MainTabBar',
		components: {
			TabBar,
			TabBarItem
		}
	}
</script>

<style>
</style>
