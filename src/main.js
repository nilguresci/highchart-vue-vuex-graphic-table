import './assets/main.css'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from '../src/store/index'
import HighchartsVue from 'highcharts-vue'
const app = createApp(App)

app.use(router).use(store).use(Antd).use(HighchartsVue)
app.mount('#app')
