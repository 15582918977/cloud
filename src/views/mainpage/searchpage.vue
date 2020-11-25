<template>
  <div class="">
    <homepages>
      <template #list-content>
        <div class="content-options">
          <el-upload
            enctype="multipart/form-data"
            class="upload-demo"
            action="http://localhost:8083/addFile"
            :data="data"
            :before-upload="getfileData"
            :on-success="showFile"
            multiple
          >
            <!-- @click.native="getfileData()" -->
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>

          
          <el-button size="small" type="primary" @click="filesearch"  class="search"
                      >查找</el-button
                    >
          <el-input
            v-model="filesinput"
            class="files-input"
            placeholder="请输入内容"
          ></el-input>
          
        </div>
<div class="main-content">
      <el-breadcrumb separator-class="el-icon-arrow-right" class="directory">
                <el-breadcrumb-item :to="{ path: '/main' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item @click.native="backPath">返回上一级</el-breadcrumb-item>
                <el-breadcrumb-item>搜索{{content}}</el-breadcrumb-item>
        </el-breadcrumb>

        <div class="content-list">
          <div class="content-list-file">
            <div class="file-check"></div>
            <div class="file-icon"></div>
            <div class="file-name">filename</div>
            <div class="file-size">filesize</div>
            <div class="file-date">filedate</div>
          </div>

          
          <!-- 文件夹展示 -->
          <div
            class="content-list-file"
            v-for="item of pageFload"
            :key="item.floadId"
          >
            <div class="file-check"></div>
            <div class="file-icon"></div>
            <div class="file-name">
              {{ item.floadName }}
              <div class="file-name-input" v-if="item.show">
                <el-input
                  class="create-fload"
                  v-model.lazy="floadInput"
                  placeholder="请输入内容"
                  :key="item.floadId"
                ></el-input>
                <i class="el-icon-check" @click="floadNameCor(item)"></i>
                <i class="el-icon-close" @click="floadNameErr()"></i>
              </div>
            </div>

            <el-dropdown trigger="click">
              <span class="el-dropdown-link">
                ...<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item
                  icon="el-icon-close"
                  @click.native="floadDelete(item)"
                  >删除</el-dropdown-item
                >
                <el-dropdown-item
                  icon="el-icon-edit"
                  @click.native="floadRename(item)"
                  >重命名</el-dropdown-item
                >
              </el-dropdown-menu>
            </el-dropdown>

            <div class="file-size">"-"</div>
            <div class="file-date">{{ item.floadDate }}</div>
          </div>
          <!-- 文件夹展示完 -->

          <!-- 文件展示 -->
          <div
            class="content-list-file"
            v-for="item of pageFile"
            :key="item.fileId"
            @dblclick="lookFile(item)"
          >
            <div class="file-check">[]</div>
            <div class="file-icon">@@</div>
            <div class="file-name">
              <span style="width: 70%">{{ item.fileName }}</span>

              <div class="file-name-input" v-if="!item.fileName">
                <el-input
                  class="create-fload"
                  v-model.lazy="floadInput"
                  placeholder="请输入内容"
                  :key="item.fileId"
                ></el-input>
                <i class="el-icon-check" @click="fileNameCor(item)"></i>
                <i class="el-icon-close" @click="fileNameErr(item)"></i>
              </div>

              <el-dropdown trigger="click">
                <span class="el-dropdown-link">
                  ...<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item
                    icon="el-icon-close"
                    @click.native="fileDelete(item)"
                    >删除</el-dropdown-item
                  >
                  <el-dropdown-item
                    icon="el-icon-edit"
                    @click.native="fileRename(item)"
                    >重命名</el-dropdown-item
                  > <el-dropdown-item icon="el-icon-edit" @click.native="floadDownLoad(item)">下载</el-dropdown-item>
                </el-dropdown-menu>
                
                 
              </el-dropdown>
            </div>
            <div class="file-size">{{ item.fileSize }}</div>
            <div class="file-date">{{ item.fileDate }}</div>
          </div>
        </div>

        <div class="mask" v-show="fileclick"></div>
        <popfile v-show="fileclick" @close="close"></popfile>
        </div>
      </template>
    </homepages>
  </div>
</template>

