export default {
  state: () => ({
    token: ""
  }),
  mutations: {
    setToken(state, payload) {
      state.token = payload
    },
    removeToken(state) {
      state.token = ""
    }
  },
  actions: {
    setToken({
      commit
    }, payload) {
      commit("setToken", payload);
      localStorage.setItem("token", payload)
      this.$axios.setToken(payload, "Bearer")
    },
    created({
      commit,
      getters
    }) {
      if (!getters.userIsAuthenticated) {
        var token = localStorage.getItem("token") || ""
        this.$axios.setToken(token, "Bearer")
        commit("setToken", token)
      }
    },
    logout({
      commit
    }) {
      localStorage.removeItem("token")
      commit("removeToken")
      this.$router.push("/")
    },
    login({
      commit
    }, payload) {
      this.$axios
        .post("/account/login", {
          userName: payload.email,
          password: payload.password
        })
        .then(res => {
          const token = res.data.token
          localStorage.setItem("token", token)
          commit("setToken", token)
          this.$axios.setToken(token, "Bearer")
          this.$router.push("/")
        })
        .catch(error => {
          localStorage.removeItem("token")
          commit("removeToken")
          console.log(error)
        })
    }
  },
  getters: {
    token(state) {
      return state.token
    },
    userIsAuthenticated(state) {
      if (state.token !== "") {
        return true;
      } else {
        return false
      }
    }
  }
};
