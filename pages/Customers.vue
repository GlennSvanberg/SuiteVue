<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex sm12 md8>
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
export default {
  components: {
    CustomersList: CustomersList,
    CustomerDetails: CustomerDetails
  }
}
</script>
