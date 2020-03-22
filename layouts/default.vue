<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      app
      clipped
    >
      <v-list dense>
        <template v-for="item in menuItems">
          <v-list-group
            v-if="item.children"
            :key="item.text"
            v-model="item.model"
            :prepend-icon="item.staticIcon"
            :append-icon="item.model ? item.icon : item['icon-alt']"
          >
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>
                  {{ item.text }}
                </v-list-item-title>
              </v-list-item-content>
            </template>
            <v-list-item
              v-for="(child, i) in item.children"
              :key="i"
              nuxt
              :to="child.path"
            >
              <v-list-item-action v-if="child.icon">
                <v-icon>{{ child.icon }}</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                  {{ child.text }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
          <v-list-item
            v-else
            :key="item.text"
            nuxt
            :to="item.path"
          >
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>
                {{ item.text }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      app
      clipped-left
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title class="ml-2 pl-0" style="cursor: pointer" @click="$router.push('/')" >Личный кабинет</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click="$vuetify.theme.dark = !$vuetify.theme.dark">
        <v-icon> {{themeIcon}} </v-icon>
      </v-btn>
      <v-btn class="ml-5" @click="logout">
        Выход
      </v-btn>
    </v-app-bar>
    <v-content>
      <v-container>
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
    </v-footer>
  </v-app>
</template>

<script>

export default {
	props: {
		source: String,
	},
	data: () => ({
		drawer: null,
		fab: null,
		isSearchBlockClose: false,
		menuItems: [
			{ icon: "mdi-file-multiple", text: "Мои документы",  path: "/" }
		],
	}),
	methods: {
		async logout() {
			await this.$auth.logout();
			localStorage.setItem("refreshToken", "");
			await this.$router.push("/login")
		},
		onScroll (e) {
			if (typeof window === "undefined") return;
			const top = window.pageYOffset ||   e.target.scrollTop || 0;
			this.fab = top > 20
		},
		toTop () {
			this.$vuetify.goTo(0)
		}
	},
	computed: {
		themeIcon() {
			if (this.$vuetify.theme.dark === true) return "mdi-white-balance-sunny";
			else return "mdi-weather-night"
		}
	}
}
</script>
<style>
  p{
    font-size: 0.92rem;
  }
</style>
