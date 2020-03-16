<template>
  <v-form @submit.prevent="search()" :disabled="!query">
    <v-row
      v-if="isMobile"
      align="center"
      class="ma-0 mb-0"
    >
      <v-card width="100%">
      <v-text-field
        v-model="query"
        flat
        solo
        hide-details
        label="Поиск"
        class="hidden-md-and-up"
      >
        <template v-slot:append>
          <v-btn icon type="submit" :disabled="!query" :loading="loading">
            <v-icon>mdi-magnify</v-icon>
          </v-btn>
        </template>
      </v-text-field>
      </v-card>
    </v-row>
    <v-row
      align="center"
      v-else
      :style="{maxWidth: width}"
      class="mr-5 "
    >
      <v-text-field
        v-model="query"
        flat
        solo
        rounded
        hide-details
        label="Поиск"
        class="hidden-sm-and-down"
      >
        <template v-slot:append>
          <v-btn icon type="submit" :disabled="!query" :loading="loading">
            <v-icon>mdi-magnify</v-icon>
          </v-btn>
        </template>
      </v-text-field>
    </v-row>
    <transition name="fade">
      <v-card :class="{'fullscreen-search-box': !$vuetify.breakpoint.xsOnly}" v-if="this.items.length">
        <v-list three-line >
          <template v-for="(item, index) in items">
            <v-subheader
              v-if="item.header && !item.found"
              :key="item.header"
            >
              <p class="mb-0">{{item.header}}</p>
              <v-btn icon small class="mb-5 ml-5" @click.stop="closeSearchMenu"><v-icon small>mdi-window-close</v-icon></v-btn>
            </v-subheader>
            <v-subheader
              v-else-if="item.header && item.found"
              :key="item.uid"
            >
              <v-row justify="space-between">
                <p class="mb-0 ml-3">{{item.header}}</p>
                <v-btn class="text-right" icon small @click.stop="closeSearchMenu"><v-icon small>mdi-window-close</v-icon></v-btn>
              </v-row>
            </v-subheader>
            <v-divider
              v-else-if="item.divider"
              :key="index"
              :inset="item.inset"
            ></v-divider>
            <v-list-item
              v-else
              :key="item.uid"
              @click="redirect(item.uid)"
            >
              <v-list-item-avatar>
                <v-img :src="item.post_image.url"></v-img>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title>
                  <v-row justify="space-between" align="center" class="px-3">
                    <p class="mb-0" style="text-overflow: ellipsis; width: 85%; overflow: hidden">{{item.post_title[0].text}}</p>
                    <p class="caption mb-0">{{item.star}} <v-icon small class="mb-1 mr-2">mdi-star</v-icon></p>
                  </v-row>
                </v-list-item-title>
                <v-list-item-subtitle>{{item.post_announce[0].text}}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </template>
        </v-list>
      </v-card>
    </transition>
  </v-form>
</template>

<script>
import {findPostByText} from "../../utils/prismic";
export default {
	name: "Search.vue",
	props: {
		isMobile: Boolean,
		isClose: Boolean
	},
	data: () => {
		return {
			width: '500px',
			query: "",
			items: [],
			loading: false
		}
	},
	methods: {
		redirect(uid) {
			this.$router.push(`/story/${uid}`);
			this.closeSearchMenu()
		},
		closeSearchMenu() {
			this.items = [];
			this.query = ''
		},
		async search() {
			try {
				this.loading = true;
				const results = await findPostByText("document.type", "post", 'document', this.query);
				if (Object.keys(results).length) {
					this.items = [{ header: 'Найдено:', found: true }];
					for (let key in results) {
						if (results.hasOwnProperty(key)) this.items = [...this.items, results[key],  { divider: true, inset: false }];
					}
				} else this.items = [{ header: 'По вашему запросу ничего не найдено', found: false }];
			} catch (e) {
				console.error(e)
			} finally {
				this.loading = false
			}
		}
	}
}
</script>

<style scoped>
  .fullscreen-search-box {
    position: absolute;
    max-width: 400px;
    margin-bottom: 12px;
    top: 63px;
    right: 0;
    z-index: 1000;
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
    opacity: 0;
  }
</style>
