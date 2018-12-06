<template>
  <v-layout row>
    <v-flex xs12>
      <v-card flat class="mt-2">
        <v-toolbar dark class="primary elevate-12 mb-0">
          <v-toolbar-title>{{customer.firstName}} {{ customer.lastName}}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn class="accent">Öppna</v-btn>
        </v-toolbar>
        <v-card-text>
          <v-container>
            <v-layout row wrap>
              <v-flex sm12>
                <v-layout row wrap>
                  <v-flex xs12 md6 class="pr-4">
                    <div>
                      <strong>Personnummer:</strong>
                      <v-text-field
                        class="mt-0"
                        height="20px"
                        readonly
                        v-model="customer.personalNumber"
                        prepend-icon="face"
                      ></v-text-field>
                    </div>
                    <div>
                      <strong>Telefon:</strong>
                      <v-text-field
                        prepend-icon="phone"
                        class="mt-0"
                        height="20px"
                        readonly
                        v-model="customer.phone"
                      ></v-text-field>
                    </div>
                    <div>
                      <strong>Email:</strong>
                      <v-text-field
                        prepend-icon="mail"
                        class="mt-0"
                        height="20px"
                        readonly
                        v-model="customer.email"
                      ></v-text-field>
                    </div>
                  </v-flex>
                  <v-flex xs12 md6>
                    <div>
                      <strong>Adress:</strong>
                      <v-text-field class="mt-0" height="20px" readonly v-model="customer.adress"></v-text-field>
                    </div>
                    <div>
                      <strong>Postnummer:</strong>
                      <v-text-field class="mt-0" height="20px" readonly v-model="customer.zipCode"></v-text-field>
                    </div>
                    <div>
                      <strong>Stad:</strong>
                      <v-text-field class="mt-0" height="20px" readonly v-model="customer.city"></v-text-field>
                    </div>
                  </v-flex>
                </v-layout>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>
<script>
export default {
  computed: {
    customer() {
      return this.$store.getters.loadedCustomer
    }
  }
}
</script>
