<template>
  <v-container>
    <v-layout row>
      <v-flex x12 class="pt-5 text-xs-center" v-if="loading">
        <v-progress-circular
          indeterminate
          :size="125"
          :width="5"
        ></v-progress-circular>
      </v-flex>
      <v-flex xs12 sm6 offset-sm3 v-else-if="!loading && orders.length !== 0">
        <h1 class="text--secondary mb-3">Orders</h1>
        <v-list
          subheader
          two-line
        >
          <v-list-tile 
            avatar
            v-for="item in orders"
            :key="item.id"
          >
            <v-list-tile-action>
              <v-checkbox 
              color="success"
                :input-value="item.done"
                :readonly="item.done"
                @change="markDone(item)"
              ></v-checkbox>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title>{{item.name}}</v-list-tile-title>
              <v-list-tile-sub-title>{{item.phone}}</v-list-tile-sub-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-btn 
                :to="`/ad/${item.adId}`"
                class="primary"
              >Show</v-btn>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>
      </v-flex>
      <v-flex xs12 class="pt-5 text-xs-center" v-else>
        <h2 class="text--secondary">You don't have orders</h2>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  computed: {
    loading () {
      return this.$store.getters.loading
    },
    orders () {
      return this.$store.getters.orders
    }
  },
  methods: {
    markDone (order) {
      this.$store.dispatch('markOrderDone', order.id)
      .then(() => {
        order.done = true
      })
      .catch(() => {})
    }
  },
  created () {
    this.$store.dispatch('fetchOrders')
  }
}
</script>