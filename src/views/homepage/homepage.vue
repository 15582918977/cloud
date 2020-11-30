<template>
  <div id="app" :style="{ height: screenHeight + 'px' , width:screenWidth+'px'}">
    <el-container>

      
      <el-header>
          <fileheader class="fileheader"></fileheader>
      </el-header>


      <el-container :style="{ height: screenHeight-60 + 'px' }">
        <el-aside width="200px" >
           <main-tab-bar></main-tab-bar> 
        </el-aside>
        <el-main >

            <slot name="list-content" class="content"></slot>

        </el-main>
      </el-container>

      
    </el-container>
    
   

    
  </div>
</template>


<script>
import fileheader from "@/components/common/fileheader";
import MainTabBar from '@/components/common/mainTabBar/mainTabBar'
export default {
  name:'homepages',
  data(){
      return{
          screenHeight: document.documentElement.clientHeight,
          screenWidth:document.documentElement.clientWidth
      }
  },
  mounted () {
  const that = this
  window.onresize = () => {
    return (() => {
       window.screenHeight = document.documentElement.clientHeight;
       window.screenWidth = document.documentElement.clientWidth;
       that.screenWidth = window.screenWidth;
       that.screenHeight = window.screenHeight;
    })()
  }
},
watch: {
      screenHeight (val) {
        // 为了避免频繁触发resize函数导致页面卡顿，使用定时器
        if (!this.timer) {
          // 一旦监听到的screenWidth值改变，就将其重新赋给data里的screenWidth
          this.screenHeight = val
          this.timer = true
          let that = this
          setTimeout(function () {
            // 打印screenWidth变化的值
            console.log(that.screenHeight)
            that.timer = false
          }, 400)
        }
      },
      screenWidth (val){
        if(!this.timer){
          this.screenWidth = val;
          this.timer = true;
          setTimeout(()=>{
            this.timer = false
          },400)
        }
      }
    },
  components:{
    MainTabBar,
    fileheader
  }
}
</script>


<style scoped>

#app{
  background:url('../../assets/imgs/bg.jpg') no-repeat;
  background-size:100% 100%;  
  font-family: "Microsoft YaHei";
  color: white;
  padding: 0 30px 0 0;
  box-sizing: border-box;
}
.fileheader{
  z-index:10;
}
 .el-header, .el-footer {
    text-align: center;
    line-height: 60px;
    padding:0 !important;
  }
  
  body > .el-container {
    margin-bottom: 40px;
  }
 ::v-deep .tab-bar-wrap{
   
 }

.el-main {
  background-color: white;
  color: #333;
  padding:0 !important;
}
/* .content{
  padding: 10px;
} */
</style>
