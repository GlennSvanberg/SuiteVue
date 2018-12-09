import Vuex from "vuex";
import axios from "axios";

export default {
  state: () => ({
    suppliers: []

  }),
  mutations: {
    setSuppliers(state, payload) {
      state.suppliers = payload
    }

  },
  actions: {
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
