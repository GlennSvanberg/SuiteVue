<template>
  <v-card flat class="mb-0">
    <v-layout row>
      <v-flex xs12>
        <v-autocomplete
          class="ml-3"
          v-model="choosenProducts"
          :items="products"
          label="Produkter"
          prepend-icon="stay_current_portrait"
          item-value="product"
          item-text="title"
          return-object
          flat
          clearable
          :search-input.sync="search"
          chips
          multiple
        >
          <template slot="selection" slot-scope="data">
            <v-chip
              :selected="data.selected"
              close
              color="primary"
              class="chip--select-multi white--text"
              @input="remove(data.item)"
            >{{ data.item.title }}</v-chip>
          </template>
          <template slot="item" slot-scope="data">
            <template v-if="typeof data.item !== 'object'">
              <v-list-tile-content v-text="data.item"></v-list-tile-content>
            </template>
            <template v-else>
              <v-list-tile-content>
                <v-list-tile-title>{{data.item.title}}</v-list-tile-title>
                <v-list-tile-sub-title>{{data.item.categoryName}} - {{ data.item.cost}}kr</v-list-tile-sub-title>
              </v-list-tile-content>
            </template>
          </template>
        </v-autocomplete>
      </v-flex>
    </v-layout>
  </v-card>
</template>
<script>
export default {
  data() {
    return {
      choosenProducts: [],
      search: ''
    }
  },
  watch: {
    choosenProducts(val) {
      if (val) {
        var cost = 0
        var productIds = []
        val.forEach(el => {
          cost = cost + el.cost
          productIds.push(el.id)
        })
        this.$emit('productChanged', {
          cost: cost,
          products: productIds
        })
      }
    }
  },
  methods: {
    remove(item) {
      const index = this.choosenProducts.indexOf(item)
      if (index >= 0) this.choosenProducts.splice(index, 1)
    }
  },
  computed: {
    products() {
      return this.$store.getters.products
    },
    productCategories() {
      return this.$store.getters.productCategories
    }
  }
}
</script>