<template>
   <v-container>
      <v-layout row v-if="!loading  && myAds.length !== 0">
         <v-flex xs12 sm6 offset-sm3>
            <h1 class="text-center mb-5">My ads</h1>

            <v-card 
            class="elevation-10 mb-8"
            v-for="ad in myAds" 
            :key="ad.id"
            >
               <v-layout>
                  <v-flex xs4>
                     <v-img
                     :src="ad.imageSrc"
                     height="160px"
                     > 
                     </v-img>
                  </v-flex>
                  <v-flex xs8>
                     <v-card-text>
                        <h2>{{ad.title}}</h2>
                        <p>{{ad.description}}</p>
                     </v-card-text>
                     <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn class="info"
                        :to="'/ad/' + ad.id"
                        color="deep-purple accent-3"
                        >Open</v-btn>
                     </v-card-actions>
                  </v-flex>
               </v-layout>
            </v-card>
         </v-flex>
      </v-layout>
      <v-layout v-else-if="!loading && myAds.length === 0">
         <v-flex xs12 class=text-center>
            <h1 class="text--primary">You have no ads</h1>
         </v-flex>
      </v-layout>
      <v-layout v-else>
         <v-flex xs12 class="text-center">
            <v-progress-circular
               :size="100"
               :width="4"
               color="purple"
               indeterminate
               ></v-progress-circular>
         </v-flex>
      </v-layout>
   </v-container>
</template>

<script>
export default {
   computed: {
      myAds () {
         return this.$store.getters.myAds
      },
      loading () {
         return this.$store.getters.loading
      }
   }
}
</script>