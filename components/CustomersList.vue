<template>
  <v-data-table :headers="headers" :items="customers" item-key="name" hide-actions>
    <template slot="items" slot-scope="props">
      <tr @click="openCustomer(props.item.id)">
        <td>{{ props.item.name}}</td>
        <td>{{ props.item.personalNumber}}</td>
      </tr>
    </template>
  </v-data-table>
</template>
<script>
export default {
  methods: {
    openCustomer(id) {
      console.log('customer' + id)
      this.$store.dispatch('loadOpenCustomer', id)
    }
  },
  computed: {
    customers() {
      return this.$store.getters.customers
    }
  },
  data() {
    return {
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
  }
}
</script>