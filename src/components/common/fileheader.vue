<template>
  <div class="file-header">
    <div class="file-header-left">
      <h1>鲸鱼网盘</h1>
    </div>

    <div class="file-header-center"></div>

    <div class="file-header-right">
      <div class="file-username">
<!--        <div class="portrait"></div>-->
        <el-avatar :size="30" :src="circleUrl"></el-avatar>
        <span class="username">{{user}}</span>
      </div>
    </div>

  </div>
</template>

<script>

export default {
name: "fileheader",

  data () {
    return {
      circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      sizeList: ["large", "medium", "small"]
    }
  },
  computed:{
    user(){
      return this.$store.state.user
    }
  },
}
</script>

<style scoped>
.file-header{
  height: 3.125rem;
  width: 100%;
  box-shadow: 0 5px 5px 2px #ccc;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  padding:0 1.25rem;
}
.file-header-right{

}
.file-username{
  display: flex;
  align-items: center;
}

.username{
  font-size: 1rem;
  margin-left: 1rem;
}

</style>