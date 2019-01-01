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
          <v-form v-model="valid" ref="form" lazy-validation>
            <search-user @sellerChange="sellerChange" class="mb-3"></search-user>
            <search-store @storeChange="storeChange" class="my-3"></search-store>
            <search-customer @customerChange="customerChange" class="my-3"></search-customer>
            <v-layout row wrap>
              <v-flex xs12 sm8>
                <search-subscription
                  @supplierChange="supplierChange"
                  @subscriptionChange="subscriptionChange"
                  @addonChange="addonChange"
                ></search-subscription>
                <v-text-field
                  class="ml-5"
                  label="Abonnemangsnummer"
                  type="number"
                  v-model="subscriptionNumber"
                ></v-text-field>

                <search-product @productChanged="productChanged"></search-product>
              </v-flex>
              <v-flex xs12 sm4>
                <v-card class="ml-4" light>
                  <v-card-title class="primary white--text py-3">
                    <h4>Totalt</h4>
                  </v-card-title>
                  <v-divider></v-divider>
                  <v-list dense>
                    <v-list-tile :class="{error: tb < 0}">
                      <v-list-tile-content>TB:</v-list-tile-content>
                      <v-list-tile-action class="align-end text-xs-right">{{tb}} kr</v-list-tile-action>
                    </v-list-tile>
                    <v-list-tile>
                      <v-list-tile-content>Kostnad:</v-list-tile-content>
                      <v-list-tile-action class="align-end text-right">{{cost}} kr</v-list-tile-action>
                    </v-list-tile>
                    <v-list-tile>
                      <v-list-tile-content>Ersättning:</v-list-tile-content>
                      <v-list-tile-action class="align-end text-right">{{revenue}} kr</v-list-tile-action>
                    </v-list-tile>
                    <v-list-tile>
                      <v-list-tile-content>Månadskostnad:</v-list-tile-content>
                      <v-list-tile-action class="align-end text-right">{{monthlyCost}} kr</v-list-tile-action>
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
          <v-btn class="error" @click="createReceiptDialog = false">
            <v-icon left>cancel</v-icon>Avbryt
          </v-btn>
          <v-btn class="success" @click="createReceipt" :disabled="!valid">
            <v-icon left>save</v-icon>Spara
          </v-btn>
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
import SearchProduct from '~/components/searchproduct'

export default {
  created() {
    this.$store.dispatch('loadUsers')
    this.$store.dispatch('loadStores')
    this.$store.dispatch('loadProducts')
  },
  components: {
    SearchCustomer: SearchCustomer,
    SearchUser: SearchUser,
    SearchStore: SearchStore,
    SearchSubscription: SearchSubscription,
    SearchProduct: SearchProduct
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
      subscriptionId: '',
      addonId: '',
      subscriptionNumber: '',
      subscriptionRevenue: 0,
      addonRevenue: 0,
      monthlyCost: 0,
      cost: 0
    }
  },
  computed: {
    revenue() {
      return this.subscriptionRevenue + this.addonRevenue
    },
    tb() {
      return this.subscriptionRevenue + this.addonRevenue - this.cost
    }
  },
  methods: {
    customerChange(val) {
      this.customerId = val
    },
    sellerChange(val) {
      this.sellerId = val
    },
    storeChange(val) {
      this.storeId = val
    },
    supplierChange(val) {
      this.supplierId = val
    },
    subscriptionChange(val) {
      this.subscriptionId = val.id
      this.subscriptionRevenue = val.revenue
      this.monthlyCost = val.pricePerMonth
    },
    addonChange(val) {
      console.log('addonChange' + JSON.stringify(val))
      this.addonRevenue = val.revenue
      this.addonId = val.id
    },
    productChanged(val) {
      this.products = val.products
      this.cost = val.cost
    },
    clear() {
      this.$refs.form.reset()
    },
    createReceipt() {
      if (this.$refs.form.validate()) {
        console.log('creating')
        var receipt = {
          sellerId: this.sellerId,
          customerId: this.customerId,
          storeId: this.storeId,
          supplierId: this.supplierId,
          subscriptionId: this.subscriptionId,
          subscriptionAddonId: this.addonId,
          subscriptionNumber: this.subscriptionNumber,
          productIds: this.products
        }

        this.$store.dispatch('addReceipt', receipt)

        //this.reset()
        this.createReceiptDialog = false
      }
    }
  }
}
</script>