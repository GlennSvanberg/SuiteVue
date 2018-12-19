<template>
  <v-card flat>
    <v-layout row>
      <v-flex xs8>
        <v-autocomplete
          class="ml-3"
          v-model="user"
          :items="users"
          label="Säljare"
          prepend-icon="stars"
          item-text="userName"
          item-value="user"
          return-object
          :search-input.sync="search"
          flat
          clearable
        >
          <v-slide-x-reverse-transition slot="append-outer" mode="out-in"></v-slide-x-reverse-transition>
          <template slot="selection" slot-scope="{ item, selected }">
            <span :selected="selected" v-text="item.userName + ' - ' + item.name"></span>
          </template>

          <template slot="item" slot-scope="data">
            <v-list-tile>
              <v-list-tile-content>
                <v-list-tile-title v-text="data.item.userName"></v-list-tile-title>
                <v-list-tile-sub-title v-text="data.item.name"></v-list-tile-sub-title>
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
    var loggedInUser = this.$store.state.auth.user
    this.user = {
      id: loggedInUser.id,
      name: loggedInUser.firstName + ' ' + loggedInUser.lastName,
      userName: loggedInUser.userName
    }
  },
  computed: {
    users() {
      return this.$store.getters.users
    }
  },
  watch: {
    user(val) {
      if (val) {
        this.$emit('sellerChange', val.id)
      }
    }
  },
  data() {
    return {
      user: null,
      search: null
    }
  }
}
</script>
<style scoped>
</style>