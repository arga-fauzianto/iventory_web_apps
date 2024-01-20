export const state = () => ({
  accessToken: null,
  refreshToken: null,
  nama: null
})

export const actions = {
  async login({ commit }, payload) {

    const response = await this.$axios.post('http://localhost:8000/api/login', payload)

    if(!response) { return false }
    console.log('ini response: ', response);
    return response
  }

}