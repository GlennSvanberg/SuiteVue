<template>
  <v-card>
    <v-layout row>
      <v-flex xs8>
        <v-autocomplete
          class="ml-3"
          v-model="store"
          :items="stores"
          label="Butik"
          prepend-icon="store"
          item-text="name"
          item-value="store"
          return-object
          flat
          clearable
          chips
          :search-input.sync="search"
        >
          <v-slide-x-reverse-transition slot="append-outer" mode="out-in"></v-slide-x-reverse-transition>

          <template slot="selection" slot-scope="{ item, selected }">
            <v-chip :selected="selected" color="primary" class="white--text">
              <span v-text="item.name"></span>
            </v-chip>
          </template>

          <template slot="item" slot-scope="data">
            <v-list-tile>
              <v-list-tile-content>
                <v-list-tile-title v-html="data.item.name"></v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </template>
        </v-autocomplete>
      </v-flex>
    </v-layout>
  </v-card>
</template>

<script>
export default {
  created() {
    this.store = this.$store.state.auth.user.store
  },
  computed: {
    stores() {
      return this.$store.getters.stores
    }
  },
  watch: {
    store(val) {
      if (val) {
        this.$emit('storeChange', val.id)
      }
    }
  },
  data() {
    return {
      store: null,
      search: null
    }
  }
}
</script>
<style scoped>
</style>