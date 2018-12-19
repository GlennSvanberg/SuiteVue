<template>
  <v-dialog width="800px" persistent v-model="createReceiptDialog">
    <v-btn class="primary" slot="activator">
      <v-icon>add</v-icon>Nytt Kvitto
    </v-btn>
    <v-card>
      <v-toolbar dark color="primary">
        <v-toolbar-title>Nytt Kvitto</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-container fluid>
        <v-card-text>
          <v-form v-model="valid" ref="form" lazy-validation class="my-3">
            <search-user @sellerChange="sellerChange" class="my-3"></search-user>
            <search-store @storeChange="storeChange" class="my-3"></search-store>
            <search-customer @customerChange="customerChange" class="my-3"></search-customer>
            <v-layout row wrap class="mt-4">
              <v-flex xs12 sm8>
                <search-subscriuption
                  @supplierChange="supplierChange"
                  @subscriptionChange="subscriptionChange"
                ></search-subscriuption>
                <v-text-field
                  class="ml-5"
                  label="Abonnemangsnummer"
                  type="number"
                  v-model="subscriptionNumber"
                  clearable
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm4>
                <v-card class="ml-4">
                  <v-card-title class="primary white--text py-3">
                    <h4>Totalt</h4>
                  </v-card-title>
                  <v-divider></v-divider>
                  <v-list dense>
                    <v-list-tile>
                      <v-list-tile-content>TB:</v-list-tile-content>
                      <v-list-tile-action class="align-end text-xs-right">{{tb}}</v-list-tile-action>
                    </v-list-tile>
                    <v-list-tile>
                      <v-list-tile-content>Ersättning:</v-list-tile-content>
                      <v-list-tile-action class="align-end text-right">{{revenue}}</v-list-tile-action>
                    </v-list-tile>
                    <v-list-tile>
                      <v-list-tile-content>Total Månadskostnad:</v-list-tile-content>
                      <v-list-tile-action class="align-end text-right">{{monthlyCost}}</v-list-tile-action>
                    </v-list-tile>
                  </v-list>
                </v-card>
              </v-flex>
            </v-layout>
          </v-form>
        </v-card-text>
      </v-container>
      <v-flex xs12>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="red--text darken-1" flat @click="createReceiptDialog = false">Avbryt</v-btn>
          <v-btn class="green--text darken-1" flat @click="createReceipt" :disabled="!valid">Spara</v-btn>
        </v-card-actions>
      </v-flex>
    </v-card>
  </v-dialog>
</template>
<script>
import { validationMixin } from 'vuelidate'
import { required, maxLength, email } from 'vuelidate/lib/validators'
import SearchUser from '~/components/searchUser'
import SearchCustomer from '~/components/searchcustomer'
import SearchStore from '~/components/searchstore'
import SearchSubscription from '~/components/searchsubscription'

export default {
  created() {
    this.$store.dispatch('loadUsers')
    this.$store.dispatch('loadStores')
  },
  components: {
    SearchCustomer: SearchCustomer,
    SearchUser: SearchUser,
    SearchStore: SearchStore,
    SearchSubscriuption: SearchSubscription
  },
  data() {
    return {
      valid: false,
      createReceiptDialog: false,
      sellerId: '',
      customerId: null,
      storeId: null,
      products: [],
      supplierId: '',
      subscrptionId: '',
      subscriptionAddon: '',
      subscriptionNumber: '',
      revenue: 0,
      tb: 0,
      monthlyCost: 0
    }
  },
  computed: {},
  methods: {
    customerChange(val) {
      this.customerId = val
    },
    sellerChange(val) {
      this.sellerId = val
    },
    storeChange(val) {
      console.log('store' + val)
      this.storeId = val
    },
    supplierChange(val) {
      console.log('supplier' + val)
      this.supplierId = val
    },
    subscriptionChange(val) {
      console.log('subscription' + JSON.stringify(val))
      this.subscriptionId = val.id
      this.revenue = val.revenue
      this.tb = this.revenue
      this.monthlyCost = val.pricePerMonth
    },
    clear() {
      this.$refs.form.reset()
    },
    createReceipt() {
      if (this.$refs.form.validate()) {
        console.log('creating')

        //this.$store.dispatch('createReceipt', {})

        //this.$refs.form.reset()
        this.createCustomerDialog = false
      }
    }
  }
}
</script>