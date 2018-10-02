<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <h1 class="text--secondary mb-3">Create new ad</h1>

        <v-form v-model="valid" ref="form" validation class="mb-3">
          <v-text-field 
            name="title" 
            label="Title" 
            type="text"
            :rules="[v => !!v || 'Title is required']"
            v-model="title"
            required
          ></v-text-field>
          <v-textarea 
            id="description" 
            name="description" 
            label="Description" 
            type="description"
            :rules="[v => !!v || 'Description is required']"
            :no-resize="true"
            v-model="description"
            multi-line
            required
          ></v-textarea>
        </v-form>
        <v-layout row>
          <v-flex xs12>
            <v-switch
              label="Add to promo"
              v-model="promo"
            ></v-switch>
          </v-flex>
        </v-layout>
        <v-layout row class="mb-3">
          <v-flex xs12>
            <v-btn
              color="blue-grey"
              class="white--text"
            >
              Upload image
              <v-icon right dark>cloud_upload</v-icon>
            </v-btn>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs12>
            <img src="" height="100">
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs12>
            <v-btn 
              class="success"
              @click="createAd"
              :disabled="!valid"
            >Submit</v-btn>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      title: '',
      description: '',
      promo: false,
      valid: false
    }
  },
  methods: {
    createAd () {
      if (this.$refs.form.validate()) {
        const ad = {
          title: this.title,
          description: this.description,
          src: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg',
          promo: this.promo
        }

        this.$store.dispatch('create', ad)
      }
    }
  }
}
</script>