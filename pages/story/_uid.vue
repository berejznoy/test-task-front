<template>
  <div>
    <div class="fixed-arrow hidden-xs-only">
    <v-btn icon @click="$router.go(-1)"> <v-icon>mdi-chevron-left</v-icon></v-btn>
    </div>
  <v-card
    max-width="800"
    class="mx-auto elevation-2 card"
  >
    <v-list-item>
      <v-list-item-content>
        <p class="headline text-center">{{header}}</p>
        <v-row justify="space-between">
          <v-col cols="8" class="text-left"><p class="caption mb-0"><v-icon small class="mb-1 mr-2">mdi-account</v-icon><i>@robot</i> - {{date}}</p></v-col>
          <v-col cols="4" class="text-right"> <p class="caption mb-0"><v-icon small class="mb-1 mr-2">mdi-star</v-icon>4/5</p></v-col>
        </v-row>
      </v-list-item-content>
    </v-list-item>

    <v-img
      class="mb-3"
      :src="logo"
      height="200"
    ></v-img>

    <v-card-text v-html="content"/>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-row justify="space-between" style="width: 100%">
        <v-col cols="8" class="text-left pl-0">
      <div>
        <v-rating :background-color="getColor" :color="getColor" v-model="rating"></v-rating>
      </div>
        </v-col>
        <v-col cols="4" class="text-right">
          <shared-components />
        </v-col>
      </v-row>
    </v-card-actions>
  </v-card>
  </div>
</template>

<script>
  import Prismic from "prismic-javascript";
  import PrismicDom from "prismic-dom"
  import { apiEndpoint } from "../../config/prismic.config";
  import SharedComponents from '../../components/commons/SharedComponents'
  import algoliasearch from "algoliasearch/lite";

  export default {
    components: {SharedComponents},
    validate ({ params }) {
      return !!params.uid
    },
    data(){
      return {
        rating: null,
        searchClient: algoliasearch(
          '84CRV6FPGO',
          '487c27ce38954b19d8facd77889d3a66'),
      }
    },
    async asyncData(ctx) {
      const api = await Prismic.getApi(apiEndpoint);
      const results = await api.getByUID('post', `${ctx.params.uid}`);
      const header = PrismicDom.RichText.asText(results.data.post_title);
      const content = PrismicDom.RichText.asHtml(results.data.post_body);
      const date = ctx.$moment(results.data.public_date).format('DD.MM.YYYY');
      const logo = results.data.post_image.url;
      return {
        header,
        content,
        date,
        logo
      };
    },
    computed: {
      getColor() {
        if (this.$vuetify.theme.dark === true) return 'white';
        else return "rgba(0, 0, 0, 0.6)"
      }
    }
  }
</script>

<style scoped>
  .fixed-arrow {
    position: fixed;
    z-index: 1000
  }
</style>

