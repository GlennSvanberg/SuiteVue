<template>
  <v-dialog width="450px" persistent v-model="createCustomerDialog">
    <v-btn class="primary" slot="activator">
      <v-icon>add</v-icon>Ny Kund
    </v-btn>
    <v-card>
      <v-toolbar dark color="primary">
        <v-toolbar-title>Ny Kund</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-container>
        <v-card-text>
          <v-form>
            <v-text-field append-icon="face" label="Förnamn" type="text" v-model="firstName"></v-text-field>
            <v-text-field append-icon="face" label="Efternamn" type="text" v-model="lastName"></v-text-field>
            <v-text-field
              append-icon="dialpad"
              label="Personnummer"
              type="text"
              v-model="personalNumber"
            ></v-text-field>
            <v-text-field append-icon="phone" label="Tel" type="text" v-model="phone"></v-text-field>
            <v-text-field
              append-icon="email"
              class="mb-4"
              label="Email"
              type="text"
              v-model="email"
            ></v-text-field>
            <v-text-field append-icon="location_city" label="Adress" type="text" v-model="adress"></v-text-field>
            <v-text-field
              append-icon="location_city"
              label="Postnummer"
              type="text"
              v-model="zipCode"
            ></v-text-field>
            <v-text-field append-icon="location_city" label="Stad" type="text" v-model="city"></v-text-field>
          </v-form>
        </v-card-text>
      </v-container>

      <v-flex xs12>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="red--text darken-1" flat @click="createCustomerDialog = false">Avbryt</v-btn>
          <v-btn class="green--text darken-1" flat @click="createCustomer">Spara</v-btn>
        </v-card-actions>
      </v-flex>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  data() {
    return {
      createCustomerDialog: false,
      firstName: '',
      lastName: '',
      personalNumber: null,
      phone: '',
      email: '',
      adress: '',
      zipCode: '',
      city: ''
    }
  },
  computed: {},
  methods: {
    createCustomer() {
      console.log('creating')
    }
  }
}
</script>