import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import HelloWorldB from '@/components/HelloWorldB'
import page1 from '@/components/page1'
import page2 from '@/components/page2'
import touroku from '@/components/touroku'
import sign from '@/components/sign'
Vue.use(Router)


export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
        {
      path: '/HelloWorldB',
      name: 'HelloWorldB',
      component: HelloWorldB
    },
    {
      path: '/page1',
      component: page1
    },
    {
      path: '/page2',
      component: page2
    },
    {
      path: '/touroku',
      name: 'touroku',
      component: touroku
    },
    {
      path: '/sign',
      name: 'sign',
      component: sign
    }
  ]
})
