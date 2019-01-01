<template>
  <v-layout row>
    <v-flex xs12>
      <v-card flat class="mt-2">
        <v-toolbar dark class="primary elevate-12 mb-0 py-1">
          <v-toolbar-title>Kvitto: {{receipt.nr}}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn color="white" light fab small>
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
                      <strong>Säljare:</strong>
                      <v-text-field
                        class="mt-0"
                        height="20px"
                        readonly
                        v-model="receipt.seller.userName"
                      ></v-text-field>
                    </div>
                    <div>
                      <strong>Abonnemangsnummer:</strong>
                      <v-text-field
                        class="mt-0"
                        height="20px"
                        readonly
                        v-model="receipt.subscriptionNumber"
                      ></v-text-field>
                    </div>
                    <div>
                      <strong>Intäkt:</strong>
                      <v-text-field class="mt-0" height="20px" readonly v-model="receipt.revenue"></v-text-field>
                    </div>
                  </v-flex>
                  <v-flex xs12 md6>
                    <div>
                      <strong>Butik:</strong>
                      <v-text-field
                        class="mt-0"
                        height="20px"
                        readonly
                        v-model="receipt.store.name"
                      ></v-text-field>
                    </div>
                    <div>
                      <strong>Månadskostnad:</strong>
                      <v-text-field
                        class="mt-0"
                        height="20px"
                        readonly
                        v-model="receipt.totalMonthlyFee"
                      ></v-text-field>
                    </div>
                    <div>
                      <strong>TB:</strong>
                      <v-text-field class="mt-0" height="20px" v-model="receipt.tb"></v-text-field>
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
    receipt() {
      return this.$store.getters.receipt
    }
  }
}
</script>
