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
        <h1 class="headline text-center">{{header}}</h1>
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
      class="mx-auto elevation-2"
      light
    >
      <v-card-title> Комментарии </v-card-title>
      <v-card-text>
        <div id="commento">
          <vue-disqus shortname="screep"/>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import PrismicDom from "prismic-dom"
import SharedComponents from '../../components/commons/SharedComponents'
import {getPostByUid} from '../../utils/prismic'
import VueDisqus from "../../components/commons/Disqus";

export default {
	components: {VueDisqus, SharedComponents},
	validate({params}) {
		return !!params.uid
	},
	head() {
		return {
			title: PrismicDom.RichText.asText(this.meta_title),
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
					content: PrismicDom.RichText.asText(this.meta_description)},
				{
					hid: `keywords`,
					name: 'keywords',
					keywords: this.meta_keywords
				}
			]
		}
	},
	data() {
		return {
			stars: 0
		}
	},
	/**
     * Наполнение страницы при генерации и локально
     * @param params - параметры роутера
     * @param $moment
     * @param $axios
     * @returns {Promise<{date: *, meta_description, data: *, meta_title, rating: number, header: *, logo, meta_keywords, content: *, rateData: any, tags}>}
     */
	async asyncData({params, $moment, $axios}) {
		const {
			data: {
				post_title,
				post_body,
				post_image,
				meta_keywords,
				meta_description,
				meta_title
			},
			id,
			first_publication_date,
			tags
		} = await getPostByUid('post', `${params.uid}`);
		const rateData = await $axios.$get(`/blog/post/prismic/${id}`);
		return {
			header: PrismicDom.RichText.asText(post_title),
			content: PrismicDom.RichText.asHtml(post_body),
			date: $moment(first_publication_date).format('DD.MM.YYYY'),
			logo: post_image,
			tags,
			rating: rateData.star,
			rateData,
			id,
			meta_keywords,
			meta_title,
			meta_description
		};
	},
	computed: {
		getColor() {
			if (this.$vuetify.theme.dark === true) return 'white';
			else return "rgba(0, 0, 0, 0.6)"
		}
	},
	async mounted() {
		this.rateData = await this.$axios.$get(`/blog/post/prismic/${this.id}`)
		this.rating = this.rateData.star
	},
	watch: {
		async stars(newVal, oldVal) {
			const vote = oldVal ? this.rateData.voting : this.rateData.voting + 1;
			const star = oldVal ? this.rateData.rating - oldVal + newVal : this.rateData.rating + newVal;
			const {post} = await this.$axios.$put(`/blog/edit?postID=${this.rateData._id}`, {
				prismicId: this.id,
				rating: star,
				voting: vote,
				star: (star/vote).toFixed(1)
			});
			this.rateData = post;
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

