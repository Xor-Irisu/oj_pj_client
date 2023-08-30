import { createApp } from 'vue'
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import App from './App.vue';
import router from './router'
import VueHighlightJS from "vue3-highlightjs";
import "highlight.js/styles/solarized-light.css";
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
const app = createApp(App)
app.use(VueHighlightJS)
app.use(ElementPlus)
app.use(router)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.mount('#app')
