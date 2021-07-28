import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import BbsUser from '@/components/BbsUser'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index,
      children: [
        {
          path: 'user',
          name: 'user',
          component: BbsUser
        }
      ]
    }
  ]
})
