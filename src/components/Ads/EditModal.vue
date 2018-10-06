<template>
  <v-dialog width="500" v-model="modal">
    <v-btn class="mr-3" slot="activator">Edit</v-btn>

    <v-card>
      <v-container>
        <v-layout row>
          <v-flex xs12>
            <v-card-title>
              <h2 class="text--primary">Edit ad</h2>
            </v-card-title>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row>
          <v-flex xs12>
            <v-card-text>
              <v-form v-model="valid" ref="form" validation>
                <v-text-field 
                  name="title" 
                  label="Title" 
                  type="title"
                  v-model="editedTitle"
                ></v-text-field>
                <v-text-field 
                  name="description" 
                  label="Description" 
                  type="description"
                  multi-line
                  v-model="editedDescription"
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
              <v-btn flat @click="onCancel">Cancel</v-btn>
              <v-btn class="success" flat @click="onSave">Save</v-btn>
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
      editedTitle: this.ad.title,
      editedDescription: this.ad.description
    }
  },
  methods: {
    onCancel () {
      this.editedTitle = this.ad.title
      this.editedDescription = this.ad.description
      this.modal = false
    },
    onSave () {
      if (this.editedTitle !== '' && this.editedDescription !== '') {
        this.$store.dispatch('updateAd', {
          id: this.ad.id,
          title: this.editedTitle,
          description: this.editedDescription
        })
        this.modal = false
      }
    }
  }
}
</script>
