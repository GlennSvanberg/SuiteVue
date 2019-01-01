<template>
  <v-card flat>
    <v-layout row>
      <v-flex xs12>
        <v-select
          class="ml-5"
          v-model="supplier"
          :items="suppliers"
          item-text="name"
          label="Operatör"
          return-object
        ></v-select>
        <v-select
          v-if="supplier.subscriptions"
          class="ml-5"
          v-model="subscription"
          :items="supplier.subscriptions"
          item-text="title"
          label="Abonnemang"
          return-object
          clearable
        ></v-select>
        <v-select
          v-if="supplier.subscriptionAddons"
          class="ml-5"
          v-model="addon"
          :items="supplier.subscriptionAddons"
          item-text="title"
          label="Tillägg"
          return-object
          clearable
        ></v-select>
      </v-flex>
    </v-layout>
  </v-card>
</template>

<script>
export default {
  computed: {
    suppliers() {
      return this.$store.getters.suppliers
    }
  },
  watch: {
    supplier(val) {
      if (val) {
        this.$emit('supplierChange', val.id)
        this.subscription = null
      }
    },
    subscription(val) {
      if (val) {
        this.$emit('subscriptionChange', {
          id: val.id,
          revenue: val.revenue,
          pricePerMonth: val.pricePerMonth
        })
      } else {
        this.$emit('subscriptionChange', {
          subscriptionId: null,
          addonId: null,
          revenue: 0,
          pricePerMonth: 0
        })
      }
    },
    addon(val) {
      if (val) {
        this.$emit('addonChange', {
          id: val.id,
          revenue: val.revenue,
          pricePerMonth: val.pricePerMonth
        })
      } else {
        this.$emit('addonChange', {
          id: null,
          revenue: 0,
          pricePerMonth: 0
        })
      }
    }
  },
  data() {
    return {
      supplier: { subscriptions: [], subscriptionAddons: [] },
      subscription: null,
      addon: null,
      search: null
    }
  }
}
</script>
<style scoped>
</style>