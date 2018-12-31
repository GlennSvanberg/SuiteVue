import Vue from 'vue'
import Vuetify from 'vuetify'
import colors from 'vuetify/es5/util/colors'

Vue.use(Vuetify, {
  theme: {
    primary: '#D3307A', // a color that is not in the material colors palette
    accent: colors.grey.darken3,
    secondary: colors.amber.darken3,
    info: '#893B89',
    warning: colors.amber.base,
    error: colors.red.darken4,
    success: colors.green.accent4
  }
})
