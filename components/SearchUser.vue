<template>
  <v-card>
    <v-layout row>
      <v-flex xs6>
        <v-autocomplete
          class="ml-3"
          v-model="user"
          :items="users"
          label="Säljare"
          prepend-icon="stars"
          item-text="userName"
          item-value="user"
          return-object
          flat
          :search-input.sync="search"
        >
          <v-slide-x-reverse-transition slot="append-outer" mode="out-in"></v-slide-x-reverse-transition>
          <template slot="item" slot-scope="data">
            <v-list-tile>
              <v-list-tile-content v-if="typeof data.item !== 'object'" v-text="data.item"></v-list-tile-content>
              <v-list-tile-content v-else>
                <v-list-tile-title v-html="data.item.userName"></v-list-tile-title>
                <v-list-tile-sub-title v-html="data.item.name"></v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
          </template>
        </v-autocomplete>
      </v-flex>
      <v-flex xs6>
        <v-text-field v-if="user" readonly v-model="user.name"></v-text-field>
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
      this.$emit('sellerChange', val.id)
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