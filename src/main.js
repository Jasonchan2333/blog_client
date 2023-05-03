import { createApp } from 'vue'
import './style.css' //全局css
import App from './App.vue'
import naive from 'naive-ui' //ui库
import { createDiscreteApi } from "naive-ui" //naive的独立api组件
import { createPinia } from 'pinia' //piniastore
import VueRouter from './router/router.js' //路由
import axios from "axios" //axios请求

axios.defaults.baseURL = "http://localhost:3000" // 服务端基础路径

const { message, dialog, notification } = createDiscreteApi(['message', 'dialog', 'notification']) //naive 独立API
    /**
     * axios
     * pinia
     * sass
     * vue-router
     * naivue-ui
     * wangEditor
     * */


const app = createApp(App) //实例化全局

app.provide("axios", axios) //注册工具给页面内inject使用
app.provide('message', message) //naive的消息提示
app.provide('dialog', dialog) //naive的弹窗
app.provide('notification', notification) //naive的提示
app.provide('uploadServer', axios.defaults.baseURL)
app.use(naive) //使用组件库
app.use(VueRouter) //使用路由
app.use(createPinia()) //使用Pinia
app.mount("#app") //挂载app