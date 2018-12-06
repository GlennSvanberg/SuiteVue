<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex sm12 md8>
        <create-customer></create-customer>
        <customers-list></customers-list>
      </v-flex>
      <v-flex sm12 md4>
        <customer-details></customer-details>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import CustomersList from '~/components/customerslist'
import CustomerDetails from '~/components/customerdetails'
import CreateCustomer from '~/components/createcustomer'
export default {
  async fetch({ store }) {
    await store.dispatch('loadCustomers')
  },
  components: {
    CustomersList: CustomersList,
    CustomerDetails: CustomerDetails,
    CreateCustomer: CreateCustomer
  }
}
</script>
