<template>
  <v-container>
    <v-layout row>
      <v-flex xs12>
        <v-card>
          <v-img
            src="https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg"
            height="300"
          ></v-img>
          <v-card-text>
            <h1 class="text--primary">Lorem</h1>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Animi illo ut nemo a qui nihil. Eius hic nam excepturi ad ducimus eveniet quia doloribus modi sequi! Officiis rerum illum unde.</p>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn>Edit</v-btn>
            <v-btn class="primary">Buy</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data () {
    return {

    }
  }
}
</script>