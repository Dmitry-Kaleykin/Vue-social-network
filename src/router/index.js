import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index'
import Login from '../components/login/Login'
import Profile from '../components/profile/Profile'
import Users from '../components/users/Users'
import ProfileInformation from '../components/profile-information/ProfileInformation'

Vue.use(VueRouter)

function authRequired (from, to, next) {
  const isAuth = !!store.state.loggedUser.id;
  if (!isAuth) {
    next('/');
    return;
  }
  next();
}

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
    meta: {layout: 'empty'},
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta: {layout: 'main'},
    beforeEnter: authRequired,
  },
  {
    path: '/users',
    name: 'Users',
    component: Users,
    meta: {layout: 'main'},
    beforeEnter: authRequired,
  },
  {
    path: '/info',
    name: 'Information',
    component: ProfileInformation,
    meta: {layout: 'main'},
    beforeEnter: authRequired,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
