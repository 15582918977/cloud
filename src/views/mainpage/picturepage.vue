<template>
  <div class="">
    <homepages>
      <template #list-content>
        <div class="content-options">
          <div class="all-options">

          
<el-button size="small" type="primary" @click="filesearch" class="search"
            >查找</el-button
          >
          <el-input
            v-model="filesinput"
            class="files-input"
            placeholder="请输入内容"
          ></el-input>
          
        </div></div>
<div class="main-content">
        <el-breadcrumb separator-class="el-icon-arrow-right" class="directory">
          <el-breadcrumb-item :to="{ path: '/picture' }">全部图片</el-breadcrumb-item>
        </el-breadcrumb>

        </div>


        <div class="files-img" v-for="(item,index) of img" :key="index" @mouseover="mouseOver(index)" @mouseleave="mouseLeave">
          
          <div class="delete" @click="pictureDelete(item.name)" v-show="num===index?show:false" ><i class="el-icon-delete"></i></div>
          <div class="mask" v-show="num===index?show:false"></div>
          <img :src="item.a" alt="" class="files-img-item">
            
        </div>
        
          <!-- 文件夹展示 --><!-- 文件夹展示完 -->
          
      </template>
    </homepages>
  </div>
</template>

<script>
import axios from "axios";
import homepages from "@/views/homepage/homepage";
export default {
  name: "picturePage",
  components: {
    homepages,
  },
  props:{
    
  },
  data() {
    return {
      pageFile: [],
      filesinput:"",
      filesName:"",
      floadInput:"",
      data:{},
      imgs:[],
      imgArr:[],
      img:[],
      show:false,
      num:-1,
    };
  },
  computed:{
    content(){
      return this.$route.query.filesName;
    },
    
    
    
  },
  mounted() {
    
    
    axios.get('http://152.136.111.227:8083/allpicture').then((res)=>{
        this.imgs =  res.data.result;

        this.imgs.forEach((v)=>{
          console.log(v)
          axios.get(`http://152.136.111.227:8083/temFile/${v}`,{responseType: 'arraybuffer'}).then((res)=>{
            res.name = v;
            this.imgArr.push(res);
            this.changeImg();
          });


        });
    });
    
    
  //  {responseType: 'arraybuffer'}
    // axios.get(`http://localhost:8083/searchPicture`).then((res)=>{
    //     console.log(res);
    //     console.log(typeof res.data);

    //     var binary = '';
    // var bytes = new Uint8Array(res.data);
    // for (var len = bytes.byteLength, i = 0; i < len; i++) {
    //     binary += String.fromCharCode(bytes[i]);
    // }
    //     this.img3='data:image/png;base64,' + window.btoa(binary) 
    

    //     this.img=  'data:image/png;base64,' + btoa(new Uint8Array(res.data).reduce((data, byte) => data + String.fromCharCode(byte), ''))
        // const data = res.data.data;
        // this.pageFile=data[0];
        // console.log(this.pageFile)
    // })

    // axios.get(`http://localhost:8083/searchFiles?name=${this.filesinput}`).then((res) => {
    //   this.pageFile = res.data.data;
    // });
    
  },
  methods: {mouseOver(index){this.show = true;this.num=index},
    mouseLeave(){this.show= false},
    changeImg(){
      this.img = []
      this.imgArr.forEach((v)=>{
       let arr = {};
      arr.a = 'data:image/png;base64,';
        
         var binary = '';
         var bytes = new Uint8Array(v.data);
          
          for (var len = bytes.byteLength, i = 0; i < len; i++) {
              binary += String.fromCharCode(bytes[i]);
          }
          arr.a +=  window.btoa(binary);
          arr.name = v.name;

          if(this.img.length===0){
            this.img.push(arr);
          }else{
            this.img.forEach((v,i)=>{
              if(v.name!==arr.name){
                if(i===this.img.length-1)
                this.img.push(arr)
              }
            })
          }
          // this.img.push(arr).filter(function(item, index, arr) {
          //   console.log(item,arr)
          // //当前元素，在原始数组中的第一个索引==当前索引值，否则返回当前元素
          // // return arr.indexOf(item, 0) === index;
          // });
          
          
          
        // this.img=  'data:image/png;base64,' + btoa(new Uint8Array(v.data).reduce((data, byte) => data + String.fromCharCode(byte), ''))
        
      })
    },
    backPath(){
      this.$router.go(-1);
    },

    pictureDelete(name){
      axios.get(`http://152.136.111.227:8083/pictureDelete?name=${name}`).then((res)=>{
        console.log(res);
        this.img.forEach((v,i)=>{
          if(v.name===name){
            this.img.splice(i,1);
          }
        })
      })
    },
    filesearch(){
      if(this.filesinput==='') return;
      this.$router.push({path:`/search/${this.filesinput}`})
    // this.$router.push({path:'/search',query: {filesName:this.filesinput}})
      
    },
  
  },
};
</script>

<style scoped>
.files-img{
  position: relative;
  margin: 10px;
  display: inline-block;
  width:200px;
  height: 200px;
}
.files-img-item{
  background-position: center center;
  width: 100%;
  height:100%;
}
.delete{
  position: absolute;
  top: 10px;
  left: 10px;
  cursor: pointer;
  z-index: 9;
}
.delete i::before{
  content:"\e6d7";
  font-size: 18px;
  color:white;
}
.all-options{
  margin: 10px 10px 0 10px;
}
.el-button {
    margin-left: 10px;
}
.alert{
  position: fixed;
  width:30%;
  top:10%;
  left:50%;
  transform: translateX(-50%);
  margin: 20px 0 0 0;
}
.mask{
  position: absolute;
  top:0;
  left:0;
  width: 100%;
  height: 100%;
  background: rgba(94, 89, 90, 0.295);
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
  border-radius: 20%;
  border: 1px solid rgba(235, 171, 53, 0.719);
  display: inline-block;
  box-shadow: 0px 0px 1px 0px rgb(235, 171, 53);
  font-weight: bold;
  width: 20px;
  height: 20px;
  text-align: center;
  line-height: 20px;
  margin-left: 5px;
  color: orange;
}

.create-fload {
  outline: 0;
    border: 1px solid rgb(235, 171, 53);
    box-shadow: 0px 0px 6px 0px rgb(235, 171, 53);
    min-width: 25%;
    max-width: 35%;
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
.content-list-file{
  border-bottom: 1px solid rgba(140, 146, 148, 0.2);
}
.content-list-file:nth-of-type(n+2):hover{
  background-color: rgba(180, 234, 255, 0.301);
  border-bottom: 1px solid rgba(125, 148, 156, 0.541);
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
  font-size: 12px;
  background-color: rgba(255,255,255, 0.8);
}
.file-check {
  height: 100%;
  width: 5%;
  display: none;
}

.file-icon{
  width: 53px;
  height:71%;
  background: url('../../assets/imgs/fload.jpg');
  background-size: 100% 100%;
  
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