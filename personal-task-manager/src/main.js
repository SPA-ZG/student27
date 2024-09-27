import 'bootstrap-icons/font/bootstrap-icons.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { useTaskStore } from './stores/task'
import { fetchData } from './firebase.js'
;(async () => {
  try {
    // initial load of data from firebase
    const data = await fetchData()

    const pinia = createPinia()
    const taskStore = useTaskStore(pinia)
    taskStore.setCards(data)
    const app = createApp(App)
    app.use(pinia)
    app.use(router)
    app.mount('#app')
  } catch (error) {
    console.error('Error initializing the app:', error)
  }
})()
