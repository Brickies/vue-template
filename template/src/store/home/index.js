import request from '@/utils/api'

const state = {
  count: 0
}

const getters = {
  count: state => {
    return state.count
  }
}

const mutations = {
  INCREMENT (state, num) {
    state.count += num
  },
  DECREMENT (state, num) {
    state.count -= num
  }
}

const actions = {
  async getTodayWeather (store, params) {
    return request.get('/weather/api/weatherApi', { params: params })
  }
}

export default {
  state,
  getters,
  mutations,
  actions,
  namespaced: true
}
