import Vuex from "vuex";
import axios from "axios";

export default {
  state: () => ({
    customer: {},
    customers: []
  }),
  mutations: {
    setLoadedCustomer(state, payload) {
      state.customer = payload
    },
    setCustomers(state, payload) {
      state.customers = payload
    }
  },
  actions: {
    setOpenCustomer({
      commit,
      payload
    }) {
      console.log("here")
      this.$axios.get("customer").then(res => {
        console.log("res: " + JSON.stringify(res))
        commit("setLoadedCustomer", res)
      })

    },
    loadCustomers({
      commit,

    }) {
      console.log("here")
      this.$axios.get("customer").then(res => {
        commit("setCustomers", res.data)
      })

    }
  },
  getters: {
    loadedCustomer(state) {
      return state.customer
    }
  }
};
