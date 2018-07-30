import request from '@/utils/api'
import { State } from './interface'
import { Commit } from 'vuex'

const state: State = {
  count: 0
}

const getters = {
  count: (state: State) => state.count
}

const mutations = {
  INCREMENT (state: State, num: number) {
    state.count += num
  },

  DECREMENT (state: State, num: number) {
    state.count -= num
  }
}

const actions = {
  async getTodayWeather (context: { commit: Commit }, params: { city: string }) {
    return request.get('/weather/api/weatherApi', { params: params })
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
