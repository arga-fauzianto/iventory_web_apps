export const state = () => ({
  accessToken: null,
  refreshToken: null,
  nama: null
})

export const getters = {
  authenticated(state) {
    if(state.accessToken) {
      return true
    }
    return false
  }
}

export const mutations = {
  setNama(state, nama) {
    state.nama = nama
  },

  setAccessToken(state, accesToken) {
    state.accessToken = accesToken;
  },

  setRefreshToken(state, refreshToken) {
    state.refreshToken = refreshToken;
  },

}

export const actions = {
  async login({ commit }, payload) {

    const response = await this.$axios.post('http://localhost:8000/api/login', payload)

    if(!response) { return false }

    commit('setAccessToken', response.data.accessToken)
    commit('setRefreshToken', response.data.refreshToken)
    commit('setNama', response.data.nama)
    console.log('ini response: ', response);
    return response
  }

}