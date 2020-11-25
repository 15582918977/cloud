<template>
  <div class="filelist" >
    <el-alert
        v-if="iserror"
        title="错误提示的文案"
        type="error">
    </el-alert>
    <el-row :gutter="0" class="filelist-content " >
      <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12"><div class="grid-content bg-purple">文件名</div></el-col>
      <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4"><div class="grid-content bg-purple-light">大小</div></el-col>
      <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8"><div class="grid-content bg-purple-light">修改日期</div></el-col>
    </el-row>

    <!--上传的文件-->
    <el-row :gutter="0" class="filelist-content " v-for="item of showfiles" :key="item.id">
      <el-col  :data-path="item.filesname" :xs="12" :sm="12" :md="12" :lg="12" :xl="12"
               >
        <div class=" grid-content bg-purple"
             :data-num="item.id"
             @click="fileupload"
             :key="item.id">

          <el-input
              v-if="item.isinputshow"
              :key="item.id"
              size="small"
              class="filesname-input"
              placeholder="请输入内容"
              v-model="input"
              clearable>
          </el-input>
          <el-button type="success" icon="el-icon-check" size="mini"
                     v-if="item.isinputshow"
                     :data-num="item.id" circle @click="filenameover"></el-button>
          <div class="floder-name" v-show="!item.isinputshow">{{ item.filesname }}</div>

          <div class="button-pos">
            <el-button type="danger" icon="el-icon-delete" size="mini" :data-num="item.id" circle
                       @click="filenameerr"></el-button>
            <el-button type="primary" icon="el-icon-edit" size="mini" :data-num="item.id" circle
                       @click="filerename"></el-button>
          </div>
        </div>
      </el-col>

      <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
        <div class="grid-content bg-purple-light">{{ item.filessize }}</div></el-col>
      <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
        <div class="grid-content bg-purple-light">{{ item.filesdate }}</div></el-col>
    </el-row>

</div>
</template>

<script>
import axios from "axios";
export default {
  name: "filestextlist",
  props:{

  },
  data(){
    return{
      files:[],
      showfiles:[],
      input: '',
      iserror:false,
      oldname:''
    }
  },
  mounted() {
    window.filenameover = this.filenameover;

    let that = this;

    this.$bus.$on('allfiles', function(value1) {
      let index = that.files.length;

      for(let i=index;i<value1.length;i++){
        that.files.push(value1[i])
      }

      that.showfile()
    });

    // this.$bus.$on('deletefiles',function(){
    //   that.deletefiles();
    // })
  },
  methods:{

    showfile(){ console.log(this.files);
      this.files.forEach((v)=>{
        if(v.filesname.indexOf('.txt')!==-1){
          this.showfiles.push(v)
        }
      });

    },


    fileupload(e){
      console.log('fileupload')
      let index = parseInt(e.target.getAttribute('data-num'));
      let name;
      // this.files.forEach((v,i)=>{
      //   if(v.id===index){
      //     name = this.files[i].filesname;
      //   }
      // });

      this.showfiles.forEach((v,i)=>{
              if(v.id===index){
                name = this.showfiles[i].filesname;
              }
      });

      axios.get(`http://localhost:8082/filedownload?name=${name}`)
          .then(function(response){
            this.open(response.config.url);
          })
          .catch(function(err){
            console.log(err)
          });

    },
    open(url){
      window.open(url);
    },

    //删除上传的文件
    filenameerr(e){
      //删除数据库中的文件
      let index = parseInt(e.target.getAttribute('data-num'));
      let name;
      // this.files.forEach((v,i)=>{
      //   if(v.id===index){
      //     name = this.files[i].filesname;
      //   }
      // })

      this.showfiles.forEach((v,i)=>{
        if(v.id===index){
          name = this.showfiles[i].filesname;
        }
      })

      axios.get(`http://localhost:8082/filedelete?name=${name}`)
          .then(function (response) {
            console.log("response");
            console.log(response);
          })
          .catch(function (error) {
            console.log("error");
            console.log(error);
          });

      //删除页面上的文件


      this.showfiles.forEach((v,i)=>{
        if(v.id===index){
          this.showfiles.splice(i,1);
        }
      })
    },
    //重命名上传的文件
    filerename(e){

      this.input = ''
      let index = parseInt(e.target.getAttribute('data-num'));
      let floder;
      // this.files.forEach((v,i)=>{
      //   if(v.id===index){
      //     floder=this.files[i];
      //   }
      // })

      this.showfiles.forEach((v,i)=>{
        if(v.id===index){
          floder=this.showfiles[i];
        }
      })

       this.oldname = floder.filesname;

      floder.isinputshow = true;

    },
    //上传的文件改名成功
    filenameover(e){
      let index = parseInt(e.target.getAttribute('data-num'));

      let floder;
      // this.files.forEach((v,i)=>{
      //   if(v.id===index){
      //     floder=this.files[i];
      //   }
      // })

      this.showfiles.forEach((v,i)=>{
        if(v.id===index){
          floder=this.showfiles[i];
        }
      })

      floder.isinputshow = false;

      if(this.input!=='') {
        floder.filesname = this.input;
        console.log(floder.filesname, 'filename');

        axios.get(`http://localhost:8082/filechange?name=${this.oldname}&&newname=${floder.filesname}`)
            .then(function(response){
              console.log(response)
            })
            .catch(function(err){
              console.log(err)
            });
      }
    },

  },

}
</script>

<style scoped>
.filelist{
  margin-top: 1rem;
  min-width: 768px;
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
}
.filelist-content{
  text-align: start;
  border: 1px solid #ccc;
}
.grid-content{
  padding:0 16px;
  min-height: 40px;
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.words{
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

.floder-name{
  width: 40%;
  height: 50%;
  text-overflow:ellipsis;
  overflow:hidden;
white-space:nowrap;
}
.filesname-input{
  width: 40%;
  height: 50%;
}
.filesname-input .active:hover{
  -webkit-transition:border linear .2s,-webkit-box-shadow linear .5s;
  border-color:rgba(141,39,142,.75);
  -webkit-box-shadow:0 0 18px rgba(111,1,32,3);
}

.file-pic{
  width: 1.875rem;
  height: 1.875rem;
  background: url("../../../public/OIP.jpg");
  display: inline-flex;
  margin-right: 1rem;
}

.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  min-height: 36px;
}
</style>