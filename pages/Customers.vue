<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex sm12 md6>
        <v-layout row class="mx-3">
          <create-customer class="mr-5"></create-customer>
          <v-text-field append-icon="search"></v-text-field>
        </v-layout>

        <customers-list class="mx-3"></customers-list>
      </v-flex>
      <v-flex sm12 md6>
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
