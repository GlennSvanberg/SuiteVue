<template>
  <v-content id="login__wrap">
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
          <v-card class="elevation-12">
            <v-toolbar dark color="primary">
              <v-toolbar-title>Login</v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
            <v-card-text>
              <v-form>
                <v-text-field
                  prepend-icon="person"
                  name="login"
                  label="Login"
                  type="text"
                  v-model="email"
                ></v-text-field>
                <v-text-field
                  id="password"
                  prepend-icon="lock"
                  name="password"
                  label="Password"
                  type="password"
                  v-model="password"
                ></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn :disabled="!formIsValid" @click="login" color="primary">Logga in</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>
<script>
export default {
  auth: false,
  data: () => ({
    email: 'MGN199',
    password: 'test1234'
  }),

  computed: {
    formIsValid() {
      return this.email !== '' && this.password !== ''
    }
  },
  methods: {
    async login() {
      try {
        await this.$auth
          .loginWith('local', {
            data: {
              userName: this.email,
              password: this.password
            }
          })
          .then(() => {
            this.$toast.success('Inloggad')
            this.$router.push('/')
          })
      } catch (e) {
        this.$router.push('/login')
        this.$toast.error('Något gick fel vid inloggningen, försök igen')
      }
    }
  },
  layout: 'empty'
}
</script>

<style>
</style>
