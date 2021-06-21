import { createRouter, createWebHistory } from 'vue-router'
/**  For electron : createWebHashHistory, transform url path with # anchor */
import routes from 'vue-auto-routing'
import { createRouterLayout } from 'vue-router-layout'

const RouterLayout = createRouterLayout((layout) => import(`@/layouts/${layout}.vue`))

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  scrollBehavior () {
    const el = document.querySelector('body')
    if (el) {
      document.body.scrollTop = 0
      el.scrollTop = 0
    }
  },
  routes: [
    {
      path: '/',
      component: RouterLayout,
      children: routes
    }
  ]
})

export default router
