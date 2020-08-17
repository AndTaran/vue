<template>
   <v-container>
      <v-layout row>
         <v-flex class="text-center pt-5" v-if="loading">
            <v-progress-circular
               :size="100"
               :width="4"
               color="purple"
               indeterminate
               ></v-progress-circular>
         </v-flex>
         <v-flex xs12 sm6 offset-sm3 v-else-if="!loading && orders.length !== 0">
				<h1 class="text--secondary mb-4">Orders</h1>
            <v-list
               subheader
               two-line
               flat
            >
               <v-list-item-group
               multiple
               v-for="order in orders"
               :key="order.id"
               >
               <v-list-item>
                  <template>
                     <v-list-item-action>
                     <v-checkbox
                        :input-value="order.done"
                        @change="markDone(order)"
                        color="indigo darken-3"
                        
                     ></v-checkbox>
                     </v-list-item-action>

                     <v-list-item-content>
                     <v-list-item-title>{{order.name}}</v-list-item-title>
                     <v-list-item-subtitle>{{order.phone}}</v-list-item-subtitle>
                     </v-list-item-content>
                     <v-card-actions>
                        <v-btn
                         color="deep-purple accent-4"
                         :to='"/ad/" + "order.adId"'
                         outlined
                         small
                         >Открыть</v-btn>
                     </v-card-actions>
                  </template>
               </v-list-item>
               </v-list-item-group>
            </v-list>
         </v-flex>
         <v-flex class="text-center" v-else>
            <h1 class="text--secondary">You have no orders</h1>
         </v-flex>
      </v-layout>
   </v-container>
</template>

<script>
export default {
  computed: {
     loading () {
        return this.$store.getters.loading
     },
     orders () {
        return this.$store.getters.orders
     }
  },
  methods: {
     markDone (order) {
        this.$store.dispatch('markOrderDone', order.id)
          .then(() => {
            order.done = true
          })
          .catch(() => {})
      }
  },
  created () {
      this.$store.dispatch('fetchOrders')
  }
}
</script>