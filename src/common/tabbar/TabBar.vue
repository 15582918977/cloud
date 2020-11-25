<template>
	<div class="tab-bar-wrap">
		<slot></slot>
	</div>
</template>

<script>
	export default {
		name: 'TabBar'
	}
</script>

<style  scoped>
	.tab-bar-wrap {
		width: 100%;
		font-size: 14px;
		height: 100%;
		position: relative;
		top:0;
		bottom: 0;
		left: 0;
		right: 0;
		background-color: inherit;
		box-shadow: 2px 2px 10px  #ececec;
	}
</style>
