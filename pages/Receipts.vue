<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex sm12 md6>
        <v-layout row class="mx-3">
          <create-receipt class="m-5"></create-receipt>
          <v-text-field append-icon="search"></v-text-field>
        </v-layout>

        <div>Receipt List</div>
      </v-flex>
      <v-flex sm12 md6>
        <div>DetailedCard</div>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import CreateReceipt from '~/components/createreceipt'
export default {
  async fetch({ store }) {
    await store.dispatch('loadCustomers')
  },
  components: {
    CreateReceipt: CreateReceipt
  }
}
</script>