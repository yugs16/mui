import { createApp } from 'vue'
// import './style.css'
import App from './App.vue'

import Header from './Header.vue'

// createApp(App).mount('#app')

export default (el, comp=App, props) => {

    console.log(comp)
    
    createApp(comp, props).mount(el)
}