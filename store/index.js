import Vue from "vue";
import Vuex from "vuex";

import customers from "./customers";
import users from "./users";
import stores from "./stores";



Vue.use(Vuex);

const store = () => {
  return new Vuex.Store({
    state: {},
    modules: {

      customers: customers,
      users: users,
      stores: stores
    }
  });
};
export default store;
