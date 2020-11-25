<template>
  <div class="filedirectory">
    <div class="filedirectory-left">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/homepage' }" @click="homepage">{{words}}</el-breadcrumb-item>
        <el-breadcrumb-item @click="goback">返回上一级</el-breadcrumb-item>
        <slot name="filedirectory-item"></slot>
      </el-breadcrumb>
    </div>
    <div class="filedirectory-right"></div>

  </div>
</template>

<script>
export default {
  name: "filedirectory",
  props:{
    words:{
      type:String,
      default:'全部文件'
    }
  },
  methods:{
    homepage(){

    },
    goback(){this.$router.go(-1)}

  }
}
</script>

<style scoped>
.filedirectory{
  margin-top: 1rem;
}

</style>