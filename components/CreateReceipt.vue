<template>
  <v-dialog width="750px" persistent v-model="createReceiptDialog">
    <v-btn class="primary" slot="activator">
      <v-icon>add</v-icon>Nytt Kvitto
    </v-btn>
    <v-card>
      <v-toolbar dark color="primary">
        <v-toolbar-title>Nytt Kvitto</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-container>
        <v-card-text>
          <v-form v-model="valid" ref="form" lazy-validation>
            <search-user @sellerChange="sellerChange"></search-user>
            <search-customer @customerChange="customerChange"></search-customer>
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

export default {
  created() {
    this.$store.dispatch('loadUsers')
  },
  components: {
    SearchCustomer: SearchCustomer,
    SearchUser: SearchUser
  },
  data() {
    return {
      valid: false,
      createReceiptDialog: false,
      sellerId: '',
      customerId: null,
      store: null,
      products: [],
      subsrption: '',
      subscriptionAddon: ''
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