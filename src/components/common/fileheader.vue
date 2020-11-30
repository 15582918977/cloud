<template>
  <div class="file-header">
    <div class="file-header-left">
      <h1>鲸鱼网盘</h1>
    </div>

    <div class="file-header-center"></div>

    <div class="file-header-right">
      <div class="file-username">
<!--        <div class="portrait"></div>-->
<el-avatar ></el-avatar>
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
  height: 100%;
  width: 100%;
  padding:0 0 0 1.25rem ;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  border-bottom: 3px solid black;
  
}
.el-avatar{
  background: url(../../assets/imgs/person.jpg);
  background-size: 100%,100%;
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