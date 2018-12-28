import Vuex from "vuex";
import axios from "axios";

export default {
  state: () => ({
    products: []
  }),
  mutations: {
    setProducts(state, payload) {
      state.products = payload
    },
    addProduct(state, payload) {
      state.products.push(payload)
    },
    editProduct(state, payload) {
      var product = state.products.find(x => x.id == payload.id);
      if (product) {
        Object.assign(product, payload)
      } else {
        state.products.push(payload)
      }
    },
    deleteProduct(state, payload) {
      for (var i = 0; i < state.products.length; i++) {
        if (state.products[i].id == payload.id) {
          state.products.splice(i, 1)
        }
      }
    },

  },
  actions: {
    async loadProducts({
      commit

    }) {
      const {
        data
      } = await this.$axios.get("product")
      commit("setProducts", data)
    },
    async addProduct({
      commit
    }, payload) {
      const {
        data
      } = await this.$axios.post("product", payload)
      commit("addProduct", data)

    },
    async editProduct({
      commit
    }, payload) {
      const {
        data
      } = await this.$axios.post("product/edit", payload)
      commit("editProduct", data)

    },
    async deleteProduct({
      commit
    }, payload) {
      const {
        data
      } = await this.$axios.delete("product/" + payload)
      commit("deleteProduct", data)
    },

  },
  getters: {
    products(state) {
      return state.products
    }
  }
};
