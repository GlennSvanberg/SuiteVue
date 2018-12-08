import Vue from "vue";
import Vuex from "vuex";

import customers from "./customers";
import users from "./users";



Vue.use(Vuex);

const store = () => {
  return new Vuex.Store({
    state: {},
    modules: {

      customers: customers,
      users: users
    }
  });
};
export default store;
