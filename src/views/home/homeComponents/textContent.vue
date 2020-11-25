<template>
<div class="text">
  <el-container :style="{height:browserHeight-50+'px'}">
    <el-container>
      <el-aside width="12.5rem" >
        <el-menu class="file-nav">
          <el-menu-item @click="goallfiles" :class="{active:isactive}">全部文件</el-menu-item>
          <router-link to="/img">
            <el-menu-item @click="goallpictures">图片</el-menu-item>
          </router-link>
          <router-link to="/text">
            <el-menu-item @>文档</el-menu-item>
          </router-link>

        </el-menu>
      </el-aside>

      <el-container>
        <el-main>
          <fileoperations :floderspath="floderspath"></fileoperations>
          <filedirectory ></filedirectory>
          <filestextlist @floderpath="floderpath"></filestextlist>

        </el-main>
      </el-container>

    </el-container>
  </el-container>
</div>
</template>

<script>
import fileoperations from "@/components/common/fileoperations";
import filedirectory from "@/components/common/filedirectory";
import filestextlist from "@/components/common/filestextlist";

export default {
name: "textContent",
  props:{
    browserHeight:{
      type:Number,
      default:document.documentElement.clientHeight
    }
  },
  data(){
    return {
      isactive:true,
      floderspath:'/homepage'
    }
  },
  mounted() {

  },
  methods:{
    floderpath(value){
      this.floderspath = value;
    },
    goallfiles(){
      this.$router.replace('/homepage');
      this.isactive = true;
    },
    goallpictures(){
      this.isactive = false;
    }

  },
  components:{
    fileoperations,
    filedirectory,
    filestextlist
  }
}
</script>

<style scoped>
.el-aside {
  background-color: rgba(102, 102, 102,0.3);
}
.file-nav{
  margin-top: 1.25rem;
  background: transparent;
}
.el-menu-item:focus, .el-menu-item:hover {
  outline: 0;
  background-color: #8cc5ff;
  color: #fff
}
.active{background: #8cc5ff}

.el-icon-arrow-right{
  margin-top: 1rem;
}
</style>