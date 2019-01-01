export default {
  state: () => ({
    receipts: [],
    receipt: {}
  }),
  mutations: {
    setReceipts(state, payload) {
      state.receipts = payload
    },
    setLoadedReceipt(state, payload) {
      state.receipt = payload
    },
    addReceipt(state, payload) {
      console.log('add' + JSON.stringify(payload))
      const receipt = {
        id: payload.Id,
        nr: payload.Nr,
        sellerName: payload.seller.name,
        customerName:
          payload.customer.firstName + ' ' + payload.customer.lastName,
        storeName: payload.store.name,
        state: payload.state,
        revenue: payload.revenue,
        tb: payload.tb,
        created: payload.created
      }
      state.receipts.push(receipt)
    }
  },
  actions: {
    async loadReceipts({ commit }) {
      const { data } = await this.$axios.get('receipt')
      commit('setReceipts', data)
    },
    async loadOpenReceipt({ commit }, payload) {
      const { data } = await this.$axios.get('receipt/' + payload)
      commit('setLoadedReceipt', data)
    },
    async addReceipt({ commit }, payload) {
      console.log('action: ' + JSON.stringify(payload))
      const { data } = await this.$axios.post('receipt', payload)
      console.log('data: ' + JSON.stringify(data))
      commit('addReceipt', data)
    }
  },
  getters: {
    receipts(state) {
      return state.receipts
    },
    receipt(state) {
      return state.receipt
    }
  }
}
