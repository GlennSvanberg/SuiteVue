<template>
  <v-dialog width="800px" persistent v-model="createCustomerDialog">
    <v-btn class="primary" slot="activator">
      <v-icon>add</v-icon>Ny Kund
    </v-btn>
    <v-card>
      <v-toolbar dark color="primary">
        <v-toolbar-title>Ny Kund</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-flex xs6 offset-xs3>
        <v-card-text>
          <v-form v-model="valid" ref="form" lazy-validation>
            <v-text-field
              append-icon="dialpad"
              label="Personnummer"
              type="number"
              v-model="personalNumber"
              required
              :rules="personalNumberRules"
            ></v-text-field>
            <v-text-field
              append-icon="face"
              label="Förnamn"
              type="text"
              v-model="firstName"
              required
              :rules="nameRules"
            ></v-text-field>
            <v-text-field
              append-icon="face"
              label="Efternamn"
              type="text"
              v-model="lastName"
              required
              :rules="nameRules"
            ></v-text-field>
            <v-text-field
              append-icon="phone"
              label="Tel"
              type="number"
              v-model="phone"
              required
              :rules="phoneNumberRules"
            ></v-text-field>
            <v-text-field
              append-icon="email"
              class="mb-4"
              label="Email"
              type="email"
              v-model="email"
              required
              :rules="emailRules"
            ></v-text-field>
            <v-text-field
              append-icon="location_city"
              label="Adress"
              type="text"
              v-model="adress"
              required
              :rules="adressRules"
            ></v-text-field>
            <v-text-field
              append-icon="location_city"
              label="Postnummer"
              type="number"
              v-model="zipCode"
              required
              :rules="adressRules"
            ></v-text-field>
            <v-text-field
              append-icon="location_city"
              label="Stad"
              type="text"
              v-model="city"
              required
              :rules="adressRules"
            ></v-text-field>
          </v-form>
        </v-card-text>
      </v-flex>

      <v-flex xs12 class="mt-5">
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="error" @click="createCustomerDialog = false">
            <v-icon left>cancel</v-icon>Avbryt
          </v-btn>
          <v-btn class="success" @click="createCustomer" :disabled="!valid">
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

export default {
  data() {
    return {
      valid: false,
      createCustomerDialog: false,
      firstName: '',
      lastName: '',
      phone: '',
      personalNumber: '',
      email: '',
      adress: '',
      zipCode: '',
      city: '',
      nameRules: [v => !!v || 'Namn måste fyllas i'],
      personalNumberRules: [
        v => !!v || 'Personnummer måste fyllas i',
        v => (v && v.length == 12) || 'Personnummer måste vara 12 siffror'
      ],
      emailRules: [
        v => !!v || 'Email måste fyllas i',
        v => /.+@.+/.test(v) || 'E-mail måste vara giltlig'
      ],
      phoneNumberRules: [
        v => !!v || 'Telefonnummer måste fyllas i',
        v => (v && v.length == 10) || 'Telefonnummer måste vara 10 siffror'
      ],
      adressRules: [v => !!v || 'Adress måste fyllas i']
    }
  },
  methods: {
    clear() {
      this.$refs.form.reset()
    },
    createCustomer() {
      if (this.$refs.form.validate()) {
        console.log('creating')

        this.$emit('newCustomer', {
          name: this.firstName + ' ' + this.lastName,
          personalNumber: this.personalNumber
        })
        this.$store.dispatch('createCustomer', {
          firstName: this.firstName,
          lastName: this.lastName,
          personalNumber: this.personalNumber,
          phone: this.phone,
          email: this.email,
          adress: this.adress,
          zipCode: this.zipCode,
          city: this.city
        })

        this.$refs.form.reset()
        this.createCustomerDialog = false
      }
    }
  }
}
</script>