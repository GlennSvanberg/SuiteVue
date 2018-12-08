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
    },
    addCustomer(state, payload) {
      state.customers.push(payload)
    }
  },
  actions: {
    getCustomer({
      commit
    }, payload) {
      console.log("customer" + payload);
    },
    loadOpenCustomer({
      commit
    }, payload) {
      console.log("here" + payload)
      this.$axios.get("customer/" + payload).then(res => {
        commit("setLoadedCustomer", res.data)
      })

    },
    async loadCustomers({
      commit

    }) {
      const {
        data
      } = await this.$axios.get("customer")
      commit("setCustomers", data)
    },
    createCustomer({
      commit
    }, payload) {
      this.$axios.post("customer", payload).then(res => {
        commit("setLoadedCustomer", res.data)
        var customer = {
          id: res.data.id,
          name: res.data.firstName + " " + res.data.lastName,
          personalNumber: res.data.personalNumber
        }
        commit("addCustomer", customer)

      }).catch(error => {
        console.log("error" + error)
      })
    }
  },
  getters: {
    loadedCustomer(state) {
      return state.customer
    },
    customers(state) {
      return state.customers
    }
  }
};
