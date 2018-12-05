import Vue from "vue";
import Vuex from "vuex";


import auth from "./auth";
import customers from "./customers";



Vue.use(Vuex);

const store = () => {
  return new Vuex.Store({
    state: {},
    modules: {
      auth: auth,
      customers: customers
    }
  });
};
export default store;
