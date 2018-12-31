<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card>
          <v-layout row class="mx-3">
            <v-toolbar flat tabs color="accent">
              <v-tabs v-model="active" color="primary" slider-color="white" grow>
                <v-tab
                  @click="changeTab(supplier)"
                  v-for="supplier in suppliers"
                  :key="supplier.Id"
                  ripple
                >{{ supplier.name }}</v-tab>
              </v-tabs>
            </v-toolbar>
          </v-layout>
          <v-card flat>
            <subscriptions :supplier="supplier" v-if="supplier.subscriptionSupplier"></subscriptions>
            <supplier-calculations v-if="!supplier.subscriptionSupplier"></supplier-calculations>
          </v-card>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import Subscriptions from '~/components/subscriptions'
import SupplierCalculations from '~/components/SupplierCalculations'

export default {
  async fetch({ store }) {
    await store.dispatch('loadSuppliers')
  },
  created() {
    this.supplier = this.suppliers[0]
  },
  data() {
    return {
      supplier: null,
      active: null
    }
  },
  methods: {
    changeTab(supplier) {
      this.supplier = supplier
    }
  },

  computed: {
    suppliers() {
      return this.$store.getters.suppliers
    }
  },
  components: {
    Subscriptions: Subscriptions,
    SupplierCalculations: SupplierCalculations
  }
}
</script>
