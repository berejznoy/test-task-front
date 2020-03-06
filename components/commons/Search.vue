<template>
  <v-form @submit.prevent="search()" :disabled="!query">
    <v-row
      v-if="isMobile"
      align="center"
      class="ma-0 mb-3"
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
          <v-btn icon type="submit" :disabled="!query">
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
          <v-btn icon type="submit" :disabled="!query">
            <v-icon>mdi-magnify</v-icon>
          </v-btn>
        </template>
      </v-text-field>
    </v-row>
    <transition name="fade">
      <v-card class="hidden-md-and-up mb-3" v-if="isShowSearchedBlock">
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
          :key="item.header"
        >
          <v-row justify="space-between">
            <p class="mb-0 ml-3">{{item.header}}</p>
            <v-btn icon small @click.stop="closeSearchMenu"><v-icon small>mdi-window-close</v-icon></v-btn>
          </v-row>
        </v-subheader>
        <v-divider
          v-else-if="item.divider"
          :key="index"
          :inset="item.inset"
        ></v-divider>

        <v-list-item
          v-else
          :key="item.title"
          @click="redirect(item.uid)"
        >
          <v-list-item-avatar>
            <v-img :src="item.photo"></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>
              <v-row justify="space-between" align="center" class="px-3">
                <p class="mb-0">{{item.title}}</p>
                <p class="caption mb-0"><v-icon small class="mb-1 mr-2">mdi-star</v-icon>{{item.rating}}</p>
              </v-row>
            </v-list-item-title>
            <v-list-item-subtitle>{{item.announce}}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-list>
    </v-card>
      <v-card class="hidden-sm-and-down fullscreen-search-box" v-if="this.items.length">
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
              :key="item.header"
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
              :key="item.title"
              @click="redirect(item.uid)"
            >
              <v-list-item-avatar>
                <v-img :src="item.photo"></v-img>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title>
                  <v-row justify="space-between" align="center" class="px-3">
                    <p class="mb-0">{{item.title}}</p>
                    <p class="caption mb-0"><v-icon small class="mb-1 mr-2">mdi-star</v-icon>{{item.rating}}</p>
                  </v-row>
                </v-list-item-title>
                <v-list-item-subtitle>{{item.announce}}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </template>
        </v-list>
      </v-card>
    </transition>
  </v-form>
</template>

<script>
    import Prismic from "prismic-javascript";
    import {apiEndpoint} from "../../config/prismic.config";
    import algoliasearch from 'algoliasearch/lite';

    export default {
        name: "Search.vue",
      props: {
          isMobile: Boolean,
          isClose: Boolean
      },
      data: () => {
          return {
            searchClient: algoliasearch(
              '84CRV6FPGO',
              '487c27ce38954b19d8facd77889d3a66'),
            width: '500px',
            query: "",
            items: [],
          }
      },
      computed: {
          isShowSearchedBlock() {
            return !!(this.items.length && this.isMobile);
          }
      },
      methods: {
        redirect(uid) {
          this.$router.push(`/story/${uid}`)
          this.closeSearchMenu()
        },
        closeSearchMenu() {
          this.items = [];
          this.query = ''
        },
        async search() {
          const index = this.searchClient.initIndex('screep');
          const { hits } = await index.search(this.query);
          if(hits.length) {
            this.items = hits.reduce((acc, cur, index) => {
              if(hits[index + 1]) return [...acc, cur,   { divider: true, inset: true }];
              else return [...acc, cur]
            }, [{ header: 'Найдено:', found: true }])
          } else this.items = [{ header: 'По вашему запросу ничего не найдено', found: false }]
        }
      }
    }
</script>

<style scoped>
  .fullscreen-search-box {
    position: absolute;
    max-width: 400px;
    top: 63px;
    right: 0;
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
    opacity: 0;
  }
</style>
