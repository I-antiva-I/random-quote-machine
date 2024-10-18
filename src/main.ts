import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { settingsStore } from './scripts/settingsStore'

createApp(App).use(router).use(settingsStore).mount('#root');
