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
              @click="triggerUpload"
            >
              Upload image
              <v-icon right dark>cloud_upload</v-icon>
            </v-btn>
            <input 
              ref="fileInput" 
              type="file" 
              v-show="false" 
              accept="image/*"
              @change="onFileChange"
            >
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs12>
            <img :src="src" height="100" v-if="src">
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs12>
            <v-btn 
              class="success"
              :loading="loading"
              :disabled="!valid || !image || loading"
              @click="createAd"
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
      valid: false,
      image: null,
      src: ''
    }
  },
  computed: {
    loading () {
      return this.$store.getters.loading
    }
  },
  methods: {
    createAd () {
      if (this.$refs.form.validate() && this.image) {
        const ad = {
          title: this.title,
          description: this.description,
          image: this.image,
          promo: this.promo
        }

        this.$store.dispatch('create', ad)
        .then(() => {
          this.$router.push('/list')
        })
        .catch(() => {})
      }
    },
    triggerUpload () {
      this.$refs.fileInput.click()
    },
    onFileChange (event) {
      const file = event.target.files[0]

      const reader = new FileReader()
      reader.onload = e => {
        this.src = reader.result
      }
      reader.readAsDataURL(file)
      this.image = file
    }
  }
}
</script>