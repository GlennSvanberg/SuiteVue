import Vue from 'vue'
import Vuex from 'vuex'

import customers from './customers'
import users from './users'
import stores from './stores'
import subscriptions from './subscriptions'
import products from './products'
import receipts from './receipts'

Vue.use(Vuex)

const store = () => {
  return new Vuex.Store({
    state: {},
    modules: {
      customers: customers,
      users: users,
      stores: stores,
      subscriptions: subscriptions,
      products: products,
      receipts: receipts
    }
  })
}
export default store
