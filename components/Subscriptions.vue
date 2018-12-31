<template>
  <v-layout row wrap>
    <v-flex xs12>
      <v-card class="mb-4">
        <v-card-title>
          <v-toolbar dense class="mx-2" color="primary">Abonnemang</v-toolbar>
          <v-text-field
            v-model="searchSubscription"
            append-icon="search"
            label="Sök"
            single-line
            hide-details
            class="mx-4"
          ></v-text-field>
          <v-btn class="primary" @click="addSubscription">
            <v-icon dark left>add</v-icon>Lägg till abonnemang
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-data-table
            flat
            v-if="supplier != null"
            :headers="subscriptionHeaders"
            :items="supplier.subscriptions"
            hide-actions
            :search="searchSubscription"
          >
            <template slot="items" slot-scope="props">
              <tr>
                <td>{{ props.item.supplierName}}</td>
                <td>{{ props.item.title}}</td>
                <td>{{ props.item.revenue}} kr</td>
                <td>{{ props.item.pricePerMonth }} kr</td>
                <td>{{ props.item.periodInMonths }} Månader</td>
                <td class="justify-center layout px-0">
                  <v-icon small class="mr-2" @click="editSubscription(props.item)">edit</v-icon>
                  <v-icon small @click="deleteSubscription(props.item)">delete</v-icon>
                </td>
              </tr>
            </template>
          </v-data-table>
        </v-card-text>
      </v-card>

      <v-card>
        <v-card-title>
          <v-toolbar color="primary" dense>Tillägg</v-toolbar>
          <v-text-field
            v-model="searchAddon"
            append-icon="search"
            label="Sök"
            single-line
            hide-details
            class="mx-4"
          ></v-text-field>
          <v-btn class="primary" @click="addSubscriptionAddon">
            <v-icon dark left>add</v-icon>Lägg till Tillägg
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-data-table
            flat
            v-if="supplier != null"
            :headers="subscriptionAddonHeaders"
            :items="supplier.subscriptionAddons"
            hide-actions
            :search="searchAddon"
          >
            <template slot="items" slot-scope="props">
              <tr>
                <td>{{ props.item.supplierName}}</td>
                <td>{{ props.item.title}}</td>
                <td>{{ props.item.revenue}} kr</td>
                <td>{{ props.item.pricePerMonth }} kr</td>
                <td>{{ props.item.periodInMonths }} Månader</td>
                <td class="justify-center layout px-0">
                  <v-icon small class="mr-2" @click="editAddon(props.item)">edit</v-icon>
                  <v-icon small @click="deleteAddon(props.item)">delete</v-icon>
                </td>
              </tr>
            </template>
          </v-data-table>
        </v-card-text>
      </v-card>
    </v-flex>

    <v-dialog v-model="subscriptionDialog" max-width="500px" persistent>
      <v-card>
        <v-toolbar dark color="primary">
          <span class="headline">{{ formTitle }}</span>
        </v-toolbar>
        <v-container>
          <v-card-text>
            <v-form>
              <v-text-field v-model="sub.title" label="Titel"></v-text-field>
              <v-text-field v-model="sub.revenue" type="number" label="Intäkt"></v-text-field>
              <v-text-field v-model="sub.pricePerMonth" type="number" label="Månadskostnad"></v-text-field>
              <v-text-field v-model="sub.periodInMonths" type="number" label="Bindningstid"></v-text-field>
            </v-form>
          </v-card-text>
        </v-container>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="error" @click="close">
            <v-icon left>cancel</v-icon>Avbryt
          </v-btn>
          <v-btn class="success" @click="save">
            <v-icon left>save</v-icon>Spara
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="confirmDeleteDialog" max-width="400px" persistent>
      <v-card>
        <v-toolbar dark color="primary">
          <span class="headline">Bekräfta</span>
        </v-toolbar>
        <v-card-text>
          <div class="my-4 mx-3">
            <span class="headline">Vill du verkligen ta bort {{itemToDelete.title}}?</span>
          </div>
        </v-card-text>
        <v-card-actions class="mt-5">
          <v-spacer></v-spacer>
          <v-btn class="error" @click="close">
            <v-icon left>cancel</v-icon>Avbryt
          </v-btn>
          <v-btn class="success" @click="confirmDeleteItem">
            <v-icon left>delete</v-icon>Ta Bort
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>
<script>
export default {
  props: {
    supplier: {
      type: Object,
      default: {
        name: ''
      }
    }
  },
  data() {
    return {
      id: '',
      title: '',
      revenue: '',
      pricePerMonth: '',
      periodInMonths: '',

      searchSubscription: '',
      searchAddon: '',
      editing: false,
      key: null,
      addon: false,
      itemToDelete: {},
      subscriptionDialog: false,
      confirmDeleteDialog: false,
      subscriptionHeaders: [
        { text: 'Abonnemang', value: 'supplierName' },
        { text: 'Titel', value: 'title' },
        { text: 'Intäkt', value: 'revenue' },
        { text: 'Månadskostnad', value: 'pricePerMonth' },
        { text: 'Bindingstid', value: 'periodInMonths' }
      ],
      subscriptionAddonHeaders: [
        { text: 'Tillägg', value: 'supplierName' },
        { text: 'Titel', value: 'title' },
        { text: 'Intäkt', value: 'revenue' },
        { text: 'Månadskostnad', value: 'pricePerMonth' },
        { text: 'Bindingstid', value: 'periodInMonths' }
      ]
    }
  },
  methods: {
    addSubscription() {
      this.addon = false
      this.subscriptionDialog = true
      this.editing = false
      this.clearValues()
    },
    addSubscriptionAddon() {
      this.addon = true
      this.subscriptionDialog = true
      this.editing = false
      this.clearValues()
    },
    save() {
      if (this.addon) {
        if (this.editing) {
          console.log('yoo mannen')
          this.$store.dispatch('editAddon', this.sub)
        } else {
          this.$store.dispatch('addAddon', this.sub)
        }
      } else {
        if (this.editing) {
          this.$store.dispatch('editSubscription', this.sub)
        } else {
          this.$store.dispatch('addSubscription', this.sub)
        }
      }
      this.subscriptionDialog = false
    },
    close() {
      this.subscriptionDialog = false
      this.confirmDeleteDialog = false
    },
    clearValues() {
      ;(this.sub.id = ''),
        (this.sub.title = ''),
        (this.sub.revenue = ''),
        (this.sub.pricePerMonth = ''),
        (this.sub.periodInMonths = '24')
    },
    setValues(val) {
      ;(this.sub.id = val.id),
        (this.sub.title = val.title),
        (this.sub.revenue = val.revenue),
        (this.sub.pricePerMonth = val.pricePerMonth),
        (this.sub.periodInMonths = val.periodInMonths)
    },
    editSubscription(val) {
      this.editing = true
      this.addon = false
      this.setValues(val)
      this.subscriptionDialog = true
    },
    editAddon(val) {
      this.editing = true
      this.addon = true
      this.setValues(val)
      this.subscriptionDialog = true
    },
    deleteSubscription(val) {
      this.itemToDelete = val
      this.addon = false
      this.confirmDeleteDialog = true
    },
    deleteAddon(val) {
      this.itemToDelete = val
      this.addon = true
      this.confirmDeleteDialog = true
    },
    confirmDeleteItem() {
      if (this.addon) {
        this.$store.dispatch('deleteAddon', this.itemToDelete.id)
      } else {
        this.$store.dispatch('deleteSubscription', this.itemToDelete.id)
      }
      this.confirmDeleteDialog = false
    }
  },
  watch: {},
  computed: {
    sub() {
      return {
        id: this.id,
        supplierId: this.supplier.id,
        title: this.title,
        revenue: this.title,
        pricePerMonth: this.pricePerMonth,
        periodInMonths: this.periodInMonths
      }
    },
    suppliers() {
      return this.$store.getters.suppliers
    },
    formTitle() {
      if (this.editing) {
        if (this.addon) {
          return 'Redigera Tillägg - ' + this.supplier.name
        } else {
          return 'Redigera Abonnemang - ' + this.supplier.name
        }
      } else {
        if (this.addon) {
          return 'Nytt Tillägg - ' + this.supplier.name
        } else {
          return 'Nytt Abonnemang - ' + this.supplier.name
        }
      }
    }
  },
  components: {}
}
</script>
