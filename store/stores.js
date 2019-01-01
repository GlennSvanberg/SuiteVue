export default {
  state: () => ({
    stores: []
  }),
  mutations: {
    setStores(state, payload) {
      state.stores = payload
    }
  },
  actions: {
    async loadStores({ commit }) {
      const { data } = await this.$axios.get('store')
      commit('setStores', data)
    }
  },
  getters: {
    stores(state) {
      return state.stores
    }
  }
}
