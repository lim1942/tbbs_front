import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import BbsUser from '@/components/BbsUser'
import BbsComment from '@/components/BbsComment'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index,
      redirect: '/comment',
      children: [
        {
          path: 'comment',
          name: 'comment',
          component: BbsComment
        }
      ]
    },
    {
      path: '/user',
      name: 'user',
      component: BbsUser
    }
  ]
})
