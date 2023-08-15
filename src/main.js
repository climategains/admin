import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "@/assets/main.pcss";
import '@purge-icons/generated'
import('preline')
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

import 'vue-multiselect/dist/vue-multiselect.css';
import config from '../formkit.config.js'


import { plugin } from '@formkit/vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const toastConfig = {
    transition: "Vue-Toastification__fade",
    maxToasts: 20,
    newestOnTop: true
  }


const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

createApp(App).use(router).use(plugin, config).use(pinia).use(Toast, toastConfig).mount("#app");