<script>
import Popfile from './popfile.vue';
import axios from "axios";
import homepages from "@/views/homepage/homepage";
export default {
  name: "searchPage",
  components: {
    homepages,
    Popfile
  },
  props:{
    
  },
  data() {
    return {
      floadInput: "",
      pageFile: [],
      pageFload: [],
      data: {},
      filesinput:"",
      filesName:"",
      filTxt:"",
      popname:"",
      fileclick:false

    };
  },
  computed:{
    content(){
      return this.$route.query.filesName;
    }
    
  },
  mounted() {
   this.filesName= this.$route.query.filesName;


    axios.get(`http://152.136.111.227:8083/searchFiles?name=${this.filesName}`).then((res)=>{
        const data = res.data.data
        this.pageFile=data.files[0]
    })

    // axios.get(`http://localhost:8083/searchFiles?name=${this.filesinput}`).then((res) => {
    //   this.pageFile = res.data.data;
    // });
    // axios.get("http://localhost:8083/showFload").then((res) => {
    //   this.pageFload = res.data.data;
    // });
  },
  methods: {
    close(){
      this.fileclick = false
    },
    lookFile(item){
      this.fileclick = true;
      this.popname = item.fileName;
      axios.get(`http://152.136.111.227:8083/lookfile?fileName=${item.fileName}`).then((res)=>{
        this.fileTxt = res.data;
        this.$bus.$emit('fileTxt',this.fileTxt,this.popname)
      })
    },
    floadDownLoad(item){
      axios.get(`http://152.136.111.227:8083/fileDownLoad?fileName=${item.fileName}`).then(function(response){
            open(response.config.url);
          })
          .catch(function(err){
            console.log(err)
          });
    },
    backPath(){
      this.$router.go(-1);
    },

    filesearch(){
      this.$router.push({path:`/search/${this.filesinput}`})
      
      
    },

      
    //文件的删除
  fileDelete(item){
    let fileId = item.fileId;
      //文件夹在服务器删除
      axios.get(`http://152.136.111.227:8083/delFile?fileId=${fileId}`).then((res)=>{
        //文件夹在页面上删除
        if(res.data){
          this.pageFile.forEach((v,i)=>{
            if(v.fileId===fileId){
              this.pageFile.splice(i,1);
            }
          })
        }

      })
  },

    //文件重命名
  fileRename(item){
    this.floadInput = item.fileName;
    item.fileName="";

  },
  fileNameCor(item){
    item.fileName = this.floadInput;

    axios.get(`http://152.136.111.227:8083/reFile?fileId=${item.fileId}&&fileName=${this.floadInput}`).then((res)=>{
          console.log(res);
    })
  },

  fileNameErr(item){
    item.fileName = this.floadInput;
  },

    //文件夹重命名
    floadRename(item){
      item.floadName = "";
      item.show = true;
      item.rename = true;

      
    },

    //文件夹删除
    floadDelete(item){
      let floadId = item.floadId;
      //文件夹在服务器删除
      axios.get(`http://152.136.111.227:8083/delFload?floadId=${floadId}`).then((res)=>{
        //文件夹在页面上删除
        if(res.data){
          this.pageFload.forEach((v,i)=>{
            if(v.floadId===floadId){
              this.pageFload.splice(i,1);
            }
          })
        }

      })
      
    },

    //文件夹添加
    floadNameCor(item) {
      this.pageFload.forEach((v) => {
        if (v.floadName === this.floadInput) {
          alert("名字不能重复");
          return;
        }
      });
      if (this.floadInput === "") {
        alert("名字不能为空");
        return;
      }
      item.floadName = this.floadInput;

      item.show = false;
      this.floadInput = "";

      if(item.rename){
        item.rename = false;

        axios.get(`http://152.136.111.227:8083/reFload?floadId=${item.floadId}&&floadName=${item.floadName}`).then((res)=>{
          console.log(res);
        })
      }else{
        
        axios.post(`http://152.136.111.227:8083/addFlod`, item).then((res) => {
          console.log(res);
        });
      }
      
    },

    floadNameErr() {
      this.floadInput = "";
      this.pageFload.shift();
    },
    

    //文件上传之前穿的参数
    getfileData() {
      console.log("beforeupload");
      let num;
      try {
        if (!localStorage.getItem("id")) {
          localStorage.setItem("id", 0);
        } else {
          num = localStorage.getItem("id");
          num++;
          localStorage.setItem("id", num);
        }
      } catch (e) {
        console.log(e);
      }

      let time = new Date();
      let date = time.toLocaleDateString() + "" + time.toLocaleTimeString();
      let path = "/main";
      this.data = { date: date, path: path, id: num };
      console.log(this.data);
    },
    //页面上也添加文件
    showFile(res) {
      this.$bus.$emit('addFile',res);
    },
  },
};
</script>

<style scoped>
.mask{
  position: fixed;
  top:0;
  left:0;
  width: 100%;
  height: 100%;
  background: rgba(94, 89, 90, 0.295);
  z-index: -1;
}

.main-content{
  padding: 10px;
}
.directory{
  margin-top:15px
}
.search{
  float: right;
}
.files-input{
  float: right;
  width: 20%;
}

.file-name-input {
  width: 100%;
}
.el-icon-check,
.el-icon-close {
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 1px solid;
  text-align: center;
  line-height: 20px;
  margin-left: 5px;
}
.create-fload {
  width: 35%;
}
::v-deep .el-input__inner {
  height: 30px !important;
  line-height: 30px !important;
}

.content-list {
  width: 100%;

  padding: 15px 0px;
  box-sizing: border-box;
}
.content-list-file:nth-of-type(n+2):hover{
  background-color: rgb(180, 234, 255);
}
.el-dropdown{
  float: right;
  margin-right: 15px;
}
.content-list-file:nth-child(1){
  font-size: 12px;
}
.content-list-file:nth-of-type(n+1){
  width: 100%;
  height: 55px;
  display: flex;
  align-items: center;
  font-size: 14px;
  background-color:rgba( 255,255,255,  0.8);
}
.file-check {
  height: 100%;
  width: 5%;
  
}
.file-icon {
  width: 10%;
}
.file-name {
  flex: 1;
  border-right:1px solid rgb(0, 174, 255,0.3);
  margin-right: 15px;
}
.file-size {
  width: 15%;
  border-right:1px solid rgb(0, 174, 255,0.3);
  margin-right: 15px;
}
.file-date {
  width: 20%;
}
.content-options {
  height: 30px;
  border: 1px solid black;
}
.upload-demo {
  display: inline-block;
  margin-right: 10px;
}
::v-deep .el-upload-list {
  margin: 0;
  padding: 0;
  list-style: none !important;
  display: none !important;
}
</style>