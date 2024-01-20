import { createApp } from "vue";
import { createStore } from 'vuex'
import "./index.css";
import App from "./App.vue";
import mountWrapper from "./mountWrapper";
// const app = createApp(App)

// const store = createStore({
//     state () {
//       return {
//         cartItems: 0
//       }
//     }
//   })
// app.use(store)
mountWrapper('#app', App);
// const mount = (el) => {
//   console.log('us here', el)
//   const app = createApp(App)
//   app.mount(el)
// }

// if (process.env.NODE_ENV === 'development') {
//   mount('#app')
// }

// export {mount};