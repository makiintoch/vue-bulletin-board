<template>
  <v-container>
    <v-layout row>
      <v-flex xs12>
        <v-card v-if="!loading">
          <v-img
            :src="ad.src"
            height="300"
          ></v-img>
          <v-card-text>
            <h1 class="text--primary">{{ad.title}}</h1>
            <p>{{ad.description}}</p>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <edit-modal :ad="ad" v-if="isOwner"></edit-modal>
            <buy-modal :ad="ad"></buy-modal>
          </v-card-actions>
        </v-card>
        <div v-else class="pt-5 text-xs-center">
          <v-progress-circular
            indeterminate
            :size="125"
            :width="5"
          ></v-progress-circular>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import EditModal from './EditModal'

export default {
  props: ['id'],
  computed: {
    ad () {
      const id = this.id
      return this.$store.getters.adById(id)
    },
    loading () {
      return this.$store.getters.loading
    },
    isOwner () {
      return this.ad.ownerId === this.$store.getters.user.id
    }
  },
  components: {
    EditModal
  }
}
</script>