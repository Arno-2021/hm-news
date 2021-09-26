import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login'
import Layout from '@/views/layout'
import NotFound from '@/views/404'
import Home from '@/views/layout/Home'
import Question from '@/views/layout/Question'
import Video from '@/views/layout/Video'
import User from '@/views/layout/User'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Layout,
    children: [
      { path: '', component: Home },
      { path: 'question', component: Question },
      { path: 'video', component: Video },
      { path: 'user', component: User }
    ]
  },
  { path: '/login', component: Login },
  { path: '*', component: NotFound }
]

const router = new VueRouter({
  routes
})

export default router
