import Vuex from "vuex";
import axios from "axios";

export default {
  state: () => ({
    suppliers: []

  }),
  mutations: {
    setSuppliers(state, payload) {
      state.suppliers = payload
    },
    addSubscription(state, payload) {
      
      console.log("payload" + JSON.stringify(payload))
    }

  },
  actions: {
    async addSubscription({
      commit
    }, payload) {
      const {
        data
      } = await this.$axios.post("subscription", payload)
      commit("addSubscription", data)

    },
    async loadSuppliers({
      commit
    }) {
      const {
        data
      } = await this.$axios.get("Supplier")
      commit("setSuppliers", data)
    }
  },
  getters: {
    suppliers(state) {
      return state.suppliers
    }
  }
};
