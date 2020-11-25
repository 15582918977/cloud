import Vue from 'vue';
import VueRouter from 'vue-router'
import mainpage from '../views/mainpage/mainpage';
import searchpage from '../views/mainpage/searchpage';
import picturespage from '../views/mainpage/picturepage';
import textspage from '../views/mainpage/textpage';
import floadspage from '../views/mainpage/floadpage';
import login from '../views/login/login';


Vue.use(VueRouter)

const routes = [

  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.homepage.vuehomepage.vuehomepage.vuehomepage.vue
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // },
  {
    path:'/login',
    component:login,
  },
  {
    path:'/fload/:floadName',
    props: true,
    component:floadspage
  },
  {
    path:'/text',
    component:textspage
  },
  {
    path:'/picture',
    component:picturespage
  },
  {
    path:'/search/:filesName',
    component:searchpage
  },
  {
    path:'/main',
    component:mainpage
  },
  {
    path:'/',
    component:mainpage
  },
  



]

const router = new VueRouter({
  routes
})

export default router
