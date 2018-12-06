import Vue from "vue";
import Vuex from "vuex";

import customers from "./customers";



Vue.use(Vuex);

const store = () => {
  return new Vuex.Store({
    state: {},
    modules: {

      customers: customers
    }
  });
};
export default store;
