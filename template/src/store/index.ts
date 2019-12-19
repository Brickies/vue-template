import Vue from 'vue'
import Vuex from 'vuex'
import user from './user'
import home from './home'

Vue.use(Vuex)
const debug: boolean = process.env.NODE_ENV !== 'production'

const store = new Vuex.Store({
  modules: {
    user,
    home
  },
  strict: debug
})

export default store
