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
          :alt="item.data.post_image.alt"
          height="200"
        ></v-img>
        <v-card-text>
          <p class="mb-0" style="overflow: hidden; height: 110px" ref="cardText" :style="{color: $vuetify.theme.themes[$customTheme].color}"> {{item.data.post_announce[0] && item.data.post_announce[0].text}} </p>
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
    import SharedComponents from "./SharedComponents";

    export default {
        name: "PagesComponent",
      components: {SharedComponents},
      props: {
          items: {
            type: Array
          }
      },
      mounted() {
        const el = this.$refs.cardText;
        el.forEach(item => {
          let keep = item.innerHTML
          while (item.scrollHeight > item.offsetHeight) {
            item.innerHTML = keep;
            item.innerHTML = item.innerHTML.substring(0, item.innerHTML.length - 1);
            keep = item.innerHTML;
            item.innerHTML = item.innerHTML + "...";
          }
        })
      }
    }
</script>

<style scoped>

</style>
