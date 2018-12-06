<template>
  <v-app light>
    <v-navigation-drawer :clipped="clipped" v-model="drawer" fixed app>
      <v-list>
        <v-list-tile v-for="(item, i) in items" :to="item.to" :key="i" router exact>
          <v-list-tile-action>
            <v-icon v-html="item.icon"/>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"/>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar :clipped-left="clipped" fixed app dark color="primary">
      <v-toolbar-side-icon @click="drawer = !drawer"/>
      <v-toolbar-title v-text="title" class="mr-4"/>
      <v-spacer></v-spacer>
      <v-btn to="/customers" flat>
        <v-icon left>face</v-icon>Kunder
      </v-btn>
      <v-btn to="/receipts" flat>
        <v-icon left>receipt</v-icon>Kvitton
      </v-btn>
      <v-btn to="/cases" flat>
        <v-icon left>work</v-icon>Ärenden
      </v-btn>
      <v-btn @click="logout" flat>
        <v-icon left>lock</v-icon>Logga ut
      </v-btn>
    </v-toolbar>
    <v-content>
      <nuxt/>
    </v-content>
    <v-footer :fixed="fixed" app>
      <span>Glenn Svanberg &copy; 2018</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  fetch({ store, redirect }) {},
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [{ icon: 'apps', title: 'Welcome', to: '/' }],
      right: true,
      rightDrawer: false,
      title: 'Suite'
    }
  },
  methods: {
    async logout() {
      await this.$auth.logout()
      this.$router.push('/login')
      this.$toast.show('Utloggad')
    }
  }
}
</script>
