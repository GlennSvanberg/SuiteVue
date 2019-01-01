<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex sm12 md6>
        <v-layout row class="mx-3">
          <create-receipt class="m-5"></create-receipt>
          <v-text-field append-icon="search" v-model="search"></v-text-field>
        </v-layout>
        <v-data-table
          v-model="selected"
          :headers="headers"
          :items="receipts"
          item-key="id"
          hide-actions
          class="mx-3"
          :search="search"
          style="cursor:pointer;"
        >
          <template slot="items" slot-scope="props">
            <tr
              :class="{primary: props.selected , marked: props.selected}"
              :active="props.selected"
              @click="props.selected = !props.selected, openReceipt(props.item.id)"
            >
              <td>{{ props.item.state}}</td>
              <td>{{ props.item.sellerName}}</td>
              <td>{{ props.item.customerName}}</td>
              <td>{{ props.item.storeName}}</td>
              <td>{{ props.item.created}}</td>
            </tr>
          </template>
        </v-data-table>

        <div>Receipt List</div>
      </v-flex>
      <v-flex sm12 md6>
        <receipt-details class="mx-3"></receipt-details>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import CreateReceipt from '~/components/createreceipt'
import ReceiptDetails from '~/components/receiptdetails'
export default {
  async fetch({ store }) {
    await store.dispatch('loadReceipts')
  },
  created() {
    this.$store.dispatch('loadCustomers')
    this.$store.dispatch('loadSuppliers')
  },
  data() {
    return {
      headers: [
        {
          text: 'Status',
          align: 'left',
          value: 'state'
        },
        { text: 'Säljare', value: 'sellerName' },
        { text: 'Kund', value: 'customerName' },
        { text: 'Butik', value: 'storeName' },
        { text: 'Skapad', value: 'created' }
      ],
      search: '',
      selected: []
    }
  },
  methods: {
    openReceipt(id) {
      this.$store.dispatch('loadOpenReceipt', id)
      if (this.selected.length == 2) {
        this.selected.splice(0, 1)
      }
    }
  },
  computed: {
    receipts() {
      return this.$store.getters.receipts
    }
  },
  components: {
    CreateReceipt: CreateReceipt,
    ReceiptDetails: ReceiptDetails
  }
}
</script>