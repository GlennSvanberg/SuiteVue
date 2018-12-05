import Vuex from "vuex";
import axios from "axios";

export default {
  state: () => ({
    customer: {}
  }),
  mutations: {
    setLoadedCustomer(state, payload) {
      state.customer = payload
    }
  },
  actions: {
    setLoadedCustomer({
      commit
    }, payload) {
      commit("setLoadedCustomer", payload)
    }
  },
  getters: {
    loadedCustomer(state) {
      return state.customer
    }
  }
};
