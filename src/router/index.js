import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Page from '@/components/Page'
import PageEdit from '@/components/PageEdit'

Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'Home',
    //   component: Home
    // },
    {
      path: '/',
      name: 'Home',
      component: Page,
      props: {slug: 'home'}
    },
    {
      path: '/:slug/edit',
      name: 'PageEdit',
      component: PageEdit,
      props: true
    },
    {
      path: '/:slug',
      name: 'Page',
      component: Page,
      props: true
    },

  ]
})
