<template>
  <div class="fileoptions">
    <el-upload
        class="upload-demo"
        action="aaa"
        :before-upload="beforeUpload"
        multiple
        :limit="3"
        :on-progress="path"
    >
      <el-button size="small" type="primary">上传<i class="el-icon-upload el-icon&#45;&#45;right"></i></el-button>
      <!--      只能上传jpg/png文件，且不超过500kb-->
    </el-upload>

    <el-button size="small" type="primary" @click="filecreate">新建文件夹</el-button>
    <el-button size="small" type="primary" @click="filesearch">查找</el-button>

    <el-upload
    enctype="multipart/form-data"
  class="upload-demo"
  action="http://localhost:8083/addFile"
  :data="data"
  multiple>
  <el-button size="small" type="primary" @click.native="getfileData()">点击上传</el-button>
  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
</el-upload>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "fileoperations",
  props:{
    floderspath:{
      type:String,
      default:'/homepage'
    }
  },
  data(){
    return{
      files:[],
      floders:[],
      pathname:'/homepage',
      data:null,
      name:'fjdkjfkd'
      
    }
  },
  mounted(){
    axios.get('http://localhost:8082/getAllFiles')
        .then((response)=>{
          this.showall(response);

          // console.log(response.data[0].fileName)
          // let datafile = response.data[2].fileContent.data;
          // console.log(` ${datafile.length/1024} 个字符, ` +
          //     `${Buffer.byteLength(datafile, 'utf8')} 个字节`)
        })
  },

  methods:{

    filesearch(){
      axios.get('http://localhost:8083/showFload').then((res)=>{
        console.log(res)
      })
      axios.get('http://localhost:8083/showFile').then((res)=>{
        console.log(res)
      })
    },
    /** */
    getfileData(){
      let num
      try{
        if(!localStorage.getItem("id")){
          localStorage.setItem("id", 0)
        }else{
          
           num = localStorage.getItem("id");
           num++;
          localStorage.setItem("id", num);
        }
        
      }catch(e){console.log(e)}

      let time = new Date();
      let date = time.toLocaleDateString()+""+time.toLocaleTimeString();
      let path = '/homepage'
     this.data = {date:date,
      path:path,
      id:num
      };
    },

    beforeUpload(file){
      console.log("filepath");

      let fd = new FormData();
      fd.append('file',file);//传文件
      axios.post(`http://localhost:8082/addFiles?pathname=${this.$props.floderspath}`, fd).then(function(res){
        console.log(res);
      })
    },
    //展示文件数据
    showall(response){
      this.files = [];
      for(let i=0;i<response.data.length;i++){

        if(response.data[i].id<500){
          let file = {};
          file.filesname=response.data[i].fileName;
          file.filessize=(response.data[i].fileContent.data).length;
          file.filesdate = response.data[i].fileDate;
          file.id = response.data[i].id;
          file.isinputshow = false;
          file.path = response.data[i].filePath;
          // console.log((response.data[i].fileContent.data).length)

          this.files.push(file)
        }else {
          let floder = {};
          floder.floderName = response.data[i].fileName;
          floder.flodersize = '-';
          floder.floderdate = response.data[i].fileDate;
          floder.id = response.data[i].id;
          floder.isinputshow = false;
          floder.path = response.data[i].filePath;

          this.floders.push(floder);
        }

      }
      //发送给filelist
      this.$bus.$emit('allfiles', this.files,this.floders);
    },
    //新建文件夹
    filecreate(){
      this.$bus.$emit('createfiles');
      /** */
      axios.post(`http://localhost:8083/addFlod?floadName=${this.name}&&floadPath=${'/hompage'}`).then(function(res){
        console.log(res);
      })
    },

  }
}
</script>

<style scoped>
.fileoptions {
  width: 100%;
  height: 2rem;
  display: flex;
  align-items: center;
  border: 1px solid black;
}
.upload-demo{
  height: 100%;
  margin-right: 1rem;
  overflow: hidden;
}
>>> .el-list-enter-active,
>>> .el-list-leave-active {
  transition: none;
}

>>> .el-list-enter,
>>> .el-list-leave-active {
  opacity: 0;
}
>>> .el-upload-list {
  height: 40px;
}

</style>