<template>
   <v-container>
      <v-layout row>
         <v-flex xs12 sm6 offset-sm3>
               <h1 class="text--secondary mb-4">Create new ad</h1>
               <v-form
                  v-model="valid"
                  ref="form"
                  validation
                >
                  <v-text-field
                    label="Ad title"
                    name="title"
                    type="text"
                    v-model="title"
                    required
                    :rules="[v => !!v || 'Title is required']"
                  ></v-text-field>
                  <v-textarea
                     id="password"
                     label="Ad description"
                     name="description"
                     type="text"
                     v-model="description"
                     :rules="[v => !!v || 'Description is required']"
                  >
                  </v-textarea>
                </v-form>
                <v-layout>
                   <v-flex xs12>
                      <v-btn
                           color="deep-purple accent-3"
                           class="ma-2 white--text"
                           @click="triggerUpload"
                        >
                           Upload
                           <v-icon right dark>mdi-cloud-upload</v-icon>
                        </v-btn>
                        <input 
                        ref="fileInput" 
                        type="file" 
                        style="display: none;" 
                        accept="image/*"
                        @change="onFileChange"
                        >
                   </v-flex>
                </v-layout>
               <v-layout>
                  <v-flex>
                     <img :src="imageSrc" height="100" v-if="imageSrc">
                  </v-flex>
               </v-layout>
               <v-layout>
                  <v-flex>
                     <v-switch
                        v-model="promo"
                        label="Add to promo"
                        color="primary"
                     ></v-switch>
                  </v-flex>
               </v-layout>
               <v-layout>
                  <v-flex>
                     <v-spacer></v-spacer>
                     <v-btn
                     :loading="loading"
                     :disabled="(!valid && !image) || loading"
                     color="deep-purple accent-3"
                     @click="createAd"
                     class="success">Create ad</v-btn>
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
            loader: null,
            loading3: false,
            promo: false,
            valid: false,
            image: null,
            imageSrc: ''
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
            // logic
               const ad = {
               title: this.title,
               description: this.description,
               promo: this.promo,
               image: this.image
               }

               this.$store.dispatch('createAd', ad)
               .then(() => {
                  this.$router.push('./list')
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
            reader.onload = () => {
               this.imageSrc = reader.result
            }
            reader.readAsDataURL(file)
            this.image = file
         }
      },
      watch: {
         loader () {
         const l = this.loader
         this[l] = !this[l]

         setTimeout(() => (this[l] = false), 2000)

         this.loader = null
         }
      }
   }
</script>

<style lang="css" scoped>

</style>