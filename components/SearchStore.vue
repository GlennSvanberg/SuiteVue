<template>
  <v-card flat>
    <v-layout row>
      <v-flex xs8>
        <v-select
          class="ml-3"
          v-model="store"
          :items="stores"
          item-text="name"
          label="Butik"
          return-object
          prepend-icon="store"
          clearable
        ></v-select>
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