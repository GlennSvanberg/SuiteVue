<template>
  <v-card flat>
    <v-layout row>
      <v-flex xs8>
        <v-autocomplete
          class="ml-3"
          v-model="customer"
          :items="customers"
          label="Kund"
          prepend-icon="face"
          item-value="customer"
          item-text="personalNumber"
          return-object
          flat
          clearable
          :search-input.sync="search"
        >
          <template slot="selection" slot-scope="{ item, selected }">
            <span
              v-if="item.personalNumber != null"
              :selected="selected"
              v-text="item.name + ' - ' + item.personalNumber"
            ></span>
          </template>
          <template slot="item" slot-scope="data">
            <v-list-tile>
              <v-list-tile-content v-if="typeof data.item !== 'object'" v-text="data.item"></v-list-tile-content>
              <v-list-tile-content v-else>
                <v-list-tile-title v-html="data.item.personalNumber"></v-list-tile-title>
                <v-list-tile-sub-title v-html="data.item.name"></v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
          </template>
        </v-autocomplete>
      </v-flex>
      <v-flex xs4>
        <no-ssr>
          <create-customer class="ml-3" v-if="!customer" @newCustomer="newCustomer"></create-customer>
        </no-ssr>
      </v-flex>
    </v-layout>
  </v-card>
</template>

<script>
import CreateCustomer from '~/components/createcustomer'
export default {
  components: {
    CreateCustomer: CreateCustomer
  },
  computed: {
    customers() {
      return this.$store.getters.customers
    },
    loadedCustomer() {
      return this.$store.getters.loadedCustomer
    }
  },
  watch: {
    loadedCustomer(val) {
      if (this.customer.personalNumber == val.id) {
        this.customer.id = val.id
      }
    },
    customer(val) {
      if (val) {
        this.$emit('customerChange', val.id)
      }
    }
  },
  methods: {
    newCustomer(val) {
      this.customer = val
    }
  },
  data() {
    return {
      customer: null,
      search: null
    }
  }
}
</script>
<style scoped>
</style>