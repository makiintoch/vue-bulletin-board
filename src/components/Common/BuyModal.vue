<template>
  <v-dialog width="500" v-model="modal">
    <v-btn class="primary" slot="activator">Buy</v-btn>

    <v-card>
      <v-container>
        <v-layout row>
          <v-flex xs12>
            <v-card-title>
              <h2 class="text--primary">Do you want to buy it?</h2>
            </v-card-title>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row>
          <v-flex xs12>
            <v-card-text>
              <v-form ref="form">
                <v-text-field 
                  name="name" 
                  label="Name" 
                  type="name"
                  v-model="name"
                ></v-text-field>
                <v-text-field 
                  name="phone" 
                  label="Phone" 
                  type="phone"
                  v-model="phone"
                ></v-text-field>
              </v-form>
            </v-card-text>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row>
          <v-flex xs12>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn 
                :disabled="localLoading"
                flat 
                @click="onCancel"
              >Close</v-btn>
              <v-btn 
                :disabled="localLoading"
                :loading="localLoading"
                class="success" 
                flat 
                @click="onSave"
              >Buy it</v-btn>
            </v-card-actions>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ['ad'],
  data () {
    return {
      modal: false,
      name: '',
      phone: '',
      localLoading: false
    }
  },
  methods: {
    onCancel () {
      this.name = ''
      this.phone = ''
      this.modal = false
    },
    onSave () {
      if (this.name !== '' && this.name !== '') {
        this.localLoading = true
        this.$store.dispatch('createOrder', {
          name: this.name,
          phone: this.phone,
          adId: this.ad.id,
          ownerId: this.ad.ownerId
        })
        .finally(() => {
          this.name = ''
          this.phone = ''
          this.localLoading = false
          this.modal = false
        })
      }
    }
  }
}
</script>
