<template>
  <v-layout>Customer{{customer.firstName}}</v-layout>
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