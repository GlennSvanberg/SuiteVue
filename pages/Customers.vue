<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex sm12 md6>
        <v-layout row class="mx-3">
          <create-customer class="m-5"></create-customer>
          <v-text-field class="ml-5" v-model="search" prepend-icon="search" clearable></v-text-field>
        </v-layout>
        <v-data-table
          v-model="selected"
          :headers="headers"
          :items="customers"
          item-key="name"
          hide-actions
          class="mx-3"
          :search="search"
          style="cursor:pointer;"
        >
          <template slot="items" slot-scope="props">
            <tr
              :class="{primary: props.selected , marked: props.selected}"
              :active="props.selected"
              @click="props.selected = !props.selected, openCustomer(props.item.id)"
            >
              <td>{{ props.item.name}}</td>
              <td>{{ props.item.personalNumber}}</td>
            </tr>
          </template>
        </v-data-table>
      </v-flex>
      <v-flex sm12 md6>
        <customer-details class="mx-3"></customer-details>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import CustomerDetails from '~/components/customerdetails'
import CreateCustomer from '~/components/createcustomer'

export default {
  async fetch({ store }) {
    await store.dispatch('loadCustomers')
  },
  data() {
    return {
      selected: [],
      search: '',
      headers: [
        {
          text: 'Namn',
          align: 'left',
          sortable: false,
          value: 'name'
        },
        { text: 'Personnummer', value: 'personalNumber' }
      ]
    }
  },
  methods: {
    openCustomer(id) {
      this.$store.dispatch('loadOpenCustomer', id)
      if (this.selected.length == 2) {
        this.selected.splice(0, 1)
      }
    }
  },
  computed: {
    customers() {
      return this.$store.getters.customers
    }
  },

  components: {
    CustomerDetails: CustomerDetails,
    CreateCustomer: CreateCustomer
  }
}

</script>

<style>
.marked {
  color: white;
}
</style>