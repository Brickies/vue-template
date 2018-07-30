import 'core-js/fn/promise'

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
{{#element}}
import ElementUI from 'element-ui'
import '@/styles/element.scss'
{{/element}}
import '@/styles/index.scss'
{{#watermark}}
import watermark from '@dp/watermark'


if (process.env.NODE_ENV !== 'development') {
  // 增加水印
  watermark(document.body, {
    backgroundColor: '#f2f4f9',
    urlPrefix: '/api-wm'
  })
}
{{/watermark}}
{{#element}}
Vue.use(ElementUI)
{{/element}}

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
