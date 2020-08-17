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
                <v-toolbar-title>Регистрация</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form
                  v-model="valid"
                  ref="form"
                  lazy-validation
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
                  <v-text-field
                    id="password"
                    label="Подтверждение пароля"
                    name="confirm-password"
                    prepend-icon="mdi-lock"
                    type="password"
                    :counter="20"
                    v-model="confirmPassword"
                    :rules="confirmPasswordRules"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn outlined
                  @click="onSubmit"
                  :loading="loading"
                  :disabled="!valid || loading"
                >Создать аккаунт</v-btn>
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
         confirmPassword: '',
         valid: false,
         emailRules: [
            v => !!v || 'Введите E-mail ',
            v => /.+@.+/.test(v) || 'E-mail must be valid',
         ],
         passwordRules: [
            v => !!v || 'Введите пароль',
            v => v.length >= 4 || 'Пароль должен содержать не менее 4 символов',
         ],
         confirmPasswordRules: [
            v => !!v || 'Введите пароль',
            v => v === this.password || 'Неправильно введен пароль'
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
        if(this.$refs.form.validate()) {
            const user = {
              email: this.email,
              password: this.password
          }

          this.$store.dispatch('registerUser', user)
          .then(() => {
            this.$router.push('/')
          })
          .catch(() => {})
            
        }
      },
      
    }
  }
</script>