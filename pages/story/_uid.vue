<template>
  <div class="my-3">
    <div class="fixed-arrow hidden-xs-only">
    <v-btn icon @click="$router.push('/')"> <v-icon>mdi-chevron-left</v-icon></v-btn>
    </div>
  <v-card
    max-width="800"
    class="mx-auto elevation-2 card"
  >
    <v-list-item>
      <v-list-item-content>
        <h2 class="headline text-center">{{header}}</h2>
        <v-row justify="space-between">
          <v-col cols="8" class="text-left"><p class="caption mb-0"><v-icon small class="mb-1 mr-2">mdi-calendar-range</v-icon>{{date}}</p></v-col>
          <v-col cols="4" class="text-right"> <p class="caption mb-0"><v-icon small class="mb-1 mr-2">mdi-star</v-icon>{{rating}}</p></v-col>
        </v-row>
      </v-list-item-content>
    </v-list-item>

    <v-img
      class="mb-3"
      :src="logo.url"
      :alt="logo.alt"
      height="200"
    ></v-img>

    <v-card-text :style="{color: $vuetify.theme.themes[$customTheme].color}" v-html="content"/>

    <v-card-actions class="mb-3">
      <v-spacer></v-spacer>
      <v-row justify="space-between" style="width: 100%">
        <v-col cols="8" class="text-left pl-0">
      <div>
        <v-rating :background-color="getColor" :color="getColor" v-model="stars" ></v-rating>
      </div>
        </v-col>
        <v-col cols="4" class="text-right">
          <shared-components />
        </v-col>
      </v-row>
    </v-card-actions>
  </v-card>
    <v-card
      max-width="800"
      class="mx-auto elevation-2 card"
      id="comments">
      <v-card-title> Комментарии </v-card-title>
      <v-card-text>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
  import PrismicDom from "prismic-dom"
  import SharedComponents from '../../components/commons/SharedComponents'
  import {getPostByUid} from '../../utils/prismic'

  export default {
    components: {SharedComponents},
    validate({params}) {
      return !!params.uid
    },
    head() {
      return {
        title: PrismicDom.RichText.asText(this.response.data.meta_title),
        link: [
          {
            rel: 'canonical',
            href: `https://screep.ru/story/${this.$route.params.uid}`
          }
        ],
        meta: [
          {
            hid: 'description',
            name: 'description',
            content: PrismicDom.RichText.asText(this.response.data.meta_description)},
          {
            hid: `keywords`,
            name: 'keywords',
            keywords: this.response.data.meta_keywords
          }
        ]
      }
    },
    data() {
      return {
        stars: 0
      }
    },
    async asyncData({params, payload, $moment, $axios}) {
      let response = {};
      if (payload) response = payload;
      else {
        const postData = await getPostByUid('post', `${params.uid}`);
        const rateData = await $axios.$get(`/blog/post/prismic/${postData.id}`);
        response = {...postData, rateData}
      }

      const header = PrismicDom.RichText.asText(response.data.post_title);
      const content = PrismicDom.RichText.asHtml(response.data.post_body);
      const date = $moment(response.first_publication_date).format('DD.MM.YYYY');
      const logo = response.data.post_image;
      const tags = response.tags;
      return {
        header,
        content,
        date,
        logo,
        tags,
        rating: response.rateData.star,
        response
      };
    },
    computed: {
      getColor() {
        if (this.$vuetify.theme.dark === true) return 'white';
        else return "rgba(0, 0, 0, 0.6)"
      }
    },
    watch: {
      async stars(newVal, oldVal) {
        const vote = oldVal ? this.response.rateData.voting : this.response.rateData.voting + 1;
        const star = oldVal ? this.response.rateData.rating - oldVal + newVal : this.response.rateData.rating + newVal;
          const {post} = await this.$axios.$put(`/blog/edit?postID=${this.response.rateData._id}`, {
            prismicId: this.response.id,
            rating: star,
            voting: vote,
            star: (star/vote).toFixed(1)
          });
          this.response.rateData = post;
          this.rating = post.star
      }
    },
  }

</script>

<style scoped>
  .fixed-arrow {
    position: fixed;
    z-index: 1000
  }
</style>

