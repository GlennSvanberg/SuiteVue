<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex sm12 md6>
        <v-layout row class="mx-3">
          <v-toolbar tabs>
            <v-tabs v-model="supplier" color="primary" dark slider-color="white" grow>
              <v-tab
                v-for="supplier in suppliers"
                :key="supplier.Id"
                ripple
                :href="'#tab-' + supplier"
              >{{ supplier.name }}</v-tab>
            </v-tabs>
          </v-toolbar>
          <v-tabs-items v-model="supplier">
            <v-tab-item v-for="supplier in suppliers" :id="'tab-' + supplier" :key="supplier">
              <h2>{{supplier}}</h2>
            </v-tab-item>
          </v-tabs-items>
        </v-layout>
      </v-flex>
      <v-flex sm12 md6></v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import CustomersList from '~/components/customerslist'
import CustomerDetails from '~/components/customerdetails'
import CreateCustomer from '~/components/createcustomer'

export default {
  async fetch({ store }) {
    await store.dispatch('loadSuppliers')
  },
  data() {
    return {
      supplier: null,
      active: null,
      key: null
    }
  },
  watch: {
    key(val) {
      console.log('ss' + val)
    },
    supplier(val) {
      console.log('supplier' + val)
    }
  },
  computed: {
    suppliers() {
      return this.$store.getters.suppliers
    }
  },
  components: {
    CustomersList: CustomersList,
    CustomerDetails: CustomerDetails,
    CreateCustomer: CreateCustomer
  }
}
</script>
