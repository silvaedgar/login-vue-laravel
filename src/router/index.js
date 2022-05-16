import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue'),
    meta: { is_login : true}
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import(/* webpackChunkName: "about" */ '../views/Register.vue'),
  },
  {
    path: '/compras',
    name: 'Compras',
    component: () => import(/* webpackChunkName: "about" */ '../views/Compras.vue'),
    meta : { require_auth: true }
  },
  {
    path: '/ventas',
    name: 'Ventas',
    component: () => import(/* webpackChunkName: "about" */ '../views/Ventas.vue'),
    meta : { require_auth: true }
  },
  {
    path: '/almacen',
    name: 'Almacen',
    component: () => import(/* webpackChunkName: "about" */ '../views/Almacen.vue'),
    meta : { require_auth: true }
  },
  {
    path: '/mantenimiento',
    name: 'Mantenimiento',
    component: () => import(/* webpackChunkName: "about" */ '../views/Mantenimiento.vue'),
    meta : { require_auth: true }
  },
  {
    path: '/401',
    name: '401',
    component: () => import(/* webpackChunkName: "about" */ '../views/401.vue'),

  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {

  let token = localStorage.getItem('token');
  let need_authorization = to.matched.some(route => route.meta.require_auth) 
  let is_login = to.matched.some(route => route.meta.is_login) 

  // console.log(to);
  // console.log(from.path);

  // console.log(need_authorization + "EDGAR: " + token)
  if (need_authorization) {  
    if (token != null)
      next()
    else  
      next('/401')
  }
  else {
    if (is_login && token != null) { // ya esta logueado
      next(from.path)
    }
    next();
  }
})

export default router
