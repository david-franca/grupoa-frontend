import './assets/main.css'
import 'unfonts.css'

import { createApp } from 'vue'

import App from './App.vue'
import { registerPlugins } from './plugins'
import router from './router'
import authService from './services/authService'

const app = createApp(App)

authService.setupAuthOnAppInit()

router.beforeEach((to, from, next) => {
  const publicPages = ['/login']
  const authRequired = !publicPages.includes(to.path)

  const loggedIn = authService.isLoggedIn()

  if (authRequired && !loggedIn) {
    return next('/login')
  }

  if (!authRequired && loggedIn) {
    return next('/students')
  }

  next()
})

registerPlugins(app)

app.mount('#app')
