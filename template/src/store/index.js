import Vue from 'vue'
import Vuex from 'vuex'
import Home from './home'

Vue.use(Vuex)
// const debug = process.env.NODE_ENV !== 'production'

const store = new Vuex.Store({
  modules: {
    Home
  }
  // strict: debug
})

export default store
