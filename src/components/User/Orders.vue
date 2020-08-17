<template>
   <v-container>
      <v-layout row>
         <v-flex xs12 sm6 offset-sm3>
				<h1 class="text--secondary mb-4">Orders</h1>
            <v-list
               subheader
               two-line
               flat
            >
               <v-list-item-group
               multiple
               v-for="order of orders"
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
      </v-layout>
   </v-container>
</template>

<script>
export default {
  data () {
   return {
      orders: [
         {
            id: 'qwe',
            name: 'Andrey',
            phone: '8(918)123-45-67',
            adId: '12',
            done: false
         }
      ]
   }
  },
  methods: {
     markDone (order) {
      order.done = true
     }
  } 
}
</script>