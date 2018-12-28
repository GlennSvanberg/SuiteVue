<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card>
          <v-layout row class="mx-3"></v-layout>
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
                <v-btn slot="activator" class="primary" @click="addProduct">
                  <v-icon dark left>add</v-icon>Lägg till produkt
                </v-btn>
                <v-card>
                  <v-toolbar dark color="primary">
                    <span class="headline">{{ formTitle }}</span>
                  </v-toolbar>
                  <v-container>
                    <v-card-text>
                      <v-form>
                        <v-text-field v-model="title" label="Titel"></v-text-field>
                        <v-text-field v-model="cost" type="number" label="Kostnad"></v-text-field>
                        <v-textarea v-model="description" label="Beskrivning"></v-textarea>
                      </v-form>
                    </v-card-text>
                  </v-container>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn class="red--text darken-1" flat @click="close">Avbryt</v-btn>
                    <v-btn class="green--text darken-1" flat @click="saveProduct">Spara</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-card-title>
            <v-data-table
              flat
              v-if="products != null"
              :headers="headers"
              :items="products"
              hide-actions
              :search="search"
            >
              <template slot="items" slot-scope="props">
                <tr>
                  <td>{{ props.item.title}}</td>
                  <td>{{ props.item.description}}</td>
                  <td>{{ props.item.cost}} kr</td>
                  <td class="justify-center layout px-0">
                    <v-icon small class="mr-2" @click="editProduct(props.item)">edit</v-icon>
                    <v-icon small @click="deleteProduct(props.item)">delete</v-icon>
                  </td>
                </tr>
              </template>
              <template slot="no-data">
                <v-alert :value="true" color="error" icon="warning">Inga produkter tillagda på ännu</v-alert>
              </template>
            </v-data-table>
          </v-card>
        </v-card>
      </v-flex>
    </v-layout>

    <v-dialog v-model="confirmDeleteDialog" max-width="400px" persistent>
      <v-card>
        <v-toolbar dark color="primary">
          <span class="headline">Bekräfta</span>
        </v-toolbar>
        <v-card-content>
          <div class="my-4 mx-3">
            <span class="headline">Vill du verkligen ta bort {{productToDelete.title}}?</span>
          </div>
        </v-card-content>
        <v-card-actions class="mt-5">
          <v-spacer></v-spacer>
          <v-btn class="green--text darken-1" flat @click="close">Nej</v-btn>
          <v-btn class="red--text darken-1" flat @click="confirmDeleteProduct">Ja</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<script>
export default {
  async fetch({ store }) {
    await store.dispatch('loadProducts')
  },
  data() {
    return {
      search: '',
      editing: false,
      dialog: false,
      confirmDeleteDialog: false,
      productToDelete: {},
      id: '',
      title: '',
      cost: '',
      description: '',
      headers: [
        { text: 'Titel', value: 'title' },
        { text: 'Beskrivning', value: 'description' },
        { text: 'Kostnad', value: 'cost' }
      ]
    }
  },
  methods: {
    confirmDeleteProduct() {
      this.$store.dispatch('deleteProduct', this.productToDelete.id)
      this.confirmDeleteDialog = false
    },
    deleteProduct(val) {
      this.productToDelete = val
      this.confirmDeleteDialog = true
    },
    editProduct(val) {
      this.editing = true
      this.id = val.id
      ;(this.title = val.title),
        (this.description = val.description),
        (this.cost = val.cost)
      this.dialog = true
    },
    close() {
      this.dialog = false
      this.confirmDeleteDialog = false
      this.editing = false
    },
    saveProduct() {
      if (this.editing) {
        this.$store.dispatch('editProduct', {
          id: this.id,
          title: this.title,
          description: this.description,
          cost: this.cost
        })
      } else {
        this.$store.dispatch('addProduct', {
          title: this.title,
          description: this.description,
          cost: this.cost
        })
      }

      this.dialog = false
    },
    addProduct() {
      this.editing = false
      ;(this.title = ''), (this.description = ''), (this.cost = '')
    }
  },
  computed: {
    products() {
      return this.$store.getters.products
    },
    formTitle() {
      if (this.editing) {
        return 'Redigera Produkt'
      }
      return 'Ny Produkt'
    }
  }
}
</script>