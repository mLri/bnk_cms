import Vue from 'vue'
import Router from 'vue-router'

import MemberShow from '@/components/Member/Member_Show'
import MemberAdd from '@/components/Member/Member_Add'
import MemberUpdate from '@/components/Member/Member_Update'


import Login from '@/components/Login'
import Dash from '@/components/Dash'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/member',
      name: 'MemberShow',
      component: MemberShow
    },
    {
      path: '/member/add',
      name: 'MemberAdd',
      component: MemberAdd
    },
    {
      path: '/member/update/:id',
      name: 'MemberUpdate',
      component: MemberUpdate
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/dashboard',
      name: 'Dash',
      component: Dash
    }
  ]
})
