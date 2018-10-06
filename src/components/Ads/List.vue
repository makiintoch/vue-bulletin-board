<template>
  <v-container>
    <v-layout row v-if="!loading && ads.length !== 0">
      <v-flex xs12 sm6 offset-sm3>
        <h1 class="text-secondary mb-3">List ads</h1>

        <v-card
          class="elevation-10 mb-3"
          v-for="item in ads"
          :key="item.id"
        >
          <v-layout row>
            <v-flex xs4>
              <v-img
                :src="item.src"
                height="100%"
              ></v-img>
            </v-flex>
            <v-flex xs8>
              <v-card-text>
                <h2 class="text--primary">{{item.title}}</h2>

                <p>{{item.description}}</p>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn 
                  class="info"
                  :to="`/ad/${item.id}`"
                >Show</v-btn>
              </v-card-actions>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>
    </v-layout>
    <div v-else-if="!loading && ads.length === 0" class="pt-5 text-xs-center">
      <h2>You don't have ads</h2>
    </div>
    <div v-else>
      <v-progress-circular
        indeterminate
        :size="125"
        :width="5"
      ></v-progress-circular>
    </div>
  </v-container>
</template>

<script>
export default {
  computed: {
    ads () {
      return this.$store.getters.myAds
    },
    loading () {
      return this.$store.getters.loading
    }
  }
}
</script>