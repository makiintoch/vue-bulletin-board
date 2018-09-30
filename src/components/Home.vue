<template>
  <div>
    <v-container>
      <v-layout row>
        <v-flex xs12>
          <v-carousel>
            <v-carousel-item
              v-for="item in ads"
              :key="item.id"
              :src="item.src"
            >
              <div class="carousel-link">
                <v-btn class="error" :to="`/ad/${item.id}`">{{item.title}}</v-btn>
              </div>
            </v-carousel-item>
          </v-carousel>
        </v-flex>
      </v-layout>
    </v-container>
    <v-container grid-list-lg>
      <v-layout row wrap>
        <v-flex 
          xs12
          sm6
          md4
          v-for="item of ads"
          :key="item.id"
        >
          <v-card>
            <v-img
              :src="item.src"
              aspect-ratio="2.75"
            ></v-img>

            <v-card-title primary-title>
              <div>
                <h3 class="headline mb-0">{{item.title}}</h3>
                <div>{{item.description}}</div>
              </div>
            </v-card-title>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn flat :to="`/ad/${item.id}`">Show</v-btn>
              <v-btn raised class="primary">Buy</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {
  data () {
    return {
      ads: [
        {
          id: '1',
          title: 'First ad',
          description: 'Hello i am description',
          promo: false,
          src: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg'
        },
        {
          id: '2',
          title: 'Second ad',
          description: 'Hello i am description',
          promo: true,
          src: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg'
        },
        {
          id: '3',
          title: 'Third ad',
          description: 'Hello i am description',
          promo: true,
          src: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg'
        }
      ]
    }
  }
}
</script>

<style>
  .carousel-link {
    padding: 5px 10px;
    position: absolute;
    bottom: 50px;
    left: 50%;
    background: rgba(0, 0, 0, .5);
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    transform: translate(-50%, 0);
  }
</style>
