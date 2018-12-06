<template>
  <v-layout row>
    <v-flex xs12>
      <v-card flat class="mt-2">
        <v-toolbar dark class="primary elevate-12 mb-0 py-1">
          <v-toolbar-title>{{customer.firstName}} {{ customer.lastName}}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn color="white" light :to="'/customer/' + customer.id" fab small>
            <v-icon>open_in_new</v-icon>
          </v-btn>
          <v-btn color="white" light fab small>
            <v-icon>edit</v-icon>
          </v-btn>
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
                        type="phone"
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
          <v-tabs centered color="primary" dark icons-and-text>
            <v-tabs-slider color="yellow"></v-tabs-slider>

            <v-tab href="#tab-1">Senaste
              <v-icon>timeline</v-icon>
            </v-tab>

            <v-tab href="#tab-2">Kvitton
              <v-icon>receipt</v-icon>
            </v-tab>

            <v-tab href="#tab-3">Ärenden
              <v-icon>cases</v-icon>
            </v-tab>

            <v-tab-item v-for="i in 3" :id="'tab-' + i" :key="i">
              <v-card flat>
                <v-card-text>{{ text }}</v-card-text>
              </v-card>
            </v-tab-item>
          </v-tabs>
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
