import { createApp } from 'vue'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import App from './App.vue'
import router from './router'

import { createPinia } from 'pinia'

router.beforeEach((to, from, next) => {
    if (to.path.includes('/login') || to.path.includes('/register')) {
      next()

    } else {
      const _token = sessionStorage.getItem('token') || null

      if (_token) {
        next()
      } else {
        next('/login')
      }
    }
  }
)

createApp(App)
  .use(ElementPlus)
  .use(router)
  .use(createPinia())
  .mount('#app')
