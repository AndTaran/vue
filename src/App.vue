<template>
  <v-app>
      <v-navigation-drawer
      class="deep-purple"
      app
      temporary
      dark
      v-model="drawer"
      >
        <v-list>
          <v-list-item
            v-for="item in items"
            :key="item.title"
            :to="item.url"
            link
            
          >
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item
            v-if="isUserLoggedIn"
            @click="onLogout"
            link
          >
            <v-list-item-icon>
              <v-icon>mdi-logout</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>Logout</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>

    <v-app-bar
    app
    color="deep-purple"
    dense
    dark
    >
      <v-app-bar-nav-icon
        class="hidden-md-and-up"
        @click="drawer = !drawer"
        light
        
      ></v-app-bar-nav-icon >

        <v-toolbar-title>
          <router-link 
          to="/"
          tag="span"
          class="pointer"
          >Главная страница</router-link>
        </v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn
          class="hidden-sm-and-down mr-2"
          :key="item.title"
          v-for="item in items"
          :to="item.url"
          depressed
          light
          outlined
          small
        >
          <v-icon left>{{item.icon}}</v-icon>
          
          {{item.title}}
        </v-btn>
        <v-btn    
          class="hidden-sm-and-down mr-2"
          @click="onLogout"
          v-if="isUserLoggedIn"
          depressed
          light
          outlined
          small
          >
            <v-icon left>mdi-logout</v-icon>
            Logout
        </v-btn>

    </v-app-bar>

    <!-- Sizes your content based upon application components -->
    <v-main>

      <!-- Provides the application the proper gutter -->
      <v-container fluid>

        <!-- If using vue-router -->
        <router-view></router-view>
      </v-container>
    </v-main>

    <!-- snackbar -->
    <template  v-if="error">
      <v-snackbar
        :multi-line="multiLine"
        color="error"
        timeout="5000"
        @input="closeError"
        :value="true"
      >
        {{ error }}
          <v-btn
            dark
            text
            @click="closeError"
          >
            Close
          </v-btn>
      </v-snackbar>
    </template>

</v-app>
</template>

<script>
  export default {
    data () {
      return {
        multiLine: true,
        drawer: false
      }
    },
    computed: {
      error () {
        return this.$store.getters.error
      },
      isUserLoggedIn () {
        return this.$store.getters.isUserLoggedIn
      },
      items () {
        if (this.isUserLoggedIn) {
          return [
            {title: 'Orders', icon: 'mdi-bookmark', url: '/orders'},
            {title: 'New ad', icon: 'mdi-note', url: '/new'},
            {title: 'My ads', icon: 'mdi-view-list', url: '/list'}
          ]
        }
        return [
          {title: 'Login', icon: 'mdi-lock', url: '/login'},
          {title: 'Registration', icon: 'mdi-face', url: '/registration'}
        ]
      }
    },
    methods: {
      closeError () {
        this.$store.dispatch('clearError')
      },
      onLogout () {
        this.$store.dispatch('logoutUser')
        this.$router.push('/')
      }
    } 
  }
</script>

<style lang="css" scoped>
  .pointer {
    cursor: pointer;
  }
</style>
