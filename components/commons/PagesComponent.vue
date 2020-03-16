<template>
  <v-row justify="center" wrap>
    <v-col cols="12" md="3" v-for="item in items" :key="item.id">
      <v-card
        class="mx-auto my-0 card"
      >
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title style="cursor:pointer;" @click="$router.push(`/story/${item.uid}`)" class="headline text-center">{{item.data.post_title[0] && item.data.post_title[0].text}}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-img
          class="mb-0"
          :src="item.data.post_image.url"
          :alt="item.data.post_image.alt"
          height="200"
        ></v-img>
        <v-card-text>
          <p class="mb-0" :style="{color: $vuetify.theme.themes[$customTheme].color}"> {{item.data.post_announce[0] && item.data.post_announce[0].text | cropText}} </p>
        </v-card-text>
        <v-card-actions class="px-4 pb-4">
          <v-btn nuxt :to="`/story/${item.uid}`"> Читать </v-btn>
          <v-spacer></v-spacer>
          <shared-components :uid="item.uid"/>
            <v-btn nuxt :to="`/story/${item.uid}/#commento`" icon><v-icon small>mdi-comment-text-multiple</v-icon></v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import SharedComponents from "./SharedComponents";

export default {
	name: "PagesComponent",
	components: {SharedComponents},
	props: {
		items: {
			type: Array
		}
	},
	filters: {
		cropText: (text) => {
			const length = 156;
			if (text.length > length){
				const lastSpace = text.substr(0, length).lastIndexOf(' ');
				return text.substr(0, lastSpace) + '...';
			}
			else return text
		}
	}
}
</script>

<style scoped>

</style>
