<template>
  <div id="app">
    <div id="nav">
          <router-link to="/homepage"></router-link>
<!--      <router-link to="/">Home</router-link> |-->
<!--      <router-link to="/about">About</router-link>-->
    </div>
    <router-view/>
  </div>
</template>

<script>
import  store  from './store/index'
export default {
  store,
}
</script>
<style lang="scss">
@import './assets/font/iconfont.css';
#app {
 font-size: 12px  !important;
}
//
//#nav {
//  padding: 30px;
//
//  a {
//    font-weight: bold;
//    color: #2c3e50;
//
//    &.router-link-exact-active {
//      color: #42b983;
//    }
//  }
//}
</style>
