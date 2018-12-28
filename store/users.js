import Vuex from "vuex";
import axios from "axios";

export default {
  state: () => ({
    users: []

  }),
  mutations: {
    setUsers(state, payload) {
      state.users = payload
    }

  },
  actions: {
    async loadUsers({
      commit

    }) {
      const { data} = await this.$axios.get("user/all")
      commit("setUsers", data)
    },

  },
  getters: {
    users(state) {
      return state.users
    }
  }
};
