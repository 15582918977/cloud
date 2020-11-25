<template>
	<div class="tab-bar-item" @click="itemLink" :class="{acolor:isActive}">
		<div v-if="!isActive"><slot name="item-icon"></slot></div>
		<div v-else><slot name="item-icon-active"></slot></div>
		<div :style="activeColor"><slot name="item-text"></slot></div>
	</div>
</template>

<script>
	export default {
		name: 'TabBarItem',
		props: {
			path: String,
			activeStyle: {
				type: String,
				default: 'black'
			}
		},
		data(){
			return {}
		},
		computed: {
			isActive(){
				return this.$route.path.indexOf(this.path) !== -1;
			},
			activeColor(){
				return this.isActive ? {color: this.activeStyle} : {}
			}
		},
		methods: {
			itemLink() {
				
				this.$router.push(this.path)
				this.activeStyle = 'pink'
			}
		}
	}
</script>

<style  scoped>
	.tab-bar-item {
		width: 100%;
		height: 5%;
		padding-top: 10%;
		text-align: center;
		font-weight: bold;
		color: aliceblue;
	}
	.acolor{
		background: rgba(135, 207, 235, 0.712)
	}
	
</style>
