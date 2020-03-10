<template>
  <v-row justify="center" wrap>
    <v-col cols="12" md="3" v-for="item in items" :key="item.id">
      <v-card
        class="mx-auto my-0 card"
      >
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="headline text-center">{{item.data.post_title[0] && item.data.post_title[0].text}}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
          <v-img
            class="mb-0"
            :src="item.data.post_image.url"
            height="200"
          ></v-img>
        <v-card-text>
          <p class="mb-0" :style="{color: $vuetify.theme.themes[$customTheme].color}"> {{item.data.post_announce[0] && item.data.post_announce[0].text}} </p>
        </v-card-text>
        <v-card-actions class="px-4 pb-4">
          <v-btn nuxt :to="`/story/${item.uid}`"> Читать </v-btn>
          <v-spacer></v-spacer>
            <shared-components :uid="item.uid"/>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import SharedComponents from "../components/commons/SharedComponents"
import {getAllPosts} from '../utils/prismic'

export default {
  components: {SharedComponents},
  async asyncData() {
    const items = await getAllPosts("document.type", "post");
    return {
      items: items.results
    };
  },
}
</script>

<style scoped>
</style>

