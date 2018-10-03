<template>
  <v-content>
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md6>
          <v-card class="elevation-10">
            <v-toolbar dark color="primary">
              <v-toolbar-title>Registration form</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-form v-model="valid" ref="form" validation>
                <v-text-field 
                  prepend-icon="person" 
                  name="email" 
                  label="Email" 
                  type="email"
                  :rules="emailRules"
                  v-model="email"
                  required
                ></v-text-field>
                <v-text-field 
                  id="password" 
                  prepend-icon="lock" 
                  name="password" 
                  label="Password" 
                  type="password"
                  :rules="passwordRules"
                  v-model="password"
                  required
                ></v-text-field>
                <v-text-field 
                  id="confirm-password" 
                  prepend-icon="lock" 
                  name="confirm-password" 
                  label="Confirm Password" 
                  type="password"
                  :rules="confirmPasswordRules"
                  v-model="confirmPassword"
                  required
                ></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn 
                color="primary"
                :disabled="!valid || loading"
                :loading="loading"
                @click="onSubmit"
              >Register</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
export default {
  data () {
    return {
      valid: false,
      email: '',
      password: '',
      confirmPassword: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid'
      ],
      passwordRules: [
        v => !!v || 'Password is required',
        v => (v && v.length >= 6) || 'Password must be equal or more than 6 characters'
      ],
      confirmPasswordRules: [
        v => !!v || 'Confirm password is required',
        v => v === this.password || 'Passwsord should math'
      ]
    }
  },
  computed: {
    loading () {
      return this.$store.getters.loading
    }
  },
  methods: {
    onSubmit () {
      if (this.$refs.form.validate()) {
        const user = {
          email: this.email,
          password: this.password
        }

        this.$store.dispatch('registerUser', user)
        .then(() => {
          this.$router.push('/')
        })
        .catch(error => console.log(error))
      }
    }
  }
}
</script>