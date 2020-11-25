<template>
<div class="homepage">
  <fileheader class="fileheader"></fileheader>


  <img-content class="homecontent" :browserHeight="browserHeight"></img-content>


<!--  <el-upload-->
<!--      class="upload-demo"-->
<!--      action="http://localhost:8082/addFiles"-->
<!--      multiple-->
<!--      :limit="3">-->
<!--    <el-button size="small" type="primary">点击上传</el-button>-->
<!--    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>-->
<!--  </el-upload>-->

<!--  <el-button size="small" type="primary" @click="filedelete">删除</el-button>-->
<!--  <el-button size="small" type="primary" @click="filechange">修改</el-button>-->
<!--  <el-button size="small" type="primary" @click="filesearch">查找</el-button>-->
<!--  <el-button size="small" type="primary" @click="filedownload">下载</el-button>-->
<!--  <el-button size="small" type="primary" @click="filesearchall">查询</el-button>-->
</div>
</template>

<script>
import axios from "axios";

import fileheader from "@/components/common/fileheader";
import imgContent from "./homeComponents/imgContent";

export default {
  name: "homepage",
  components:{
    fileheader,
    imgContent
  },
  data() {

    return {
      browserHeight:document.documentElement.clientHeight,
      files:[],
      data:3,
      newname:"changefilename.jpg",
      name:'upload_d7240dbf74952cb44256b550686ec10a.txt',
    }
  },
  watch: {
    browserHeight: document.documentElement.clientHeight
  },
  mounted() {
    window.addEventListener('resize', this.getHeight);


    axios.get(`http://localhost:3001/homepage`)
        .then((response)=>{
          this.array = response.data.data
        })
        .catch(function (error) {
          console.log("error");
          console.log(error);
        });
  //获取文件数据
  //   axios.get('http://localhost:8082/getAllFiles')
  //       .then((response)=>{
  //         // let time = new Date();
  //         // time.toLocaleDateString()
  //         this.showall(response);
  //
  //         // console.log(response.data[0].fileName)
  //         // let datafile = response.data[2].fileContent.data;
  //         // console.log(` ${datafile.length/1024} 个字符, ` +
  //         //     `${Buffer.byteLength(datafile, 'utf8')} 个字节`)
  //       })
  },
  methods:{
    getHeight() {
      // 获取浏览器高度
      this.browserHeight = document.documentElement.clientHeight
    },


    filedownload(){
      axios.get(`http://localhost:3001/filedownload?name=${this.name}`)
          .then(function(response){
            open(response.config.url);
          })
          .catch(function(err){
            console.log(err)
          });
    },
    open(url){
      window.open(url);
    },
    filesearch(){
      axios.get(`http://localhost:3001/filesearch?name=${this.name}`)
          .then(function(response){
            console.log(response)
          })
          .catch(function(err){
            console.log(err)
          });
    },
    filechange(){
      axios.get(`http://localhost:3001/filechange?name=${this.name}&&newname=${this.newname}`)
            .then(function(response){
              console.log(response)
            })
            .catch(function(err){
              console.log(err)
            });
    },
    filedelete(){
      axios.get(`http://localhost:8082/filedelete?name=${this.name}`)
          .then(function (response) {
            console.log("response");  
            console.log(response);
          })
          .catch(function (error) {
            console.log("error");
            console.log(error);
          });
    }
  },
  created:{

  },

}
</script>

<style scoped>
.fileheader{
  z-index:10;
}
.homecontent{
  z-index:-2;
}
.filesrow{
  width: 100%;
  height: 30px;
  border-bottom: 1px solid #ccc;
}
.row{
  width: 100%;
  height: 100%;
  background: pink;
}

.el-header {
  background-color: #B3C0D1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
</style>