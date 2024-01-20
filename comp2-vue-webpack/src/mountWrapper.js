import { createApp } from 'vue'
// import './style.css'
import App from './App.vue'

import Header from './Header.vue'

// createApp(App).mount('#app')

export default (el, comp) => {
    

    console.log('comp', comp)
    createApp(Header).mount(el)
}