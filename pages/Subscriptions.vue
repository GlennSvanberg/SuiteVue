<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card>
          <v-layout row class="mx-3">
            <v-toolbar flat tabs>
              <v-tabs v-model="active" color="primary" dark slider-color="white" grow>
                <v-tab
                  @click="changeTab(supplier)"
                  v-for="supplier in suppliers"
                  :key="supplier.Id"
                  ripple
                >{{ supplier.name }}</v-tab>
              </v-tabs>
            </v-toolbar>
          </v-layout>
          <v-card flat>
            <v-card-title>
              <v-text-field
                v-model="search"
                append-icon="search"
                label="Sök"
                single-line
                hide-details
                class="mx-4"
              ></v-text-field>

              <v-dialog v-model="dialog" max-width="500px" persistent>
                <v-btn slot="activator" class="primary" @click="addSubscription">
                  <v-icon dark left>add</v-icon>Lägg till abonnemang
                </v-btn>
                <v-card>
                  <v-toolbar dark color="primary">
                    <span class="headline">{{ formTitle }}</span>
                  </v-toolbar>
                  <v-container>
                    <v-card-text>
                      <v-form>
                        <v-text-field v-model="title" label="Titel"></v-text-field>
                        <v-text-field v-model="revenue" type="number" label="Intäkt"></v-text-field>
                        <v-text-field v-model="pricePerMonth" type="number" label="Månadskostnad"></v-text-field>
                        <v-text-field v-model="periodInMonths" type="number" label="Bindningstid"></v-text-field>
                      </v-form>
                    </v-card-text>
                  </v-container>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn class="red--text darken-1" flat @click="close">Avbryt</v-btn>
                    <v-btn class="green--text darken-1" flat @click="saveSubscription">Spara</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-card-title>

            <v-data-table
              flat
              v-if="supplier != null"
              :headers="headers"
              :items="supplier.subscriptions"
              hide-actions
              :search="search"
            >
              <template slot="items" slot-scope="props">
                <tr>
                  <td>{{ props.item.supplierName}}</td>
                  <td>{{ props.item.title}}</td>
                  <td>{{ props.item.revenue}} kr</td>
                  <td>{{ props.item.pricePerMonth }} kr</td>
                  <td>{{ props.item.periodInMonths }} Månader</td>
                  <td class="justify-center layout px-0">
                    <v-icon small class="mr-2" @click="editItem(props.item)">edit</v-icon>
                    <v-icon small @click="deleteItem(props.item)">delete</v-icon>
                  </td>
                </tr>
              </template>
              <template slot="no-data">
                <v-alert
                  :value="true"
                  color="error"
                  icon="warning"
                >Inga abonnemang tillagda på denna operatör ännu</v-alert>
              </template>
            </v-data-table>
          </v-card>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import CreateCustomer from '~/components/createcustomer'

export default {
  async fetch({ store }) {
    await store.dispatch('loadSuppliers')
  },
  created() {
    this.supplier = this.suppliers[0]
  },
  data() {
    return {
      id: '',
      title: '',
      revenue: '',
      pricePerMonth: '',
      periodInMonths: '',
      dialog: false,
      search: '',
      supplier: null,
      active: null,
      editing: false,
      key: null,
      headers: [
        { text: 'Leverantör', value: 'supplierName' },
        { text: 'Titel', value: 'title' },
        { text: 'Intäkt', value: 'revenue' },
        { text: 'Månadskostnad', value: 'pricePerMonth' },
        { text: 'Bindingstid', value: 'periodInMonths' }
      ]
    }
  },
  methods: {
    addSubscription() {
      this.editing = false
      ;(this.id = ''),
        (this.title = ''),
        (this.revenue = ''),
        (this.pricePerMonth = ''),
        (this.periodInMonths = '24')
    },
    saveSubscription() {
      if (this.editing) {
        this.$store.dispatch('editSubscription', {
          supplierId: this.supplier.id,
          id: this.id,
          title: this.title,
          pricePerMonth: this.pricePerMonth,
          revenue: this.revenue,
          periodInMonths: this.periodInMonths
        })
      } else {
        this.$store
          .dispatch('addSubscription', {
            supplierId: this.supplier.id,
            title: this.title,
            pricePerMonth: this.pricePerMonth,
            revenue: this.revenue,
            periodInMonths: this.periodInMonths
          })
          .then(() => {
            this.$store.dispatch('loadSuppliers')
            // lägger inte alltid till ett nytt abonnemang, mpste refresha
          })
        this.dialog = false

        console.log('saving' + this.title + this.revenue)
      }
    },
    close() {
      this.dialog = false
    },
    editItem(val) {
      this.editing = true
      ;(this.id = val.id),
        (this.title = val.title),
        (this.revenue = val.revenue),
        (this.pricePerMonth = val.pricePerMonth),
        (this.periodInMonths = val.periodInMonths)

      this.dialog = true
      console.log('item to edit' + JSON.stringify(val))
    },
    deleteItem(val) {
      console.log('item to delete' + JSON.stringify(val))
      this.$store.dispatch('deleteSubscription', val.id)
    },
    changeTab(supplier) {
      console.log('test' + JSON.stringify(supplier))
      this.supplier = supplier
    }
  },
  watch: {},
  computed: {
    suppliers() {
      return this.$store.getters.suppliers
    },
    formTitle() {
      if (this.editing) {
        return 'Redigera Abonnemang - ' + this.supplier.name
      }
      return 'Nytt Abonnemang - ' + this.supplier.name
    }
  },
  components: {}
}
</script>
