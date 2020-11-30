<template>
  <div class="pop">
      <div class="pop-header">
          <i class="el-icon-close" @click="close"></i>
          <h5>{{name}}</h5>
      </div>
      <div class="pop-content">
          <pre class="content">
              {{info}}
          </pre>
      </div>
  </div>
</template>

<script>
export default {
    name:'popfile',
    

    mounted(){
        this.$bus.$on('fileTxt',(txt,name)=>{
            this.info = txt;
            this.name = name;
        })
    },
    data(){
        return{
            info:'',
            name:""
        }
    },
    methods:{
        close(){
            this.$emit("close")
        }
    }
}
</script>

<style scoped>
.pop{
    position: fixed;
    width:70%;
    height:70%;
    top: 50%;
    left:50%;
    transform: translate(-50%,-50%);
    background: white;
    overflow: hidden;
    border: 1px solid black;
}

.pop-header{
    width: 100%;
    height: 30px;
    line-height: 30px;
    padding: 10px 0px;
    border-bottom: 1px solid black;
}
[class*=" el-icon-"], [class^=el-icon-]{
    line-height: normal;
}
.pop-header h5{
    margin-left: 10px;
}
.el-icon-close{
    line-height: 30px;
    margin-right: 10px;
    float: right;
    display: block;
    text-align: center;
    width: 30px;
    height: 30px;
}
.pop-content{
    width: 100%;
    height: 100%;
    padding: 10px;
    box-sizing: border-box;
}
</style>