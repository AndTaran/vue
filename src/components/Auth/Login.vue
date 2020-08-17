<template>
   <v-container
        class="fill-height"
        fluid
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col
            cols="12"
            sm="10"
            md="6"
          >
            <v-card class="elevation-12">
              <v-toolbar
                color="deep-purple accent-4"
                dark
                flat
              >
                <v-toolbar-title>Вход</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form
                  v-model="valid"
                  ref="form"
                  validation
                >
                  <v-text-field
                    label="email"
                    name="Email"
                    prepend-icon="mdi-account"
                    type="email"
                    v-model="email"
                    :rules="emailRules"
                  ></v-text-field>

                  <v-text-field
                    id="password"
                    label="Пароль"
                    name="password"
                    prepend-icon="mdi-lock"
                    type="password"
                    :counter="20"
                    v-model="password"
                    :rules="passwordRules"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn outlined
                  @click="onSubmit"
                  :loading="loading"
                  :disabled="!valid || loading"
                >Вход</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
</template>

<script>
  export default {
    data () {
        return {
          email: '',
          password: '',
          valid: false,
          emailRules: [
          v => !!v || 'E-mail is required',
          v => /.+@.+/.test(v) || 'E-mail must be valid',
          ],
          passwordRules: [
          v => !!v || 'Password is required',
          v => v.length >= 4 || 'Password must be less than 4 characters',
        ],
        }
    },
    computed: {
      loading () {
        return this.$store.getters.loading
      }
    },
    methods: {
      onSubmit () {
        if(this.$refs.form.validate()) {
          const user = {
              email: this.email,
              password: this.password
          }
          this.$store.dispatch('loginUser', user)
          .then(() => {
              this.$router.push('/')
          })
          .catch(() => {})
        }
      },
      
    },
    created () {
      if (this.$route.query['loginError']) {
          this.$store.dispatch('setError', 'Please log in to access this page')
      }
    }
  }
</script>