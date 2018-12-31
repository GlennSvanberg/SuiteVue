import Vuex from 'vuex'
import axios from 'axios'

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
    deleteAddon(state, payload) {
      var supplier = state.suppliers.find(data => {
        return data.id == payload.supplier.id
      })
      for (var i = 0; i < supplier.subscriptionAddons.length; i++) {
        if (supplier.subscriptionAddons[i].id == payload.id) {
          supplier.subscriptionAddons.splice(i, 1)
          break
        }
      }
    },
    setSuppliers(state, payload) {
      state.suppliers = payload
    },
    editSubscription(state, payload) {
      var supplier = state.suppliers.find(data => {
        return data.id == payload.supplier.id
      })
      var editedSubscription = {
        id: payload.id,
        supplierName: supplier.name,
        supplierId: supplier.id,
        title: payload.title,
        pricePerMonth: payload.pricePerMonth,
        revenue: payload.revenue,
        subscriptionNumber: payload.subscriptionNumber,
        periodInMonths: payload.periodInMonths
      }
      var subscription = supplier.subscriptions.find(x => x.id == payload.id)
      if (subscription) {
        Object.assign(subscription, editedSubscription)
      }
    },
    editAddon(state, payload) {
      var supplier = state.suppliers.find(data => {
        return data.id == payload.supplier.id
      })
      var editedAddon = {
        id: payload.id,
        supplierName: supplier.name,
        supplierId: supplier.id,
        title: payload.title,
        pricePerMonth: payload.pricePerMonth,
        revenue: payload.revenue,
        subscriptionNumber: payload.subscriptionNumber,
        periodInMonths: payload.periodInMonths
      }

      var addon = supplier.subscriptionAddons.find(x => x.id == payload.id)
      if (addon) {
        Object.assign(addon, editedAddon)
      }
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
        periodInMonths: payload.periodInMonths
      }
      supplier.subscriptions.push(subscription)
    },
    addAddon(state, payload) {
      var supplier = state.suppliers.find(data => {
        return data.id == payload.supplier.id
      })
      var addon = {
        id: payload.id,
        supplierName: supplier.name,
        supplierId: supplier.id,
        title: payload.title,
        pricePerMonth: payload.pricePerMonth,
        revenue: payload.revenue,
        subscriptionNumber: payload.subscriptionNumber,
        periodInMonths: payload.periodInMonths
      }
      supplier.subscriptionAddons.push(addon)
    }
  },
  actions: {
    async editSubscription({ commit }, payload) {
      const { data } = await this.$axios.post('subscription/edit', payload)
      commit('editSubscription', data)
    },
    async deleteSubscription({ commit }, payload) {
      const { data } = await this.$axios.delete('subscription/' + payload)
      commit('deleteSubscription', data)
    },
    async addSubscription({ commit }, payload) {
      const { data } = await this.$axios.post('subscription', payload)
      commit('addSubscription', data)
    },
    async addAddon({ commit }, payload) {
      const { data } = await this.$axios.post('subscriptionAddon', payload)
      commit('addAddon', data)
    },
    async editAddon({ commit }, payload) {
      const { data } = await this.$axios.post('subscriptionAddon/edit', payload)
      commit('editAddon', data)
    },
    async deleteAddon({ commit }, payload) {
      const { data } = await this.$axios.delete('subscriptionAddon/' + payload)
      commit('deleteAddon', data)
    },
    async loadSuppliers({ commit }) {
      const { data } = await this.$axios.get('Supplier')
      commit('setSuppliers', data)
    }
  },
  getters: {
    suppliers(state) {
      return state.suppliers
    }
  }
}
