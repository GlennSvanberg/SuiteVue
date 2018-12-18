import Vuex from "vuex";
import axios from "axios";

export default {
  state: () => ({
    suppliers: []

  }),
  mutations: {
    deleteSubscription(state, payload) {
      var supplier = state.suppliers.find(data => {
        return data.id == payload.supplier.id
      })
      for (var i = 0; i < supplier.subscriptions.length; i++) {
        if (supplier.subscriptions[i].id == payload.id) {
          supplier.subscriptions.splice(i, 1)
          break
        }
      }


    },
    setSuppliers(state, payload) {
      state.suppliers = payload
    },
    addSubscription(state, payload) {
      var supplier = state.suppliers.find(data => {
        return data.id == payload.supplier.id
      })
      var subscription = {
        id: payload.id,
        supplierName: supplier.name,
        supplierId: supplier.id,
        title: payload.title,
        pricePerMonth: payload.pricePerMonth,
        revenue: payload.revenue,
        subscriptionNumber: payload.subscriptionNumber,
        perionInMonths: payload.perionInMonths
      }
      supplier.subscriptions.push(subscription)
    }
  },
  actions: {
    async deleteSubscription({
      commit
    }, payload) {
      const {
        data
      } = await this.$axios.delete("subscription/" + payload)
      console.log("action: " + data)
      commit("deleteSubscription", data)
    },
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
