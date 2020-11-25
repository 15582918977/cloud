
<template>
  <div class="login">
    <el-card class="box-card" 
    :body-style="login-card">
    <h2>登录</h2>
      <div class="login-container">
        <div class="login-input">
          <el-input placeholder="请输入内容" v-model="input1">
            <template slot="prepend">用户名</template>
          </el-input>
        </div>
        <div class="login-input">
          
          <el-input placeholder="请输入内容" type="password" v-model="input2" >
            <template slot="prepend">密码</template>
          </el-input>
        </div>
        <el-button round @click.native="doLogin" class="loginbutton">login</el-button>
      </div>
    </el-card>




    <div class="login-bg">
    <el-carousel :height="windowHeight" direction="vertical" :autoplay="true">
      <el-carousel-item>
        <div class="blur"></div>
        <img src="../../assets/imgs/th (1).jpg" class="img-bg">

      </el-carousel-item>
    </el-carousel>
    </div>
  </div>
</template>


<script>
import axios from "axios";

export default {
  name: "login",
  data() {
    return {
      input1: '',
      input2: '',
      windowWidth: document.documentElement.clientWidth+"px",  //实时屏幕宽度
      windowHeight: document.documentElement.clientHeight+"px",   //实时屏幕高度
      
    }
  },
  watch: {
    windowHeight (val) {
      let that = this;
      console.log("实时屏幕高度：",val, that.windowHeight );
    },
    windowWidth (val) {
      let that = this;
      console.log("实时屏幕宽度：",val, that.windowHeight );
    }
  },
  mounted() {

    this.input1=this.getCookie("user");
    this.input2=this.getCookie("pwd");

    var that = this;
    // <!--把window.onresize事件挂在到mounted函数上-->
    window.onresize = () => {
      return (() => {
        window.fullHeight = document.documentElement.clientHeight;
        window.fullWidth = document.documentElement.clientWidth;
        that.windowHeight = window.fullHeight;  // 高
        that.windowWidth = window.fullWidth; // 宽
      })()
    };
  },
  methods: {
  setCookie(cname,cvalue,exdays){
    var d = new Date();
    d.setTime(d.getTime()+(exdays*24*60*60*1000));
    var expires = "expires="+d.toGMTString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
  },

  getCookie(cname){
    console.log(document.cookie)
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) 
    {
      var c = ca[i].trim();
      if (c.indexOf(name)==0) return c.substring(name.length,c.length);
    }
    return "";
  },
  // checkCookie(){
  //   var user=getCookie("username");
  //   if (user!=""){
  //       alert("欢迎 " + user + " 再次访问");
  //   }
  //   else {
  //       user = prompt("请输入你的名字:","");
  //         if (user!="" && user!=null){
  //           setCookie("username",user,30);
  //       }
  //   }
  // },


    doLogin() {
        let users={};
        users.user = this.input1;
        users.pwd = this.input2;



        
        axios.post(`http://localhost:8083/login`,users).then( (response)=> {
              const data = response.data.data;

              if(data){

                this.$store.commit('adduser',this.input1)
                this.setCookie("user",this.input1,30);
                this.setCookie("pwd",this.input2,30);

                this.$router.push('/main');
              }
            
          })
          .catch(function (error) {
            console.log("error");
            console.log(error);
        });
    }


  }
}
</script>

<style scoped>
.loginbutton{
  margin-top: 20px;
}

.login-input{
  margin-bottom: 15px;
}
::v-deep .el-button{
  width: 100%;
  position:relative;
  overflow: hidden;
  background-color: rgba(138, 218, 255, 0.774);
}
::v-deep .el-button:hover{
  background-color: rgba(151, 212, 240, 0.911);
}
::v-deep .el-button::before,::v-deep .el-button::after {
  content:"";
  display: block;
  width: 100px;
  height: 100%;
  background:rgba(0, 174, 255, 0.774);
  opacity: 0.5;
  position: absolute;
  left:0;
  top:0;
  transform:skewX(-15deg);
  filter:blur(30px);
}
::v-deep .el-button::after{
  width: 40px;
  background:rgba(151, 212, 240, 0.911);
  left:60px;
  filter:blur(5px);
  opacity: 0;
}
::v-deep .el-button:hover::after{
  transition:1s;
  transform:translateX(420px);
  opacity: 1;
}
::v-deep .el-button:hover::before{
  transition:1s;
  transform:translateX(420px);
  opacity: 0.7;
}
::v-deep .el-card {
  position:absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
  width: 480px;
  padding: 20px;
  background:inherit;
  border: none;
}
::v-deep .el-input-group__prepend{
  width:50px;
  background-color:rgba(255,255,255,0.3);
  color: black;
  border: none;
}
::v-deep .el-input__inner{
  color:white;
  border:none;
  background-color:rgba(255, 255, 255, 0.747);
  border-radius: 4px;
}
::v-deep .el-card::before{
  content:"";
  width: calc(100% + 20px);
  height: calc(100% + 20px);
  background: inherit;
  box-shadow: inset 0 0 0 200px rgba(255,255,255,0.25);
  position: absolute;
  top:0;
  left:0;
  z-index: -1;
  filter: blur(6px);

}

.blur{height:100%;
  width:100%;
  background:rgba(0,0,0,0.5);
  position: absolute;
  top: 0;
  left:0;
}
.login-bg{
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left:0;
  z-index:-1;

}
.img-bg{
  object-fit: cover;
  height:100%;
  width:100%;
}
.el-carousel__item h3 {
  color: white;
  font-size: 100px;
  opacity: 0.8;
  line-height: 200px;
  z-index:10;
  position: fixed;
  bottom: 0;
  left: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}
.login-container {
  margin-top: 20px;
}

.el-select .el-input {
  width: 130px;
}

.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
</style>