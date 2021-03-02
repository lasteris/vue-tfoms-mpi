import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fal } from '@fortawesome/pro-light-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import App from './App.vue'
import router from './router'
import store from './store'
//import locale from 'element-plus/lib/locale/lang/ru-ru'
//import 'dayjs/locale/ru-ru'

library.add(fal)

const app = createApp(App)
app.use(store)
app.use(router)
app.use(ElementPlus/*, { locale }*/)
app.component('font-awesome-icon', FontAwesomeIcon)
app.mount('#app')
