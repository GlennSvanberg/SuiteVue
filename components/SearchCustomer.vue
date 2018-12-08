<template>
  <v-card>
    <v-card-text>
      <v-layout row>
        <v-flex xs6>
          <v-autocomplete
            class="ml-3"
            v-model="customer"
            :items="customers"
            label="Kund: yyyymmddxxxx"
            prepend-icon="face"
            item-text="personalNumber"
            item-value="customer"
            return-object
            flat
          >
            <template slot="item" slot-scope="data">
              <template v-if="typeof data.item !== 'object'">
                <v-list-tile-content v-text="data.item"></v-list-tile-content>
              </template>
              <template v-else>
                <v-list-tile-content>
                  <v-list-tile-title v-html="data.item.personalNumber"></v-list-tile-title>
                  <v-list-tile-sub-title v-html="data.item.name"></v-list-tile-sub-title>
                </v-list-tile-content>
              </template>
            </template>
            <v-slide-x-reverse-transition slot="append-outer" mode="out-in"></v-slide-x-reverse-transition>
          </v-autocomplete>
        </v-flex>
        <v-flex xs6>
          <v-text-field v-if="customer" readonly v-model="customer.name"></v-text-field>
        </v-flex>
      </v-layout>
    </v-card-text>
  </v-card>
</template>
<script>
export default {
  data() {
    return {
      customer: null,
      customers: [
        { personalNumber: 198807024818, name: 'Glenn Svanberg' },
        { personalNumber: 198605238123, name: 'Weronika Dobrzycka' }
      ]
    }
  }
}
</script>