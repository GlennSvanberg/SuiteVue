<template>
  <v-layout>
    <v-flex v-if="customer != undefined">{{customer.name}}</v-flex>
  </v-layout>
</template>
<script>
export default {
  computed: {
    customer() {
      return this.$store.getters.loadedCustomer
    }
  }
}
</script>
