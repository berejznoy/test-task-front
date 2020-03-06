<template>
  <v-app id="inspire" :style="{background: $vuetify.theme.themes[$customTheme].background}">
    <v-navigation-drawer
      :style="{background: $vuetify.theme.themes[$customTheme].menu}"
      v-model="drawer"
      app
      clipped
    >
      <v-list dense>
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-view-dashboard</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Dashboard</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-settings</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Settings</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      app
      clipped-left
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-btn icon v-if="this.$route.name === 'story-uid'" class="hidden-md-and-up" @click="$router.go(-1)"> <v-icon>mdi-chevron-left</v-icon></v-btn>
      <v-toolbar-title class="ml-2 pl-0" @click="$router.push('/')" >Страшные истории</v-toolbar-title>
      <v-spacer></v-spacer>
      <search />
      <v-btn icon @click="$vuetify.theme.dark = !$vuetify.theme.dark">
        <v-icon> {{themeIcon}} </v-icon>
      </v-btn>
    </v-app-bar>
    <v-content>
      <v-container>
        <search is-mobile/>
        <nuxt/>
      </v-container>
      <v-btn
        class="mb-5"
        v-scroll="onScroll"
        v-show="fab"
        fab
        small
        fixed
        bottom
        right
        @click="toTop"
      >
        <v-icon small>mdi-apple-keyboard-control</v-icon>
      </v-btn>
    </v-content>

    <v-footer app>
      <span style="font-size: 14px">&copy; 2020</span>
      <v-spacer></v-spacer>
      <span style="font-size: 14px">www.screep.ru</span>
    </v-footer>
  </v-app>
</template>

<script>
  import Search from "../components/commons/Search"

  export default {
    components: {Search},
    props: {
      source: String,
    },
    data: () => ({
      drawer: null,
      fab: null,
      isSearchBlockClose: false
    }),
    methods: {
      onScroll (e) {
        if (typeof window === 'undefined') return
        const top = window.pageYOffset ||   e.target.scrollTop || 0
        this.fab = top > 20
      },
      toTop () {
        this.$vuetify.goTo(0)
      }
    },
    computed: {
      themeIcon() {
        if (this.$vuetify.theme.dark === true) return 'mdi-white-balance-sunny';
        else return "mdi-weather-night"
      }
    }
  }
</script>
<style scoped>
</style>
