interface User {
  [key: string]: any
}

interface State {
  userinfo: User
}

const state: State = {
  userinfo: {
    name: '',
    login_name: '',
    number: '',
    organization: ''
  }
}

const getters = {
  userinfo: (state: State) => state.userinfo
}

const mutations = {
  GET_USERINFO (state: State, userinfo: User) {
    state.userinfo = userinfo
  }
}

const actions = {}

export default {
  state,
  getters,
  mutations,
  actions
}
