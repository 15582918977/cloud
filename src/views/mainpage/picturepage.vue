<template>
  <div class="">
    <homepages>
      <template #list-content>
        <div class="content-options">
          

          
<el-button size="small" type="primary" @click="filesearch" class="search"
            >查找</el-button
          >
          <el-input
            v-model="filesinput"
            class="files-input"
            placeholder="请输入内容"
          ></el-input>
          
        </div>

        <el-breadcrumb separator-class="el-icon-arrow-right" class="directory">
          <el-breadcrumb-item :to="{ path: '/picture' }">全部图片</el-breadcrumb-item>
        </el-breadcrumb>

        


        <div class="files-img" v-for="(item,index) of img" :key="index">
          <div class="mask"></div>
          <div class="delete" @click="pictureDelete(item.name)"><i class="el-icon-delete"></i></div>
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
    };
  },
  computed:{
    content(){
      return this.$route.query.filesName;
    },
    lala(item){
      return window.URL.revokeObjectURL(item.data)
    }
    
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
  methods: {
    changeImg(){
      
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
          
          this.img.forEach((v)=>{
            if(v.name!==arr.name){
              this.img.push(arr);
            }
          })
          
          console.log(this.img)
          
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
      this.$router.push({path:`/search/${this.filesinput}`})
    // this.$router.push({path:'/search',query: {filesName:this.filesinput}})
      
    },
  

    

   
  },
};
</script>

<style scoped>

.files-img{
  display: inline-block;
  margin: 10px 20px;
    width: 10rem;
    height: 10rem;
    overflow: hidden;
    position: relative;
}
.files-img:hover .mask{
    position: absolute;
    width: 10rem;
    height: 10rem;
    background: rgba(58, 56, 56, 0.3);
}
.delete{
  position: absolute;
  opacity: 0;
}.files-img:hover .delete{
  opacity: 1;
}
.files-img:hover .el-icon-delete{
  position: absolute;
  top: 2px;
  left: 3px;
  display: inline-block;
  width: 15px;
  height: 15px;
  color: aliceblue;
}
.files-img-item{
    width: 10rem;
	height: 10rem;
    object-fit: cover;
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
  background-color: rgba( 255,255,255,  0.8);
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