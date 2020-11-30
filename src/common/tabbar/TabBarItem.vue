<template>
	<div class="tab-bar-item" @click="itemLink" :style="activeColor">
		<div><slot name="item-text"></slot></div>
	</div>
</template>

<script>
	export default {
		name: 'TabBarItem',
		props: {
			path: String,
			
		},
		data(){
			return {
				
				activeStyle:'#b2b8b98e'
			}
		},
		
		computed: {
			isActive(){
				
				return this.$route.path.indexOf(this.path) !== -1;
			},
			activeColor(){
				return this.isActive ? {background: this.activeStyle} : {}
			}
		},
		methods: {
			itemLink() {
				
				this.$router.push(this.path)
				
			}
		}
	}
</script>

<style  scoped>
	.tab-bar-item {
		width: 100%;
		height: 35px;
		padding-top: 10px;
		text-align: center;
		font-weight: bold;
		color: aliceblue;
		cursor: pointer;
	}
	.tab-bar-item:hover{
		background-color: #b2b8b98e
	}
	
	
	
</style>
